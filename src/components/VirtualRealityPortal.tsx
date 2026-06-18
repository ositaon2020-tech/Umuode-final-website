import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  MapPin, 
  Camera, 
  Layers, 
  Volume2, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  Info, 
  X, 
  RotateCcw, 
  RotateCw,
  Sparkles,
  Map,
  Activity,
  Award,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Live Web Audio Sound Synthesizer Node
const playVrSound = (type: 'beep' | 'shutter' | 'ambient' | 'ping') => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    if (type === 'beep') {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.12);
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.16);
    } else if (type === 'shutter') {
      // Shutter snap sound (white noise + pitch sweep snap)
      const bufferSize = audioCtx.sampleRate * 0.12; 
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(7000, audioCtx.currentTime + 0.08);
      
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      
      noise.start();
      noise.stop(audioCtx.currentTime + 0.12);
    } else if (type === 'ping') {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(783.99, audioCtx.currentTime); // G5 note representing iron click
      osc.frequency.setValueAtTime(1174.66, audioCtx.currentTime + 0.02); // D6 perfect fifth
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.45);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } else if (type === 'ambient') {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(124, audioCtx.currentTime + 0.4);
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    }
  } catch (err) {
    console.warn("AudioContext unsupported/blocked", err);
  }
};

// VR Panoramic Nodes
interface VRNode {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  hotspots: {
    id: string;
    title: string;
    desc: string;
    x: number; // Percent from left (0 to 100)
    y: number; // Percent from top (0 to 100)
    color: string;
  }[];
}

const PANORAMIC_NODES: VRNode[] = [
  {
    id: "inyaba_stream",
    name: "The Sacred Inyaba River Sanctuary",
    category: "Waters & Peace",
    description: "The primary spiritual and ecological lifeline of Umuode, known for its pristine therapeutic sands and purifying water properties.",
    imageUrl: "https://drive.google.com/file/d/1sZbycIlgNXPUYYD0sQaGE2SX4Ho9tdzD/view?usp=drive_link", // Forest river coordinates
    hotspots: [
      { id: "h1", title: "Ritual Purifications", desc: "Lineage elders gather on this shore annually with white chalk (Nzu) to evoke peaceful Chi alignments.", x: 28, y: 48, color: "bg-teal-500 border-teal-200" },
      { id: "h2", title: "Pristine Glass Sands", desc: "A key economic block defined under local laws. Clean sand is restricted from harmful industrial dredging to safeguard the fish nurseries.", x: 55, y: 72, color: "bg-amber-500 border-amber-200" },
      { id: "h3", title: "Boundary Junction", desc: "The deep waters flow eastward joining the Amaechi Idodo community boundaries.", x: 82, y: 35, color: "bg-blue-500 border-blue-200" }
    ]
  },
  {
    id: "Ode 1 Bar",
    name: "His Royal Highness Igwe Court Palace",
    category: "Royal Sovereignty",
    description: "The seat of local royalty, built with high-vaulted corridors showcasing carved wood emblems and traditional copper royal insignias.",
    imageUrl: "https://drive.google.com/file/d/1zVOPs-8_DaXvPaSjhp5ohKDggHMO8zPJ/view?usp=drive_link", // Festive open court entrance atmosphere
    hotspots: [
      { id: "p1", title: "Royal Throne (Oche Igwe)", desc: "Dressed in red velvet and leopard skins, representing sovereign protection and physical custom leadership.", x: 50, y: 55, color: "bg-rose-600 border-rose-300" },
      { id: "p2", title: "Sovereign Spear (Ofo)", desc: "The supreme physical totem of truth. No law or elders treaty can be sealed without hoisting this ivory emblem.", x: 18, y: 42, color: "bg-gold-500 border-yellow-200" },
      { id: "p3", title: "The King's Cabinet Table", desc: "Seats reserved for the high chiefs representing the five distinct ancestral kindred lineages.", x: 74, y: 65, color: "bg-emerald-600 border-emerald-300" }
    ]
  },
  {
    id: "eke_market_square",
    name: "The Ancient Eke Market Square & Civic Dome",
    category: "Communal Centrality",
    description: "The historical high-density trading center where yams, fine palm wine taps, and cooperative livestock change hands under the local trade Union protocols.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80", // Vibrant African sunny communal square look
    hotspots: [
      { id: "m1", title: "Traditional Palm Wine Vault", desc: "A dedicated checkpoint with strict regulatory standard tests ensuring pure palm wine without artificial dilution.", x: 30, y: 62, color: "bg-amber-600 border-amber-300" },
      { id: "m2", title: "Constitutional Assembly Pillars", desc: "Stone foundations where modern charters and by-laws on burials and titles are physically cast.", x: 68, y: 50, color: "bg-indigo-600 border-indigo-300" },
      { id: "m3", title: "Agricultural Contest Board", desc: "Site of the annual yam festival (Iri Ji) weighing, crowning Umuode's supreme harvester (Ogbuefi).", x: 80, y: 70, color: "bg-green-600 border-green-300" }
    ]
  },
  {
    id: "ngene_iji_springs",
    name: "Ngene Iji Sacred Springs & Conservation Zone",
    category: "Ecological Heritage",
    description: "Deep subterranean spring waters welling up into a secluded limestone bowl, preserving ancient flora and micro-climate stability.",
    imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1600&q=80", // Sunlit water rays nature
    hotspots: [
      { id: "s1", title: "The Blue Reservoir", desc: "Naturally filtered through white volcanic sand, generating pure drinking cooling water.", x: 42, y: 58, color: "bg-sky-500 border-sky-200" },
      { id: "s2", title: "Sacred Medicinal Flora", desc: "Untouched tropical foliage protected by customary bylaws prohibiting forest logging at the spring base.", x: 15, y: 25, color: "bg-emerald-500 border-emerald-200" },
      { id: "s3", title: "Ngene Oracle Obelisk", desc: "An ancient basalt alignment memorializing the initial pioneers who located water during the settlement era.", x: 78, y: 44, color: "bg-purple-600 border-purple-300" }
    ]
  }
];

