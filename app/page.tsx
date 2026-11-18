'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowUpRight, BookOpen, ChevronRight, ExternalLink,
  Info, Leaf, Maximize2, Minus, Plus, RotateCcw, Search, X
} from 'lucide-react';

type WP = 'WP3' | 'WP4' | 'WP5' | 'EC' | 'EBSI' | 'Infrastructure';
type ComponentInfo = {
  id: string; title: string; wp: WP; subtitle: string; description: string;
  functions: string[]; page?: string; x: number; y: number; w: number; h: number;
};

// Coordinates are percentages of the supplied 1288 × 1221 reference image.
// Canva URLs can be added in the `page` property when the public links are ready.
const components: ComponentInfo[] = [
  {id:'greta',title:'GRETA',wp:'WP3',subtitle:'Ecodesign & LCA assessment',description:'A web-based sustainability assessment platform used to evaluate the environmental, economic and social performance of furniture products and processes.',functions:['Life Cycle Assessment (LCA)','Life Cycle Costing (LCC)','Social Life Cycle Assessment (SLCA)','Circular Economy assessment'],x:16.2,y:5.0,w:15.8,h:6.5},
  {id:'passos',title:'PASSOS',wp:'WP3',subtitle:'Sustainability indicators',description:'A sustainability indexing system that uses structured indicators to assess and communicate product sustainability.',functions:['Sustainability indicators','Sustainability index','Eco-scoring','Product assessment'],x:39.3,y:5.0,w:16.2,h:6.5},
  {id:'genai',title:'GenAI DSS',wp:'WP3',subtitle:'Decision Support System',description:'A Generative AI-based Decision Support System designed to support product and process design through queries and specialised knowledge.',functions:['Receives user queries','Coordinates specialist agents','Retrieves relevant Data Space information','Consults DPP information'],x:24.0,y:12.7,w:23.2,h:5.2},
  {id:'data-mcp',title:'Data Space MCP',wp:'WP3',subtitle:'Read-only Data Space connection',description:'A read-only MCP connection represented in the architecture. It allows the GenAI DSS to retrieve relevant information from the Data Space.',functions:['Read Data Space data','Connects through a connector','Provides context to the GenAI DSS'],x:16.1,y:20.6,w:19.0,h:8.0},
  {id:'dpp-mcp',title:'DPP MCP',wp:'WP3',subtitle:'Read-only DPP connection',description:'A read-only MCP connection represented in the architecture for consulting Digital Product Passport information.',functions:['Read DPP information','Uses DPP SDK connection','Provides product context to the GenAI DSS'],x:38.0,y:20.6,w:19.2,h:8.0},
  {id:'wp5-catalogue',title:'Federated Catalogue',wp:'WP5',subtitle:'Data offering discovery',description:'A catalogue component in the Data Space subsystem that allows participants to discover published data offerings.',functions:['Discover data offerings','Read catalogue metadata','Support data discovery'],x:21.0,y:36.3,w:18.0,h:5.7},
  {id:'wp5-portal',title:'Data Space Portal',wp:'WP5',subtitle:'Participant-facing portal',description:'The portal groups the Data Space user interface and related components shown in the architecture.',functions:['Portal UI','Policy Store','PDP component'],x:20.0,y:45.0,w:21.0,h:13.3},
  {id:'wp5-policy',title:'Policy Store',wp:'WP5',subtitle:'Policy information',description:'A policy-related component shown within the Data Space Portal and the DPP repository architecture.',functions:['Stores policy information','Supports policy-related operations'],x:22.0,y:49.5,w:9.2,h:4.5},
  {id:'wp5-pdp',title:'PDP',wp:'WP5',subtitle:'Policy decision point',description:'The architecture identifies a PDP component as part of the policy and access-control flow.',functions:['Policy decision processing','Supports access-control decisions'],x:32.2,y:49.5,w:8.5,h:4.5},
  {id:'wp5-portal-ui',title:'Portal UI',wp:'WP5',subtitle:'Portal user interface',description:'The user interface shown within the Data Space Portal.',functions:['Participant interaction','Access to portal functions'],x:25.7,y:54.1,w:10.8,h:3.3},
  {id:'wp5-manage',title:'Manage connector policies / offerings',wp:'WP5',subtitle:'Connector and offering management',description:'A management component for connector policies and data offerings in the Data Space subsystem.',functions:['Manage connector policies','Manage data offerings'],x:21.0,y:60.2,w:21.0,h:4.7},
  {id:'wp5-supplier-connector',title:'Supplier Connector',wp:'WP5',subtitle:'Supplier-side data-space connection',description:'The connector shown in the supplier infrastructure, enabling the supplier environment to participate in Data Space exchanges.',functions:['Connect supplier systems','Support controlled data exchange','Interact with Data Space services'],x:15.4,y:67.2,w:12.0,h:4.0},
  {id:'wp5-operator-connector',title:'Economic Operator Connector',wp:'WP5',subtitle:'Economic-operator data-space connection',description:'The connector shown in the economic operator infrastructure, linking its systems to the Data Space environment.',functions:['Connect operator systems','Support data exchange','Interact with other connectors'],x:36.0,y:67.2,w:12.4,h:4.0},
  {id:'wp5-supplier-blockchain',title:'Supplier Blockchain Node',wp:'WP5',subtitle:'Blockchain infrastructure',description:'A blockchain node represented within the supplier infrastructure.',functions:['Blockchain network participation','Logging of relevant operations'],x:15.2,y:74.5,w:12.2,h:5.0},
  {id:'wp5-operator-blockchain',title:'Economic Operator Blockchain Node',wp:'WP5',subtitle:'Blockchain infrastructure',description:'A blockchain node represented within the economic operator infrastructure.',functions:['Blockchain network participation','Logging of relevant operations'],x:36.4,y:74.5,w:12.0,h:5.0},
  {id:'wp5-supplier-api',title:'Supplier API',wp:'WP5',subtitle:'Supplier-side API',description:'The API component shown in the supplier infrastructure, providing an interface to its services.',functions:['API access','Proxied calls'],x:5.1,y:73.3,w:9.0,h:4.1},
  {id:'wp5-operator-api',title:'Economic Operator API',wp:'WP5',subtitle:'Operator-side API',description:'The API component shown in the economic operator infrastructure.',functions:['API access','Proxied calls'],x:49.2,y:73.3,w:8.0,h:4.1},
  {id:'wp5-supplier-dss',title:'Supplier DSS UI',wp:'WP5',subtitle:'Supplier-side interface',description:'A DSS user interface represented in the supplier infrastructure.',functions:['User interaction with DSS services'],x:5.1,y:78.6,w:9.5,h:4.3},
  {id:'wp5-operator-dss',title:'Economic Operator DSS UI',wp:'WP5',subtitle:'Operator-side interface',description:'A DSS user interface represented in the economic operator infrastructure.',functions:['User interaction with DSS services'],x:42.1,y:81.6,w:10.5,h:4.0},
  {id:'wp4-backend',title:'Backend',wp:'WP4',subtitle:'Application backend',description:'The backend in the DPP subsystem connects the user applications with the connector and DPP SDK.',functions:['Connector integration','DPP SDK integration','DPP operations'],x:53.2,y:40.5,w:17.0,h:10.5},
  {id:'wp4-connector',title:'DPP Backend Connector',wp:'WP4',subtitle:'Backend connectivity',description:'The connector component within the DPP backend, linking backend services with external infrastructure.',functions:['Connect backend services','Support communication with external components'],x:54.0,y:45.0,w:9.6,h:5.4},
  {id:'wp4-sdk',title:'DPP SDK',wp:'WP4',subtitle:'Software Development Kit',description:'The SDK provides reusable software components to build, validate and manage Digital Product Passports and interact with DPP services.',functions:['Build and validate DPPs','Store passport data','Register passports','Connect to DPP services'],x:63.5,y:44.8,w:6.3,h:6.1},
  {id:'wp4-stakeholder',title:'Stakeholder App',wp:'WP4',subtitle:'Stakeholder-facing application',description:'An application area for stakeholders in the DPP subsystem. The architecture shows a DSS UI within it.',functions:['Stakeholder interaction','DSS user interface'],x:74.6,y:35.8,w:16.0,h:7.8},
  {id:'wp4-stakeholder-dss',title:'Stakeholder DSS UI',wp:'WP4',subtitle:'Stakeholder interface',description:'The DSS user interface represented inside the Stakeholder App.',functions:['Access to DSS functions'],x:78.8,y:39.2,w:8.3,h:2.8},
  {id:'wp4-viewer',title:'DPP Viewer App',wp:'WP4',subtitle:'Digital Product Passport viewer',description:'A user-facing application to access and consult furniture Digital Product Passport information.',functions:['Access passport information','Explore product data','Consult product characteristics'],x:74.6,y:43.5,w:16.0,h:9.2},
  {id:'wp4-identity',title:'Identity Manager',wp:'WP4',subtitle:'Identity and access management',description:'The identity component shown in the DPP subsystem. It participates in authentication and authorisation flows.',functions:['Manage users and roles','Support access rights','Validate JWT tokens','Interact with credential services'],x:73.2,y:54.0,w:18.0,h:5.8},
  {id:'wp4-wallet',title:'User EUDI Wallet',wp:'WP4',subtitle:'European Digital Identity Wallet',description:'The user wallet represented in the architecture for identity and verifiable-credential interactions.',functions:['User wallet interactions','Verifiable credential flows'],x:79.6,y:61.0,w:13.0,h:5.0},
  {id:'wp4-repository',title:'DPP Repository API',wp:'WP4',subtitle:'Passport repository services',description:'The repository API component shown in the economic operator infrastructure, connected to policy and passport data components.',functions:['DPP CRUD operations','Repository API','Policy Store and PDP components','DPP database connection'],x:57.0,y:72.0,w:14.0,h:10.0},
  {id:'wp4-repo-db',title:'DPP Database',wp:'WP4',subtitle:'Passport database',description:'The database component connected to the DPP repository infrastructure.',functions:['DPP data persistence'],x:63.7,y:86.7,w:7.0,h:5.0},
  {id:'ec-api',title:'EC DPP API',wp:'EC',subtitle:'European Commission DPP API',description:'The EC DPP system area in the architecture includes an API for interaction with the European DPP system.',functions:['EC DPP API','DPP metadata interaction'],x:63.5,y:17.0,w:9.0,h:7.5},
  {id:'ec-registry',title:'DPP Registry',wp:'EC',subtitle:'European DPP registry',description:'The registry component shown within the EC DPP system.',functions:['DPP registry services'],x:73.3,y:17.0,w:11.5,h:7.5},
  {id:'ec-portal',title:'DPP Web Portal',wp:'EC',subtitle:'European DPP web portal',description:'The web portal component shown within the EC DPP system.',functions:['Web portal access'],x:85.0,y:17.0,w:12.0,h:7.5},
  {id:'ebsi-issuer',title:'EBSI Trusted Issuer Registry',wp:'EBSI',subtitle:'Trusted issuer verification',description:'An EBSI service shown in the architecture for verifying the issuer of a verifiable credential.',functions:['Trusted issuer registry','Verify VC issuer'],x:73.3,y:71.4,w:16.2,h:5.0},
  {id:'ebsi-vc',title:'EBSI VC Validation Service',wp:'EBSI',subtitle:'Verifiable Credential validation',description:'An EBSI service shown in the architecture for verifying verifiable credentials.',functions:['Validate verifiable credentials'],x:73.3,y:78.0,w:16.2,h:5.0},
  {id:'ebsi-did',title:'EBSI DID Registry',wp:'EBSI',subtitle:'Decentralised identifiers',description:'An EBSI service shown in the architecture for resolving decentralised identifiers (DIDs).',functions:['DID registry','Resolve DID'],x:73.3,y:84.7,w:16.2,h:5.0},
];

