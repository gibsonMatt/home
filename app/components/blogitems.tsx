import fs from "fs";
import path from "path";
import Link from "next/link";

type BlogItem = {
  title?: string;
  date?: any;
  description?: string;
  tags?: string[];
  slug?: string;
};

async function GetPosts() {}

export function getMdxSlugs(dirPath: string): string[] {
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.basename(file, ".mdx"));
}

export default async function BlogItems() {
  function compare(a: BlogItem, b: BlogItem) {
    let a_date = new Date(a.date).getTime();
    let b_date = new Date(b.date).getTime();

    if (a_date > b_date) {
      return -1;
    }
    if (a_date < b_date) {
      return 1;
    }
    return 0;
  }

  const slugs = getMdxSlugs("content");
  const objects: BlogItem[] = [];

  for (let i = 0; i < slugs.length; i++) {
    let obj: BlogItem = {};

    const mod = await import(`content/${slugs[i]}.mdx`);
    const { default: Post, meta } = mod;
    obj.title = meta.title;
    obj.description = meta.description;
    obj.date = meta.date;
    obj.tags = meta.tags;
    obj.slug = slugs[i];
    objects.push(obj);
  }

  objects.sort(compare);

  objects.forEach((story: BlogItem) => {
    const this_date_string: string = new Date(story.date).toLocaleDateString(
      "en-US",
    );
    story.date = this_date_string;
  });

  return (
    <div>
      {objects.map((post) => {
        return (
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <Link
              key={"articles/" + post.slug}
              href={"articles/" + post.slug}
              className="transition-all flex align-middle relative"
            >
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums pb-2">
                {post.date}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight hover:text-sky-300">
                {post.title}
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