// AR HUD Filter Layers
interface ARFilter {
  id: string;
  name: string;
  description: string;
  colorTheme: string; // Tailwind color class
  overlayPoints: {
    label: string;
    details: string;
    distance: string;
    altitude: string;
    x: number;
    y: number;
    status: string;
  }[];
}

const AR_FILTERS: ARFilter[] = [
  {
    id: "lidar",
    name: "🏛️ Ancestral Landmarks & Elev. (LIDAR)",
    description: "Laser-pulse elevation tracking scanning structures, custom heights, and deep water terrain.",
    colorTheme: "text-green-400 border-green-500/30 bg-green-950/20",
    overlayPoints: [
      { label: "Water Reservoir Peak", details: "Solar Borehole Plant Node", distance: "420m", altitude: "Elev: +168m ASL", x: 22, y: 34, status: "ACTIVE SCANNING" },
      { label: "Inyaba River Bed Depth", details: "Lush Silt Deposition Plane", distance: "1.2km", altitude: "Elev: +74m ASL", x: 75, y: 78, status: "CLEAR FLOW" },
      { label: "Community Civic Dome Peak", details: "High Structural Timber Dome", distance: "280m", altitude: "Elev: +182m ASL", x: 50, y: 22, status: "STRUCTURAL SECURE" }
    ]
  },
  {
    id: "kindred",
    name: "🛡️ Kindred Borders & Sovereignty",
    description: "Sovereign ancestral borders protecting the constituent lineage quadrants.",
    colorTheme: "text-amber-400 border-amber-500/30 bg-amber-950/20",
    overlayPoints: [
      { label: "Umuode Core Settlement Quadrant", details: "Aka-Nri Kindred Assembly Center", distance: "50m", altitude: "Area: 1.2 sq km", x: 30, y: 45, status: "ROYAL CHARTERED" },
      { label: "Omeloha Sovereign Custom Buffer", details: "Adjudicated Kindred Buffer Zone", distance: "580m", altitude: "Area: 0.8 sq km", x: 65, y: 38, status: "PEACE BOUND" },
      { label: "Elders Judicial Assembly Courtyard", details: "Kindred Arbitration Zone", distance: "190m", altitude: "Area: 0.45 sq km", x: 48, y: 62, status: "ACTIVE COUNCIL" }
    ]
  },
  {
    id: "agricultural",
    name: "🌾 Agricultural & Ecology Scanner",
    description: "Multispectral analysis scoring crop health, water table vegetation, and palm-wine indices.",
    colorTheme: "text-teal-400 border-teal-500/30 bg-teal-950/20",
    overlayPoints: [
      { label: "Nkwu Palm Forest Stand", details: "Active Palm Wine Sap Sourcing", distance: "390m", altitude: "Health Index: 98.4%", x: 18, y: 55, status: "PRISTINE TAPS" },
      { label: "Community Grand Yam Reserve", details: "Cassava & Yam Cooperative Field", distance: "650m", altitude: "Soil Nitrogen: Balanced", x: 82, y: 48, status: "OPTIMAL YIELD" },
      { label: "Livestock Grazing Quadrant", details: "Common Pasture & Snail Center", distance: "470m", altitude: "Fodder Moisture: High", x: 55, y: 68, status: "ORGANIC FREE" }
    ]
  }
];

