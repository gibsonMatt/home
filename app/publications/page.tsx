import { Publications } from "app/components/pubs";
 

export const metadata = {
  title: "Matt | Publications",
  description: "Publications",
};

 


export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Publications
      </h1>
      <Publications />
    </section>
  );
}
