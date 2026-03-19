import Link from "next/link";

const navItems = {
  "/": {
    name: "home",
  },
  "/publications": {
    name: "publications",
  },
  "/portfolio": {
    name: "portfolio",
  },
  "/resources": {
    name: "resources",
  },
  "/cv_for_web.pdf": {
    name: "cv",
  },
};

export function Navbar() {
  return (
    <aside className="mb-14">
      <nav className="flex flex-row items-center gap-1" id="nav">
        {Object.entries(navItems).map(([path, { name }]) => {
          return (
            <Link
              key={path}
              href={path}
              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors py-1.5 px-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
            >
              {name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
