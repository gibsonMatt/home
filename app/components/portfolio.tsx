import { portfolio_data } from "app/portfolio/portfolio_data";

export function PortfolioItems() {
  return (
    <div className="grid grid-cols-1 gap-3">
      {portfolio_data.map((item) => {
        return (
          <a
            key={item.name}
            href={item.link}
            className="group block p-4 -mx-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
          >
            <h2 className="text-base font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {item.name}
            </h2>
            {item.description && (
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            )}
          </a>
        );
      })}
    </div>
  );
}
