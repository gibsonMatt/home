import { Publications } from "app/components/pubs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV — Matt Gibson",
  description: "Curriculum vitae for Matt Gibson, bioinformatics engineer and evolutionary geneticist.",
};

type Experience = {
  role: string;
  org: string;
  orgUrl?: string;
  location: string;
  start: string;
  end: string;
  notes?: string[];
};

type Education = {
  degree: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  year: string;
  advisor?: string;
  advisorUrl?: string;
  notes?: string[];
};

type Award = {
  title: string;
  org: string;
  year: string;
};

type Software = {
  name: string;
  link: string;
  description: string;
  language: string;
};

const experience: Experience[] = [
  {
    role: "Bioinformatics Engineer",
    org: "Eli Lilly and Company — Lilly Omics Hub",
    orgUrl: "https://lilly.com",
    location: "Indianapolis, IN",
    start: "June 2024",
    end: "Present",
    notes: [
      "Develop scalable bioinformatics pipelines and tools for multi-omics data integration.",
    ],
  },
  {
    role: "Senior Data Scientist",
    org: "Gencove",
    orgUrl: "https://gencove.com",
    location: "New York, NY (remote)",
    start: "2021",
    end: "June 2024",
    notes: [
      "Developed methods and software for low-pass sequencing, genotype imputation, and reference panel optimization.",
      "Promoted to Senior Data Scientist in January 2023.",
    ],
  },
  {
    role: "Graduate Research Associate",
    org: "Indiana University — Moyle Lab",
    orgUrl: "https://moylelab.sitehost.iu.edu/",
    location: "Bloomington, IN",
    start: "2016",
    end: "2022",
    notes: [
      "Dissertation: Genetic investigations of adaptation, invasion, and phenotypic convergence in the tomato species S. pimpinellifolium.",
      "Research focused on population genomics, landscape genetics, and molecular evolution in wild Solanum.",
      "Conducted fieldwork in the Galápagos Islands.",
    ],
  },
];

const education: Education[] = [
  {
    degree: "PhD, Evolutionary Genetics and Bioinformatics",
    institution: "Indiana University",
    institutionUrl: "https://iu.edu",
    location: "Bloomington, IN",
    year: "2022",
    advisor: "Leonie Moyle",
    advisorUrl: "https://moylelab.sitehost.iu.edu/",
  },
  {
    degree: "BA, Biology",
    institution: "University of Kansas",
    institutionUrl: "https://ku.edu",
    location: "Lawrence, KS",
    year: "2016",
  },
];

const awards: Award[] = [
  {
    title: "USDA NIFA Pre-doctoral Fellowship",
    org: "USDA National Institute of Food and Agriculture",
    year: "2021",
  },
];

const software: Software[] = [
  {
    name: "HeIST",
    link: "https://github.com/mhibbins/HeIST",
    description:
      "Hemiplasy Inference Simulation Tool: estimates the probability of hemiplasy in a phylogenetic species tree with branch lengths and categorical traits.",
    language: "Python",
  },
  {
    name: "bioneer",
    link: "https://github.com/gibsonMatt/bioneer",
    description: "LLM-powered CLI tool for generating correct bcftools commands.",
    language: "Python",
  },
  {
    name: "stacks-pairwise",
    link: "https://github.com/gibsonMatt/stacks-pairwise",
    description:
      "Utility for accurately calculating pairwise divergence between samples across RAD tags in STACKS output.",
    language: "Python",
  },
  {
    name: "mvnselection",
    link: "https://gibsonmatt.shinyapps.io/mvnselection/",
    description:
      "R Shiny app for simulating allele frequency divergence using a multivariate normal distribution.",
    language: "R",
  },
  {
    name: "prettymap",
    link: "https://gibsonmatt.shinyapps.io/prettymap/",
    description: "R Shiny app for making publication-quality maps.",
    language: "R",
  },
  {
    name: "home-dashboard",
    link: "https://github.com/gibsonMatt/home-dashboard",
    description: "Next.js server dashboard app for home media server management.",
    language: "TypeScript",
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold tracking-tight mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-1">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function CVPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter mb-1">Matt Gibson</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            Bioinformatics Engineer · Evolutionary Geneticist
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            <a
              href="https://github.com/gibsonMatt"
              className="hover:text-blue-600 transition-colors"
            >
              github.com/gibsonMatt
            </a>
            <a
              href="https://home.gibsonmatthew.com"
              className="hover:text-blue-600 transition-colors"
            >
              home.gibsonmatthew.com
            </a>
          </div>
        </div>
        <a
          href="/cv_for_web.pdf"
          className="text-sm px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          download
        >
          Download PDF
        </a>
      </div>

      {/* Research Interests */}
      <Section title="Research Interests">
        <p className="text-neutral-900 dark:text-neutral-100 leading-relaxed">
          Evolution, population genetics, and the development of computational solutions
          to complex biological problems. Published on landscape genetics, population genomics
          of invasive species, phylogenetic inference, molecular evolution, genotype imputation,
          and low-pass sequencing.
        </p>
      </Section>

      {/* Experience */}
      <Section title="Experience">
        <div className="space-y-6">
          {experience.map((e) => (
            <div key={e.role + e.org}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 mb-1">
                <span className="font-medium">
                  {e.role},{" "}
                  {e.orgUrl ? (
                    <a href={e.orgUrl} className="hover:text-blue-600 transition-colors">
                      {e.org}
                    </a>
                  ) : (
                    e.org
                  )}
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 shrink-0">
                  {e.start}–{e.end}
                </span>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">{e.location}</p>
              {e.notes && (
                <ul className="list-disc list-inside space-y-0.5 text-sm text-neutral-700 dark:text-neutral-300">
                  {e.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section title="Education">
        <div className="space-y-5">
          {education.map((e) => (
            <div key={e.degree}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 mb-0.5">
                <span className="font-medium">{e.degree}</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 shrink-0">
                  {e.year}
                </span>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {e.institutionUrl ? (
                  <a href={e.institutionUrl} className="hover:text-blue-600 transition-colors">
                    {e.institution}
                  </a>
                ) : (
                  e.institution
                )}
                {" "}· {e.location}
              </p>
              {e.advisor && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Advisor:{" "}
                  {e.advisorUrl ? (
                    <a href={e.advisorUrl} className="hover:text-blue-600 transition-colors">
                      {e.advisor}
                    </a>
                  ) : (
                    e.advisor
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Awards & Fellowships */}
      <Section title="Awards & Fellowships">
        <div className="space-y-3">
          {awards.map((a) => (
            <div key={a.title} className="flex flex-wrap justify-between gap-x-4 gap-y-0.5">
              <div>
                <span className="font-medium">{a.title}</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">, {a.org}</span>
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 shrink-0">
                {a.year}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Publications */}
      <Section title="Publications">
        <Publications />
      </Section>

      {/* Software */}
      <Section title="Software">
        <div className="space-y-3">
          {software.map((s) => (
            <div key={s.name}>
              <div className="flex flex-wrap items-baseline gap-x-2 mb-0.5">
                <a
                  href={s.link}
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  {s.name}
                </a>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  {s.language}
                </span>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
