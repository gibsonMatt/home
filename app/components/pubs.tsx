import Link from "next/link";
import { NewsStory, news_items } from "app/news/news_data";

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
    <section className="text-neutral-900 dark:text-neutral-100 tracking-tight">
      {bibs.map((entry) => {
        return (
          <div>
            {!entry.url && (
              <div className="pb-4 hover:text-sky-400">
                {entry.author}. <span className="font-bold">{entry.year}</span>.{" "}
                {entry.title}. <span className="italic">{entry.journal}</span>
              </div>
            )}
            {entry.url && (
              <div className="pb-4 hover:text-sky-400">
                <a href={entry.url}>
                  {entry.author}.{" "}
                  <span className="font-bold">{entry.year}</span>. {entry.title}
                  . <span className="italic">{entry.journal}</span>
                </a>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
