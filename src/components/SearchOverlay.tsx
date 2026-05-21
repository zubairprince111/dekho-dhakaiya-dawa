import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Sparkles, MapPin } from "lucide-react";
import { reviews, type Review } from "@/lib/dummy-data";
import { ReviewCard } from "./ReviewCard";
import { useSubmissionSheet } from "./SubmissionSheet";
import { supabase } from "@/lib/supabase";

type SearchCtxType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchCtx = createContext<SearchCtxType | null>(null);

export function useSearch() {
  const context = useContext(SearchCtx);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const open = () => {
    setIsOpen(true);
    setSearchQuery("");
  };
  const close = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <SearchCtx.Provider value={{ isOpen, open, close, searchQuery, setSearchQuery }}>
      {children}
      <SearchOverlay />
    </SearchCtx.Provider>
  );
}

const POPULAR_TAGS = [
  { label: "বিআরটিএ", color: "bg-red-50 text-red-600 border-red-100 hover:bg-red-100/50" },
  { label: "গুলশান", color: "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100/50" },
  { label: "পাসপোর্ট", color: "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100/50" },
  { label: "থানা", color: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100/50" },
  { label: "ওয়াসা", color: "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100/50" },
];

function SearchOverlay() {
  const { isOpen, close, searchQuery, setSearchQuery } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedOffice, setSelectedOffice] = useState<Review | null>(null);
  const [liveReviews, setLiveReviews] = useState<Review[]>(reviews);

  // Autofocus the input when the overlay opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Load live reports from Supabase when search overlay is active
  useEffect(() => {
    if (isOpen) {
      async function loadLiveReviews() {
        try {
          const { data, error } = await supabase
            .from("bribe_reports")
            .select("*")
            .order("id", { ascending: false });

          if (error) {
            console.warn("Supabase fetch failed in SearchOverlay, using mock data.", error);
          } else if (data && data.length > 0) {
            const mapped = data.map((item: any, index: number) => {
              const ratingLabels: Record<number, string> = {
                1: "হালকা চা-পানি",
                2: "গলা শুকনা ছিল",
                3: "চুমুকে চুমুকে কোপ",
                4: "কলিজা শুকায়া দিসে",
                5: "রক্ত চুইষা খাইসে!",
              };

              let formattedItems = [];
              if (Array.isArray(item.items)) {
                formattedItems = item.items.map((c: any) => ({
                  label: c.label || c.who || "চা-পানি ফি",
                  amount: parseFloat(c.amount) || 0,
                }));
              }

              return {
                id: item.id || String(index),
                author: item.author || "অজ্ঞাত পাবলিক",
                location: item.officeName || "সরকারি অফিস",
                timeAgo: "আজকে",
                rating: item.teaCups || 3,
                ratingLabel: ratingLabels[item.teaCups] || "চুমুকে চুমুকে কোপ",
                category: item.category || "অন্যান্য",
                items: formattedItems,
                total: item.totalAmount || 0,
                story: item.comments || "",
                laughs: item.laughs !== undefined ? item.laughs : Math.floor(Math.random() * 50) + 5,
                sames: item.sames !== undefined ? item.sames : Math.floor(Math.random() * 30) + 2,
                caps: item.caps !== undefined ? item.caps : Math.floor(Math.random() * 5),
              };
            });
            setLiveReviews(mapped);
          }
        } catch (err) {
          console.warn("Error fetching live reviews inside SearchOverlay:", err);
        }
      }
      loadLiveReviews();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter reviews based on query
  const filteredReviews = liveReviews.filter((review) => {
    if (!searchQuery.trim()) return false;
    const query = searchQuery.toLowerCase();
    
    const matchesLocation = review.location.toLowerCase().includes(query);
    const matchesAuthor = review.author.toLowerCase().includes(query);
    const matchesStory = review.story.toLowerCase().includes(query);
    const matchesCategory = review.category.toLowerCase().includes(query);
    const matchesItems = review.items.some((item) =>
      item.label.toLowerCase().includes(query)
    );

    return matchesLocation || matchesAuthor || matchesStory || matchesCategory || matchesItems;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-center overflow-hidden">
        {/* Backdrop glassmorphism overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="absolute inset-0 bg-black/35 backdrop-blur-[6px]"
        />

        {/* Search Modal Content Container (Transparent container to host floating glass capsules) */}
        <motion.div
          initial={{ y: "-30px", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-30px", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative z-[110] flex h-full w-full max-w-[480px] flex-col bg-transparent"
        >
          {/* Floating Glassmorphic Header & Input Capsule */}
          <div className="sticky top-0 z-[120] p-4 pb-2">
            <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-2xl border border-white/45 rounded-2xl p-2.5 shadow-xl">
              {/* Glowing Search input container */}
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={16} strokeWidth={2.2} />
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedReview(null);
                    setSelectedOffice(null);
                  }}
                  placeholder="কোন চিপায় কোপ খাইছেন? খুঁজুন..."
                  className="w-full rounded-xl border border-gray-200 bg-white/50 pl-9 pr-8 py-2.5 text-xs font-semibold text-gray-800 transition placeholder:text-gray-400 focus:border-[#00BCD4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/10"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedReview(null);
                      setSelectedOffice(null);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-200/50 p-1 text-gray-500 hover:bg-gray-200 active:scale-95 transition"
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                )}

                {/* Floating Glassmorphic Dropdown Menu */}
                {searchQuery.trim() && !selectedReview && (
                  <div className="absolute left-0 right-0 top-full z-[130] mt-3.5 max-h-[300px] overflow-y-auto rounded-2xl border border-white/50 bg-white/85 backdrop-blur-3xl p-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {filteredReviews.length > 0 ? (
                      <div className="space-y-1.5">
                        <div className="px-2 pb-1.5 flex items-center justify-between text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                          <span>কাঙ্ক্ষিত দফতর সমুহ</span>
                          <span className="text-[#E91E63] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100/50 font-bold">
                            {filteredReviews.length} টি ম্যাচ
                          </span>
                        </div>
                        {filteredReviews.map((review) => (
                          <button
                            key={review.id}
                            type="button"
                            onClick={() => {
                              setSelectedOffice(review);
                              setSearchQuery("");
                            }}
                            className="flex w-full flex-col gap-1 rounded-xl bg-white/40 hover:bg-white/90 p-2.5 text-left transition duration-150 border border-transparent hover:border-gray-200/50 active:scale-[0.99] cursor-pointer"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-[11px] font-black text-gray-800 truncate max-w-[180px] py-0.5 leading-normal">📍 {review.location}</span>
                              <span className="text-[11px] font-black text-[#E91E63] tabular-nums py-0.5 leading-normal">৳{review.total.toLocaleString("bn-BD")}</span>
                            </div>
                            <p className="text-[9px] text-gray-500 line-clamp-1 font-semibold leading-relaxed">{review.story}</p>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 px-4 text-center space-y-2">
                        <p className="text-xs font-extrabold text-red-500">কোনো কোপ পাওয়া যায় নাই! 😭</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed font-semibold">
                          এই দফতরে কোনো দুর্নীতির রেকর্ড নেই। অন্য কোনো কী-ওয়ার্ড দিয়ে ট্রাই করেন।
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={close}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gray-150/40 text-gray-650 hover:bg-gray-200 active:scale-95 transition"
              >
                <X size={16} strokeWidth={2.2} />
              </button>
            </div>

            {/* Floating Popular/Quick Tags */}
            {!searchQuery.trim() && (
              <div className="mt-2.5 flex flex-wrap items-center gap-2 bg-white/70 backdrop-blur-xl border border-white/40 rounded-xl p-2.5 shadow-md">
                <span className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-gray-400">
                  <Sparkles size={11} className="text-amber-500" /> হটস্পট:
                </span>
                <div className="flex flex-wrap gap-1">
                  {POPULAR_TAGS.map((tag) => (
                    <button
                      key={tag.label}
                      onClick={() => {
                        setSearchQuery(tag.label);
                        setSelectedReview(null);
                        setSelectedOffice(null);
                      }}
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-extrabold transition-all duration-200 active:scale-95 cursor-pointer ${tag.color}`}
                    >
                      #{tag.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto pb-24 pt-2">
            {selectedReview ? (
              // When a small card is tapped, show ONLY the large detailed card here
              <div className="space-y-4 animate-in fade-in zoom-in-95 duration-250">
                <div className="px-5 py-2 flex items-center justify-between text-xs font-bold text-gray-400 tracking-wider uppercase">
                  <span className="flex items-center gap-1.5 text-rose-600 font-extrabold">
                    🔥 ডিটেইলস কোপ কাহিনী
                  </span>
                  <button
                    onClick={() => setSelectedReview(null)}
                    className="text-[#E91E63] bg-rose-50 hover:bg-rose-100 px-3.5 py-1.5 rounded-full border border-rose-100/50 font-extrabold transition active:scale-95 text-[11px] cursor-pointer flex items-center gap-1 shadow-sm"
                  >
                    ⬅️ ফিরে যান
                  </button>
                </div>
                <div className="transition-all duration-300">
                  <ReviewCard review={selectedReview} />
                </div>
              </div>
            ) : !searchQuery.trim() ? (
              selectedOffice ? (
                <OfficeDetailsCard data={selectedOffice} liveReviews={liveReviews} />
              ) : (
                <EmptySearchState />
              )
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function BribeRadarIcon() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
    >
      {/* Radar signal waves */}
      <motion.path
        d="M 20 25 A 40 40 0 0 1 80 25"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="3"
        strokeDasharray="6 4"
        strokeLinecap="round"
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 30 35 A 25 25 0 0 1 70 35"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="2.5"
        strokeDasharray="4 3"
        strokeLinecap="round"
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Envelope - Tilted & Muted Rusty Gray */}
      <g transform="translate(14, 38) rotate(-10)">
        {/* Envelope Shadow */}
        <rect
          x="2"
          y="4"
          width="52"
          height="34"
          rx="3"
          fill="#1F2937"
          opacity="0.15"
        />
        {/* Envelope Body */}
        <rect
          x="0"
          y="0"
          width="52"
          height="34"
          rx="3"
          fill="#9CA3AF"
          stroke="#4B5563"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Envelope lines/seams */}
        <path
          d="M 0 0 L 26 18 L 52 0"
          fill="none"
          stroke="#4B5563"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 0 34 L 18 19"
          fill="none"
          stroke="#4B5563"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 52 34 L 34 19"
          fill="none"
          stroke="#4B5563"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>

      {/* Magnifying Glass - Warning Amber/Orange Hovering & Scanning */}
      <motion.g
        animate={{
          x: [0, 6, -4, 0],
          y: [0, -5, 3, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glass Handle */}
        <line
          x1="64"
          y1="58"
          x2="84"
          y2="78"
          stroke="#EA580C"
          strokeWidth="8.5"
          strokeLinecap="round"
        />
        <line
          x1="72"
          y1="66"
          x2="82"
          y2="76"
          stroke="#9A3412"
          strokeWidth="8.5"
          strokeLinecap="round"
        />
        {/* Glass Rim Shadow */}
        <circle
          cx="48"
          cy="42"
          r="19"
          fill="none"
          stroke="#1F2937"
          strokeWidth="5"
          opacity="0.1"
          transform="translate(2, 3)"
        />
        {/* Glass Lens (Translucent light amber) */}
        <circle
          cx="48"
          cy="42"
          r="19"
          fill="#FEF3C7"
          fillOpacity="0.85"
          stroke="#EA580C"
          strokeWidth="4.5"
        />
        {/* Inside lens: Taka (৳) Symbol */}
        <text
          x="48"
          y="50"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="24"
          fill="#C2410C"
          textAnchor="middle"
          className="select-none font-extrabold"
        >
          ৳
        </text>
        {/* Lens Glare reflection */}
        <path
          d="M 36 34 A 14 14 0 0 1 52 28"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.65"
        />
      </motion.g>
    </svg>
  );
}

function EmptySearchState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-[50vh] space-y-5 animate-in fade-in duration-200">
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="rounded-full bg-orange-50 p-6 border border-orange-100/50 text-orange-500 shadow-inner flex items-center justify-center"
      >
        <BribeRadarIcon />
      </motion.div>
      <div className="space-y-1.5">
        <h3 className="text-base font-extrabold text-gray-800">কার আমলনামা খুঁজতাছেন?</h3>
      </div>
    </div>
  );
}

interface OfficeDetailsCardProps {
  data: Review;
  liveReviews: Review[];
}

function OfficeDetailsCard({ data, liveReviews }: OfficeDetailsCardProps) {
  const { close } = useSearch();
  const submissionSheet = useSubmissionSheet();

  // Find all reviews matching this location
  const officeReviews = liveReviews.filter(
    (r) => r.location.toLowerCase() === data.location.toLowerCase()
  );

  const totalAmount = officeReviews.reduce((sum, r) => sum + r.total, 0);
  const avgRating = officeReviews.length > 0 
    ? Math.round(officeReviews.reduce((sum, r) => sum + r.rating, 0) / officeReviews.length) 
    : 4;

  const cupsStr = "☕".repeat(avgRating);

  return (
    <div className="mx-5 my-4 animate-in fade-in zoom-in-95 duration-300">
      {/* Physical Receipt Container */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
        {/* Top jagged cut visual style */}
        <div className="flex h-3 w-full justify-between overflow-hidden bg-gray-50">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="h-3 w-3 shrink-0 -translate-y-1.5 rotate-45 border-b border-r border-gray-200 bg-white"
            />
          ))}
        </div>

        <div className="p-6 pt-4 space-y-5">
          {/* Header */}
          <div className="text-center space-y-1.5 border-b border-dashed border-gray-200 pb-4">
            <span className="text-2xl">🧾</span>
            <h2 className="text-lg font-black text-gray-800 tracking-tight">📍 {data.location}</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              অফিসিয়াল কোপ রশিদ (MEMO)
            </p>
          </div>

          {/* Stats Segment */}
          <div className="space-y-3.5 bg-gray-50/70 border border-gray-100 rounded-2xl p-4.5">
            {/* Big Stat */}
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
                সর্বমোট দুর্নীতির খতিয়ান
              </span>
              <p className="text-sm font-extrabold text-gray-700">
                টোটাল কোপ খাইসে: <span className="font-black text-xl text-red-600 block mt-0.5">৳{totalAmount.toLocaleString("bn-BD")}</span>
              </p>
            </div>

            <hr className="border-gray-200/60" />

            {/* Secondary Stat */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">প্যারার লেভেল:</span>
              <span className="text-sm font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100/40 flex items-center gap-1.5 select-none">
                {cupsStr} <span className="text-[11px] font-bold text-amber-700">({avgRating} কাপ)</span>
              </span>
            </div>
          </div>

          {/* Recent Comment Snippet */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
              💬 পাবলিকের বাস্তব অভিজ্ঞতা ({officeReviews.length} টি)
            </h3>
            
            <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
              {officeReviews.slice(0, 2).map((rev) => (
                <div key={rev.id} className="relative rounded-2xl bg-rose-50/30 hover:bg-rose-50/50 p-3.5 border border-rose-100/20 transition duration-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-extrabold text-[#E91E63]">{rev.author}</span>
                    <span className="text-[9px] text-gray-400 font-bold">{rev.timeAgo}</span>
                  </div>
                  <p className="text-[11px] text-gray-650 leading-relaxed font-semibold italic">
                    "{rev.story}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom jagged cutout decoration & Barcode */}
          <div className="border-t border-dashed border-gray-200 pt-4 flex flex-col items-center gap-2">
            {/* Fake Barcode representation */}
            <div className="flex h-7 items-center justify-center gap-[1.5px] opacity-35 hover:opacity-60 transition duration-300 select-none">
              {Array.from({ length: 42 }).map((_, i) => {
                const heights = ["h-5", "h-6", "h-7"];
                const widths = ["w-[1.5px]", "w-[2px]", "w-[3px]"];
                const h = heights[i % 3];
                const w = widths[(i * 7) % 3];
                return <div key={i} className={`${h} ${w} bg-black shrink-0`} />;
              })}
            </div>
            <span className="text-[9px] text-gray-400 font-mono tracking-widest leading-none">
              #{data.id || "COP"}-{Math.floor(100000 + Math.random() * 900000)}
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              submissionSheet.open();
              close();
            }}
            className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-extrabold text-xs py-4 px-4 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
          >
            <span>[+] এই অফিসে আপনিও কি ধরা খাইছেন?</span>
          </button>
        </div>

        {/* Bottom jagged cut visual style */}
        <div className="flex h-3 w-full justify-between overflow-hidden bg-gray-50">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="h-3 w-3 shrink-0 translate-y-1.5 rotate-45 border-t border-l border-gray-200 bg-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

