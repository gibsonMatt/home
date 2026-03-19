// Research universe data — nodes and links for the force-directed graph
// Built from a deep read of Matt Gibson's publications, code, and CV

export type NodeType =
  | "paper"
  | "organism"
  | "method"
  | "theme"
  | "collaborator"
  | "tool"
  | "location";

export interface ResearchNode {
  id: string;
  label: string;
  type: NodeType;
  year?: number;
  detail?: string;
  url?: string;
  size?: number; // visual weight
}

export interface ResearchLink {
  source: string;
  target: string;
  strength?: number;
}

export const nodes: ResearchNode[] = [
  // ─── Papers (first-author or major contribution) ───
  {
    id: "gibson2021elife",
    label: "Introgression shapes fruit color convergence",
    type: "paper",
    year: 2021,
    detail:
      "Reconstructed the invasion history of S. pimpinellifolium on the Galápagos. Discovered that orange fruit color in invasive populations arose independently via introgression at CYC-B and PSY1.",
    url: "https://doi.org/10.7554/eLife.64165",
    size: 14,
  },
  {
    id: "gibson2020molec",
    label: "Regional abiotic divergence in wild tomato",
    type: "paper",
    year: 2020,
    detail:
      "ddRAD sequencing of S. pimpinellifolium across its range. Showed that regional abiotic environment drives genomic divergence — a landscape genomics approach.",
    url: "https://doi.org/10.1111/mec.15477",
    size: 12,
  },
  {
    id: "gibson2020ajb",
    label: "Mating system & paternity in Tolpis",
    type: "paper",
    year: 2020,
    detail:
      "Used genome-wide genotyping to estimate mating system parameters and paternity in the island endemic Tolpis succulenta from Madeira.",
    url: "https://doi.org/10.1002/ajb2.1515",
    size: 10,
  },
  {
    id: "gibson2020extirpation",
    label: "Local extirpation in Galápagos tomatoes",
    type: "paper",
    year: 2020,
    detail:
      "Historical surveys revealing pervasive local extinction among endemic Galápagos tomato populations — conservation implications for island endemics.",
    url: "https://doi.org/10.1007/s10682-020-10035-3",
    size: 9,
  },
  {
    id: "gibson2022phd",
    label: "PhD Dissertation",
    type: "paper",
    year: 2022,
    detail:
      "Genetic Investigations of Adaptation, Invasion, and Phenotypic Convergence in S. pimpinellifolium. Indiana University.",
    url: "https://www.proquest.com/openview/57752be2bc41ac57911d2711fe0f501a/1",
    size: 13,
  },
  {
    id: "hibbins2020elife",
    label: "Probability of hemiplasy",
    type: "paper",
    year: 2020,
    detail:
      "Derived analytical framework and built HeIST software to determine hemiplasy probability under ILS + introgression. Applied to green-blooded lizards and Heliconius butterflies.",
    url: "https://doi.org/10.7554/eLife.63753",
    size: 11,
  },
  {
    id: "moyle2021frontiers",
    label: "Reproductive protein evolution in Solanum",
    type: "paper",
    year: 2021,
    detail:
      "Female reproductive proteins evolve faster than vegetative ones across wild tomato species. Tissue-specificity, not ploidy, drives rate acceleration.",
    size: 9,
  },
  {
    id: "kostyun2019",
    label: "Genetic architecture of floral evolution",
    type: "paper",
    year: 2019,
    detail:
      "Simple genetic architecture enables rapid floral diversification in Jaltomata — a genus closely related to tomatoes.",
    url: "https://doi.org/10.1111/nph.15844",
    size: 8,
  },
  {
    id: "kerbs2017",
    label: "Hybridization in Tolpis",
    type: "paper",
    year: 2017,
    detail:
      "Synthetic interspecific hybrids reveal the potential role of hybridization in diversification of an insular plant lineage (Tolpis, Canary Islands).",
    url: "https://doi.org/10.1093/aobpla/plx043",
    size: 7,
  },
  {
    id: "jewell2020",
    label: "Postmating reproductive barriers",
    type: "paper",
    year: 2020,
    detail:
      "Intraspecific genetic variation underlies postmating barriers between wild tomato species.",
    url: "https://doi.org/10.1093/jhered/esaa003",
    size: 8,
  },
  {
    id: "biewer2025",
    label: "Gene expression & pollen performance",
    type: "paper",
    year: 2025,
    detail:
      "Gene expression and pollen performance indicate altered postmating selection between Solanum species with different mating systems.",
    url: "https://academic.oup.com/g3journal/article/15/7/jkaf107/8132832",
    size: 8,
  },
  {
    id: "torres2023",
    label: "Endemic–invasive interactions in Galápagos",
    type: "paper",
    year: 2023,
    detail:
      "Book chapter unravelling interactions between endemic and invasive plant species in the Galápagos Islands.",
    url: "https://doi.org/10.1007/978-3-031-28089-4_12",
    size: 7,
  },
  {
    id: "li2023",
    label: "Reference panel perturbations & imputation",
    type: "paper",
    year: 2023,
    detail:
      "Effects of reference panel composition on genotype imputation accuracy — foundational work for low-pass sequencing at Gencove.",
    url: "https://doi.org/10.1101/2023.08.10.552684",
    size: 9,
  },
  {
    id: "stewart2024",
    label: "Low-cost library prep for lcWGS",
    type: "paper",
    year: 2024,
    detail:
      "Compared four library prep kits for low-coverage sequencing. Miniaturized protocols reduce cost 83% while maintaining imputation quality.",
    url: "https://doi.org/10.1101/2024.01.30.578044",
    size: 9,
  },

  // ─── Organisms ───
  {
    id: "s_pimpinellifolium",
    label: "S. pimpinellifolium",
    type: "organism",
    detail: "Wild red-fruited tomato — the closest wild relative of cultivated tomato. Central to Matt's PhD work on invasion and adaptation.",
    size: 13,
  },
  {
    id: "s_cheesmaniae",
    label: "S. cheesmaniae",
    type: "organism",
    detail: "Yellow/orange-fruited endemic Galápagos tomato. Hybridizes with invasive S. pimpinellifolium.",
    size: 9,
  },
  {
    id: "s_galapagense",
    label: "S. galapagense",
    type: "organism",
    detail: "Orange-fruited Galápagos endemic tomato.",
    size: 8,
  },
  {
    id: "tolpis",
    label: "Tolpis",
    type: "organism",
    detail: "Island endemic plant genus (Canary Islands, Madeira). Studied for mating systems and hybridization.",
    size: 7,
  },
  {
    id: "jaltomata",
    label: "Jaltomata",
    type: "organism",
    detail: "Diverse genus in the tomato family with rapid floral diversification.",
    size: 6,
  },
  {
    id: "heliconius",
    label: "Heliconius butterflies",
    type: "organism",
    detail: "Wing color evolution and chromosomal inversions shared via introgression.",
    size: 6,
  },
  {
    id: "prasinohaema",
    label: "Prasinohaema lizards",
    type: "organism",
    detail: "Green-blooded New Guinea lizards — hemiplasy analysis reduced inferred trait origins from 4 to 1–2.",
    size: 6,
  },

  // ─── Methods ───
  {
    id: "ddrad",
    label: "ddRAD-seq",
    type: "method",
    detail: "Double-digest restriction-associated DNA sequencing for reduced-representation genomics.",
    size: 8,
  },
  {
    id: "hmm",
    label: "Hidden Markov Models",
    type: "method",
    detail: "Local ancestry inference via HMM across 100kb genomic windows.",
    size: 8,
  },
  {
    id: "dadi",
    label: "δaδi demographic modeling",
    type: "method",
    detail: "Diffusion approximation for demographic inference from site frequency spectra.",
    size: 7,
  },
  {
    id: "coalescent_sim",
    label: "Coalescent simulation",
    type: "method",
    detail: "ms / msprime simulations for modeling gene tree discordance under ILS and introgression.",
    size: 7,
  },
  {
    id: "lcwgs",
    label: "Low-pass WGS",
    type: "method",
    detail: "Low-coverage whole-genome sequencing (~0.5X) combined with imputation — cheaper than arrays with comparable accuracy.",
    size: 9,
  },
  {
    id: "imputation",
    label: "Genotype imputation",
    type: "method",
    detail: "GLIMPSE, Beagle — statistical inference of missing genotypes from reference haplotype panels.",
    size: 8,
  },
  {
    id: "admixture_mapping",
    label: "Admixture mapping",
    type: "method",
    detail: "Associating local ancestry with phenotype to find introgressed adaptive alleles.",
    size: 7,
  },
  {
    id: "phylogenetics",
    label: "Phylogenetic inference",
    type: "method",
    detail: "RAxML, ASTRAL, IQ-TREE — species tree estimation from multilocus data.",
    size: 7,
  },
  {
    id: "rnaseq",
    label: "RNA-seq",
    type: "method",
    detail: "Transcriptomic profiling across tissues for evolutionary rate analysis.",
    size: 6,
  },

  // ─── Themes ───
  {
    id: "theme_invasion",
    label: "Biological invasion",
    type: "theme",
    detail: "How invasive species establish, adapt, and hybridize with natives — especially on islands.",
    size: 10,
  },
  {
    id: "theme_introgression",
    label: "Introgression & hybridization",
    type: "theme",
    detail: "Gene flow between species as a source of adaptive variation and phenotypic novelty.",
    size: 11,
  },
  {
    id: "theme_convergence",
    label: "Phenotypic convergence",
    type: "theme",
    detail: "Apparent convergent evolution that may actually be hemiplasy (shared ancestry) or introgression.",
    size: 9,
  },
  {
    id: "theme_island_bio",
    label: "Island biogeography",
    type: "theme",
    detail: "Galápagos, Canary Islands, Madeira — evolution and conservation on volcanic islands.",
    size: 9,
  },
  {
    id: "theme_speciation",
    label: "Speciation & reproductive isolation",
    type: "theme",
    detail: "Mechanisms driving species divergence — mating systems, reproductive proteins, postmating barriers.",
    size: 9,
  },
  {
    id: "theme_popgen",
    label: "Population genomics",
    type: "theme",
    detail: "Genome-wide patterns of diversity, divergence, and selection in natural populations.",
    size: 10,
  },
  {
    id: "theme_lowpass",
    label: "Low-pass sequencing revolution",
    type: "theme",
    detail: "Making whole-genome data accessible at array-like costs for GWAS, PRS, and biobanks.",
    size: 9,
  },

  // ─── Locations ───
  {
    id: "galapagos",
    label: "Galápagos Islands",
    type: "location",
    detail: "San Cristóbal, Santa Cruz, Isabela — field sites for endemic and invasive tomato research.",
    size: 11,
  },
  {
    id: "ecuador",
    label: "Ecuador & Peru",
    type: "location",
    detail: "Source populations for invasive S. pimpinellifolium — traced to southcentral Ecuador.",
    size: 7,
  },
  {
    id: "canary_islands",
    label: "Canary Islands",
    type: "location",
    detail: "Tolpis hybridization and diversification studies.",
    size: 6,
  },
  {
    id: "indiana_u",
    label: "Indiana University",
    type: "location",
    detail: "PhD institution — Moyle Lab, Department of Biology.",
    size: 7,
  },

  // ─── Tools (software) ───
  {
    id: "heist",
    label: "HeIST",
    type: "tool",
    detail: "Hemiplasy Inference Simulation Tool — Python CLI for estimating hemiplasy probability on phylogenies.",
    url: "https://github.com/mhibbins/HeIST",
    size: 9,
  },
  {
    id: "stacks_pairwise",
    label: "stacks-pairwise",
    type: "tool",
    detail: "Utility for calculating pairwise divergence across RAD tags from STACKS output.",
    url: "https://github.com/gibsonMatt/stacks-pairwise",
    size: 6,
  },
  {
    id: "bioneer",
    label: "bioneer",
    type: "tool",
    detail: "LLM-powered tool for getting the right bcftools command.",
    url: "https://github.com/gibsonMatt/bioneer",
    size: 6,
  },

  // ─── Key collaborators ───
  {
    id: "moyle",
    label: "Leonie C. Moyle",
    type: "collaborator",
    detail: "PhD advisor at Indiana University. Speciation, reproductive isolation, and tomato evolution.",
    url: "https://scholar.google.com/citations?user=vAGq4TAAAAAJ&hl=en",
    size: 12,
  },
  {
    id: "hibbins",
    label: "Mark S. Hibbins",
    type: "collaborator",
    detail: "Hemiplasy and phylogenomics — co-developer of HeIST.",
    size: 7,
  },
  {
    id: "torres",
    label: "María de Lourdes Torres",
    type: "collaborator",
    detail: "Galápagos field research and endemic plant conservation.",
    size: 7,
  },
  {
    id: "brandvain",
    label: "Yaniv Brandvain",
    type: "collaborator",
    detail: "Population genetics theory, introgression, and mating system evolution.",
    size: 6,
  },
  {
    id: "crawford",
    label: "Daniel J. Crawford",
    type: "collaborator",
    detail: "Island plant systematics — Tolpis and Canary Islands.",
    size: 6,
  },
  {
    id: "li_jeremiah",
    label: "Jeremiah H. Li",
    type: "collaborator",
    detail: "Imputation methods and reference panel optimization at Gencove.",
    size: 6,
  },
];

