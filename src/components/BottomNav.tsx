import { Link, useLocation } from "@tanstack/react-router";
import { Home, Trophy, BarChart3, Feather } from "lucide-react";
import { useSubmissionSheet } from "./SubmissionSheet";

const items = [
  { to: "/", label: "জগাখিচুড়ি", Icon: Home },
  { to: "/leaderboard", label: "সেরা ধান্দাবাজ", Icon: Trophy },
  { to: "/rates", label: "আজকের বাজার", Icon: BarChart3 },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  const { open } = useSubmissionSheet();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="relative grid grid-cols-[1fr_1fr_auto_1fr_1fr] items-end justify-between px-4 pb-safe pt-2">
        {items.slice(0, 2).map(({ to, label, Icon }) => {
          const active = pathname === to;
          return (
            <NavLink key={to} to={to} label={label} Icon={Icon} active={active} />
          );
        })}

        <div className="relative -mt-8 flex flex-col items-center">
          <button
            onClick={open}
            aria-label="খুইলা কন"
            className="grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_10px_25px_rgba(233,30,99,0.35)] active:scale-95 transition"
            style={{ background: "linear-gradient(45deg, #E91E63, #FFB300)" }}
          >
            <Feather size={24} strokeWidth={2.2} />
          </button>
          <span className="mt-1 text-[10px] font-semibold text-gray-700">খুইলা কন</span>
        </div>

        {items.slice(2).map(({ to, label, Icon }) => {
          const active = pathname === to;
          return (
            <NavLink key={to} to={to} label={label} Icon={Icon} active={active} />
          );
        })}
        <div />
      </div>
    </nav>
  );
}

function NavLink({
  to,
  label,
  Icon,
  active,
}: {
  to: string;
  label: string;
  Icon: typeof Home;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-1 py-1"
    >
      <Icon
        size={22}
        strokeWidth={active ? 2.4 : 1.8}
        color={active ? "#E91E63" : "#6B7280"}
        fill={active ? "#E91E63" : "none"}
      />
      <span
        className={`text-[10px] leading-tight ${
          active ? "font-bold text-[#E91E63]" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}
