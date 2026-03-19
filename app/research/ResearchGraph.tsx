"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import {
  nodes as rawNodes,
  links as rawLinks,
  ResearchNode,
  ResearchLink,
  NodeType,
} from "./research_data";

const TYPE_COLORS: Record<NodeType, string> = {
  paper: "#3b82f6",
  organism: "#22c55e",
  method: "#a855f7",
  theme: "#f59e0b",
  collaborator: "#ec4899",
  tool: "#06b6d4",
  location: "#ef4444",
};

const TYPE_LABELS: Record<NodeType, string> = {
  paper: "Publications",
  organism: "Organisms",
  method: "Methods",
  theme: "Themes",
  collaborator: "Collaborators",
  tool: "Software",
  location: "Locations",
};

interface SimNode extends ResearchNode, d3.SimulationNodeDatum {}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  strength?: number;
}

export default function ResearchGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<ResearchNode | null>(null);
  const [activeTypes, setActiveTypes] = useState<Set<NodeType>>(
    () =>
      new Set<NodeType>([
        "paper",
        "organism",
        "method",
        "theme",
        "collaborator",
        "tool",
        "location",
      ]),
  );

  const closePanel = useCallback(() => setSelectedNode(null), []);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const filteredNodeIds = new Set(
      rawNodes.filter((n) => activeTypes.has(n.type)).map((n) => n.id),
    );
    const nodeData: SimNode[] = rawNodes
      .filter((n) => filteredNodeIds.has(n.id))
      .map((d) => ({ ...d }));
    const linkData: SimLink[] = rawLinks
      .filter(
        (l) =>
          filteredNodeIds.has(l.source as string) &&
          filteredNodeIds.has(l.target as string),
      )
      .map((d) => ({ ...d }));

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    svg.selectAll("*").remove();

    // Defs for glow
    const defs = svg.append("defs");
    const filter = defs.append("filter").attr("id", "glow");
    filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "3")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const g = svg.append("g");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom);

    // Center initially
    const initialTransform = d3.zoomIdentity.translate(width * 0.05, height * 0.05).scale(0.9);
    svg.call(zoom.transform, initialTransform);

    const simulation = d3
      .forceSimulation<SimNode>(nodeData)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimLink>(linkData)
          .id((d) => d.id)
          .distance(100)
          .strength((d) => (d.strength || 0.5) * 0.5),
      )
      .force("charge", d3.forceManyBody().strength(-300).distanceMax(500))
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.1))
      .force(
        "collision",
        d3.forceCollide().radius((d: any) => (d.size || 6) + 6),
      )
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05));

    // Links — visible!
    const link = g
      .append("g")
      .selectAll("line")
      .data(linkData)
      .join("line")
      .attr("stroke", "#ffffff")
      .attr("stroke-opacity", 0.08)
      .attr("stroke-width", 1);

    // Node groups
    const nodeGroup = g
      .append("g")
      .selectAll<SVGGElement, SimNode>("g")
      .data(nodeData)
      .join("g")
      .attr("cursor", "pointer")
      .call(
        d3
          .drag<SVGGElement, SimNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }),
      );

    // Node circles
    nodeGroup
      .append("circle")
      .attr("r", (d) => d.size || 6)
      .attr("fill", (d) => TYPE_COLORS[d.type])
      .attr("fill-opacity", 0.8)
      .attr("stroke", (d) => TYPE_COLORS[d.type])
      .attr("stroke-width", 2)
      .attr("stroke-opacity", 0.3)
      .attr("filter", "url(#glow)");

    // Labels
    nodeGroup
      .append("text")
      .text((d) => d.label)
      .attr("font-size", (d) => Math.max(9, (d.size || 6) * 0.65))
      .attr("fill", "#888")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => (d.size || 6) + 14)
      .attr("pointer-events", "none")
      .style("user-select", "none")
      .style("font-family", "var(--font-geist-sans), system-ui, sans-serif");

    // Interactions
    nodeGroup
      .on("mouseenter", (_event, d) => {
        const connectedIds = new Set<string>();
        connectedIds.add(d.id);
        linkData.forEach((l) => {
          const sid =
            typeof l.source === "object"
              ? (l.source as SimNode).id
              : l.source;
          const tid =
            typeof l.target === "object"
              ? (l.target as SimNode).id
              : l.target;
          if (sid === d.id) connectedIds.add(tid as string);
          if (tid === d.id) connectedIds.add(sid as string);
        });

        nodeGroup.select("circle").attr("fill-opacity", (n: any) =>
          connectedIds.has(n.id) ? 1 : 0.1,
        );
        nodeGroup.select("text").attr("fill-opacity", (n: any) =>
          connectedIds.has(n.id) ? 1 : 0.15,
        );
        link.attr("stroke-opacity", (l: any) => {
          const sid =
            typeof l.source === "object" ? l.source.id : l.source;
          const tid =
            typeof l.target === "object" ? l.target.id : l.target;
          return sid === d.id || tid === d.id ? 0.35 : 0.02;
        });
      })
      .on("mouseleave", () => {
        nodeGroup.select("circle").attr("fill-opacity", 0.8);
        nodeGroup.select("text").attr("fill-opacity", 1);
        link.attr("stroke-opacity", 0.08);
      })
      .on("click", (_event, d) => {
        setSelectedNode(d);
      });

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodeGroup.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [activeTypes]);

  const toggleType = (type: NodeType) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Filter pills — bottom left */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-1.5">
        {(Object.keys(TYPE_COLORS) as NodeType[]).map((type) => (
          <button
            key={type}
            onClick={() => toggleType(type)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all backdrop-blur-sm"
            style={{
              backgroundColor: activeTypes.has(type)
                ? TYPE_COLORS[type] + "18"
                : "rgba(255,255,255,0.03)",
              color: activeTypes.has(type) ? TYPE_COLORS[type] : "#555",
              border: `1px solid ${activeTypes.has(type) ? TYPE_COLORS[type] + "30" : "#222"}`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: TYPE_COLORS[type] }}
            />
            {TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      {/* Graph canvas */}
      <svg ref={svgRef} className="w-full h-full" />

      {/* Detail panel */}
      {selectedNode && (
        <div className="absolute top-4 right-4 z-30 w-80 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="p-5">
            {/* Close */}
            <button
              onClick={closePanel}
              className="absolute top-3 right-3 text-neutral-500 hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Type badge */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: TYPE_COLORS[selectedNode.type] }}
              />
              <span
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: TYPE_COLORS[selectedNode.type] }}
              >
                {selectedNode.type}
              </span>
              {selectedNode.year && (
                <span className="text-[10px] text-neutral-500 ml-auto">
                  {selectedNode.year}
                </span>
              )}
            </div>

            {/* Image */}
            {selectedNode.image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src={selectedNode.image}
                  alt={selectedNode.label}
                  className="w-full h-40 object-cover"
                />
                {selectedNode.imageCredit && (
                  <p className="text-[9px] text-neutral-600 mt-1 px-0.5">
                    {selectedNode.imageCredit}
                  </p>
                )}
              </div>
            )}

            {/* Title */}
            <h2 className="text-lg font-semibold text-white leading-snug mb-2">
              {selectedNode.label}
            </h2>

            {/* Taxonomy */}
            {selectedNode.taxonomy && (
              <p className="text-xs text-neutral-500 italic mb-3">
                {selectedNode.taxonomy}
              </p>
            )}

            {/* Description */}
            {selectedNode.detail && (
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                {selectedNode.detail}
              </p>
            )}

            {/* Abstract (papers) */}
            {selectedNode.abstract && (
              <div className="mb-4">
                <h3 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600 mb-1">
                  Abstract
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {selectedNode.abstract}
                </p>
              </div>
            )}

            {/* External links */}
            {selectedNode.externalLinks && selectedNode.externalLinks.length > 0 && (
              <div className="space-y-1.5 mb-4">
                {selectedNode.externalLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors group"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="flex-shrink-0 opacity-50 group-hover:opacity-100"
                    >
                      <path
                        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                        fill="currentColor"
                      />
                    </svg>
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {/* Primary URL */}
            {selectedNode.url && (
              <a
                href={selectedNode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
                style={{
                  backgroundColor: TYPE_COLORS[selectedNode.type] + "15",
                  color: TYPE_COLORS[selectedNode.type],
                }}
              >
                Open →
              </a>
            )}
          </div>
        </div>
      )}

      {/* Hint */}
      <p className="absolute bottom-4 right-4 z-10 text-[10px] text-neutral-600">
        drag · scroll to zoom · click to explore
      </p>
    </div>
  );
}
