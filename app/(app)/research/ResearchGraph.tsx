"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import {
  nodes as rawNodes,
  links as rawLinks,
  ResearchNode,
  NodeType,
} from "./research_data";

// ─── Default colors (can be overridden via /config) ───
const DEFAULT_COLORS: Record<NodeType, string> = {
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
  collaborator: "People",
  tool: "Software",
  location: "Places",
};

interface SimNode extends ResearchNode, d3.SimulationNodeDatum {}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  strength?: number;
}

interface Config {
  colors: Record<NodeType, string>;
  chargeStrength: number;
  linkDistance: number;
  centerStrength: number;
  edgeOpacity: number;
  nodeOpacity: number;
  labelSize: number;
  glowEnabled: boolean;
}

const DEFAULT_CONFIG: Config = {
  colors: { ...DEFAULT_COLORS },
  chargeStrength: -250,
  linkDistance: 90,
  centerStrength: 0.15,
  edgeOpacity: 0.06,
  nodeOpacity: 0.8,
  labelSize: 1,
  glowEnabled: false,
};

export default function ResearchGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const cmdRef = useRef<HTMLInputElement>(null);
  const [selectedNode, setSelectedNode] = useState<ResearchNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [config, setConfig] = useState<Config>({ ...DEFAULT_CONFIG });
  const [showCmd, setShowCmd] = useState(false);
  const [cmdValue, setCmdValue] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [showConfig, setShowConfig] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [activeTypes, setActiveTypes] = useState<Set<NodeType>>(
    () =>
      new Set<NodeType>([
        "paper",
        "organism",
        "method",
        "theme",
        "tool",
        "location",
      ]),
  );

  // Track dimensions
  useEffect(() => {
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Keyboard shortcut: / to open command
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !showCmd && !showConfig) {
        e.preventDefault();
        setShowCmd(true);
        setCmdValue("/");
        setTimeout(() => cmdRef.current?.focus(), 50);
      }
      if (e.key === "Escape") {
        setShowCmd(false);
        setShowConfig(false);
        setShowHelp(false);
        setSelectedNode(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showCmd, showConfig]);

  // Process commands
  const runCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      setCmdHistory((prev) => [...prev.slice(-20), cmd]);

      if (trimmed === "/help" || trimmed === "/?") {
        setShowHelp(true);
        setShowCmd(false);
      } else if (trimmed === "/config") {
        setShowConfig(true);
        setShowCmd(false);
      } else if (trimmed === "/reset") {
        setConfig({ ...DEFAULT_CONFIG });
        setShowCmd(false);
      } else if (trimmed.startsWith("/theme ")) {
        const theme = trimmed.replace("/theme ", "");
        if (theme === "mono") {
          setConfig((c) => ({
            ...c,
            colors: Object.fromEntries(
              Object.keys(c.colors).map((k) => [k, "#888"]),
            ) as Record<NodeType, string>,
          }));
        } else if (theme === "neon") {
          setConfig((c) => ({
            ...c,
            colors: {
              paper: "#00ffff",
              organism: "#39ff14",
              method: "#bf00ff",
              theme: "#ffff00",
              collaborator: "#ff1493",
              tool: "#00ff7f",
              location: "#ff4500",
            },
            glowEnabled: true,
          }));
        } else if (theme === "default") {
          setConfig((c) => ({ ...c, colors: { ...DEFAULT_COLORS }, glowEnabled: false }));
        }
        setShowCmd(false);
      } else if (trimmed.startsWith("/filter ")) {
        const type = trimmed.replace("/filter ", "") as NodeType;
        if (type in DEFAULT_COLORS) {
          toggleType(type);
        }
        setShowCmd(false);
      } else if (trimmed === "/glow") {
        setConfig((c) => ({ ...c, glowEnabled: !c.glowEnabled }));
        setShowCmd(false);
      } else {
        setShowCmd(false);
      }
      setCmdValue("");
    },
    [],
  );

  // D3 graph
  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;

    const { width, height } = dimensions;
    const colors = config.colors;

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

    // Optional glow
    if (config.glowEnabled) {
      const defs = svg.append("defs");
      const filter = defs.append("filter").attr("id", "glow");
      filter
        .append("feGaussianBlur")
        .attr("stdDeviation", "1.5")
        .attr("result", "coloredBlur");
      const feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode").attr("in", "coloredBlur");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    }

    const g = svg.append("g");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.15, 5])
      .filter((event) => !event.type.startsWith("dblclick"))
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
    svg.call(
      zoom.transform,
      d3.zoomIdentity.translate(width * 0.1, height * 0.1).scale(0.8),
    );

    const simulation = d3
      .forceSimulation<SimNode>(nodeData)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimLink>(linkData)
          .id((d) => d.id)
          .distance(config.linkDistance)
          .strength((d) => (d.strength || 0.5) * 0.6),
      )
      .force("charge", d3.forceManyBody().strength(config.chargeStrength).distanceMax(600))
      .force("center", d3.forceCenter(width / 2, height / 2).strength(config.centerStrength))
      .force(
        "collision",
        d3.forceCollide().radius((d: any) => (d.size || 6) + 5),
      )
      .force("x", d3.forceX(width / 2).strength(0.06))
      .force("y", d3.forceY(height / 2).strength(0.06));

    // Edges
    const link = g
      .append("g")
      .selectAll("line")
      .data(linkData)
      .join("line")
      .attr("stroke", "#ffffff")
      .attr("stroke-opacity", config.edgeOpacity)
      .attr("stroke-width", 0.8);

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

    // Circles — no blur filter by default
    nodeGroup
      .append("circle")
      .attr("r", (d) => d.size || 6)
      .attr("fill", (d) => colors[d.type])
      .attr("fill-opacity", config.nodeOpacity)
      .attr("stroke", (d) => colors[d.type])
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.2)
      .attr("filter", config.glowEnabled ? "url(#glow)" : null);

    // Labels
    const labelScale = config.labelSize;
    nodeGroup
      .append("text")
      .text((d) => d.label)
      .attr("font-size", (d) => Math.max(8, (d.size || 6) * 0.6) * labelScale)
      .attr("fill", "#666")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => (d.size || 6) + 12)
      .attr("pointer-events", "none")
      .style("user-select", "none")
      .style("font-family", "'Geist Mono', 'SF Mono', 'Fira Code', monospace");

    // Hover
    nodeGroup
      .on("mouseenter", (_event, d) => {
        const connected = new Set<string>([d.id]);
        linkData.forEach((l) => {
          const sid =
            typeof l.source === "object"
              ? (l.source as SimNode).id
              : (l.source as string);
          const tid =
            typeof l.target === "object"
              ? (l.target as SimNode).id
              : (l.target as string);
          if (sid === d.id) connected.add(tid);
          if (tid === d.id) connected.add(sid);
        });

        nodeGroup
          .select("circle")
          .attr("fill-opacity", (n: any) =>
            connected.has(n.id) ? 1 : 0.08,
          );
        nodeGroup
          .select("text")
          .attr("fill-opacity", (n: any) =>
            connected.has(n.id) ? 1 : 0.08,
          );
        link.attr("stroke-opacity", (l: any) => {
          const sid =
            typeof l.source === "object" ? l.source.id : l.source;
          const tid =
            typeof l.target === "object" ? l.target.id : l.target;
          return sid === d.id || tid === d.id ? 0.4 : 0.01;
        });
      })
      .on("mouseleave", () => {
        nodeGroup.select("circle").attr("fill-opacity", config.nodeOpacity);
        nodeGroup.select("text").attr("fill-opacity", 1);
        link.attr("stroke-opacity", config.edgeOpacity);
      });

    nodeGroup.on("click", (_event, d) => {
      _event.stopPropagation();
      setSelectedNode(d);
    });

    svg.on("click", () => {
      setSelectedNode(null);
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
  }, [activeTypes, dimensions, config]);

  const toggleType = (type: NodeType) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  return (
    <>
      {/* SVG */}
      <svg
        ref={svgRef}
        className="fixed inset-0 w-screen h-screen"
        style={{ touchAction: "none" }}
      />

      {/* Filter pills — bottom left */}
      <div className="fixed bottom-10 left-4 z-40 flex flex-wrap gap-1.5 max-w-[calc(100vw-2rem)]">
        {(Object.keys(config.colors) as NodeType[]).map((type) => (
          <button
            key={type}
            onClick={() => toggleType(type)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-all"
            style={{
              fontFamily: "'Geist Mono', 'SF Mono', monospace",
              backgroundColor: activeTypes.has(type)
                ? config.colors[type] + "15"
                : "rgba(255,255,255,0.02)",
              color: activeTypes.has(type) ? config.colors[type] : "#444",
              border: `1px solid ${activeTypes.has(type) ? config.colors[type] + "25" : "#1a1a1a"}`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: config.colors[type] }}
            />
            {TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      {/* Command bar */}
      {showCmd && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-96 max-w-[90vw]">
          <input
            ref={cmdRef}
            type="text"
            value={cmdValue}
            onChange={(e) => setCmdValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runCommand(cmdValue);
              if (e.key === "Escape") setShowCmd(false);
            }}
            placeholder="type a command..."
            className="w-full px-4 py-2 rounded-md bg-black/90 border border-white/10 text-sm text-green-400 placeholder-neutral-600 outline-none backdrop-blur-xl"
            style={{ fontFamily: "'Geist Mono', 'SF Mono', monospace" }}
            autoFocus
          />
        </div>
      )}

      {/* Help overlay */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowHelp(false)}>
          <div
            className="bg-[#111] border border-white/10 rounded-lg p-6 max-w-md w-full mx-4"
            style={{ fontFamily: "'Geist Mono', 'SF Mono', monospace" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-green-400 text-sm mb-4">$ help</h2>
            <div className="space-y-2 text-xs text-neutral-400">
              <p><span className="text-green-400">/help</span> — show this</p>
              <p><span className="text-green-400">/config</span> — open config panel</p>
              <p><span className="text-green-400">/theme default</span> — default colors</p>
              <p><span className="text-green-400">/theme mono</span> — monochrome</p>
              <p><span className="text-green-400">/theme neon</span> — neon glow</p>
              <p><span className="text-green-400">/glow</span> — toggle glow effect</p>
              <p><span className="text-green-400">/filter [type]</span> — toggle node type</p>
              <p><span className="text-green-400">/reset</span> — reset all settings</p>
              <p className="pt-2 text-neutral-600">press / to open command bar · esc to close</p>
            </div>
          </div>
        </div>
      )}

      {/* Config panel */}
      {showConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowConfig(false)}>
          <div
            className="bg-[#111] border border-white/10 rounded-lg p-6 max-w-md w-full mx-4"
            style={{ fontFamily: "'Geist Mono', 'SF Mono', monospace" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-green-400 text-sm mb-4">$ config</h2>
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-500 block mb-1">charge_strength: {config.chargeStrength}</label>
                <input
                  type="range"
                  min="-600"
                  max="-50"
                  value={config.chargeStrength}
                  onChange={(e) =>
                    setConfig((c) => ({ ...c, chargeStrength: parseInt(e.target.value) }))
                  }
                  className="w-full accent-green-500"
                />
              </div>
              <div>
                <label className="text-neutral-500 block mb-1">link_distance: {config.linkDistance}</label>
                <input
                  type="range"
                  min="30"
                  max="200"
                  value={config.linkDistance}
                  onChange={(e) =>
                    setConfig((c) => ({ ...c, linkDistance: parseInt(e.target.value) }))
                  }
                  className="w-full accent-green-500"
                />
              </div>
              <div>
                <label className="text-neutral-500 block mb-1">center_strength: {config.centerStrength.toFixed(2)}</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={config.centerStrength * 100}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      centerStrength: parseInt(e.target.value) / 100,
                    }))
                  }
                  className="w-full accent-green-500"
                />
              </div>
              <div>
                <label className="text-neutral-500 block mb-1">edge_opacity: {config.edgeOpacity.toFixed(2)}</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={config.edgeOpacity * 100}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      edgeOpacity: parseInt(e.target.value) / 100,
                    }))
                  }
                  className="w-full accent-green-500"
                />
              </div>
              <div>
                <label className="text-neutral-500 block mb-1">node_opacity: {config.nodeOpacity.toFixed(2)}</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={config.nodeOpacity * 100}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      nodeOpacity: parseInt(e.target.value) / 100,
                    }))
                  }
                  className="w-full accent-green-500"
                />
              </div>
              <div>
                <label className="text-neutral-500 block mb-1">label_size: {config.labelSize.toFixed(1)}</label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={config.labelSize * 10}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      labelSize: parseInt(e.target.value) / 10,
                    }))
                  }
                  className="w-full accent-green-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-neutral-500">glow:</label>
                <button
                  onClick={() => setConfig((c) => ({ ...c, glowEnabled: !c.glowEnabled }))}
                  className={`px-2 py-0.5 rounded text-[10px] border ${
                    config.glowEnabled
                      ? "border-green-500/30 text-green-400 bg-green-500/10"
                      : "border-white/10 text-neutral-600"
                  }`}
                >
                  {config.glowEnabled ? "on" : "off"}
                </button>
              </div>
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    setConfig({ ...DEFAULT_CONFIG });
                  }}
                  className="px-3 py-1 rounded text-[10px] border border-white/10 text-neutral-500 hover:text-white transition-colors"
                >
                  reset
                </button>
                <button
                  onClick={() => setShowConfig(false)}
                  className="px-3 py-1 rounded text-[10px] border border-green-500/30 text-green-400 hover:bg-green-500/10 transition-colors"
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail panel */}
      {selectedNode && (
        <div className="fixed top-0 right-0 z-50 w-80 max-w-[85vw] h-screen overflow-y-auto bg-[#0d0d0d]/95 backdrop-blur-xl border-l border-white/5">
          <div className="p-5 pt-6" style={{ fontFamily: "'Geist Mono', 'SF Mono', monospace" }}>
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-neutral-600 hover:text-white transition-colors p-1"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: config.colors[selectedNode.type] }}
              />
              <span
                className="text-[10px] font-medium uppercase tracking-widest"
                style={{ color: config.colors[selectedNode.type] }}
              >
                {selectedNode.type}
              </span>
              {selectedNode.year && (
                <span className="text-[10px] text-neutral-600 ml-auto">
                  {selectedNode.year}
                </span>
              )}
            </div>

            {selectedNode.image && (
              <div className="mb-4 rounded overflow-hidden border border-white/5">
                <img
                  src={selectedNode.image}
                  alt={selectedNode.label}
                  className="w-full h-36 object-cover"
                  loading="lazy"
                />
                {selectedNode.imageCredit && (
                  <p className="text-[8px] text-neutral-700 mt-1 px-0.5">
                    {selectedNode.imageCredit}
                  </p>
                )}
              </div>
            )}

            <h2 className="text-sm font-medium text-white leading-snug mb-1.5">
              {selectedNode.label}
            </h2>

            {selectedNode.taxonomy && (
              <p className="text-[10px] text-neutral-600 mb-3">
                {selectedNode.taxonomy}
              </p>
            )}

            {selectedNode.detail && (
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                {selectedNode.detail}
              </p>
            )}

            {selectedNode.abstract && (
              <div className="mb-4">
                <p className="text-[9px] text-neutral-700 uppercase tracking-wider mb-1">
                  abstract
                </p>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  {selectedNode.abstract}
                </p>
              </div>
            )}

            {selectedNode.externalLinks && selectedNode.externalLinks.length > 0 && (
              <div className="space-y-1.5 pt-3 border-t border-white/5">
                {selectedNode.externalLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[11px] text-neutral-500 hover:text-green-400 transition-colors py-0.5"
                  >
                    <span className="text-neutral-700">→</span>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Git hash — bottom right */}
      <div
        className="fixed bottom-2 right-4 z-30 text-[9px] text-neutral-700 hidden md:flex items-center gap-3"
        style={{ fontFamily: "'Geist Mono', 'SF Mono', monospace" }}
      >
        <span className="text-neutral-800">
          press <span className="text-neutral-600">/</span> for commands
        </span>
        <a
          href={`https://github.com/gibsonMatt/home/commit/${process.env.NEXT_PUBLIC_GIT_SHA || "dev"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-700 hover:text-neutral-500 transition-colors"
        >
          {process.env.NEXT_PUBLIC_GIT_SHA?.slice(0, 7) || "dev"}
        </a>
      </div>
    </>
  );
}
