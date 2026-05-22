import { Link, useLocation } from "@tanstack/react-router";
import { Megaphone, BookOpen } from "lucide-react";
import { useSubmissionSheet } from "./SubmissionSheet";

const items = [
  { to: "/", label: "কোপের কিসসা", Icon: Megaphone },
  { to: "/halkhata", label: "হালখাতা", Icon: BookOpen },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  const { open } = useSubmissionSheet();
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 border-t border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="relative grid grid-cols-[1fr_auto_1fr] items-end justify-between px-4 pb-safe pt-2">
        {items.slice(0, 1).map(({ to, label, Icon }) => {
          const active = pathname === to;
          return (
            <NavLink key={to} to={to} label={label} Icon={Icon} active={active} />
          );
        })}

        <div className="relative -mt-10 flex flex-col items-center">
          <button
            onClick={open}
            aria-label="কোপ রিপোর্ট"
            className="grid h-16 w-16 place-items-center active:scale-95 hover:scale-110 transition duration-200 cursor-pointer"
          >
            <img
              src="/money.gif"
              alt="খুইলা কন"
              className="h-16 w-16 object-contain select-none pointer-events-none"
            />
          </button>
          <span className="mt-1 text-[10px] font-semibold text-gray-700 select-none">খুইলা কন</span>
        </div>

        {items.slice(1, 2).map(({ to, label, Icon }) => {
          const active = pathname === to;
          return (
            <NavLink key={to} to={to} label={label} Icon={Icon} active={active} />
          );
        })}
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
  Icon: typeof Megaphone;
  active: boolean;
}) {
  const isHalkhata = to === "/halkhata";
  const activeColor = isHalkhata ? "#DC2626" : "#E91E63";
  const inactiveColor = "#6B7280";

  // Different dynamic interactive hover styles for each icon
  const hoverClass = isHalkhata
    ? "group-hover:rotate-12 group-hover:scale-105"
    : "group-hover:-rotate-12 group-hover:scale-110";

  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-1 py-1 group"
    >
      <div className={`transition-all duration-200 ${hoverClass} ${active && !isHalkhata ? "animate-pulse" : ""}`}>
        <Icon
          size={22}
          strokeWidth={active ? 2.4 : 1.8}
          color={active ? activeColor : inactiveColor}
          fill={active && !isHalkhata ? activeColor : "none"}
          className={isHalkhata ? (active ? "text-red-600 dark:text-red-500" : "text-gray-500") : (active ? "text-[#E91E63]" : "text-gray-500")}
        />
      </div>
      <span
        className={`text-[10px] leading-tight transition-colors ${
          active 
            ? `font-bold ${isHalkhata ? "text-red-600 dark:text-red-500" : "text-[#E91E63]"}` 
            : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

// MoneyBird component removed as we are now using the animated public/money.gif asset.
