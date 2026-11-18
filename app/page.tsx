"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight, BookOpen, Check, ChevronRight, ExternalLink, Github,
  Globe2, Info, Layers3, Search, X, ZoomIn, ZoomOut, RotateCcw
} from "lucide-react";
import rawComponents from "../data/components.json";

type WP = "WP3" | "WP4" | "WP5";
type ComponentInfo = {
  id: string; title: string; wp: WP; subtitle: string; description: string;
  functions: string[]; url: string | null; x: number; y: number; w: number; h: number;
};
const components = rawComponents as ComponentInfo[];
const wpMeta = {
  WP3: { label: "EcoDesign Management", color: "#16852b", pale: "#eff9ef" },
  WP4: { label: "Digital Product Passport", color: "#1266b5", pale: "#edf5ff" },
  WP5: { label: "Data Space & Data Management", color: "#e87516", pale: "#fff4e9" },
};

export default function Home() {
  const [selected, setSelected] = useState<ComponentInfo | null>(null);
  const [filter, setFilter] = useState<"ALL" | WP>("ALL");
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);

  const filtered = useMemo(() => components.filter((c) => {
    const matchesWp = filter === "ALL" || c.wp === filter;
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || `${c.title} ${c.subtitle} ${c.description} ${c.wp}`.toLowerCase().includes(q);
    return matchesWp && matchesQuery;
  }), [filter, query]);

  const open = (c: ComponentInfo) => setSelected(c);
  const activeMeta = selected ? wpMeta[selected.wp] : null;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark"><Layers3 size={22}/></div>
          <div>
            <div className="brand-name">CIR4FUN</div>
            <div className="brand-sub">INTERACTIVE TECHNOLOGY ARCHITECTURE</div>
          </div>
        </div>
        <div className="top-links">
          <a href="https://cir4fun.eu" target="_blank" rel="noreferrer"><Globe2 size={15}/> Project website <ExternalLink size={12}/></a>
          <a href="https://github.com/JuanColonGarcia/cir4fun-interactive-architecture" target="_blank" rel="noreferrer"><Github size={15}/> GitHub <ExternalLink size={12}/></a>
        </div>
      </header>

      <section className="intro">
        <div>
          <div className="eyebrow">CIR4FUN · SYSTEM OVERVIEW</div>
          <h1>Explore the technology architecture</h1>
          <p>Select any component in the architecture to view its purpose, main functions and corresponding Canva page.</p>
        </div>
        <div className="stats">
          <div><strong>3</strong><span>Work packages</span></div>
          <div><strong>{components.length}</strong><span>Interactive areas</span></div>
          <div><strong>{components.filter(c => c.url).length}</strong><span>Canva links</span></div>
        </div>
      </section>

      <section className="toolbar">
        <div className="filters" aria-label="Filter by work package">
          {(["ALL", "WP3", "WP4", "WP5"] as const).map((v) => (
            <button key={v} onClick={() => setFilter(v)} className={`filter ${filter === v ? "active" : ""}`}>
              {v === "ALL" ? "All components" : v}
            </button>
          ))}
        </div>
        <div className="searchbox"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search components, tools or services..."/>{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={15}/></button>}</div>
      </section>

      <section className="workspace">
        <div className="diagram-card">
          <div className="card-head">
            <div><span className="section-kicker">ARCHITECTURE MAP</span><h2>WP3 · WP4 · WP5</h2></div>
            <div className="zoom-controls">
              <button onClick={() => setZoom(z => Math.max(.75, +(z-.1).toFixed(2)))} aria-label="Zoom out"><ZoomOut size={16}/></button>
              <span>{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => Math.min(1.5, +(z+.1).toFixed(2)))} aria-label="Zoom in"><ZoomIn size={16}/></button>
              <button onClick={() => setZoom(1)} aria-label="Reset zoom"><RotateCcw size={15}/></button>
            </div>
          </div>
          <div className="diagram-viewport">
            <div className="diagram-stage" style={{ transform: `scale(${zoom})` }}>
              <img className="architecture-image" src="/assets/cir4fun-architecture.png" alt="CIR4FUN technology architecture showing WP3, WP4 and WP5"/>
              {filtered.map(c => (
                <button
                  key={c.id}
                  className={`hotspot ${selected?.id === c.id ? "chosen" : ""} ${c.wp.toLowerCase()}`}
                  style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%`, height: `${c.h}%` }}
                  onClick={() => open(c)}
                  title={`Explore ${c.title}`}
                  aria-label={`Explore ${c.title}`}
                />
              ))}
            </div>
          </div>
          <div className="diagram-foot">
            <span><span className="pulse"/> {filtered.length} components shown</span>
            <span>Click a highlighted area to explore</span>
          </div>
        </div>

        <aside className="detail-column">
          {selected ? (
            <article className="detail-card">
              <div className="detail-top" style={{ background: activeMeta!.pale, borderColor: activeMeta!.color }}>
                <div className="detail-topline"><span style={{color:activeMeta!.color}}>{selected.wp} · {activeMeta!.label}</span><button onClick={() => setSelected(null)} aria-label="Close details"><X size={18}/></button></div>
                <h2>{selected.title}</h2>
                <p>{selected.subtitle}</p>
              </div>
              <div className="detail-body">
                <div className="detail-section">
                  <div className="section-title"><Info size={16}/> Overview</div>
                  <p>{selected.description}</p>
                </div>
                <div className="detail-section">
                  <div className="section-title"><BookOpen size={16}/> Main functions</div>
                  <ul>{selected.functions.map((f,i)=><li key={i}><Check size={15}/><span>{f}</span></li>)}</ul>
                </div>
                <div className="canva-panel">
                  <div className="canva-heading"><span className="canva-icon">C</span><div><strong>Component canvas</strong><small>Related project material</small></div></div>
                  {selected.url ? (
                    <>
                      <p>The Canva page associated with this component is available below.</p>
                      <a className="canva-button" href={selected.url} target="_blank" rel="noreferrer">Open Canva page <ArrowUpRight size={16}/></a>
                    </>
                  ) : (
                    <p className="empty-link">No dedicated Canva link has been provided for this component.</p>
                  )}
                </div>
                <button className="back-button" onClick={() => setSelected(null)}><ChevronRight size={15}/> Back to architecture</button>
              </div>
            </article>
          ) : (
            <article className="welcome-card">
              <div className="welcome-icon"><Layers3 size={25}/></div>
              <span className="section-kicker">INTERACTIVE EXPLORER</span>
              <h2>Discover each component</h2>
              <p>Choose a block in the diagram or search the component list. Its description, key functions and Canva link will appear here.</p>
              <div className="wp-legend">
                {(["WP3","WP4","WP5"] as WP[]).map(wp=><button key={wp} onClick={()=>setFilter(wp)}><i style={{background:wpMeta[wp].color}}/><span><b>{wp}</b>{wpMeta[wp].label}</span><ChevronRight size={15}/></button>)}
              </div>
              <div className="quick-list">
                <div className="section-title"><Search size={15}/> {query ? "Search results" : "Component index"}</div>
                <div className="quick-scroll">
                  {filtered.slice(0,12).map(c=><button key={c.id} onClick={()=>open(c)}><span className={`mini-dot ${c.wp.toLowerCase()}`}/><span>{c.title}</span><ChevronRight size={14}/></button>)}
                  {filtered.length > 12 && <div className="more-note">+ {filtered.length-12} more components. Refine your search to find them.</div>}
                  {filtered.length === 0 && <div className="more-note">No components match this search.</div>}
                </div>
              </div>
            </article>
          )}
        </aside>
      </section>

      <footer className="footer">
        <span>© CIR4FUN · Interactive Technology Architecture</span>
        <span>WP3 · EcoDesign <b>／</b> WP4 · Digital Product Passport <b>／</b> WP5 · Data Space</span>
      </footer>
    </main>
  );
}
