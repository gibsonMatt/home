import { Resources } from "app/components/resources";

export const metadata = {
  title: "Matt | Resources",
  description: "Resources",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Resources
      </h1>
      <Resources />
    </section>
  );
}
