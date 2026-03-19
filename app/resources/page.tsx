import { Resources } from "app/components/resources";

export const metadata = {
  title: "Matt Gibson | Resources",
  description: "Resources",
};

export default function Page() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Resources</h1>
      <Resources />
    </section>
  );
}