const wpStyles: Record<WP, string> = {
  WP3:'bg-[#e8f5e8] text-[#286b2b] border-[#55a451]',
  WP4:'bg-[#e8f2ff] text-[#155c9b] border-[#5da3e0]',
  WP5:'bg-[#fff0e2] text-[#a64e0b] border-[#e18a36]',
  EC:'bg-[#e8f2ff] text-[#155c9b] border-[#5da3e0]',
  EBSI:'bg-[#e8f2ff] text-[#155c9b] border-[#5da3e0]',
  Infrastructure:'bg-[#fff0e2] text-[#a64e0b] border-[#e18a36]',
};

export default function Home() {
  const [selected, setSelected] = useState<ComponentInfo | null>(null);
  const [zoom, setZoom] = useState(1);
  const [query, setQuery] = useState('');
  const [canvaLinks, setCanvaLinks] = useState<Record<string,string>>({});
  const filtered = useMemo(() => components.filter(c => `${c.title} ${c.subtitle} ${c.wp}`.toLowerCase().includes(query.toLowerCase())), [query]);

  const openComponent = (component: ComponentInfo) => setSelected(component);
  const closePanel = () => setSelected(null);

  return (
    <main className="min-h-screen bg-[#f4f7fa] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#164e79] text-white"><Leaf size={22}/></div>
            <div><div className="text-xs font-bold tracking-[.18em] text-[#2875a7]">CIR4FUN</div><h1 className="text-lg font-extrabold tracking-tight sm:text-xl">Interactive Technology Architecture</h1></div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500"><span className="h-2.5 w-2.5 rounded-full bg-[#62ad3b]"/> WP3 <span className="h-2.5 w-2.5 rounded-full bg-[#1675cb]"/> WP4 <span className="h-2.5 w-2.5 rounded-full bg-[#ed861a]"/> WP5</div>
        </div>
      </header>

      <div className="mx-auto max-w-[1800px] px-3 py-4 sm:px-5 lg:px-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div><h2 className="text-sm font-bold text-slate-800 sm:text-base">CIR4FUN system architecture</h2><p className="text-xs text-slate-500">Select a component in the diagram to explore its role and related information.</p></div>
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <button onClick={() => setZoom(z => Math.max(.65, +(z-.1).toFixed(2)))} className="rounded-lg p-2 hover:bg-slate-100" aria-label="Zoom out"><Minus size={16}/></button>
            <span className="w-12 text-center text-xs font-semibold tabular-nums">{Math.round(zoom*100)}%</span>
            <button onClick={() => setZoom(z => Math.min(1.8, +(z+.1).toFixed(2)))} className="rounded-lg p-2 hover:bg-slate-100" aria-label="Zoom in"><Plus size={16}/></button>
            <button onClick={() => setZoom(1)} className="rounded-lg p-2 hover:bg-slate-100" aria-label="Reset zoom"><RotateCcw size={15}/></button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_350px]">
          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2.5">
              <span className="text-xs font-bold text-slate-600">ARCHITECTURE MAP</span>
              <span className="text-[11px] text-slate-400">Click a highlighted component</span>
            </div>
            <div className="diagram-scroll">
              <div className="diagram-stage" style={{ transform:`scale(${zoom})` }}>
                <Image src="/cir4fun-architecture.png" alt="CIR4FUN WP3, WP4 and WP5 technology architecture" width={1288} height={1221} priority className="diagram-image" />
                {components.map(component => (
                  <button
                    key={component.id}
                    type="button"
                    title={`Open ${component.title}`}
                    aria-label={`Open ${component.title} details`}
                    onClick={() => openComponent(component)}
                    className={`hotspot ${selected?.id===component.id?'hotspot-active':''}`}
                    style={{left:`${component.x}%`,top:`${component.y}%`,width:`${component.w}%`,height:`${component.h}%`}}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-3 py-2.5 text-[11px] text-slate-500">
              <span>Original architecture artwork · Interactive component overlay</span><span>{components.length} interactive areas</span>
            </div>
          </section>

          <aside className="min-w-0">
            {selected ? (
              <div className="sticky top-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className={`border-b p-4 ${wpStyles[selected.wp]}`}>
                  <div className="flex items-center justify-between gap-2"><span className="text-[11px] font-extrabold uppercase tracking-wider">{selected.wp==='EC'?'EC DPP SYSTEM':selected.wp==='EBSI'?'EBSI INFRASTRUCTURE':selected.wp==='Infrastructure'?'STAKEHOLDER INFRASTRUCTURE':`${selected.wp} · ${selected.wp==='WP3'?'ECODESIGN':selected.wp==='WP4'?'DIGITAL PRODUCT PASSPORT':'DATA SPACE'}`}</span><button onClick={closePanel} className="rounded-lg p-1.5 hover:bg-black/5" aria-label="Close panel"><X size={17}/></button></div>
                  <h3 className="mt-2 text-xl font-extrabold leading-tight">{selected.title}</h3><p className="mt-1 text-xs opacity-80">{selected.subtitle}</p>
                </div>
                <div className="space-y-4 p-4">
                  <div><div className="mb-1.5 flex items-center gap-2 text-xs font-bold text-slate-700"><Info size={14}/> About this component</div><p className="text-sm leading-relaxed text-slate-600">{selected.description}</p></div>
                  <div><div className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-700"><BookOpen size={14}/> Main functions</div><ul className="space-y-2">{selected.functions.map((f,i)=><li key={i} className="flex gap-2 text-sm text-slate-600"><ChevronRight size={15} className="mt-0.5 shrink-0 text-slate-400"/>{f}</li>)}</ul></div>
                  <div className="rounded-xl bg-slate-50 p-3"><label htmlFor="canva-url" className="mb-1.5 block text-xs font-bold text-slate-700">Canva page URL</label><input id="canva-url" type="url" placeholder="Paste public Canva link" value={canvaLinks[selected.id]??selected.page??''} onChange={e=>setCanvaLinks(prev=>({...prev,[selected.id]:e.target.value}))} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-blue-400"/><p className="mt-1.5 text-[10px] leading-relaxed text-slate-400">The public Canva link for this component can be added here. It is currently stored only in this browser session.</p>
                    {(canvaLinks[selected.id]??selected.page) && <a href={canvaLinks[selected.id]??selected.page} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#155b91] px-3 py-2.5 text-xs font-bold text-white hover:bg-[#104b79]">Open Canva page <ArrowUpRight size={14}/></a>}
                  </div>
                  <button onClick={closePanel} className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"><ArrowLeft size={14}/> Back to architecture</button>
                </div>
              </div>
            ) : (
              <div className="sticky top-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf2f8] text-[#175b8d]"><Info size={22}/></div>
                <h3 className="mt-3 text-lg font-extrabold">Explore the architecture</h3><p className="mt-1 text-sm leading-relaxed text-slate-500">Select any outlined component in the diagram. Its description, main functions and Canva page link will appear here.</p>
                <div className="relative mt-4"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search components..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-blue-400"/></div>
                <div className="mt-3 max-h-[420px] space-y-1 overflow-y-auto">{filtered.map(c=><button key={c.id} onClick={()=>openComponent(c)} className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left hover:bg-slate-50"><span><span className="block text-xs font-bold text-slate-700">{c.title}</span><span className="text-[10px] text-slate-400">{c.wp} · {c.subtitle}</span></span><ChevronRight size={14} className="text-slate-400"/></button>)}{filtered.length===0&&<p className="px-2 py-3 text-xs text-slate-400">No components found.</p>}</div>
                <div className="mt-4 rounded-xl bg-blue-50 p-3 text-xs leading-relaxed text-blue-900"><b>Tip:</b> Hover over the diagram to locate the interactive outlines, then click a component to open its details.</div>
              </div>
            )}
          </aside>
        </div>
        <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1 text-[10px] text-slate-400"><span>CIR4FUN · Interactive Technology Architecture</span><span>WP3 · WP4 · WP5 · EC DPP · EBSI</span></footer>
      </div>
    </main>
  );
}
