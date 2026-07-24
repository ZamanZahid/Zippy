import { FiZap } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export function HeaderBrand() {
  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white">
            <FiZap size={20} />
          </span>
          Zippy
        </NavLink>
      </div>
    </header>
  );
}
