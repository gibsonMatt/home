import { Publications } from "app/(main)/components/pubs";

export const metadata = {
  title: "Matt Gibson | Publications",
  description: "Publications",
};

export default function Page() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">
        Publications
      </h1>
      <Publications />
    </section>
  );
}
