import { PortfolioItems } from "app/components/portfolio";

export const metadata = {
  title: "Matt Gibson | Portfolio",
  description: "Portfolio",
};

export default function Page() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Portfolio</h1>
      <PortfolioItems />
    </section>
  );
}
