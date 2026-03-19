export default function Page() {
  return (
    <section>
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <figure className="flex-shrink-0">
          <img
            className="w-48 md:w-52 rounded-2xl shadow-lg shadow-neutral-200/50 dark:shadow-neutral-900/50"
            src="/pic.png"
            alt="Matt Gibson"
            width="384"
            height="512"
          />
        </figure>

        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Matt Gibson
          </h1>
          <p className="mt-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
            Software Engineer
          </p>
          <div className="mt-6 space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <p>
              I'm a software engineer with a background in genetics and
              bioinformatics. I hold a PhD in Evolutionary Genetics from Indiana
              University, where I studied with{" "}
              <a
                className="underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-2 hover:decoration-blue-500 dark:hover:decoration-blue-400 transition-colors"
                href="https://scholar.google.com/citations?user=vAGq4TAAAAAJ&hl=en"
              >
                Leonie Moyle
              </a>
              .
            </p>
            <p>
              I build cloud infrastructure and computational pipelines at the
              intersection of biology and engineering. My work spans AWS
              platform architecture, distributed systems, and statistical
              genetics — from low-pass sequencing pipelines to enterprise data
              warehouses.
            </p>
            <p>
              I've published on population genomics, phylogenetics, molecular
              evolution, imputation, and the genetics of invasive species.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
