import { resource_data } from "app/resources/resource_data";

export function Resources() {
  return (
    <div className="grid grid-cols-1 gap-2">
      {resource_data.map((item) => {
        return (
          <a
            key={item.name}
            href={item.link}
            className="group block py-2.5 px-4 -mx-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
          >
            <span className="text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {item.name}
            </span>
          </a>
        );
      })}
    </div>
  );
}
