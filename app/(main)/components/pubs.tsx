import fs from "fs";
import { parseString } from "bibliography";

type Entry = {
  id?: string;
  title?: string;
  author?: string;
  year?: string;
  url?: string;
  journal?: string;
  volume?: string;
  number?: string;
  pages?: string;
};

type StringValue = {
  _unicode: string;
};

type RawField = {
  name: string;
  data: StringValue;
};

function parseBibs() {
  const focal_fields: string[] = [
    "author",
    "title",
    "year",
    "journal",
    "url",
    "volume",
    "number",
    "pages",
  ];

  const fileContents: string = fs
    .readFileSync("app/(main)/publications/pubs.bibtex")
    .toString();
  const bibs = Object.values(parseString(fileContents)["entries"]) as object[];

  const parsed_results: Entry[] = [];

  bibs.forEach((entry: object) => {
    const parsedEntry: Entry = {};

    const fields: RawField[] = Object.entries(entry["fields"]).map(
      ([key, val]) => {
        return { name: key, data: val } as RawField;
      },
    );

    fields.forEach((entry: RawField) => {
      if (focal_fields.includes(entry.name)) {
        parsedEntry[entry.name] = entry.data._unicode;
      }
    });

    parsed_results.push(parsedEntry);
  });

  // Sort by year descending
  parsed_results.sort((a, b) => {
    const yearA = parseInt(a.year || "0");
    const yearB = parseInt(b.year || "0");
    return yearB - yearA;
  });

  return parsed_results;
}

function highlightAuthor(authorString: string) {
  // Bold "Gibson" occurrences
  const parts = authorString.split(/(Gibson,?\s*(?:Matthew\s*(?:JS|J\.?S\.?)?|Matt)?)/i);
  return parts.map((part, i) => {
    if (/Gibson/i.test(part)) {
      return (
        <span key={i} className="font-semibold text-neutral-900 dark:text-neutral-100">
          {part}
        </span>
      );
    }
    return part;
  });
}

function buildCitation(entry: Entry) {
  const parts: string[] = [];
  if (entry.volume) parts.push(entry.volume);
  if (entry.number) parts.push(`(${entry.number})`);
  if (entry.pages) parts.push(`: ${entry.pages}`);
  return parts.join("");
}

export async function Publications() {
  const bibs: Entry[] = parseBibs();

  return (
    <section className="space-y-2">
      {bibs.map((entry, i) => {
        const citation = buildCitation(entry);

        const inner = (
          <div className="py-3.5 px-4 -mx-4 rounded-lg">
            <div className="flex items-baseline gap-3 mb-1.5">
              <span className="text-2xl font-bold text-neutral-200 dark:text-neutral-700 select-none leading-none">
                {entry.year}
              </span>
              <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100 leading-snug">
                {entry.title}
              </h3>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed ml-[calc(2ch+0.75rem)]">
              {highlightAuthor(entry.author || "")}
            </p>
            {entry.journal && (
              <p className="text-sm mt-1 ml-[calc(2ch+0.75rem)]">
                <span className="italic text-neutral-400 dark:text-neutral-500">
                  {entry.journal}
                </span>
                {citation && (
                  <span className="text-neutral-400 dark:text-neutral-600">
                    {" "}
                    {citation}
                  </span>
                )}
              </p>
            )}
          </div>
        );

        if (entry.url) {
          return (
            <a
              key={i}
              href={entry.url}
              className="block group hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-lg transition-colors"
            >
              {inner}
            </a>
          );
        }

        return (
          <div key={i}>
            {inner}
          </div>
        );
      })}
    </section>
  );
}
