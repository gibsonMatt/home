"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  nodes as rawNodes,
  links as rawLinks,
  ResearchNode,
  ResearchLink,
  NodeType,
} from "./research_data";

const TYPE_COLORS: Record<NodeType, string> = {
  paper: "#3b82f6",       // blue
  organism: "#22c55e",    // green
  method: "#a855f7",      // purple
  theme: "#f59e0b",       // amber
  collaborator: "#ec4899", // pink
  tool: "#06b6d4",        // cyan
  location: "#ef4444",    // red
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
  const [tooltip, setTooltip] = useState<{
    node: ResearchNode;
    x: number;
    y: number;
  } | null>(null);
  const [activeTypes, setActiveTypes] = useState<Set<NodeType>>(
    () => new Set<NodeType>([
      "paper",
      "organism",
      "method",
      "theme",
      "collaborator",
      "tool",
      "location",
    ]),
  );

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = Math.max(600, window.innerHeight - 300);

    // Filter nodes and links by active types
    const filteredNodeIds = new Set(
      rawNodes.filter((n) => activeTypes.has(n.type)).map((n) => n.id),
    );
    const nodeData: SimNode[] = rawNodes
      .filter((n) => filteredNodeIds.has(n.id))
      .map((d) => ({ ...d }));
    const linkData: SimLink[] = rawLinks
      .filter(
        (l) => filteredNodeIds.has(l.source as string) && filteredNodeIds.has(l.target as string),
      )
      .map((d) => ({ ...d }));

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    const g = svg.append("g");

    // Zoom
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom);

    const simulation = d3
      .forceSimulation<SimNode>(nodeData)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimLink>(linkData)
          .id((d) => d.id)
          .distance(80)
          .strength((d) => (d.strength || 0.5) * 0.3),
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius((d: any) => (d.size || 6) + 4));

    // Links
    const link = g
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(linkData)
      .join("line")
      .attr("stroke", "#404040")
      .attr("stroke-opacity", 0.15)
      .attr("stroke-width", 1);

    // Nodes
    const node = g
      .append("g")
      .attr("class", "nodes")
      .selectAll<SVGCircleElement, SimNode>("circle")
      .data(nodeData)
      .join("circle")
      .attr("r", (d) => d.size || 6)
      .attr("fill", (d) => TYPE_COLORS[d.type])
      .attr("fill-opacity", 0.85)
      .attr("stroke", (d) => TYPE_COLORS[d.type])
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.3)
      .attr("cursor", "pointer")
      .call(
        d3
          .drag<SVGCircleElement, SimNode>()
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

    // Labels
    const label = g
      .append("g")
      .attr("class", "labels")
      .selectAll<SVGTextElement, SimNode>("text")
      .data(nodeData)
      .join("text")
      .text((d) => d.label)
      .attr("font-size", (d) => Math.max(8, (d.size || 6) * 0.7))
      .attr("fill", "#999")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => (d.size || 6) + 12)
      .attr("pointer-events", "none")
      .style("user-select", "none");

    // Hover interaction
    node
      .on("mouseenter", (event, d) => {
        const [x, y] = d3.pointer(event, container);
        setTooltip({ node: d, x, y });

        // Highlight connected
        const connectedIds = new Set<string>();
        connectedIds.add(d.id);
        linkData.forEach((l) => {
          const sid = typeof l.source === "object" ? (l.source as SimNode).id : l.source;
          const tid = typeof l.target === "object" ? (l.target as SimNode).id : l.target;
          if (sid === d.id) connectedIds.add(tid as string);
          if (tid === d.id) connectedIds.add(sid as string);
        });

        node.attr("fill-opacity", (n) => (connectedIds.has(n.id) ? 1 : 0.15));
        link.attr("stroke-opacity", (l) => {
          const sid = typeof l.source === "object" ? (l.source as SimNode).id : l.source;
          const tid = typeof l.target === "object" ? (l.target as SimNode).id : l.target;
          return sid === d.id || tid === d.id ? 0.5 : 0.03;
        });
        label.attr("fill-opacity", (n) => (connectedIds.has(n.id) ? 1 : 0.1));
      })
      .on("mouseleave", () => {
        setTooltip(null);
        node.attr("fill-opacity", 0.85);
        link.attr("stroke-opacity", 0.15);
        label.attr("fill-opacity", 1);
      })
      .on("click", (_event, d) => {
        if (d.url) window.open(d.url, "_blank");
      });

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);

      label.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
    });

    return () => {
      simulation.stop();
    };
  }, [activeTypes]);

  const toggleType = (type: NodeType) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  return (
    <div className="relative">
      {/* Legend / Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(TYPE_COLORS) as NodeType[]).map((type) => (
          <button
            key={type}
            onClick={() => toggleType(type)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              backgroundColor: activeTypes.has(type)
                ? TYPE_COLORS[type] + "20"
                : "transparent",
              color: activeTypes.has(type) ? TYPE_COLORS[type] : "#666",
              border: `1px solid ${activeTypes.has(type) ? TYPE_COLORS[type] + "40" : "#333"}`,
              opacity: activeTypes.has(type) ? 1 : 0.5,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: TYPE_COLORS[type] }}
            />
            {TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      {/* Graph */}
      <div ref={containerRef} className="relative w-full rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50 dark:bg-neutral-950">
        <svg ref={svgRef} className="w-full" />

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute z-10 max-w-xs p-3 rounded-lg bg-white dark:bg-neutral-900 shadow-xl border border-neutral-200 dark:border-neutral-800 pointer-events-none"
            style={{
              left: Math.min(tooltip.x + 15, (containerRef.current?.clientWidth || 600) - 260),
              top: tooltip.y - 10,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: TYPE_COLORS[tooltip.node.type] }}
              />
              <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {tooltip.node.label}
              </span>
              {tooltip.node.year && (
                <span className="text-xs text-neutral-400">{tooltip.node.year}</span>
              )}
            </div>
            {tooltip.node.detail && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {tooltip.node.detail}
              </p>
            )}
            {tooltip.node.url && (
              <p className="text-xs text-blue-500 mt-1">Click to open →</p>
            )}
          </div>
        )}
      </div>

      <p className="mt-3 text-xs text-neutral-400 dark:text-neutral-600 text-center">
        Drag nodes to explore. Hover for details. Click linked nodes to open. Scroll to zoom.
      </p>
    </div>
  );
}
