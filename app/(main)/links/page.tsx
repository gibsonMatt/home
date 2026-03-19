import { portfolio_data } from "app/(main)/portfolio/portfolio_data";
import { resource_data } from "app/(main)/resources/resource_data";

export const metadata = {
  title: "Matt Gibson | Links",
  description: "Projects and resources",
};

function LinkCard({
  name,
  href,
  description,
}: {
  name: string;
  href: string;
  description?: string;
}) {
  return (
    <a
      href={href}
      className="group block py-3 px-4 -mx-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
    >
      <span className="text-neutral-900 dark:text-neutral-100 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {name}
      </span>
      {description && (
        <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {description}
        </p>
      )}
    </a>
  );
}

export default function Page() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight mb-10">Links</h1>

      <div className="space-y-12">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
            Projects
          </h2>
          <div className="space-y-1">
            {portfolio_data.map((item) => (
              <LinkCard
                key={item.name}
                name={item.name}
                href={item.link}
                description={item.description}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
            Resources
          </h2>
          <div className="space-y-1">
            {resource_data.map((item) => (
              <LinkCard key={item.name} name={item.name} href={item.link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