// Snapshot interface
interface VRARSnapshot {
  id: string;
  title: string;
  mode: 'VR' | 'AR';
  layerName: string;
  timestamp: string;
  imageUrl: string;
  telemetry: string;
}

export default function VirtualRealityPortal({ onClose }: { onClose: () => void }) {
  // Global View Mode Toggle
  const [activeTab, setActiveTab] = useState<'VR' | 'AR'>('VR');

  // VR Mode States
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [panAngle, setPanAngle] = useState(0); // Offset in percentage (-30 to +30)
  const [selectedHotspot, setSelectedHotspot] = useState<{ id: string; title: string; desc: string } | null>(null);

  // AR Mode States
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [lensZoom, setLensZoom] = useState(1.0); // 1.0x to 3.0x
  const [shutterFlash, setShutterFlash] = useState(false);
  const [scannedPoints, setScannedPoints] = useState<string[]>([]);
  const [customPhotoJournal, setCustomPhotoJournal] = useState<VRARSnapshot[]>([]);
  const [guidanceMessage, setGuidanceMessage] = useState("Align camera crosshairs. Select an AR filter to overlay custom geographical metadata.");

  // Ambient beep loader on component startup
  useEffect(() => {
    playVrSound('ping');
    // Rotate messages for AR Guide
    if (activeTab === 'AR') {
      const messages = [
        "LIDAR signals are currently lock-tracking local elevations... High-density clay soil spotted near base.",
        "Kindred sovereignty boundaries have loaded. Custom buffers are marked with 3D status indicators.",
        "Farming canopy green index identified. Ideal organic crop development conditions verified.",
        "Camera locked. Tap ‘Take Snapshot’ to store this geotagged view in your custom visitor journal."
      ];
      setGuidanceMessage(messages[selectedFilterIndex] || messages[0]);
    }
  }, [activeTab, selectedFilterIndex]);

  // Handle VR panoramic sweep panning
  const panLeft = () => {
    setPanAngle(prev => Math.max(prev - 8, -25));
    playVrSound('ambient');
  };
  const panRight = () => {
    setPanAngle(prev => Math.min(prev + 8, 25));
    playVrSound('ambient');
  };
  const resetPan = () => {
    setPanAngle(0);
    playVrSound('ambient');
  };

  // Capture simulated snapshot
  const triggerSnapshot = () => {
    playVrSound('shutter');
    setShutterFlash(true);
    
    setTimeout(() => {
      setShutterFlash(false);
      
      const currentNodeName = PANORAMIC_NODES[activeNodeIndex].name;
      const currentFilter = AR_FILTERS[selectedFilterIndex];
      const timestampStr = new Date().toLocaleTimeString();

      const newSnapshot: VRARSnapshot = {
        id: Math.random().toString(36).substr(2, 9),
        title: activeTab === 'VR' ? `Perspective of ${currentNodeName}` : `AR Geotagged Survey Frame`,
        mode: activeTab,
        layerName: activeTab === 'VR' ? PANORAMIC_NODES[activeNodeIndex].category : currentFilter.name,
        timestamp: timestampStr,
        imageUrl: activeTab === 'VR' ? PANORAMIC_NODES[activeNodeIndex].imageUrl : "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
        telemetry: activeTab === 'VR' 
          ? `Pan Offset: ${panAngle}%, Node ID: ${PANORAMIC_NODES[activeNodeIndex].id}` 
          : `Zoom: ${lensZoom.toFixed(1)}x, Layer: ${currentFilter.id.toUpperCase()}, Coordinates Verified`
      };

      setCustomPhotoJournal(prev => [newSnapshot, ...prev]);
    }, 200);
  };

  const deleteSnapshot = (id: string) => {
    setCustomPhotoJournal(prev => prev.filter(snap => snap.id !== id));
    playVrSound('ambient');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 animate-fade-in font-sans">
      
      {/* Upper Brand Control Banner */}
      <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-maroon-800 to-amber-600 flex items-center justify-center text-white shadow-md border border-amber-500/20">
            <Compass className="w-5.5 h-5.5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono tracking-widest bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-md uppercase">
                VIRTUAL VISIT EXPERIENCE
              </span>
              <span className="text-xs text-slate-500 font-mono">Ver 2.6 • Active</span>
            </div>
            <h1 className="text-lg md:text-xl font-serif font-black text-white flex items-center gap-2">
              Umuode VR &amp; AR Interactive Space
            </h1>
          </div>
        </div>

        {/* Real-time Sub-Navigation Selector */}
        <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => {
              playVrSound('ping');
              setActiveTab('VR');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
              activeTab === 'VR' 
                ? 'bg-gradient-to-r from-maroon-850 to-maroon-900 text-white font-bold shadow-md border border-maroon-700/30' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            360° VR Panorama Mode
          </button>
          
          <button
            onClick={() => {
              playVrSound('ping');
              setActiveTab('AR');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
              activeTab === 'AR' 
                ? 'bg-gradient-to-r from-maroon-850 to-maroon-900 text-white font-bold shadow-md border border-maroon-700/30' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Live HUD AR Scanner Mode
          </button>
        </div>

        {/* Global Exit */}
        <button
          onClick={onClose}
          className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition cursor-pointer border border-slate-800"
          title="Exit VR Space"
        >
          <X className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 flex-1 overflow-y-auto">
        
        {/* LEFT COLUMN: ACTIVE INTERACTIVE VIEWER (VR OR AR) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          {/* THE SCREEN STAGE */}
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border-2 border-slate-850 shadow-2xl flex flex-col justify-between group">
            {shutterFlash && (
              <motion.div 
                initial={{ opacity: 1 }} 
                animate={{ opacity: 0 }} 
                className="absolute inset-0 bg-white z-40"
              />
            )}

            {/* TAB 1: VR 360° ENGINE */}
            {activeTab === 'VR' && (
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {/* 360 Wide Background Scenery with dynamic pan translational shift */}
                <motion.div
                  key={PANORAMIC_NODES[activeNodeIndex].id}
                  style={{ 
                    backgroundImage: `url(${PANORAMIC_NODES[activeNodeIndex].imageUrl})`,
                    backgroundPosition: `calc(50% + ${panAngle}px) center`,
                    backgroundSize: '115% 105%'
                  }}
                  className="absolute inset-0 w-full h-full bg-cover bg-no-repeat transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Ambient dark radial edge overlay */}
                <div className="absolute inset-0 bg-radial-gradient-vignette pointer-events-none" />

                {/* VR Node Heading Badge */}
                <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-800 max-w-sm">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest">
                    <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                    Interactive Panorama Room
                  </div>
                  <h3 className="text-sm font-serif font-bold text-white mt-0.5">
                    {PANORAMIC_NODES[activeNodeIndex].name}
                  </h3>
                  <p className="text-[10px] text-slate-300 font-light mt-1 leading-normal">
                    {PANORAMIC_NODES[activeNodeIndex].description}
                  </p>
                </div>

                {/* Dynamic Floating Hotspot Pins over VR scene */}
                {PANORAMIC_NODES[activeNodeIndex].hotspots.map((h) => {
                  const xOffset = h.x + (panAngle * 0.15); // Displace slightly with pan for parallax depth 
                  return (
                    <div
                      key={h.id}
                      style={{ left: `${xOffset}%`, top: `${h.y}%` }}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                    >
                      <button
                        onClick={() => {
                          playVrSound('ping');
                          setSelectedHotspot(h);
                        }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-white border shadow-lg cursor-pointer relative hover:scale-115 transition-all duration-200 outline-none ${h.color}`}
                        title={h.title}
                      >
                        <Info className="w-3.5 h-3.5 text-white" />
                        <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                      </button>
                      
                      <span className="mt-1 block bg-slate-950/90 text-white border border-slate-800 text-[8.5px] font-bold px-1.5 py-0.5 rounded shadow-md font-mono text-center">
                        {h.title}
                      </span>
                    </div>
                  );
                })}

                {/* VR Panning Controller interface overlays */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-4 z-20 shadow-xl">
                  <button
                    onClick={panLeft}
                    disabled={panAngle === -25}
                    className="p-1 px-2 hover:bg-slate-850 rounded-lg text-slate-300 disabled:opacity-40 transition cursor-pointer text-xs flex items-center gap-1.5"
                    title="Pan Chamber left"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                    Pan L
                  </button>
                  <button
                    onClick={resetPan}
                    className="p-1 px-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-850 rounded-lg text-xs font-mono text-slate-300 cursor-pointer text-[10px]"
                    title="Realight viewport parameters"
                  >
                    0° Centered
                  </button>
                  <button
                    onClick={panRight}
                    disabled={panAngle === 25}
                    className="p-1 px-2 hover:bg-slate-850 rounded-lg text-slate-300 disabled:opacity-40 transition cursor-pointer text-xs flex items-center gap-1.5"
                    title="Pan Chamber right"
                  >
                    Pan R
                    <RotateCw className="w-3.5 h-3.5 text-amber-500" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: AR LIVE VIEWPORT HUD */}
            {activeTab === 'AR' && (
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {/* Simulated live video static background (Lush environment background) */}
                <div 
                  style={{ 
                    backgroundImage: `url(${PANORAMIC_NODES[1].imageUrl})`,
                    backgroundPosition: 'center',
                    backgroundSize: '108%',
                    transform: `scale(${lensZoom})`
                  }}
                  className="absolute inset-0 w-full h-full bg-cover transition-transform duration-300 filter brightness-95"
                />

                {/* Matrix / Radar scanning lines simulation overlay */}
                <div className="absolute inset-0 bg-radar-scanlines pointer-events-none opacity-40 z-10" />

                {/* Dynamic spinning AR crosshairs targeting center screen */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center">
                  <div className="w-24 h-24 border-2 border-dashed border-red-500/50 rounded-full animate-spin-slow flex items-center justify-center">
                    <div className="w-12 h-12 border-2 border-red-500/60 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    </div>
                  </div>
                  <span className="text-[7.5px] font-mono tracking-widest text-red-500 bg-black/70 px-1 py-0.5 rounded mt-2 uppercase font-bold">
                    GPS LOCK CONFIRMED
                  </span>
                </div>

                {/* Upper Left Active AR Layer metadata overlay info */}
                <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 max-w-sm">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono font-black text-green-400 uppercase tracking-widest">
                    <Activity className="w-3.5 h-3.5 text-green-400 animate-pulse" />
                    Live AR Hologram Overlay
                  </div>
                  <h3 className="text-xs font-mono font-bold text-white mt-1 uppercase">
                    {AR_FILTERS[selectedFilterIndex].name}
                  </h3>
                  <p className="text-[9.5px] text-slate-300 font-light mt-0.5 leading-normal">
                    {AR_FILTERS[selectedFilterIndex].description}
                  </p>
                </div>

                {/* Upper Right Real-time device coordinate stats */}
                <div className="absolute top-4 right-4 z-10 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-lg border border-slate-800 text-[9px] font-mono text-right text-slate-300 space-y-0.5 leading-none">
                  <div>LAT: <span className="font-bold text-amber-500">6.3881° N</span></div>
                  <div>LON: <span className="font-bold text-amber-500">7.6202° E</span></div>
                  <div>ALT: <span className="font-bold text-amber-500">144m ASL</span></div>
                  <div className="text-slate-500 text-[8px] mt-1 pt-1 border-t border-slate-800 uppercase font-black text-green-400">CAMERA OK</div>
                </div>

                {/* Simulated Geotagged Hologram Pins Floating on screen */}
                <AnimatePresence>
                  {AR_FILTERS[selectedFilterIndex].overlayPoints.map((pt, i) => (
                    <motion.div
                      key={pt.label}
                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 100, delay: i * 0.1 }}
                      style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 text-left"
                    >
                      <button
                        onClick={() => {
                          playVrSound('ping');
                          setScannedPoints(prev => prev.includes(pt.label) ? prev : [...prev, pt.label]);
                        }}
                        className="group flex flex-col items-center bg-slate-950/90 hover:bg-slate-900 border-2 border-red-500/80 rounded-xl p-2.5 text-[10px] text-slate-100 shadow-2xl cursor-pointer transition-all duration-200"
                      >
                        <div className="flex items-center gap-1.5 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                          <span className="max-w-[120px] truncate">{pt.label}</span>
                        </div>
                        <div className="text-[8px] text-slate-400 leading-normal mt-0.5">{pt.details}</div>
                        <div className="flex gap-2 text-[8px] font-mono text-red-400 font-bold mt-1 uppercase border-t border-slate-800 pt-1 w-full justify-between leading-none">
                          <span>{pt.distance}</span>
                          <span>{pt.altitude}</span>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Simulated Zoom & Lens Focal Adjuster Side Controls */}
                <div className="absolute right-4 bottom-14 z-20 flex flex-col gap-2.5 bg-slate-950/80 backdrop-blur-md p-2 rounded-xl border border-slate-800">
                  <button
                    onClick={() => {
                      setLensZoom(prev => Math.min(prev + 0.5, 3.0));
                      playVrSound('ambient');
                    }}
                    className="p-1 px-1.5 hover:bg-slate-850 rounded-lg text-slate-300 transition cursor-pointer text-[10px] flex items-center justify-center gap-1.5"
                    title="Zoom focal camera"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-amber-500" />
                    +Zoom
                  </button>
                  <div className="h-0.5 bg-slate-800" />
                  <button
                    onClick={() => {
                      setLensZoom(prev => Math.max(prev - 0.5, 1.0));
                      playVrSound('ambient');
                    }}
                    className="p-1 px-1.5 hover:bg-slate-850 rounded-lg text-slate-300 transition cursor-pointer text-[10px] flex items-center justify-center gap-1.5"
                    title="Zoom out focal camera"
                  >
                    <ZoomOut className="w-3.5 h-3.5 text-amber-500" />
                    -Zoom
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Visual Overlay Card Info when Hotspot is Selected */}
            <AnimatePresence>
              {selectedHotspot && activeTab === 'VR' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="absolute bottom-4 left-4 right-4 bg-slate-950/95 backdrop-blur-xl border border-slate-800 p-4 rounded-xl z-20 space-y-2 max-w-xl mx-auto shadow-2xl"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase font-bold">
                        SOVEREIGN METADATA HOTSPOT • LOADED
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        playVrSound('ambient');
                        setSelectedHotspot(null);
                      }}
                      className="text-slate-400 hover:text-white p-1 hover:bg-slate-900 rounded-lg transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  <h4 className="text-sm font-serif font-black text-white">
                    {selectedHotspot.title}
                  </h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {selectedHotspot.desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LOWER CONTROL BAR FOR ACTIONS */}
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-850 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-950 text-amber-500 rounded-lg border border-slate-800">
                <Volume2 className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 tracking-wider uppercase block">
                  Interactive Audio Status
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  Web Audio Synthesized Atmosphere Active ({activeTab === 'VR' ? 'Chamber Reverberation' : 'LIDAR Echoes'})
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={triggerSnapshot}
                className="px-5 py-2.5 bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-maroon-950 hover:to-royal-950 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition flex items-center gap-2 border border-maroon-950/20"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                Take Snapshot Geotag
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DIRECTORY OF PLACES / AR FILTERS & VISITATION JOURNAL */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          
          {/* TAB CONTENT SWITCHER CONTROLS */}
          {activeTab === 'VR' ? (
            <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-850 space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-amber-500 uppercase font-black block">
                  360° VR Vistas Deck
                </span>
                <p className="text-xs text-slate-400 font-light">
                  Choose an ancestral location to teleport your camera:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {PANORAMIC_NODES.map((nd, idx) => {
                  const active = activeNodeIndex === idx;
                  return (
                    <button
                      key={nd.id}
                      onClick={() => {
                        playVrSound('ping');
                        setActiveNodeIndex(idx);
                        setSelectedHotspot(null);
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        active 
                          ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-amber-500/80 hover:border-amber-500' 
                          : 'bg-slate-950/60 border-slate-900 hover:border-slate-800 hover:bg-slate-900/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500">
                          {nd.category}
                        </span>
                        <h4 className={`text-xs font-serif font-bold ${active ? 'text-white' : 'text-slate-300'}`}>
                          {nd.name}
                        </h4>
                      </div>
                      <div className={`p-1.5 rounded-lg border text-xs tracking-wider font-mono font-bold ${
                        active 
                          ? 'bg-amber-500/25 border-amber-500/40 text-amber-400' 
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}>
                        {idx + 1}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-850 space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-green-400 uppercase font-black block">
                  AR HUD Sensors Layers
                </span>
                <p className="text-xs text-slate-400 font-light">
                  Overlay dynamic community intelligence metrics:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {AR_FILTERS.map((filt, idx) => {
                  const active = selectedFilterIndex === idx;
                  return (
                    <button
                      key={filt.id}
                      onClick={() => {
                        playVrSound('beep');
                        setSelectedFilterIndex(idx);
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        active 
                          ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-green-500/60 hover:border-green-500' 
                          : 'bg-slate-950/60 border-slate-900 hover:border-slate-850 hover:bg-slate-900/40'
                      }`}
                    >
                      <div className="space-y-1 max-w-[90%]">
                        <h4 className={`text-xs font-mono font-bold ${active ? 'text-green-400' : 'text-slate-300'}`}>
                          {filt.name}
                        </h4>
                        <p className="text-[9.5px] text-slate-400 leading-normal font-light">
                          {filt.description}
                        </p>
                      </div>
                      {active && (
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TOUR GUIDE NARRATION COMMUNICATOR */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-5 rounded-2xl border border-slate-850 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-[9.5px] font-mono font-bold tracking-widest text-amber-500 uppercase">
                AR Companion Guide Feedback
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-light italic">
              {activeTab === 'VR' 
                ? `“You are observing ${PANORAMIC_NODES[activeNodeIndex].name}. Click on the golden 'i' pins floating on your landscape viewer to uncover hidden customs and legal parameters protecting this sacred site.”` 
                : `“${guidanceMessage}”`
              }
            </p>
            {scannedPoints.length > 0 && activeTab === 'AR' && (
              <div className="pt-2 border-t border-slate-850/80 space-y-1.5">
                <span className="text-[8.5px] font-mono text-slate-500 uppercase block tracking-wider font-bold">
                  Geotagged Points Locked ({scannedPoints.length}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {scannedPoints.map((pt) => (
                    <span 
                      key={pt} 
                      className="text-[8.5px] font-mono bg-green-950/50 text-green-400 px-1.5 py-0.5 rounded border border-green-500/20"
                    >
                      ✓ {pt}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SNAPSHOT VISITOR JOURNAL */}
          <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-850 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-black">
                  Your Visitor Tour Journal
                </span>
                <span className="text-[9.5px] font-mono text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">
                  {customPhotoJournal.length} Capture{customPhotoJournal.length === 1 ? '' : 's'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-light leading-normal">
                Stored Geotag snapshots captured during your visual visit of Umuode portal.
              </p>
            </div>

            {/* Simulated Photo Thumbnails scroll list */}
            <div className="flex-1 overflow-y-auto max-h-[190px] space-y-2.5 pr-1">
              {customPhotoJournal.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center text-slate-600 border border-dashed border-slate-800 rounded-xl bg-slate-950/20">
                  <Camera className="w-8 h-8 opacity-40 mb-2 text-slate-500" />
                  <span className="text-xs font-medium block">Journal Empty</span>
                  <span className="text-[10px] text-slate-600 font-light block">Tap "Take Snapshot" to capture frames</span>
                </div>
              ) : (
                customPhotoJournal.map((snap) => (
                  <motion.div
                    key={snap.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-850 flex gap-3 items-center relative group"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                      <img 
                        src={snap.imageUrl} 
                        alt="Thumbnail" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 justify-between">
                        <span className="text-[8.5px] font-mono text-amber-500 uppercase block tracking-wider font-bold">
                          {snap.layerName}
                        </span>
                        <span className="text-[8.5px] font-mono text-slate-500">{snap.timestamp}</span>
                      </div>
                      <h4 className="text-xs font-serif font-black text-slate-200 truncate pr-4">
                        {snap.title}
                      </h4>
                      <p className="text-[9px] font-mono text-slate-400 truncate">
                        {snap.telemetry}
                      </p>
                    </div>

                    {/* Delete snapshot button */}
                    <button
                      onClick={() => deleteSnapshot(snap.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-lg transition"
                      title="Delete entry"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {customPhotoJournal.length > 0 && (
              <div className="pt-2 border-t border-slate-850/80">
                <button
                  onClick={() => {
                    playVrSound('ping');
                    alert("Snapshot telemetry journal certified! Telemetry metadata packet holds " + customPhotoJournal.length + " local frames.");
                  }}
                  className="w-full py-2 bg-slate-950 hover:bg-slate-900 text-[11px] font-mono text-amber-400 hover:text-amber-300 font-bold rounded-lg transition border border-amber-505/10 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3 h-3 text-amber-400" />
                  Certify Telemetry Packet
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* FOOTER CO-ORDINATES AND INFORMATION STATUS */}
      <div className="px-6 py-2.5 bg-slate-950 border-t border-slate-900 text-slate-500 text-[9px] font-mono flex flex-col sm:flex-row justify-between items-center">
        <span>SOVEREIGN ARCHIVE ID: UMUODE_VR_AR_2026_INTEGRAL</span>
        <span className="text-amber-500">NKANU EAST LGA COOPERATIVE DEVELOPMENT PROTOCOL</span>
      </div>

    </div>
  );
}
