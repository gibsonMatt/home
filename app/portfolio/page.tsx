import { PortfolioItems } from "app/components/portfolio";

export const metadata = {
  title: "Matt | Portfolio",
  description: "Portfolio",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Portfolio
      </h1>
      <PortfolioItems />
    </section>
  );
}
