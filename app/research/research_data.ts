// Research universe data — nodes and links for the force-directed graph
// Built from deep reading of Matt Gibson's publications, code, CV,
// and enriched via sub-agent research across Wikipedia, Google Scholar,
// and Wikimedia Commons.

export type NodeType =
  | "paper"
  | "organism"
  | "method"
  | "theme"
  | "collaborator"
  | "tool"
  | "location";

export interface ExternalLink {
  label: string;
  url: string;
}

export interface ResearchNode {
  id: string;
  label: string;
  type: NodeType;
  year?: number;
  detail?: string;
  url?: string;
  size?: number;
  image?: string;
  imageCredit?: string;
  taxonomy?: string;
  abstract?: string;
  externalLinks?: ExternalLink[];
}

export interface ResearchLink {
  source: string;
  target: string;
  strength?: number;
}

export const nodes: ResearchNode[] = [
  // ═══════════════════════════════════════════════
  // PAPERS
  // ═══════════════════════════════════════════════
  {
    id: "gibson2021elife",
    label: "Introgression shapes fruit color convergence",
    type: "paper",
    year: 2021,
    detail:
      "Reconstructed the invasion history of S. pimpinellifolium on the Galápagos. Discovered that orange fruit color in invasive populations arose independently via introgression at CYC-B and PSY1 — two different carotenoid pathway genes.",
    abstract:
      "Using ddRAD sequencing of 300+ individuals, demographic modeling, and a custom HMM for local ancestry, we traced the Galápagos invasion to a single introduction from southcentral Ecuador ~200 generations ago. Admixture mapping revealed two independent molecular mechanisms for fruit color convergence, both acquired via introgression from the endemic S. cheesmaniae.",
    url: "https://doi.org/10.7554/eLife.64165",
    size: 14,
    externalLinks: [
      { label: "eLife (open access)", url: "https://doi.org/10.7554/eLife.64165" },
      { label: "GitHub: galtom", url: "https://github.com/gibsonMatt/galtom" },
    ],
  },
  {
    id: "gibson2020molec",
    label: "Regional abiotic divergence in wild tomato",
    type: "paper",
    year: 2020,
    detail:
      "ddRAD sequencing of S. pimpinellifolium across its native range in Ecuador and Peru. Demonstrated that regional differences in the abiotic environment drive genomic divergence — a landscape genomics approach.",
    url: "https://doi.org/10.1111/mec.15477",
    size: 12,
    externalLinks: [
      { label: "Molecular Ecology", url: "https://doi.org/10.1111/mec.15477" },
      { label: "GitHub: pimpGEA", url: "https://github.com/gibsonMatt/pimpGEA" },
    ],
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
    externalLinks: [
      { label: "American Journal of Botany", url: "https://doi.org/10.1002/ajb2.1515" },
    ],
  },
  {
    id: "gibson2020extirpation",
    label: "Local extirpation in Galápagos tomatoes",
    type: "paper",
    year: 2020,
    detail:
      "Historical surveys revealing pervasive local extinction among endemic Galápagos tomato populations. Conservation implications for island endemics threatened by invasive species.",
    url: "https://doi.org/10.1007/s10682-020-10035-3",
    size: 9,
    externalLinks: [
      { label: "Evolutionary Ecology", url: "https://doi.org/10.1007/s10682-020-10035-3" },
    ],
  },
  {
    id: "gibson2022phd",
    label: "PhD Dissertation",
    type: "paper",
    year: 2022,
    detail:
      "Genetic Investigations of Adaptation, Invasion, and Phenotypic Convergence in S. pimpinellifolium. Dissertation defended at Indiana University.",
    url: "https://www.proquest.com/openview/57752be2bc41ac57911d2711fe0f501a/1",
    size: 13,
    externalLinks: [
      { label: "ProQuest", url: "https://www.proquest.com/openview/57752be2bc41ac57911d2711fe0f501a/1" },
    ],
  },
  {
    id: "hibbins2020elife",
    label: "Probability of hemiplasy",
    type: "paper",
    year: 2020,
    detail:
      "Derived an analytical framework and built HeIST software to determine hemiplasy probability under ILS + introgression. Applied to green-blooded lizards (reduced inferred origins from 4 to 1–2) and Heliconius butterflies (inversion likely arose once, not twice).",
    abstract:
      "We extended the multispecies network coalescent to model hemiplasy under both incomplete lineage sorting and introgression. Our simulation tool HeIST uses coalescent and sequence simulation to estimate the number of trait transitions on large phylogenies.",
    url: "https://doi.org/10.7554/eLife.63753",
    size: 11,
    externalLinks: [
      { label: "eLife (open access)", url: "https://doi.org/10.7554/eLife.63753" },
      { label: "GitHub: HeIST", url: "https://github.com/mhibbins/HeIST" },
    ],
  },
  {
    id: "moyle2021frontiers",
    label: "Reproductive protein evolution in Solanum",
    type: "paper",
    year: 2021,
    detail:
      "Female reproductive proteins evolve faster than vegetative ones across wild tomato species. Tissue-specificity — not ploidy — drives rate acceleration. Female-expressed loci show the strongest signal of positive selection.",
    abstract:
      "Using RNAseq from 9 tissue types across 4 Solanum species, we classified ~21,000 loci by expression domain and estimated protein evolutionary rates (dN/dS). Reproductive proteins show elevated dN/dS, driven primarily by female-specific (style, ovule) loci.",
    size: 9,
    externalLinks: [
      { label: "Frontiers in Plant Science", url: "https://doi.org/10.3389/fpls.2021.635990" },
    ],
  },
  {
    id: "kostyun2019",
    label: "Genetic architecture of floral evolution",
    type: "paper",
    year: 2019,
    detail:
      "Simple genetic architecture and low constraint enable rapid floral diversification in Jaltomata — a genus closely related to tomatoes with remarkable floral diversity.",
    url: "https://doi.org/10.1111/nph.15844",
    size: 8,
    externalLinks: [
      { label: "New Phytologist", url: "https://doi.org/10.1111/nph.15844" },
    ],
  },
  {
    id: "kerbs2017",
    label: "Hybridization in Tolpis",
    type: "paper",
    year: 2017,
    detail:
      "Synthetic interspecific hybrids reveal the potential role of hybridization in diversification of the insular plant lineage Tolpis on the Canary Islands.",
    url: "https://doi.org/10.1093/aobpla/plx043",
    size: 7,
    externalLinks: [
      { label: "AoB Plants", url: "https://doi.org/10.1093/aobpla/plx043" },
    ],
  },
  {
    id: "jewell2020",
    label: "Postmating reproductive barriers",
    type: "paper",
    year: 2020,
    detail:
      "Intraspecific genetic variation underlies postmating reproductive barriers between wild tomato species in Solanum sect. Lycopersicon.",
    url: "https://doi.org/10.1093/jhered/esaa003",
    size: 8,
    externalLinks: [
      { label: "Journal of Heredity", url: "https://doi.org/10.1093/jhered/esaa003" },
    ],
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
    externalLinks: [
      { label: "G3: Genes, Genomes, Genetics", url: "https://academic.oup.com/g3journal/article/15/7/jkaf107/8132832" },
    ],
  },
  {
    id: "torres2023",
    label: "Endemic–invasive interactions in Galápagos",
    type: "paper",
    year: 2023,
    detail:
      "Book chapter unravelling the complex interactions between endemic and invasive plant species in the Galápagos Islands.",
    url: "https://doi.org/10.1007/978-3-031-28089-4_12",
    size: 7,
    externalLinks: [
      { label: "Springer: Island Ecosystems", url: "https://doi.org/10.1007/978-3-031-28089-4_12" },
    ],
  },
  {
    id: "li2023",
    label: "Reference panel perturbations & imputation",
    type: "paper",
    year: 2023,
    detail:
      "Systematic study of how reference panel composition and perturbations affect genotype imputation accuracy — foundational for low-pass sequencing workflows at Gencove.",
    url: "https://doi.org/10.1101/2023.08.10.552684",
    size: 9,
    externalLinks: [
      { label: "bioRxiv preprint", url: "https://doi.org/10.1101/2023.08.10.552684" },
    ],
  },
  {
    id: "stewart2024",
    label: "Low-cost library prep for lcWGS",
    type: "paper",
    year: 2024,
    detail:
      "Compared four library preparation kits for low-coverage sequencing. Miniaturized protocols reduce per-sample cost by 83% while maintaining imputation quality at ~0.5X coverage.",
    abstract:
      "96 human samples prepared with 4 kits (Roche KAPA mini, Illumina DNA Prep mini, IDT full, IDT mini) and sequenced on NextSeq 2000. All achieved LOO concordance of 0.999. Illumina mini ranked highest in imputation r² across MAF bins.",
    url: "https://doi.org/10.1101/2024.01.30.578044",
    size: 9,
    externalLinks: [
      { label: "bioRxiv preprint", url: "https://doi.org/10.1101/2024.01.30.578044" },
    ],
  },

  // ═══════════════════════════════════════════════
  // ORGANISMS
  // ═══════════════════════════════════════════════
  {
    id: "s_pimpinellifolium",
    label: "S. pimpinellifolium",
    type: "organism",
    detail:
      "A wild tomato species native to Ecuador and Peru, commonly known as the currant tomato. It is the closest wild relative of the cultivated tomato and is widely used in breeding programs for disease resistance.",
    taxonomy: "Solanaceae › Solanum › S. pimpinellifolium",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Solanum_pimpinellifolium_kz05.jpg",
    imageCredit: "Krzysztof Ziarnek, Kenraiz / CC BY-SA 4.0",
    size: 13,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Solanum_pimpinellifolium" },
    ],
  },
  {
    id: "s_cheesmaniae",
    label: "S. cheesmaniae",
    type: "organism",
    detail:
      "One of two wild tomato species endemic to the Galápagos Islands. A robust perennial producing small yellow-orange fruits, typically found in rocky coastal habitats.",
    taxonomy: "Solanaceae › Solanum › S. cheesmaniae",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Solanum_cheesmaniae_santa_cruz.jpg",
    imageCredit: "Gibsonmatt / CC BY-SA 4.0",
    size: 9,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Solanum_cheesmaniae" },
    ],
  },
  {
    id: "s_galapagense",
    label: "S. galapagense",
    type: "organism",
    detail:
      "A wild tomato endemic to the Galápagos, distinguished from S. cheesmaniae by smaller, hairier orange fruits and aromatic foliage. Strongly salt-tolerant, occurring on coastal lava.",
    taxonomy: "Solanaceae › Solanum › S. galapagense",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Galapagos_tomato_in_fruit_%28Solanum_galapagense%29.jpg",
    imageCredit: "Kevin Gepford / CC BY-SA 4.0",
    size: 8,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Solanum_galapagense" },
    ],
  },
  {
    id: "tolpis",
    label: "Tolpis",
    type: "organism",
    detail:
      "A genus of flowering plants in the daisy family (Asteraceae) native to Macaronesia. Many species are endemic to the Canary Islands, making it a model for studying island adaptive radiation.",
    taxonomy: "Asteraceae › Tolpis",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Tolpis_barbata_Sebk_006.jpg",
    imageCredit: "Denis Barthel / CC BY-SA 3.0",
    size: 7,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Tolpis" },
    ],
  },
  {
    id: "jaltomata",
    label: "Jaltomata",
    type: "organism",
    detail:
      "A neotropical genus in the nightshade family and the sister genus to Solanum. Displays remarkable diversity in floral color, fruit color, and growth habit.",
    taxonomy: "Solanaceae › Jaltomata",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Jaltomata_procumbens_flower.jpg",
    imageCredit: "Carstor / CC BY-SA 3.0",
    size: 6,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Jaltomata" },
    ],
  },
  {
    id: "heliconius",
    label: "Heliconius butterflies",
    type: "organism",
    detail:
      "A genus of brush-footed butterflies (longwings) famous for Müllerian mimicry. Different species converge on identical wing patterns to signal distastefulness — a classic system for studying adaptation and speciation.",
    taxonomy: "Nymphalidae › Heliconius",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Heliconius_mimicry.png",
    imageCredit: "Meyer A, PLoS Biology 2006 / CC BY 4.0",
    size: 6,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Heliconius" },
    ],
  },
  {
    id: "prasinohaema",
    label: "Prasinohaema lizards",
    type: "organism",
    detail:
      "A genus of skinks endemic to New Guinea and the Solomon Islands with green blood caused by extreme biliverdin accumulation — 40× higher than in jaundiced humans. The adaptive significance remains debated.",
    taxonomy: "Scincidae › Prasinohaema",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Common_Green_Tree_Skink_372684315.jpg",
    imageCredit: "Z3lvs (iNaturalist) / CC BY 4.0",
    size: 6,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Prasinohaema" },
    ],
  },

  // ═══════════════════════════════════════════════
  // METHODS
  // ═══════════════════════════════════════════════
  {
    id: "ddrad",
    label: "ddRAD-seq",
    type: "method",
    detail:
      "Double-digest restriction-site associated DNA sequencing — uses two restriction enzymes to generate thousands of markers across the genome, enabling cost-effective population-level genotyping without a reference genome.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Illumina_HiSeq_2500.jpg",
    imageCredit: "Konrad Foerstner / CC0",
    size: 8,
    externalLinks: [
      { label: "Wikipedia: RAD markers", url: "https://en.wikipedia.org/wiki/Restriction_site_associated_DNA_markers" },
    ],
  },
  {
    id: "hmm",
    label: "Hidden Markov Models",
    type: "method",
    detail:
      "Statistical models used to infer local ancestry along chromosomes, modeling hidden sequences of ancestral states that give rise to observed patterns of genetic variation.",
    size: 8,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Hidden_Markov_model" },
    ],
  },
  {
    id: "dadi",
    label: "∂a∂i demographic modeling",
    type: "method",
    detail:
      "Diffusion Approximation for Demographic Inference — a Python package by Ryan Gutenkunst that fits demographic models to allele frequency spectra, inferring population sizes, divergence times, and migration.",
    size: 7,
    externalLinks: [
      { label: "Documentation", url: "https://dadi.readthedocs.io/" },
    ],
  },
  {
    id: "coalescent_sim",
    label: "Coalescent simulation",
    type: "method",
    detail:
      "Tools like ms and msprime generate gene genealogies backward in time under demographic models — a powerful framework for testing hypotheses about population history and selection.",
    size: 7,
    externalLinks: [
      { label: "Wikipedia: Coalescent theory", url: "https://en.wikipedia.org/wiki/Coalescent_theory" },
    ],
  },
  {
    id: "lcwgs",
    label: "Low-pass WGS",
    type: "method",
    detail:
      "Sequences entire genomes at very low depth (~0.5–1X), then leverages statistical imputation against reference panels to recover accurate genotypes at a fraction of the cost of high-coverage sequencing.",
    size: 9,
    externalLinks: [
      { label: "Wikipedia: WGS", url: "https://en.wikipedia.org/wiki/Whole_genome_sequencing" },
    ],
  },
  {
    id: "imputation",
    label: "Genotype imputation",
    type: "method",
    detail:
      "Uses reference haplotype panels and algorithms (GLIMPSE, Beagle) to infer unobserved genotypes from sparse data, dramatically increasing analyzable variants.",
    size: 8,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Imputation_(genetics)" },
    ],
  },
  {
    id: "admixture_mapping",
    label: "Admixture mapping",
    type: "method",
    detail:
      "Leverages the mosaic of ancestry blocks in hybrid genomes to identify regions where local ancestry correlates with phenotype, revealing loci underlying species differences.",
    size: 7,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Admixture_mapping" },
    ],
  },
  {
    id: "phylogenetics",
    label: "Phylogenetic inference",
    type: "method",
    detail:
      "Reconstructs evolutionary relationships using molecular data. Tools include RAxML, IQ-TREE, and ASTRAL for maximum likelihood, Bayesian, and coalescent-based approaches.",
    size: 7,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Computational_phylogenetics" },
    ],
  },
  {
    id: "rnaseq",
    label: "RNA-seq",
    type: "method",
    detail:
      "Transcriptomic profiling via next-generation sequencing — quantifies gene expression levels and reveals differential expression between conditions or tissues.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Summary_of_RNA-Seq.svg",
    imageCredit: "Wikimedia Commons / CC BY-SA 4.0",
    size: 6,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/RNA-Seq" },
    ],
  },

  // ═══════════════════════════════════════════════
  // THEMES
  // ═══════════════════════════════════════════════
  {
    id: "theme_invasion",
    label: "Biological invasion",
    type: "theme",
    detail:
      "How invasive species colonize new ranges, establish populations despite bottlenecks, and adapt rapidly. Genomic approaches reveal the roles of admixture and selection in invasion success.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Kudzu_on_trees_in_Atlanta%2C_Georgia.jpg",
    imageCredit: "SCEhardt / CC BY-SA 3.0",
    size: 10,
    externalLinks: [
      { label: "Wikipedia: Invasive species", url: "https://en.wikipedia.org/wiki/Invasive_species" },
    ],
  },
  {
    id: "theme_introgression",
    label: "Introgression & hybridization",
    type: "theme",
    detail:
      "The transfer of genetic material between species through hybridization and backcrossing. Can introduce adaptive variation, break down barriers, or create novel trait combinations.",
    size: 11,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Introgression" },
    ],
  },
  {
    id: "theme_convergence",
    label: "Phenotypic convergence",
    type: "theme",
    detail:
      "Similar traits evolving in different lineages — sometimes independently (homoplasy), sometimes via shared ancestry or introgression (hemiplasy). Genomic data can distinguish the two.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Darwin%27s_finches_by_Gould.jpg",
    imageCredit: "John Gould (public domain)",
    size: 9,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Convergent_evolution" },
    ],
  },
  {
    id: "theme_island_bio",
    label: "Island biogeography",
    type: "theme",
    detail:
      "How isolation, area, and distance shape species diversity and evolution on islands. Oceanic archipelagos like the Galápagos and Canary Islands are natural laboratories for speciation.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Galapagos_islands.jpg",
    imageCredit: "Public domain",
    size: 9,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Island_biogeography" },
    ],
  },
  {
    id: "theme_speciation",
    label: "Speciation & reproductive isolation",
    type: "theme",
    detail:
      "The evolutionary process by which populations diverge into distinct species through accumulation of reproductive barriers. Genomics reveals the architecture of isolation.",
    size: 9,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Speciation" },
    ],
  },
  {
    id: "theme_popgen",
    label: "Population genomics",
    type: "theme",
    detail:
      "Applies genome-wide data to study selection, drift, gene flow, and demographic history across populations — revealing forces shaping genetic variation at unprecedented resolution.",
    size: 10,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Population_genomics" },
    ],
  },
  {
    id: "theme_lowpass",
    label: "Low-pass sequencing revolution",
    type: "theme",
    detail:
      "Democratizing whole-genome analysis by enabling researchers to sequence hundreds of individuals at minimal depth and impute accurate genotypes, making large-scale population genomics accessible.",
    size: 9,
    externalLinks: [
      { label: "Wikipedia: WGS", url: "https://en.wikipedia.org/wiki/Whole_genome_sequencing" },
    ],
  },

  // ═══════════════════════════════════════════════
  // LOCATIONS
  // ═══════════════════════════════════════════════
  {
    id: "galapagos",
    label: "Galápagos Islands",
    type: "location",
    detail:
      "Volcanic archipelago ~1,000 km off Ecuador. Field sites on San Cristóbal, Santa Cruz, and Isabela for endemic and invasive tomato research.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Galapagos_islands.jpg",
    imageCredit: "Public domain",
    size: 11,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Gal%C3%A1pagos_Islands" },
    ],
  },
  {
    id: "ecuador",
    label: "Ecuador & Peru",
    type: "location",
    detail:
      "Native range of S. pimpinellifolium. Populations from coastal Ecuador (Los Ríos/Guayas near Guayaquil) are the source of the Galápagos invasion.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg",
    imageCredit: "Blue Marble / CC BY 3.0",
    size: 7,
    externalLinks: [
      { label: "Wikipedia: Ecuador", url: "https://en.wikipedia.org/wiki/Ecuador" },
    ],
  },
  {
    id: "canary_islands",
    label: "Canary Islands",
    type: "location",
    detail:
      "Spanish archipelago off northwest Africa. Primary field system for Tolpis adaptive radiation research.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Teide_Tenerife.jpg",
    imageCredit: "Edub / GFDL",
    size: 6,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Canary_Islands" },
    ],
  },
  {
    id: "indiana_u",
    label: "Indiana University",
    type: "location",
    detail:
      "Matt's PhD institution. Home of the Moyle Lab in the Department of Biology.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Indiana_University_Bloomington_-_panoramio_%2812%29.jpg",
    imageCredit: "Panoramio / CC BY 3.0",
    size: 7,
    externalLinks: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Indiana_University_Bloomington" },
      { label: "Moyle Lab", url: "https://biology.indiana.edu/about/faculty/moyle-leonie.html" },
    ],
  },

  // ═══════════════════════════════════════════════
  // TOOLS (software)
  // ═══════════════════════════════════════════════
  {
    id: "heist",
    label: "HeIST",
    type: "tool",
    detail:
      "Hemiplasy Inference Simulation Tool — Python CLI that uses coalescent + sequence simulation to estimate hemiplasy probability on phylogenies with ILS and introgression.",
    url: "https://github.com/mhibbins/HeIST",
    size: 9,
    externalLinks: [
      { label: "GitHub", url: "https://github.com/mhibbins/HeIST" },
      { label: "eLife paper", url: "https://doi.org/10.7554/eLife.63753" },
    ],
  },
  {
    id: "stacks_pairwise",
    label: "stacks-pairwise",
    type: "tool",
    detail:
      "Utility for accurately calculating pairwise divergence between samples across RAD tags in STACKS output.",
    url: "https://github.com/gibsonMatt/stacks-pairwise",
    size: 6,
    externalLinks: [
      { label: "GitHub", url: "https://github.com/gibsonMatt/stacks-pairwise" },
    ],
  },
  {
    id: "bioneer",
    label: "bioneer",
    type: "tool",
    detail:
      "LLM-powered tool for getting the right bcftools command — bridging natural language and bioinformatics CLI.",
    url: "https://github.com/gibsonMatt/bioneer",
    size: 6,
    externalLinks: [
      { label: "GitHub", url: "https://github.com/gibsonMatt/bioneer" },
    ],
  },

  // ═══════════════════════════════════════════════
  // COLLABORATORS
  // ═══════════════════════════════════════════════
  {
    id: "moyle",
    label: "Leonie C. Moyle",
    type: "collaborator",
    detail:
      "PhD advisor at Indiana University. Evolutionary biologist studying the genetic basis of adaptation and speciation, with a focus on reproductive isolation in wild tomatoes.",
    url: "https://scholar.google.com/citations?user=vAGq4TAAAAAJ&hl=en",
    size: 12,
    externalLinks: [
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=vAGq4TAAAAAJ&hl=en" },
      { label: "IU Faculty Page", url: "https://biology.indiana.edu/about/faculty/moyle-leonie.html" },
    ],
  },
  {
    id: "hibbins",
    label: "Mark S. Hibbins",
    type: "collaborator",
    detail:
      "Phylogenomicist at the University of Rochester developing computational methods to study hybridization, introgression, and gene tree discordance.",
    url: "https://scholar.google.com/citations?user=ntv9ciwAAAAJ&hl=en",
    size: 7,
    externalLinks: [
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=ntv9ciwAAAAJ&hl=en" },
      { label: "Lab Website", url: "https://mhibbins.github.io" },
    ],
  },
  {
    id: "torres",
    label: "María de Lourdes Torres",
    type: "collaborator",
    detail:
      "Molecular biologist at Universidad San Francisco de Quito. Conservation genetics and biodiversity in Ecuador and the Galápagos.",
    url: "https://scholar.google.com/citations?user=VT_AltYAAAAJ&hl=en",
    size: 7,
    externalLinks: [
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=VT_AltYAAAAJ&hl=en" },
    ],
  },
  {
    id: "brandvain",
    label: "Yaniv Brandvain",
    type: "collaborator",
    detail:
      "Population geneticist at the University of Minnesota integrating theory and genomics to study speciation, hybridization, and mating system evolution.",
    url: "https://scholar.google.com/citations?user=sT2i5HkAAAAJ&hl=en",
    size: 6,
    externalLinks: [
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=sT2i5HkAAAAJ&hl=en" },
      { label: "University Page", url: "https://cbs.umn.edu/directory/yaniv-brandvain" },
    ],
  },
  {
    id: "crawford",
    label: "Daniel J. Crawford",
    type: "collaborator",
    detail:
      "Plant systematist at the University of Kansas studying the origin and evolution of plants on oceanic islands, especially Asteraceae.",
    size: 6,
    externalLinks: [
      { label: "KU Biodiversity Institute", url: "https://biodiversity.ku.edu/people/dan-crawford" },
    ],
  },
  {
    id: "li_jeremiah",
    label: "Jeremiah H. Li",
    type: "collaborator",
    detail:
      "Statistical geneticist specializing in low-pass WGS, genotype imputation, and polygenic risk scores. Formerly at Gencove.",
    url: "https://scholar.google.com/citations?user=hqxUMdEAAAAJ&hl=en",
    size: 6,
    externalLinks: [
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=hqxUMdEAAAAJ&hl=en" },
      { label: "Personal Site", url: "https://hjeremyli.github.io" },
    ],
  },
];

