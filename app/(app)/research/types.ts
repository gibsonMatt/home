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