export const links: ResearchLink[] = [
  // ─── Gibson 2021 eLife (Galápagos invasion) ───
  { source: "gibson2021elife", target: "s_pimpinellifolium", strength: 1 },
  { source: "gibson2021elife", target: "s_cheesmaniae", strength: 1 },
  { source: "gibson2021elife", target: "s_galapagense", strength: 0.5 },
  { source: "gibson2021elife", target: "galapagos", strength: 1 },
  { source: "gibson2021elife", target: "ecuador", strength: 0.7 },
  { source: "gibson2021elife", target: "ddrad", strength: 1 },
  { source: "gibson2021elife", target: "hmm", strength: 1 },
  { source: "gibson2021elife", target: "dadi", strength: 0.8 },
  { source: "gibson2021elife", target: "admixture_mapping", strength: 1 },
  { source: "gibson2021elife", target: "theme_invasion", strength: 1 },
  { source: "gibson2021elife", target: "theme_introgression", strength: 1 },
  { source: "gibson2021elife", target: "theme_convergence", strength: 1 },
  { source: "gibson2021elife", target: "theme_island_bio", strength: 0.8 },
  { source: "gibson2021elife", target: "moyle", strength: 1 },
  { source: "gibson2021elife", target: "torres", strength: 1 },
  { source: "gibson2021elife", target: "brandvain", strength: 0.8 },

  // ─── Gibson 2020 Mol Ecol (landscape genomics) ───
  { source: "gibson2020molec", target: "s_pimpinellifolium", strength: 1 },
  { source: "gibson2020molec", target: "ddrad", strength: 1 },
  { source: "gibson2020molec", target: "theme_popgen", strength: 1 },
  { source: "gibson2020molec", target: "ecuador", strength: 0.8 },
  { source: "gibson2020molec", target: "moyle", strength: 1 },

  // ─── Gibson 2020 AJB (Tolpis mating system) ───
  { source: "gibson2020ajb", target: "tolpis", strength: 1 },
  { source: "gibson2020ajb", target: "theme_speciation", strength: 0.7 },
  { source: "gibson2020ajb", target: "canary_islands", strength: 0.8 },
  { source: "gibson2020ajb", target: "crawford", strength: 1 },

  // ─── Gibson 2020 extirpation ───
  { source: "gibson2020extirpation", target: "galapagos", strength: 1 },
  { source: "gibson2020extirpation", target: "s_cheesmaniae", strength: 0.8 },
  { source: "gibson2020extirpation", target: "s_galapagense", strength: 0.8 },
  { source: "gibson2020extirpation", target: "theme_island_bio", strength: 1 },
  { source: "gibson2020extirpation", target: "torres", strength: 1 },
  { source: "gibson2020extirpation", target: "moyle", strength: 0.8 },

  // ─── PhD dissertation ───
  { source: "gibson2022phd", target: "s_pimpinellifolium", strength: 1 },
  { source: "gibson2022phd", target: "galapagos", strength: 1 },
  { source: "gibson2022phd", target: "theme_invasion", strength: 1 },
  { source: "gibson2022phd", target: "theme_introgression", strength: 1 },
  { source: "gibson2022phd", target: "theme_convergence", strength: 1 },
  { source: "gibson2022phd", target: "indiana_u", strength: 1 },
  { source: "gibson2022phd", target: "moyle", strength: 1 },

  // ─── Hibbins 2020 eLife (hemiplasy) ───
  { source: "hibbins2020elife", target: "heist", strength: 1 },
  { source: "hibbins2020elife", target: "coalescent_sim", strength: 1 },
  { source: "hibbins2020elife", target: "phylogenetics", strength: 1 },
  { source: "hibbins2020elife", target: "theme_convergence", strength: 1 },
  { source: "hibbins2020elife", target: "theme_introgression", strength: 0.8 },
  { source: "hibbins2020elife", target: "heliconius", strength: 0.8 },
  { source: "hibbins2020elife", target: "prasinohaema", strength: 0.8 },
  { source: "hibbins2020elife", target: "hibbins", strength: 1 },

  // ─── Moyle 2021 Frontiers (reproductive proteins) ───
  { source: "moyle2021frontiers", target: "rnaseq", strength: 1 },
  { source: "moyle2021frontiers", target: "theme_speciation", strength: 1 },
  { source: "moyle2021frontiers", target: "moyle", strength: 1 },

  // ─── Kostyun 2019 (Jaltomata floral evolution) ───
  { source: "kostyun2019", target: "jaltomata", strength: 1 },
  { source: "kostyun2019", target: "theme_speciation", strength: 0.8 },
  { source: "kostyun2019", target: "moyle", strength: 0.8 },

  // ─── Kerbs 2017 (Tolpis hybridization) ───
  { source: "kerbs2017", target: "tolpis", strength: 1 },
  { source: "kerbs2017", target: "canary_islands", strength: 1 },
  { source: "kerbs2017", target: "theme_introgression", strength: 0.7 },
  { source: "kerbs2017", target: "crawford", strength: 1 },

  // ─── Jewell 2020 (reproductive barriers) ───
  { source: "jewell2020", target: "theme_speciation", strength: 1 },
  { source: "jewell2020", target: "moyle", strength: 0.8 },

  // ─── Biewer-Heisler 2025 (pollen performance) ───
  { source: "biewer2025", target: "theme_speciation", strength: 1 },
  { source: "biewer2025", target: "moyle", strength: 0.8 },

  // ─── Torres 2023 (Galápagos chapter) ───
  { source: "torres2023", target: "galapagos", strength: 1 },
  { source: "torres2023", target: "theme_invasion", strength: 0.8 },
  { source: "torres2023", target: "theme_island_bio", strength: 0.8 },
  { source: "torres2023", target: "torres", strength: 1 },
  { source: "torres2023", target: "moyle", strength: 0.6 },

  // ─── Li 2023 (imputation reference panels) ───
  { source: "li2023", target: "imputation", strength: 1 },
  { source: "li2023", target: "lcwgs", strength: 0.8 },
  { source: "li2023", target: "theme_lowpass", strength: 1 },
  { source: "li2023", target: "li_jeremiah", strength: 1 },

  // ─── Stewart 2024 (library prep comparison) ───
  { source: "stewart2024", target: "lcwgs", strength: 1 },
  { source: "stewart2024", target: "imputation", strength: 0.8 },
  { source: "stewart2024", target: "theme_lowpass", strength: 1 },
  { source: "stewart2024", target: "li_jeremiah", strength: 0.7 },

  // ─── Tool connections ───
  { source: "heist", target: "coalescent_sim", strength: 0.8 },
  { source: "heist", target: "hibbins", strength: 0.8 },
  { source: "stacks_pairwise", target: "ddrad", strength: 0.7 },

  // ─── Cross-theme connections ───
  { source: "theme_introgression", target: "theme_convergence", strength: 0.6 },
  { source: "theme_invasion", target: "theme_island_bio", strength: 0.6 },
  { source: "theme_popgen", target: "theme_speciation", strength: 0.4 },
  { source: "lcwgs", target: "imputation", strength: 0.8 },

  // ─── Indiana University hub ───
  { source: "moyle", target: "indiana_u", strength: 0.8 },
];
