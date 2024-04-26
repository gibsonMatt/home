import Link from "next/link";
import { portfolio_data } from "app/portfolio/portfolio_data";

export function PortfolioItems() {
  return (
    <div className="grid grid-cols-1 grid-flow-row auto-rows-max gap-4">
      {portfolio_data.map((item) => {
        return (
          <div className="flex flex-col">
            <div className="">
              <a href={item.link}>
                <h1 className="text-neutral-900 dark:text-neutral-100 tracking-tight hover:text-sky-400 text-lg font-medium tracking-tight">
                  {item.name}
                </h1>
              </a>
            </div>
            <div className="pl-3">
              <p className="text-sm text-slate-800 dark:text-neutral-100">
                {item.description}
              </p>

            </div>

          </div>
        );
      })}
    </div>
  );
}
