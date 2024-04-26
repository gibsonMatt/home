type PortfolioItem = {
  name: string;
  link: string;
  description?: string;
};

export const portfolio_data: PortfolioItem[] = [

  {
    name: "Portfolio website",
    link: "https://github.com/gibsonMatt/home",
    description: "My personal website, written in TypeScript with Next.js"
  },
  {
    name: "HeIST",
    link: "https://github.com/mhibbins/HeIST",
    description: "Hemiplasy Inference Simulation Tool: a Python CLI for estimating the probability of hemiplasy in a phylogenentic species tree with branch lengths and categorical traits"
  },
  {
    name: "stacks-pairwise",
    link: "https://github.com/gibsonMatt/stacks-pairwise",
    description: "A utility for accurately calculating pairwise divergence between samples across RAD tags in STACKS output"

  },
  {
    name: "mvnselection",
    link: "https://gibsonmatt.shinyapps.io/mvnselection/",
    description: "R Shiny app for simulating allele frequency divergence using a multivariate normal"
  },
  {
    name: "prettymap",
    link: "https://gibsonmatt.shinyapps.io/prettymap/",
    description: "R Shiny app for making publication quality maps"
  },
];
