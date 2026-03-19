function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-800 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <ul className="flex flex-row gap-5 text-sm text-neutral-500 dark:text-neutral-400">
          <li>
            <a
              className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/gibsonmatt"
            >
              <ArrowIcon />
              github
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/gibsonMatt/home"
            >
              <ArrowIcon />
              source
            </a>
          </li>
        </ul>
        <p className="text-sm text-neutral-400 dark:text-neutral-500">
          © {new Date().getFullYear()} MIT Licensed
        </p>
      </div>
    </footer>
  );
}
