import { MapPin, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { type Review } from "@/lib/dummy-data";
import { ReviewCard } from "./ReviewCard";

// Coordinate mappings for existing mock locations and dynamic hashing fallback
function getCoordinatesForLocation(location: string): { lat: number; lng: number } {
  const known: Record<string, { lat: number; lng: number }> = {
    "পাসপোর্ট অফিস": { lat: 23.7291, lng: 90.3804 },
    "এনআইডি / নির্বাচন কমিশন": { lat: 23.7508, lng: 90.3855 },
    "জন্ম-মৃত্যু নিবন্ধন শাখা": { lat: 23.7420, lng: 90.3920 },
    "ভূমি অফিস / এসিল্যান্ড": { lat: 23.7380, lng: 90.3750 },
    "সাব-রেজিস্ট্রি অফিস": { lat: 23.7925, lng: 90.4078 },
    "সেটেলমেন্ট অফিস": { lat: 23.7850, lng: 90.3950 },
    "রাজউক / উন্নয়ন কর্তৃপক্ষ": { lat: 23.7285, lng: 90.4135 },
    "বিআরটিএ অফিস": { lat: 23.8042, lng: 90.3673 },
    "ট্রাফিক পুলিশ জোন": { lat: 23.7592, lng: 90.3889 },
    "থানা / police স্টেশন": { lat: 23.7650, lng: 90.3900 },
    "সরকারি hospital": { lat: 23.7250, lng: 90.3970 },
  };

  const key = location.trim();
  // Check prefix matches for generalized office coordinates
  for (const knownKey of Object.keys(known)) {
    if (key.includes(knownKey) || knownKey.includes(key)) {
      return known[knownKey];
    }
  }

  // Predictable fallback coordinates near Dhaka using a basic string hash
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Distribute within a reasonable radius around Dhaka center (23.75, 90.38)
  const latOffset = ((hash % 100) / 1000) * 0.12; 
  const lngOffset = (((hash >> 8) % 100) / 1000) * 0.12;

  return {
    lat: 23.75 + latOffset,
    lng: 90.38 + lngOffset,
  };
}

// Haversine distance formula (returns distance in km)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function LocalRadar({ reports = [] }: { reports?: Review[] }) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [nearbyCount, setNearbyCount] = useState<number>(0);
  const [nearbyReports, setNearbyReports] = useState<Review[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Sync state whenever parent reports list or userLocation updates
  useEffect(() => {
    if (!userLocation) {
      setNearbyCount(reports.length);
    } else {
      const filtered = reports.filter((r) => {
        const coords = getCoordinatesForLocation(r.location);
        const dist = calculateDistance(userLocation.lat, userLocation.lng, coords.lat, coords.lng);
        return dist <= 10;
      });
      setNearbyReports(filtered);
      setNearbyCount(filtered.length);
    }
  }, [reports, userLocation]);

  const fetchNearbyReports = () => {
    if (isLocating) return;
    
    setIsLocating(true);
 
    if (!navigator.geolocation) {
      alert("মামা, আপনার ব্রাউজারে লোকেশন সার্ভিস সাপোর্ট করে না! ম্যানুয়ালি সার্চ দেন।");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        const filtered = reports.filter((r) => {
          const coords = getCoordinatesForLocation(r.location);
          const dist = calculateDistance(latitude, longitude, coords.lat, coords.lng);
          return dist <= 10;
        });

        setNearbyReports(filtered);
        setNearbyCount(filtered.length);
        setIsLocating(false);
        setIsSheetOpen(true);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("মামা লোকেশন অন না করলে আপনার এলাকার চোর ধরবো কেমনে? ম্যানুয়ালি সার্চ দেন!");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  return (
    <>
      <button
        onClick={fetchNearbyReports}
        className={`mx-4 mt-4 flex w-[calc(100%-2rem)] items-center gap-3 rounded-2xl p-3.5 text-left transition select-none ${
          isLocating 
            ? "bg-amber-50 text-amber-900 border border-amber-200/50" 
            : isSheetOpen 
              ? "bg-blue-100 text-blue-900 border border-blue-200/40" 
              : "bg-blue-50 text-blue-800 border border-blue-100/50 hover:bg-blue-100/80 active:scale-[0.98]"
        }`}
      >
        <span className="relative grid h-9 w-9 shrink-0 place-items-center">
          <span className={`absolute inset-0 rounded-full bg-blue-400/40 ${isLocating ? "animate-ping" : "animate-radar-ping"}`} />
          <span className={`relative grid h-9 w-9 place-items-center rounded-full bg-blue-500 text-white ${isLocating ? "animate-spin" : ""}`}>
            <MapPin size={16} strokeWidth={2.2} />
          </span>
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-normal truncate py-0.5">
            {isLocating 
              ? "রাডার ঘুরতেসে... লোকেশন স্ক্যান হচ্ছে 📡" 
              : `আপনার আশপাশে আজকে কোপ খাইসে ${nearbyCount} জন!`}
          </p>
          <p className="text-xs text-blue-600/80 mt-0.5 font-semibold">
            {isLocating 
              ? "মামা একটু ধৈর্য ধরেন..." 
              : "ট্যাপ করেন কাছের খবর দেখতে"}
          </p>
        </div>
      </button>

      {/* Geolocation Results Bottom Sheet */}
      <AnimatePresence>
        {isSheetOpen && (
          <>
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSheetOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[4px]"
            />
            {/* Slide-up bottom sheet panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed inset-x-0 bottom-0 z-50 flex max-h-[80vh] flex-col rounded-t-[32px] bg-[#FAF8F5]/95 backdrop-blur-3xl border-t border-white/50 shadow-2xl pb-6 select-none"
            >
              {/* Handlebar drag anchor */}
              <div 
                className="mx-auto my-3 h-1.5 w-12 rounded-full bg-gray-300/80 cursor-pointer" 
                onClick={() => setIsSheetOpen(false)} 
              />
              
              {/* Drawer Header */}
              <div className="px-5 pb-3 pt-1 flex items-center justify-between border-b border-gray-150/40">
                <div className="min-w-0 flex-1 pr-4">
                  <h2 className="text-base font-extrabold text-gray-800 leading-normal py-0.5">
                    আপনার আশপাশে আজকে কোপ খাইসে {nearbyCount} জন!
                  </h2>
                  <p className="text-[11px] text-gray-500 font-semibold mt-0.5 leading-relaxed py-0.5">
                    ১০ কিলোমিটার ব্যাসার্ধের মধ্যে ঘটিত লাইভ কেসসমূহ
                  </p>
                </div>
                <button
                  onClick={() => setIsSheetOpen(false)}
                  className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-250 transition active:scale-90"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* Scrollable list of detailed receipt cards */}
              <div className="flex-1 overflow-y-auto px-1 py-3 space-y-1">
                {nearbyReports.length > 0 ? (
                  nearbyReports.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                    <div className="rounded-full bg-emerald-50 p-5 border border-emerald-100/50 text-emerald-500 animate-bounce">
                      🎉
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-gray-800">সাবাস মামা! এলাকা তো পুরাই পরিষ্কার!</h4>
                      <p className="max-w-[280px] text-xs text-gray-500 leading-relaxed font-semibold mt-1">
                        আপনার আশপাশে ১০ কিলোমিটারের মধ্যে আজকে কোনো চুরির রিপোর্ট নাই।
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
