import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AppBar } from "./AppBar";
import { LiveTicker } from "./LiveTicker";
import { BottomNav } from "./BottomNav";
import { SubmissionSheetProvider } from "./SubmissionSheet";
import { SearchProvider } from "./SearchOverlay";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SubmissionSheetProvider>
      <SearchProvider>
        <div className="mx-auto min-h-dvh max-w-[480px] bg-[#FAF8F5]">
          <AppBar />
          <LiveTicker />
          <main className="pb-32">
            {children}
            
            {/* Legal safeguard footer */}
            <footer className="mt-12 pb-4 px-6 text-center space-y-1.5 select-none">
              <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                এই সাইট কোনো সরকারি বা বেসরকারি প্রতিষ্ঠানের সাথে যুক্ত নয়। পুরাটাই পাবলিকের মাল।
              </p>
              <Link
                to="/privacy"
                className="inline-block text-[11px] font-extrabold text-[#E91E63] hover:underline cursor-pointer"
              >
                ⚖️ আইনের চিপা (শর্ত ও প্রাইভেসি)
              </Link>
            </footer>
          </main>
          <BottomNav />
        </div>
      </SearchProvider>
    </SubmissionSheetProvider>
  );
}

