import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useState, type ReactNode } from "react";
import { Plus, X, Building2, Bus } from "lucide-react";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const SheetCtx = createContext<Ctx | null>(null);

export function useSubmissionSheet() {
  const c = useContext(SheetCtx);
  if (!c) throw new Error("SubmissionSheet provider missing");
  return c;
}

export function SubmissionSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SheetCtx.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
      <SubmissionSheet />
    </SheetCtx.Provider>
  );
}

const WHO_OPTIONS: Record<"gov" | "syndicate", string[]> = {
  gov: [
    "বড় স্যার (ফাইনাল সাইন)",
    "পিয়ন ভাই (ফাইল পুশার)",
    "দালাল মামা (বাইরের কন্ট্রাক্ট)",
    "গেটের দারোয়ান (এন্ট্রি ফি)",
    "কম্পিউটার অপারেটর (টাইপিং চার্জ)",
    "ডিউটি অফিসার (জিডির খরচ)",
    "রেকর্ড কিপার (পুরানো ফাইল খোঁজা)",
  ],
  syndicate: [
    "বাসের কন্টাক্টর (ঈদের স্পেশাল)",
    "সিএনজি মামা (বৃষ্টি-ট্যাক্স)",
    "কাঁচাবাজারের আড়তদার (সিন্ডিকেট)",
    "কসাই ভাই (হাড্ডি স্পেশালিস্ট)",
    "লাইনম্যান (স্ট্যান্ড চাঁদা)",
    "ওয়ার্ড বয় (ট্রলি ভাড়া)",
    "ফুটপাতের নেতা (দোকান ভাড়া)",
    "ট্রাফিক মামা (রাস্তার ফাইন)",
  ],
};
const OTHER_OPTIONS = [
  "অচেনা এক ভাই (নাম জানি না)",
  "সিস্টেমের ভূত (সবাই খাইসে)",
];

function SubmissionSheet() {
  const { isOpen, close } = useSubmissionSheet();
  const [category, setCategory] = useState<"gov" | "syndicate">("gov");
  const [combos, setCombos] = useState([{ who: "", amount: "" }]);
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const bad = combos.some((c) => c.who && !c.amount);
    if (bad) {
      setError("ফ্রি সার্ভিস পাইছেন নাকি? টাকার ফিগার বসান!");
      return;
    }
    setError(null);
    close();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-x-0 bottom-0 z-[70] max-h-[92dvh] overflow-y-auto rounded-t-3xl bg-white p-6 pb-10 shadow-2xl"
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">খুইলা কন মামা</h2>
              <button onClick={close} className="grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-gray-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">কই বাঁশ খাইলেন?</label>
                <div className="grid grid-cols-2 gap-2">
                  <CatChip Icon={Building2} label="সরকারি দফতর" active={category === "gov"} onClick={() => setCategory("gov")} />
                  <CatChip Icon={Bus} label="লোকাল সিন্ডিকেট" active={category === "syndicate"} onClick={() => setCategory("syndicate")} />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">কোন স্পট?</label>
                <select className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-[#00BCD4]">
                  <option>গুলশান সাব-রেজিস্ট্রি</option>
                  <option>বিআরটিএ মিরপুর</option>
                  <option>গাবতলী বাস টার্মিনাল</option>
                  <option>ঢাকা পাসপোর্ট অফিস</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">বাঁশটা কে কে দিলো?</label>
                <div className="space-y-2">
                  {combos.map((c, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <input
                        value={c.who}
                        onChange={(e) => {
                          const v = [...combos]; v[i].who = e.target.value; setCombos(v);
                        }}
                        placeholder="কার পকেটে গেলো?"
                        className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00BCD4]"
                      />
                      <input
                        value={c.amount}
                        onChange={(e) => {
                          const v = [...combos]; v[i].amount = e.target.value; setCombos(v);
                        }}
                        inputMode="numeric"
                        placeholder="কয় টাকা খসলো?"
                        className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00BCD4]"
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setCombos([...combos, { who: "", amount: "" }])}
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#00BCD4]"
                >
                  <Plus size={16} /> আরো লাইন ঘাট আছে?
                </button>
                {error && <p className="mt-2 text-xs font-medium text-[#E91E63]">{error}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">ডিটেইলস কন মামা...</label>
                <textarea
                  rows={4}
                  placeholder="পুরা ঘটনাটা বলেন..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-relaxed placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00BCD4]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl py-4 text-lg font-bold text-white shadow-lg active:scale-[0.99] transition"
                style={{ background: "linear-gradient(90deg, #E91E63, #FFB300)" }}
              >
                রিভিউ মাইরা দেন!
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CatChip({
  Icon, label, active, onClick,
}: { Icon: typeof Building2; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition ${
        active
          ? "border-[#E91E63] bg-rose-50 text-[#E91E63]"
          : "border-gray-200 bg-gray-50 text-gray-600"
      }`}
    >
      <Icon size={16} strokeWidth={2} />
      {label}
    </button>
  );
}
