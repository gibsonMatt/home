import { Navbar } from "./components/nav";
import Footer from "./components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-black bg-white dark:text-white dark:bg-black">
      <div className="max-w-2xl mx-auto px-6 mt-12 mb-12">
        <main className="flex-auto min-w-0 flex flex-col">
          <Navbar />
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}
