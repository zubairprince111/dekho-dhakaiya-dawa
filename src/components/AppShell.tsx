import type { ReactNode } from "react";
import { AppBar } from "./AppBar";
import { LiveTicker } from "./LiveTicker";
import { BottomNav } from "./BottomNav";
import { SubmissionSheetProvider } from "./SubmissionSheet";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SubmissionSheetProvider>
      <div className="mx-auto min-h-dvh max-w-[480px] bg-[#FAF8F5]">
        <AppBar />
        <LiveTicker />
        <main className="pb-32">{children}</main>
        <BottomNav />
      </div>
    </SubmissionSheetProvider>
  );
}
