export default function Page() {
  return (
    <section>
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        <figure className="flex-shrink-0">
          <img
            className="w-48 md:w-56 rounded-2xl shadow-lg shadow-neutral-200/50 dark:shadow-neutral-900/50"
            src="/pic.png"
            alt="Matt Gibson"
            width="384"
            height="512"
          />
        </figure>

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Matt Gibson
          </h1>
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
            Bioinformatics Engineer · Eli Lilly
          </p>
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <p>
              I work as a bioinformatics engineer at the{" "}
              <a
                className="underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-2 hover:decoration-blue-500 dark:hover:decoration-blue-400 transition-colors"
                href="https://lilly.com"
              >
                Lilly Omics Hub
              </a>
              . I have a PhD in Evolutionary Genetics and Bioinformatics from
              Indiana University, where I worked with{" "}
              <a
                className="underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-2 hover:decoration-blue-500 dark:hover:decoration-blue-400 transition-colors"
                href="https://moylelab.sitehost.iu.edu/"
              >
                Leonie Moyle
              </a>
              .
            </p>
            <p>
              I am interested in evolution, population genetics, and developing
              computational solutions to complex biological problems. I have
              published on landscape genetics, population genomics of invasive
              species, phylogenetic inference, molecular evolution, imputation,
              and low pass sequencing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
