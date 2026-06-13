import React, { useState } from 'react';
import { AppTab } from './types';
import HeroHome from './components/HeroHome';
import HistoryArchiveView from './components/HistoryArchiveView';
import CultureTraditionView from './components/CultureTraditionView';
import LeadershipView from './components/LeadershipView';
import ProjectsView from './components/ProjectsView';
import ActivitiesView from './components/ActivitiesView';
import PublicationsView from './components/PublicationsView';
import GalleryView from './components/GalleryView';
import BlogView from './components/BlogView';
import VirtualRealityPortal from './components/VirtualRealityPortal';
import { 
  Home, 
  BookOpen, 
  Heart, 
  Scale, 
  Building, 
  Calendar, 
  FileText, 
  Menu, 
  X, 
  Flame, 
  Sparkles,
  MapPin,
  Search,
  ArrowRight,
  Image,
  Newspaper,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SEARCH_INDEX = [
  {
    title: "Umuode Landscape & Geography",
    category: "Home",
    tab: 'home' as AppTab,
    snippet: "A panoramic aerial drone photorealistic landscape of the circular dark-blue lake nestled in Nkanu East, Enugu State, Nigeria.",
    tags: ["landscape", "nature", "lake", "umuode", "enugu", "nigeria", "nkanu", "valley", "panoramic", "aerial"]
  },
  {
    title: "Umuode Cultural Heritage Day Video",
    category: "Home / Festive Videos",
    tab: 'home' as AppTab,
    snippet: "Archived video from YouTube showing the vibrant traditional dances, rich masquerade displays, and colourful attire on Heritage Day.",
    tags: ["youtube", "video", "heritage", "culture", "day", "dance", "celebration", "festival"]
  },
  {
    title: "Origins of Umuode Community",
    category: "Traditional Archive",
    tab: 'history' as AppTab,
    snippet: "Learn about the ancestral lineages of Umuode, their migration routes, and their settlement near the fertile shores of the Inyaba River.",
    tags: ["origins", "ancestral", "history", "roots", "lineage", "migration", "inyaba", "founders"]
  },
  {
    title: "Autonomous Recognition Status",
    category: "Traditional Archive",
    tab: 'history' as AppTab,
    snippet: "The history of Umuode receiving sovereign Autonomous Community status in Enugu State (officially recognized in 2002 after historic reconciliations).",
    tags: ["autonomous", "status", "recognition", "government", "conflict", "peace", "reconciliation", "2002", "enugu"]
  },
  {
    title: "The Sacred Inyaba River Lore",
    category: "Traditional Archive",
    tab: 'history' as AppTab,
    snippet: "The spiritual and ecological history of the Inyaba River which flows through the community as a symbol of purification and peace.",
    tags: ["inyaba", "river", "purification", "lore", "shrine", "spirituality", "sacred", "water"]
  },
  {
    title: "Traditional Marriage Customs (Stages)",
    category: "Culture & Custom",
    tab: 'culture' as AppTab,
    snippet: "Step-by-step custom of marriage listing: Ikuaka (Inquiry), Mmi Ikuaka (Inquiry Wine), Akuku (Agreement), and Igba Nkwu (Wine carrying).",
    tags: ["marriage", "traditional", "wedding", "stages", "ikuaka", "mmi", "akuku", "igba nkwu", "wine", "customs"]
  },
  {
    title: "Customary Bride Price & Items",
    category: "Culture & Custom",
    tab: 'culture' as AppTab,
    snippet: "The formal requirements, physical gift lists (yam, wine casks, textiles), and symbolic cash gestures established under customary bounds.",
    tags: ["bride", "price", "gift", "list", "yam", "textiles", "customary", "payments", "dowry"]
  },
  {
    title: "Kindred Groups & Kinship Circles",
    category: "Culture & Custom",
    tab: 'culture' as AppTab,
    snippet: "Umuode is divided into major kindred groups ensuring mutual welfare, elder-led adjudications, and clear genealogical lines.",
    tags: ["kindred", "kinship", "family", "clans", "unions", "welfare", "genealogy"]
  },
  {
    title: "Customary Adjudications & Fines",
    category: "Culture & Custom",
    tab: 'culture' as AppTab,
    snippet: "Rules governing minor disputes, civil arguments, traditional penalties, and restitution fines managed by our Council of Elders.",
    tags: ["fines", "civil", "penalties", "restitution", "elders", "customary", "rules", "disputes"]
  },
  {
    title: "The Igwe (King) & His Cabinet",
    category: "Governance",
    tab: 'leadership' as AppTab,
    snippet: "The supreme traditional ruler of Umuode, his Cabinet, and traditional title-holders directing cultural affairs and community harmony.",
    tags: ["igwe", "king", "cabinet", "ruler", "governance", "traditional", "royal", "titles"]
  },
  {
    title: "Umuode Town Union (UTU) EXCO",
    category: "Governance",
    tab: 'leadership' as AppTab,
    snippet: "The secular legislative and executive organ headed by the President General, administering modern developments and external government relations.",
    tags: ["town union", "utu", "president general", "pg", "exco", "administration", "development"]
  },
  {
    title: "Supreme Judicial Council & Council of Elders",
    category: "Governance",
    tab: 'leadership' as AppTab,
    snippet: "High conflicts resolution council formed by elders of the constituent kindreds, guaranteeing justice using ancestral custom and national statutes.",
    tags: ["judicial", "council", "elders", "court", "arbitration", "conflict", "justice"]
  },
  {
    title: "Water Borehole & Purification Plants",
    category: "Projects & Sites",
    tab: 'projects' as AppTab,
    snippet: "Community solar-powered borehole providing clean running-water access to dozens of families across kindred neighborhoods.",
    tags: ["water", "borehole", "solar", "purification", "infrastructure", "well"]
  },
  {
    title: "Umuode Primary Healthcare Centre",
    category: "Projects & Sites",
    tab: 'projects' as AppTab,
    snippet: "Fostering maternal care, local vaccination campaigns, and emergency first-aid operations supported by global sister-health programs.",
    tags: ["healthcare", "clinic", "hospital", "doctor", "nurse", "maternal", "health", "vaccination"]
  },
  {
    title: "The Civic Hall Community Centre",
    category: "Projects & Sites",
    tab: 'projects' as AppTab,
    snippet: "The central point for General Assembly meetings, child-naming ceremonies, agricultural exhibitions, and legislative voting blocks.",
    tags: ["civic", "hall", "meetings", "community centre", "building", "voting"]
  },
  {
    title: "Umuode Global Assembly (Branches)",
    category: "Global Assembly",
    tab: 'activities' as AppTab,
    snippet: "Connecting sons and daughters in Enugu, Abuja, Lagos, and the Diaspora (United Kingdom, USA, Europe) to coordinate community developments.",
    tags: ["branches", "global", "assembly", "enugu", "abuja", "lagos", "diaspora", "usa", "uk", "welfare"]
  },
  {
    title: "December Youth Carnival & Soccer League",
    category: "Global Assembly",
    tab: 'activities' as AppTab,
    snippet: "Bringing together local school students and visiting youth to engage in cooperative football tournaments, talent hunts, and awards.",
    tags: ["december", "youth", "football", "soccer", "carnival", "sports", "league"]
  },
  {
    title: "The Written Constitution of Umuode",
    category: "Constitutions",
    tab: 'publications' as AppTab,
    snippet: "Explore the comprehensive statutory constitution framing the balance of power between the Igwe cabinet, the Town Union, and the youth forums.",
    tags: ["constitution", "written", "statute", "articles", "laws", "power", "charter"]
  },
  {
    title: "By-Laws on Burials and Ceremonies",
    category: "Constitutions",
    tab: 'publications' as AppTab,
    snippet: "Strict guidelines meant to avoid competitive or lavish spending, safeguarding under-resourced families from predatory economic debts.",
    tags: ["burial", "laws", "ceremonies", "spending", "debts", "economic", "rules"]
  },
  {
    title: "Umuode Media Sanctuary Gallery",
    category: "Media & Gallery",
    tab: 'gallery' as AppTab,
    snippet: "A digital inventory of high-definition imagery including ecological records of the Inyaba wetlands, traditional masquerades, and community construction archives.",
    tags: ["gallery", "media", "photos", "archives", "pictures", "inyaba", "coral", "elders", "spectacular"]
  },
  {
    title: "The Citizen Chronicles Blog & Articles",
    category: "Community Blog",
    tab: 'blog' as AppTab,
    snippet: "Read latest developmental reviews, agricultural press releases, solar power project updates, and historical retrospective essays written by local authors.",
    tags: ["blog", "chronicles", "press", "infrastructure", "essays", "peace", "harmony", "water", "ecology", "news"]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);

  const subTabs = [
    { id: 'history' as AppTab, label: 'Traditional Archive', desc: 'Sovereignty milestones, peace accords, and origins.' },
    { id: 'culture' as AppTab, label: 'Culture & Custom', desc: 'Heritage arrays, sacred festivals, and masquerades.' },
    { id: 'leadership' as AppTab, label: 'Governance', desc: 'Cabinet of chiefs, kindred assemblies, and councils.' },
    { id: 'projects' as AppTab, label: 'Projects & Sites', desc: 'Solar grids, healthcare, and infrastructure sites.' }
  ];

  const mainTabs = [
    { id: 'home' as AppTab, label: 'Home', isDropdown: false },
    { id: 'about_us' as any, label: 'About Us', isDropdown: true, children: subTabs },
    { id: 'activities' as AppTab, label: 'Global Assembly', isDropdown: false },
    { id: 'publications' as AppTab, label: 'Constitutions', isDropdown: false },
    { id: 'gallery' as AppTab, label: 'Gallery', isDropdown: false },
    { id: 'blog' as AppTab, label: 'Blog Press', isDropdown: false }
  ];

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HeroHome onNavigate={(tab) => setActiveTab(tab)} />;
      case 'history':
        return <HistoryArchiveView />;
      case 'culture':
        return <CultureTraditionView />;
      case 'leadership':
        return <LeadershipView />;
      case 'projects':
        return <ProjectsView />;
      case 'activities':
        return <ActivitiesView />;
      case 'publications':
        return <PublicationsView />;
      case 'gallery':
        return <GalleryView />;
      case 'blog':
        return <BlogView />;
      default:
        return <HeroHome onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  // Keyboard shortcuts listener for search / escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal(true);
      }
      if (e.key === 'Escape') {
        setShowSearchModal(false);
        setShowGetStartedModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gold-50 flex flex-col justify-between selection:bg-maroon-800 selection:text-white">
      
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gold-500/10 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-maroon-800 to-maroon-900 flex items-center justify-center shadow-md border-2 border-gold-500">
              <Sparkles className="w-5 h-5 text-gold-500 group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <div className="font-serif font-bold text-maroon-900 leading-tight tracking-tight text-lg flex items-center gap-1">
                UMUODE
              </div>
              <span className="text-[9px] font-mono tracking-widest text-gold-600 block font-semibold uppercase">
                Autonomous Community
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1" id="desktop-nav">
            {mainTabs.map((tb) => {
              if (tb.isDropdown) {
                const isSubSelected = subTabs.some(sub => sub.id === activeTab);
                return (
                  <div
                    key={tb.id}
                    className="relative"
                    onMouseEnter={() => setIsAboutDropdownOpen(true)}
                    onMouseLeave={() => setIsAboutDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                      className={`relative px-3.5 py-2 text-[10.5px] font-bold font-display uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSubSelected 
                          ? 'text-maroon-900 font-extrabold' 
                          : 'text-slate-600 hover:text-maroon-900 hover:bg-gold-100/30 rounded-xl'
                      }`}
                      id={`nav-item-${tb.id}`}
                    >
                      <span className="relative z-10">{tb.label}</span>
                      <svg 
                        className={`w-3 h-3 transition-transform duration-200 ${isAboutDropdownOpen ? 'rotate-180 text-maroon-800' : 'text-slate-400'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                      {isSubSelected && (
                        <motion.div
                          layoutId="activeTabUnderline"
                          className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-amber-500 rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {isAboutDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-72 bg-white rounded-2xl border border-gold-200/50 shadow-xl p-3 grid grid-cols-1 gap-1 z-55"
                        >
                          {tb.children?.map((sub) => {
                            const isCurrent = activeTab === sub.id;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => {
                                  setActiveTab(sub.id);
                                  setIsAboutDropdownOpen(false);
                                }}
                                className={`w-full text-left p-3.5 rounded-xl transition-all cursor-pointer flex flex-col gap-1 ${
                                  isCurrent 
                                    ? 'bg-amber-50/50 border border-amber-200/50 text-maroon-900 font-extrabold shadow-sm' 
                                    : 'hover:bg-slate-50 border border-transparent'
                                }`}
                              >
                                <span className={`text-[11px] font-bold font-sans uppercase tracking-wider ${isCurrent ? 'text-maroon-900' : 'text-slate-800'}`}>
                                  {sub.label}
                                </span>
                                <span className="text-[10px] text-slate-400 font-light leading-normal normal-case tracking-normal">
                                  {sub.desc}
                                </span>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isSelected = activeTab === tb.id;
              return (
                <button
                  key={tb.id}
                  onClick={() => setActiveTab(tb.id)}
                  className={`relative px-3.5 py-2 text-[10.5px] font-bold font-display uppercase tracking-widest transition-all cursor-pointer ${
                    isSelected 
                      ? 'text-maroon-900 font-extrabold' 
                      : 'text-slate-600 hover:text-maroon-900 hover:bg-gold-100/30 rounded-xl'
                  }`}
                  id={`nav-item-${tb.id}`}
                >
                  <span className="relative z-10">{tb.label}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-amber-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Hand Toolbar: Search & Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Button */}
            <button 
              onClick={() => setShowSearchModal(true)}
              className="px-3 py-2 text-slate-600 hover:text-maroon-900 hover:bg-gold-50 rounded-xl transition-all border border-slate-200 cursor-pointer flex items-center gap-2 text-xs font-semibold shadow-xs"
              title="Search Portal (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Search</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200">⌘K</kbd>
            </button>
            
            {/* Visit Umuode Action Button */}
            <button 
              onClick={() => setShowGetStartedModal(true)}
              className="px-4 py-2 text-xs font-bold font-display tracking-tight text-white bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-maroon-950 hover:to-royal-950 rounded-xl shadow-md active:translate-y-[1px] transition-all cursor-pointer flex items-center gap-1.5 border border-maroon-950/20"
            >
              <Compass className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
              Visit Umuode
            </button>
          </div>

          {/* Mobile Right Hand Controls (Search + Hamburger) */}
          <div className="lg:hidden flex items-center gap-1.5">
            <button
              onClick={() => setShowSearchModal(true)}
              aria-label="Search Portal"
              className="p-2 text-slate-600 hover:text-maroon-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-18 left-0 right-0 bg-white border-b border-gold-500/10 p-4 shadow-xl z-30 space-y-2"
            id="mobile-nav-panel"
          >
            {/* Search & Get Started for Mobile at top of drawer */}
            <div className="grid grid-cols-2 gap-2 mb-3 pb-3 border-b border-gold-500/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowSearchModal(true);
                }}
                className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 bg-slate-50 hover:bg-gold-50 flex items-center justify-center gap-2 text-xs font-bold cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-500" />
                Search Directory
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowGetStartedModal(true);
                }}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-maroon-800 to-maroon-900 text-white flex items-center justify-center gap-1.5 text-xs font-bold shadow-sm cursor-pointer border border-maroon-950/20"
              >
                <Compass className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
                Visit Umuode
              </button>
            </div>

            {mainTabs.map((tb) => {
              if (tb.isDropdown) {
                const isSubActive = subTabs.some(sub => sub.id === activeTab);
                return (
                  <div key={tb.id} className="space-y-1">
                    <button
                      onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                      className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all cursor-pointer flex items-center justify-between border-l-4 ${
                        isSubActive 
                          ? 'bg-gradient-to-r from-maroon-50 to-gold-50/10 text-maroon-900 border-amber-500 font-extrabold' 
                          : 'text-gray-600 hover:bg-slate-50 border-transparent hover:border-slate-200'
                      }`}
                    >
                      <span>{tb.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isMobileAboutOpen ? 'rotate-180 text-maroon-800' : 'text-slate-400'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {(isMobileAboutOpen || isSubActive) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pl-5 overflow-hidden space-y-1"
                        >
                          {tb.children?.map((sub) => {
                            const isCurrent = activeTab === sub.id;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => {
                                  setActiveTab(sub.id);
                                  setMobileMenuOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border-l-2 ${
                                  isCurrent 
                                    ? 'bg-amber-50/40 text-maroon-900 border-amber-500 font-extrabold' 
                                    : 'text-gray-500 hover:text-slate-800 hover:bg-slate-50 border-transparent hover:border-slate-200'
                                }`}
                              >
                                {sub.label}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isSelected = activeTab === tb.id;
              return (
                <button
                  key={tb.id}
                  onClick={() => {
                    setActiveTab(tb.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all cursor-pointer border-l-4 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-maroon-50 to-gold-50/10 text-maroon-900 border-amber-500 font-extrabold' 
                      : 'text-gray-600 hover:bg-slate-50 border-transparent hover:border-slate-200'
                  }`}
                >
                  <span>{tb.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area Canvas */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Details */}
      <footer className="bg-slate-900 text-slate-300 border-t-2 border-gold-500 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-maroon-900" />
                </div>
                <span className="font-serif font-bold text-white text-lg tracking-wide">UMUODE PORTAL</span>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
                The supreme, authoritative digital portal tracking Umuode's constitutional evolution, geographic coordinates, age-grade directories, traditional marriage procedures, and global assembly structures.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-gold-500 tracking-wider block uppercase">
                Scenic Climate Coordinates
              </span>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Umuode Autonomous Community is nested within <strong className="text-white">Nkanu East Local Government Area, Enugu State, Nigeria</strong>. It shares historic borders with Akpuoga Nike, Nchatancha Nike, Akpugo, Akpawfu, Amaechi Idodo, and Amagunze.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-gold-500 tracking-wider block uppercase">
                Legal Attestation
              </span>
              <p className="text-xs text-slate-400 font-light leading-relaxed italic">
                &ldquo;All customary rules, marriage protocols, candidate succession criteria, and local judicial fines logged herein are fully aligned with the collective Umuode Autonomous Constitution.&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-4">
            <span>© 2026 Umuode Autonomous Community Portal. All rights reserved.</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gold-500" />
              <span>Nkanu East LGA, Enugu State, Nigeria</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Search Modal Overlay */}
      <AnimatePresence>
        {showSearchModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="search-modal-container">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => { setShowSearchModal(false); setSearchQuery(''); }}
            />

            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white border border-gold-300 shadow-2xl p-6 space-y-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center text-amber-700">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-md font-serif font-bold text-maroon-900 leading-none">Umuode Digital Directory Search</h3>
                      <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-tight">Search custom stages, by-laws, locations &amp; leadership</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setShowSearchModal(false); setSearchQuery(''); }}
                    className="p-1 px-2.5 hover:bg-slate-100 rounded-lg text-xs font-semibold text-gray-400 hover:text-slate-700 transition"
                  >
                    Close (ESC)
                  </button>
                </div>

                {/* Search Input field */}
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Type wedding, council, Inyaba, fine, projects, constitution..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-xs focus:outline-none focus:border-maroon-800 transition text-gray-800 font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-3 px-2 py-1 text-[10px] bg-slate-200 text-slate-600 rounded-md hover:bg-slate-300 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Search Results list */}
                <div className="max-h-[300px] overflow-y-auto pr-1 space-y-3 scrollbar-thin">
                  {(() => {
                    const query = searchQuery.trim().toLowerCase();
                    if (!query) {
                      return (
                        <div className="text-center py-6 text-slate-400 space-y-3">
                          <p className="text-xs font-medium">Popular Search Guides:</p>
                          <div className="flex flex-wrap justify-center gap-1.5 max-w-md mx-auto">
                            {["Marriage Stages", "Bride Price", "Inyaba River", "Town Union", "Borehole", "Written Constitution", "Burial Fines"].map((term) => (
                              <button
                                key={term}
                                onClick={() => setSearchQuery(term)}
                                className="px-2.5 py-1 text-[11px] font-semibold text-maroon-800 bg-gold-50 hover:bg-gold-100 rounded-lg border border-gold-200 cursor-pointer"
                              >
                                + {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    const filtered = SEARCH_INDEX.filter(item => 
                      item.title.toLowerCase().includes(query) ||
                      item.snippet.toLowerCase().includes(query) ||
                      item.category.toLowerCase().includes(query) ||
                      item.tags.some(tag => tag.toLowerCase().includes(query))
                    );

                    if (filtered.length === 0) {
                      return (
                        <div className="text-center py-10 space-y-2">
                          <p className="text-xs text-gray-500">No official logs matched <span className="font-mono font-semibold text-maroon-900">"{searchQuery}"</span></p>
                          <p className="text-[10px] text-gray-400">Try searching general components like "bride", "laws", "assembly", "water", or "council".</p>
                        </div>
                      );
                    }

                    return filtered.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setActiveTab(item.tab);
                          setShowSearchModal(false);
                          setSearchQuery('');
                        }}
                        className="p-3.5 rounded-2xl border border-slate-100 hover:border-gold-300 hover:bg-gold-50/20 cursor-pointer transition-all flex justify-between items-start group"
                      >
                        <div className="space-y-1 max-w-[88%]">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono uppercase bg-maroon-50 text-maroon-800 px-2 py-0.5 rounded-md font-bold tracking-wider">
                              {item.category}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-800 group-hover:text-maroon-900 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                            {item.snippet}
                          </p>
                        </div>
                        <div className="p-1.5 bg-slate-50 group-hover:bg-maroon-800 group-hover:text-white rounded-lg transition-all text-slate-400">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Visit Umuode VR/AR Modal Overlay */}
      <AnimatePresence>
        {showGetStartedModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="visitumuode-modal-container">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setShowGetStartedModal(false)}
            />

            <div className="flex min-h-screen items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-6xl h-[90vh] min-h-[550px] overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl z-10"
              >
                <VirtualRealityPortal onClose={() => setShowGetStartedModal(false)} />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
