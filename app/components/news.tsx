import Link from "next/link";
import { NewsStory, news_items } from "app/news/news_data";

export function NewsItems() {
  news_items.forEach((story: NewsStory) => {
    const this_date_string: string = new Date(story.date).toLocaleDateString(
      "en-US",
    );
    story.date = this_date_string;
  });

  function compare(a: NewsStory, b: NewsStory) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  }

  news_items.sort(compare);

  return (
    <div>
      {news_items.map((story) => {
        return (
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums pb-2">
              {story.date}
            </p>
            {story.link && (
              <a href={story.link}>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {story.title}
                </p>
              </a>
            )}
            {!story.link && (
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {story.title}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