// ═══════════════════════════════════════════════
// LINKS (edges)
// ═══════════════════════════════════════════════
export const links: ResearchLink[] = [
  // Gibson 2021 eLife (Galápagos invasion)
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

  // Gibson 2020 Mol Ecol
  { source: "gibson2020molec", target: "s_pimpinellifolium", strength: 1 },
  { source: "gibson2020molec", target: "ddrad", strength: 1 },
  { source: "gibson2020molec", target: "theme_popgen", strength: 1 },
  { source: "gibson2020molec", target: "ecuador", strength: 0.8 },
  { source: "gibson2020molec", target: "moyle", strength: 1 },

  // Gibson 2020 AJB (Tolpis)
  { source: "gibson2020ajb", target: "tolpis", strength: 1 },
  { source: "gibson2020ajb", target: "theme_speciation", strength: 0.7 },
  { source: "gibson2020ajb", target: "canary_islands", strength: 0.8 },
  { source: "gibson2020ajb", target: "crawford", strength: 1 },

  // Gibson 2020 extirpation
  { source: "gibson2020extirpation", target: "galapagos", strength: 1 },
  { source: "gibson2020extirpation", target: "s_cheesmaniae", strength: 0.8 },
  { source: "gibson2020extirpation", target: "s_galapagense", strength: 0.8 },
  { source: "gibson2020extirpation", target: "theme_island_bio", strength: 1 },
  { source: "gibson2020extirpation", target: "torres", strength: 1 },
  { source: "gibson2020extirpation", target: "moyle", strength: 0.8 },

  // PhD dissertation
  { source: "gibson2022phd", target: "s_pimpinellifolium", strength: 1 },
  { source: "gibson2022phd", target: "galapagos", strength: 1 },
  { source: "gibson2022phd", target: "theme_invasion", strength: 1 },
  { source: "gibson2022phd", target: "theme_introgression", strength: 1 },
  { source: "gibson2022phd", target: "theme_convergence", strength: 1 },
  { source: "gibson2022phd", target: "indiana_u", strength: 1 },
  { source: "gibson2022phd", target: "moyle", strength: 1 },

  // Hibbins 2020 eLife (hemiplasy)
  { source: "hibbins2020elife", target: "heist", strength: 1 },
  { source: "hibbins2020elife", target: "coalescent_sim", strength: 1 },
  { source: "hibbins2020elife", target: "phylogenetics", strength: 1 },
  { source: "hibbins2020elife", target: "theme_convergence", strength: 1 },
  { source: "hibbins2020elife", target: "theme_introgression", strength: 0.8 },
  { source: "hibbins2020elife", target: "heliconius", strength: 0.8 },
  { source: "hibbins2020elife", target: "prasinohaema", strength: 0.8 },
  { source: "hibbins2020elife", target: "hibbins", strength: 1 },

  // Moyle 2021 Frontiers
  { source: "moyle2021frontiers", target: "rnaseq", strength: 1 },
  { source: "moyle2021frontiers", target: "theme_speciation", strength: 1 },
  { source: "moyle2021frontiers", target: "moyle", strength: 1 },

  // Kostyun 2019
  { source: "kostyun2019", target: "jaltomata", strength: 1 },
  { source: "kostyun2019", target: "theme_speciation", strength: 0.8 },
  { source: "kostyun2019", target: "moyle", strength: 0.8 },

  // Kerbs 2017
  { source: "kerbs2017", target: "tolpis", strength: 1 },
  { source: "kerbs2017", target: "canary_islands", strength: 1 },
  { source: "kerbs2017", target: "theme_introgression", strength: 0.7 },
  { source: "kerbs2017", target: "crawford", strength: 1 },

  // Jewell 2020
  { source: "jewell2020", target: "theme_speciation", strength: 1 },
  { source: "jewell2020", target: "moyle", strength: 0.8 },

  // Biewer-Heisler 2025
  { source: "biewer2025", target: "theme_speciation", strength: 1 },
  { source: "biewer2025", target: "moyle", strength: 0.8 },

  // Torres 2023
  { source: "torres2023", target: "galapagos", strength: 1 },
  { source: "torres2023", target: "theme_invasion", strength: 0.8 },
  { source: "torres2023", target: "theme_island_bio", strength: 0.8 },
  { source: "torres2023", target: "torres", strength: 1 },
  { source: "torres2023", target: "moyle", strength: 0.6 },

  // Li 2023
  { source: "li2023", target: "imputation", strength: 1 },
  { source: "li2023", target: "lcwgs", strength: 0.8 },
  { source: "li2023", target: "theme_lowpass", strength: 1 },
  { source: "li2023", target: "li_jeremiah", strength: 1 },

  // Stewart 2024
  { source: "stewart2024", target: "lcwgs", strength: 1 },
  { source: "stewart2024", target: "imputation", strength: 0.8 },
  { source: "stewart2024", target: "theme_lowpass", strength: 1 },
  { source: "stewart2024", target: "li_jeremiah", strength: 0.7 },

  // Tool connections
  { source: "heist", target: "coalescent_sim", strength: 0.8 },
  { source: "heist", target: "hibbins", strength: 0.8 },
  { source: "stacks_pairwise", target: "ddrad", strength: 0.7 },

  // Cross-theme
  { source: "theme_introgression", target: "theme_convergence", strength: 0.6 },
  { source: "theme_invasion", target: "theme_island_bio", strength: 0.6 },
  { source: "theme_popgen", target: "theme_speciation", strength: 0.4 },
  { source: "lcwgs", target: "imputation", strength: 0.8 },

  // Indiana University hub
  { source: "moyle", target: "indiana_u", strength: 0.8 },
];
