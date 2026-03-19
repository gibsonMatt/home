import fs from "fs";
import { parseString } from "bibliography";

type Entry = {
  id?: string;
  title?: string;
  author?: string;
  year?: string;
  url?: string;
  journal?: string;
};

type StringValue = {
  _unicode: string;
};

type RawField = {
  name: string;
  data: StringValue;
};

function parseBibs() {
  const focal_fields: string[] = ["author", "title", "year", "journal", "url"];

  const fileContents: string = fs
    .readFileSync("app/publications/pubs.bibtex")
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

  return parsed_results;
}

export async function Publications() {
  const bibs: Entry[] = parseBibs();

  return (
    <section className="space-y-5">
      {bibs.map((entry, i) => {
        const content = (
          <>
            <span className="text-neutral-600 dark:text-neutral-400">
              {entry.author}
            </span>
            .{" "}
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {entry.year}
            </span>
            . {entry.title}.{" "}
            <span className="italic text-neutral-500 dark:text-neutral-400">
              {entry.journal}
            </span>
          </>
        );

        if (entry.url) {
          return (
            <a
              key={i}
              href={entry.url}
              className="block py-2 px-3 -mx-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors text-sm leading-relaxed group"
            >
              <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {content}
              </span>
            </a>
          );
        }

        return (
          <div
            key={i}
            className="py-2 px-3 -mx-3 text-sm leading-relaxed"
          >
            {content}
          </div>
        );
      })}
    </section>
  );
}
