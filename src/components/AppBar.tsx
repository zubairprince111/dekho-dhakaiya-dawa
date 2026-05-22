import { Search } from "lucide-react";
import { useSearch } from "./SearchOverlay";

export function AppBar() {
  const { open } = useSearch();

  return (
    <header
      className="sticky top-0 z-50 bg-white bg-cover bg-center shadow-sm rounded-b-3xl overflow-hidden"
      style={{ backgroundImage: "url('/navbar.png')" }}
    >
      <div className="flex items-center justify-end px-5 py-3.5">
        <button
          onClick={open}
          aria-label="search"
          className="grid h-10 w-10 place-items-center rounded-full bg-gray-50 text-gray-700 active:scale-95 transition cursor-pointer hover:bg-gray-100"
        >
          <Search size={20} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}

