import React, { useState } from 'react';
import { INTRO_TEXT } from '../data/historyData';
import { COMPOSITE_UNITS } from '../data/cultureData';
import { PROJECTS } from '../data/projectsData';
import { BRANCHES_FEDERATION } from '../data/activitiesData';
import { 
  Compass, 
  MapPin, 
  Leaf, 
  Sparkles, 
  Activity, 
  Users, 
  Calendar, 
  Anchor,
  HelpCircle,
  Video,
  ExternalLink,
  Hammer,
  Store,
  Sprout,
  Palmtree,
  HeartHandshake,
  Newspaper,
  ChevronRight,
  User,
  BookOpen,
  RefreshCw,
  Copy,
  Check,
  Volume2,
  Play,
  Image as ImageIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { DEFAULT_POSTS } from '../data/blogData';

// Traditional Sound Engine using pure Web Audio API
const playTraditionalDrum = (pitch: number = 1) => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Drum body simulator (low pitch sine/triangle wave with rapid decay)
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    // Set pitch
    osc.frequency.setValueAtTime(85 * pitch, audioCtx.currentTime);
    // Pitch sweep (traditional djembe/udu strike bend)
    osc.frequency.exponentialRampToValueAtTime(35 * pitch, audioCtx.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0.6, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.28);
    
    osc.type = 'triangle';
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
    
    // Add rapid wooden block snap on top for tactile texture
    const snapOsc = audioCtx.createOscillator();
    const snapGain = audioCtx.createGain();
    snapOsc.connect(snapGain);
    snapGain.connect(audioCtx.destination);
    snapOsc.frequency.setValueAtTime(580 * pitch, audioCtx.currentTime);
    snapGain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    snapGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
    snapOsc.type = 'sine';
    snapOsc.start();
    snapOsc.stop(audioCtx.currentTime + 0.05);
  } catch (error) {
    console.warn("AudioContext not supported or blocked by user safety guidelines.", error);
  }
};

const playOgeneBell = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    // Ogene is a sacred double-iron metal bell. It is high pitched and has clean harmonics.
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    // Primary metallic strikes
    osc1.frequency.setValueAtTime(920, audioCtx.currentTime); 
    osc2.frequency.setValueAtTime(1380, audioCtx.currentTime); // Perfect fifth fifth harmonic
    
    gainNode.gain.setValueAtTime(0.35, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.55);
    
    osc1.type = 'sine';
    osc2.type = 'sine';
    
    osc1.start();
    osc2.start();
    osc1.stop(audioCtx.currentTime + 0.6);
    osc2.stop(audioCtx.currentTime + 0.6);
  } catch (err) {
    console.warn(err);
  }
};

const IGBO_PROVERBS = [
  {
    proverb: "Onye kwe, Chi ya ekwe.",
    pronunciation: "Oh-nyeh kweh, Chee ya eh-kweh",
    translation: "If a person says yes, their personal guiding spirit (Chi) says yes too.",
    meaning: "A testament to absolute self-determination, industriousness, and willpower. This proverb is the guiding light for Umuode's agriculturalists and scholars.",
    category: "Determination",
    imageUrl: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80", // African agricultural determination
    videoID: "PCZkCzoOZfw",
    videoOffset: "120",
    videoTitle: "Umuode Agricultural Parade"
  },
  {
    proverb: "Aka nri kwo aka ekpe, aka ekpe akwo aka nri, ha abuo adi ocha.",
    pronunciation: "Ah-kah n-ree kwo ah-kah eh-kpeh, ah-kah eh-kpeh ah-kwo ah-kah n-ree, ha ah-bwol ah-dee oh-chah",
    translation: "When the right hand washes the left hand, and the left hand washes the right hand, both become clean.",
    meaning: "Highlighting mutual cooperation, kindred solidarity, and cooperative development. Our Town Union and general assembly meetings represent this hand-in-hand synergy.",
    category: "Cooperation",
    imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80", // Communal cooperation and working hands
    videoID: "PCZkCzoOZfw",
    videoOffset: "240",
    videoTitle: "Umuode Communal Unity Assembly"
  },
  {
    proverb: "Gidi gidi bụ ugwu eze.",
    pronunciation: "Gee-dee gee-dee boo oo-gwoo eh-zeh",
    translation: "Strong collective movement is the pride and majesty of a king.",
    meaning: "Represents the supreme strength of communal unity. It teaches that the traditional Igwe's authority is fortified by cooperative, united, and peaceful citizens.",
    category: "Unity",
    imageUrl: "https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=800&q=80", // Royal majesty and assembly lights
    videoID: "PCZkCzoOZfw",
    videoOffset: "40",
    videoTitle: "Royal Processing & Igwe Court"
  },
  {
    proverb: "Nkwọcha na-aka mma na nkwọeje.",
    pronunciation: "N-kwo-chah nah ah-kah m-mah nah n-kwo-eh-jeh",
    translation: "The pure quality of tapped palm wine is far more valuable than its sheer volume.",
    meaning: "Reflects our community standards of excellence. This proverb is strictly taken as the quality standard required for our traditional weddings and Eke market products.",
    category: "Excellence",
    imageUrl: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80", // Natural pristine palm trees and clear wine climate
    videoID: "PCZkCzoOZfw",
    videoOffset: "185",
    videoTitle: "Traditional Feast & High Customs"
  },
  {
    proverb: "Egbe bere ugo bere, nke si ibe ya ebere, nku kwaa ya.",
    pronunciation: "Ehg-beh beh-reh oo-goh beh-reh, n-keh see ee-beh ya eh-beh-reh, n-koo kwah-ah ya",
    translation: "Let the eagle perch and let the hawk perch; whoever says the other shouldn't, may their wings break.",
    meaning: "The paramount Igbo philosophy of tolerance, live-and-let-live, and robust peaceful hospitality which Umuode actively extends to all sister communities.",
    category: "Hospitality",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80", // Welcoming hospitality design
    videoID: "PCZkCzoOZfw",
    videoOffset: "315",
    videoTitle: "Communal Celebration & Welcome"
  }
];

const GREETING_RECIPIENTS = [
  {
    id: "igwe",
    title: "HRH The Igwe (Traditional Ruler)",
    icon: "👑",
    role: "Igwe Cabinet",
    imageUrl: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80", // Respected crowned traditional lead look
    bgTheme: "from-amber-600/20 via-orange-500/10 to-red-600/20",
    videoID: "PCZkCzoOZfw",
    videoOffset: "45",
    audioTone: 1.25,
    honorifics: [
      { igbo: "Igwe!", meaning: "Your Royal Highness" },
      { igbo: "Onyishi Omeloha!", meaning: "The Benevolent Chief Protector" },
      { igbo: "Ezeudo!", meaning: "King of Peace" }
    ],
    purposes: [
      { label: "Pay General Homage", igbo: "Nna anyi, anyi abiawo i kpuo n’ala na nsọpụrụ.", english: "Our Father, we have come to bow before the throne in absolute honor." },
      { label: "Request Communal Blessing", igbo: "Igwe, gozie anyi tupu anyi amalite oru ubi anyi.", english: "Your Majesty, bless our hands before we commence the annual farming cycle." },
      { label: "Present Feast Gift", igbo: "Anyi wetara mmanya mma na ji di mma maka oche-eze.", english: "We bring elite palm wine and mature yams to decorate the royal court." }
    ],
    closing: "Igwe, mme mme gị gaa n'ihu! (May your reign enjoy everlasting peace!)"
  },
  {
    id: "elder",
    title: "An Elder of the Judicial Council",
    icon: "👴",
    role: "Elders Council",
    imageUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80", // Respected African Elder patriarch
    bgTheme: "from-emerald-600/20 via-teal-500/10 to-blue-600/20",
    videoID: "PCZkCzoOZfw",
    videoOffset: "105",
    audioTone: 0.85,
    honorifics: [
      { igbo: "Onyishi!", meaning: "Consummate Elder Patriarch" },
      { igbo: "Nwadiala!", meaning: "Sovereign Son of the Ancestral Soil" },
      { igbo: "Nna anyi!", meaning: "Our Respected Judicial Father" }
    ],
    purposes: [
      { label: "Seek Fair Adjudication", igbo: "Onyishi, anyi na-ario ka e jiri eziokwu kpee ikpe a.", english: "Respected Elder, we request this dialogue be judged with transparency and customary truths." },
      { label: "Show Commendation", igbo: "Kokooji! Anyi na-ekele maka okwu ndu di n'onu gi.", english: "Great Harvester! We give gratitude for the supreme wisdom spoken by your mouth." },
      { label: "Pay Restitution Fine", igbo: "Umunna, anyi wetara ego maka mmezi na udo.", english: "Consummate Kindred, we present this fine to restore peace and custom equilibrium." }
    ],
    closing: "Oji mma, ya diba mma! (Let justice prevail, and let peace dwell!)"
  },
  {
    id: "marriage",
    title: "Bride's Family (Marriage Stage)",
    icon: "🤝",
    role: "Marriage Council",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80", // Vibrant communal celebratory gathering
    bgTheme: "from-pink-600/20 via-red-500/10 to-amber-600/20",
    videoID: "PCZkCzoOZfw",
    videoOffset: "325",
    audioTone: 1.05,
    honorifics: [
      { igbo: "Ndi Umunna!", meaning: "The Extended Kindred Circle" },
      { igbo: "Mama anyi!", meaning: "Our Beloved Mother of the Bride" },
      { igbo: "Ogo anyi mma!", meaning: "Our Honorable In-Laws of Excellence" }
    ],
    purposes: [
      { label: "Propose Union (Ikuaka)", igbo: "Anyi hụrụ mara mma na-acha oji na be unu.", english: "We observed a beautiful flower blooming inside your compound and came to inquire." },
      { label: "Present Marriage Wine", igbo: "Anyi wetara mmanya nkwu kachasị mma maka Igba Nkwu.", english: "We bring the absolute finest certified palm wine for the ceremonial wine-carrying stage." },
      { label: "Express Mutual Agreement", igbo: "Umunna ekwenyela, anyi buzi otu ndi nwanne.", english: "The family kinship has accepted; we are now forever joined as brothers." }
    ],
    closing: "Udo na amara buru nke anyi ha! (Let peace and generational grace follow our covenant!)"
  }
];

export default function HeroHome({ onNavigate }: { onNavigate: (tab: any) => void }) {
  const [youtubeId, setYoutubeId] = useState('PCZkCzoOZfw'); // Default: Umuode Cultural Heritage Day
  const [embedInput, setEmbedInput] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Advanced Interactive Oracle States
  const [activeOracleTab, setActiveOracleTab] = useState<'proverbs' | 'greetings'>('proverbs');
  const [proverbIndex, setProverbIndex] = useState(0);
  const [isShufflingProverb, setIsShufflingProverb] = useState(false);
  const [recipientIndex, setRecipientIndex] = useState(0);
  const [selectedHonorificIndex, setSelectedHonorificIndex] = useState(0);
  const [selectedPurposeIndex, setSelectedPurposeIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Extended states for dynamic custom engagement (Toggle between Artwork and High-definition YouTube custom clips)
  const [proverbVisualMode, setProverbVisualMode] = useState<'image' | 'video'>('image');
  const [greetingVisualMode, setGreetingVisualMode] = useState<'image' | 'video'>('image');

  const drawNewProverb = () => {
    // Play traditional drum chime for pristine tactile feedback
    playTraditionalDrum(0.95 + Math.random() * 0.15);
    setIsShufflingProverb(true);
    // Simulate interactive shuffle animation delay
    setTimeout(() => {
      let nextIdx = Math.floor(Math.random() * IGBO_PROVERBS.length);
      while (nextIdx === proverbIndex && IGBO_PROVERBS.length > 1) {
        nextIdx = Math.floor(Math.random() * IGBO_PROVERBS.length);
      }
      setProverbIndex(nextIdx);
      setIsShufflingProverb(false);
    }, 450);
  };

  const copyGreetingToClipboard = () => {
    playOgeneBell();
    const r = GREETING_RECIPIENTS[recipientIndex];
    const h = r.honorifics[selectedHonorificIndex];
    const p = r.purposes[selectedPurposeIndex];
    const fullText = `${h.igbo} (${h.meaning})\n\n${p.igbo}\n"${p.english}"\n\n${r.closing}`;
    
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleUpdateLogo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!embedInput) return;
    
    // Extract ID if full URL is pasted
    let id = embedInput;
    if (embedInput.includes('youtube.com') || embedInput.includes('youtu.be')) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = embedInput.match(regExp);
      if (match && match[2].length === 11) {
        id = match[2];
      }
    }
    setYoutubeId(id);
    setEmbedInput('');
    setShowVideoModal(false);
  };

  const statItems = [
    { label: "Family Units", val: "15", desc: "Across 5 kindreds", color: "text-maroon-800", icon: Users },
    { label: "Community Projects", val: PROJECTS.length.toString(), desc: "Education & Infrastructure", color: "text-amber-600", icon: Hammer },
    { label: "Meeting Branches", val: BRANCHES_FEDERATION.length.toString(), desc: "Across Nigeria", color: "text-teal-700", icon: MapPin },
    { label: "Rivers & Sacred Waterways", val: "2", desc: "Inyaba & Ngene Iji", color: "text-blue-700", icon: Anchor }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-maroon-950 via-maroon-900 to-royal-950 text-white min-h-[500px] flex items-center shadow-xl">
        {/* Background Image of Umuode Landscape (Photorealistic Drone view) */}
        <img 
          src="/src/assets/images/umuode_landscape_1781219185792.jpg" 
          alt="Umuode Landscape Panoramic View" 
          className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-overlay z-0 select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
        {/* Additional backing overlay for readability */}
        <div className="absolute inset-0 bg-slate-950/30 z-0"></div>
        {/* Decorative African traditional motif design overlay using abstract CSS */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] z-0"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center space-y-6 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-100 text-xs font-mono font-medium tracking-wide uppercase"
          >
            <Sparkles className="w-3 px-0.5 h-3 text-gold-500 animate-pulse" />
            Land of Milk and Honey
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-gold-100"
          >
            UMUODE
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-maroon-50/90 font-light max-w-2xl mx-auto leading-relaxed"
          >
            A resilient community flowing with divine abundance, built on hardworking perseverance, 
            rich cultural heritages, and a scenic climate situated in Nkanu East, Enugu State, Nigeria.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <button 
              onClick={() => onNavigate('history')}
              className="px-6 py-3 rounded-lg bg-gold-500 text-maroon-900 font-medium hover:bg-gold-600 transition-all duration-300 shadow-md cursor-pointer text-sm"
              id="hero-explore-btn"
            >
              Explore Our History
            </button>
            <button 
              onClick={() => onNavigate('culture')}
              className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition-all duration-300 cursor-pointer text-sm"
              id="hero-culture-btn"
            >
              Our Culture & Custom
            </button>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((st, i) => {
          const Icon = st.icon;
          return (
            <motion.div 
              key={st.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white p-6 rounded-2xl border border-gold-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-xl bg-gold-500/10 ${st.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 font-display">{st.label}</div>
                <div className="text-3xl font-display font-medium text-slate-900 my-1">{st.val}</div>
                <div className="text-xs text-gray-400">{st.desc}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Geographics Bounding & Borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 md:p-10 rounded-3xl border border-gold-100 shadow-sm">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-maroon-50 text-maroon-800 text-xs font-mono font-medium uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Geographic Outlook
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-maroon-900">
            Conducive Weather &amp; Sacred Coordinates
          </h2>
          <p className="text-gray-600 leading-relaxed font-light">
            Umuode is geographically nestled in the lush plains of the <strong className="font-semibold text-gray-800">Nkanu East Local Government Area of Enugu State</strong>. It enjoys a balanced climate optimal for cultivation and general healthy livelihood.
          </p>
          <p className="text-gray-600 leading-relaxed font-light">
            The community sits at a strategic physical gateway, sharing historic boundaries directly with several neighboring zones:
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gold-50/60 p-4 rounded-xl border border-gold-100">
              <span className="text-xs font-mono text-amber-700 block mb-1">NORTH BOUNDARY</span>
              <span className="text-sm font-semibold text-slate-800">Akpuoga Nike &amp; Nchatancha Nike</span>
            </div>
            <div className="bg-gold-50/60 p-4 rounded-xl border border-gold-100">
              <span className="text-xs font-mono text-amber-700 block mb-1">WEST BOUNDARY</span>
              <span className="text-sm font-semibold text-slate-800">Akpugo &amp; Akpawfu Communities</span>
            </div>
            <div className="bg-gold-50/60 p-4 rounded-xl border border-gold-100">
              <span className="text-xs font-mono text-amber-700 block mb-1">EAST BOUNDARY</span>
              <span className="text-sm font-semibold text-slate-800">Amaechi Idodo</span>
            </div>
            <div className="bg-gold-50/60 p-4 rounded-xl border border-gold-100">
              <span className="text-xs font-mono text-amber-700 block mb-1">SOUTH BOUNDARY</span>
              <span className="text-sm font-semibold text-slate-800">Amagunze Capital Area</span>
            </div>
          </div>
        </div>

        {/* Visual Map Illusion Overlay */}
        <div className="bg-gradient-to-br from-gold-100 to-amber-100 border border-gold-500/20 p-6 md:p-8 rounded-2xl flex flex-col justify-between min-h-[350px]">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="font-serif font-semibold text-maroon-900 text-lg">Border Proximities</h4>
                <p className="text-xs text-gray-500">Regional Gateway of Nkanu East</p>
              </div>
              <MapPin className="w-5 h-5 text-maroon-800" />
            </div>
            
            <div className="space-y-4 font-sans text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-gold-500/10">
                <span className="text-gray-500">To Enugu Urban</span>
                <span className="font-semibold text-gray-800 font-mono">18 Kilometers</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gold-500/10">
                <span className="text-gray-500">To Agbani District</span>
                <span className="font-semibold text-gray-800 font-mono">20 Kilometers</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gold-500/10">
                <span className="text-gray-500">To Amagunze Secretariat</span>
                <span className="font-semibold text-gray-800 font-mono">10 Kilometers</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Principal Waterway</span>
                <span className="font-semibold text-blue-700 font-mono">Inyaba River</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-gold-200 mt-6 text-xs text-gray-600 italic">
            &ldquo;Umuode's peaceful location is bounded by protective community farmlands and rich, historic boundaries that facilitate multi-town commerce and high agricultural trading.&rdquo;
          </div>
        </div>
      </div>

      {/* Economic Activities & Big Eke Market */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-100 text-amber-800 text-xs font-mono font-medium uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            Wealth &amp; Industry
          </div>
          <h2 className="text-3xl font-serif font-bold text-maroon-900">Economic Activities</h2>
          <p className="text-gray-600 font-light text-sm">
            Umuode people are universally recognized as hardworking, resourceful, and tenacious, engaging in local industries that feed regional markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gold-100 shadow-sm space-y-4 hover:border-gold-500/30 transition-all">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Sprout className="w-5 h-5 flex-shrink-0" />
            </div>
            <h3 className="font-serif font-semibold text-slate-800">Advanced Farming</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Cultivating cash crops including giant white yams, local cassava tubers, sweet potatoes, and organic leafy greens representing Nkanu's agricultural wealth.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gold-100 shadow-sm space-y-4 hover:border-gold-500/30 transition-all">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center">
              <Palmtree className="w-5 h-5 flex-shrink-0" />
            </div>
            <h3 className="font-serif font-semibold text-slate-800">Palm Wine Tapping</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Harvesting organic, premium quality palm wine from central palmettos, supplying marriages and festivals in Umuode and neighboring communities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gold-100 shadow-sm space-y-4 hover:border-gold-500/30 transition-all">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-800 flex items-center justify-center">
              <Store className="w-5 h-5 flex-shrink-0" />
            </div>
            <h3 className="font-serif font-semibold text-slate-800">The Famous Eke Market</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              One of the best, most structured markets around Nkanu East, hosting indefatigable and transparent traders selling domestic livestock and harvest crops.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gold-100 shadow-sm space-y-4 hover:border-gold-500/30 transition-all">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 flex-shrink-0" />
            </div>
            <h3 className="font-serif font-semibold text-slate-800">Tolerance &amp; Hospitality</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              We extend robust hospitality toward strangers and visitors from neighboring communities, who consistently live and mix with us in absolute harmony.
            </p>
          </div>
        </div>
      </div>

      {/* The Famous Eke Market Feature Card */}
      <div className="bg-gradient-to-r from-gold-100 via-amber-50 to-gold-100 p-8 md:p-10 rounded-3xl border border-gold-500/10 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-serif font-semibold text-amber-950">Eke Market: The Economic Heart</h3>
            <p className="text-sm text-amber-800">One of Nkanu East's most trusted trading terminals</p>
          </div>
          <span className="px-3 py-1 bg-amber-200 text-amber-900 border border-amber-300 text-xs font-medium uppercase font-mono rounded">
            Holds Every Four Days (Eke Day)
          </span>
        </div>
        <p className="text-amber-950/80 font-light leading-relaxed max-w-4xl text-sm md:text-base">
          Umuode boasts a major commercial center known as <strong className="font-medium text-amber-950">Eke Market</strong>. It has earned a prominent reputation across Nkanu East, powered by sincere, indefatigable agriculturalists. Traditional products sold include organic domestic animals, farm-fresh cassava fufu, premium local seasoning, and handcrafted tools. It remains a major hub drawing buyers from Nike, Owo, and Amagunze communities.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          <div className="p-4 bg-white/75 rounded-xl border border-amber-50s">
            <span className="font-semibold text-amber-950 block text-sm">Transparent Dealers</span>
            <span className="text-xs text-amber-800">Sincere measurements without deceptive scales.</span>
          </div>
          <div className="p-4 bg-white/75 rounded-xl border border-amber-50s">
            <span className="font-semibold text-amber-950 block text-sm">Inter-Town Attraction</span>
            <span className="text-xs text-amber-800">Attracts travelers from all over Enugu State.</span>
          </div>
          <div className="p-4 bg-white/75 rounded-xl border border-amber-50s">
            <span className="font-semibold text-amber-950 block text-sm">Livestock Center</span>
            <span className="text-xs text-amber-800">Sells quality goats, poultry, and local snails.</span>
          </div>
        </div>
      </div>

      {/* NEW: THE UMUODE WISDOM & GREETING ORACLE (Interactive cultural hub) */}
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-gold-100 shadow-md space-y-8 animate-fade-in" id="umuode-cultural-oracle">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gold-100 pb-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-50 text-amber-900 text-xs font-mono font-medium uppercase tracking-wider border border-gold-200">
              <BookOpen className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              Custom Interactive Hub
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-maroon-900">
              Wisdom Oracle &amp; Greeting Composer
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl font-light">
              Connect deeply with our culture. Explore sacred Igbo proverbs that guide our community governance and compose customized greetings for local leaders in real-time.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-1.5 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50 w-full md:w-auto font-sans">
            <button
              onClick={() => {
                playOgeneBell();
                setActiveOracleTab('proverbs');
              }}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeOracleTab === 'proverbs'
                  ? 'bg-maroon-800 text-white shadow-md'
                  : 'text-slate-600 hover:text-maroon-900'
              }`}
            >
              Igbo Proverbs Oracle
            </button>
            <button
              onClick={() => {
                playOgeneBell();
                setActiveOracleTab('greetings');
              }}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeOracleTab === 'greetings'
                  ? 'bg-maroon-800 text-white shadow-md'
                  : 'text-slate-600 hover:text-maroon-900'
              }`}
            >
              Greeting Composer
            </button>
          </div>
        </div>

        {/* Tab 1: Proverbs Oracle Content */}
        {activeOracleTab === 'proverbs' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
            {/* Visual Oracle card presentation */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-widest text-gold-600 uppercase font-bold block">
                    ORACLE DECK • ACTIVE PROVERB
                  </span>
                  
                  {/* Dynamic Visual Mode Toggle */}
                  <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px] font-medium">
                    <button
                      onClick={() => setProverbVisualMode('image')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        proverbVisualMode === 'image' 
                          ? 'bg-white text-maroon-900 shadow-xs font-bold' 
                          : 'text-gray-500 hover:text-slate-900'
                      }`}
                    >
                      🎨 Artwork Frame
                    </button>
                    <button
                      onClick={() => setProverbVisualMode('video')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        proverbVisualMode === 'video' 
                          ? 'bg-white text-maroon-900 shadow-xs font-bold' 
                          : 'text-gray-500 hover:text-slate-900'
                      }`}
                    >
                      🎥 Live Video Clip
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-light">
                  A high-craft translation of ancestral metaphors. Click 'Draw Wisdom' below to draw a new random code of wisdom.
                </p>
              </div>

              {/* Advanced split display layout inside the Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* Visual Allegory Column on Left/Right */}
                <div className="md:col-span-4 flex flex-col justify-between">
                  <motion.div
                    key={`${proverbIndex}-${proverbVisualMode}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative rounded-2xl overflow-hidden h-full min-h-[190px] border border-gold-200 shadow-sm flex flex-col bg-slate-150 justify-between group"
                  >
                    {proverbVisualMode === 'image' ? (
                      <>
                        <img 
                          src={IGBO_PROVERBS[proverbIndex].imageUrl} 
                          alt={IGBO_PROVERBS[proverbIndex].category} 
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                        
                        <div className="relative p-3.5 mt-auto text-white z-10 space-y-1">
                          <span className="text-[8.5px] font-mono tracking-widest bg-gold-500/85 text-slate-950 font-bold px-1.5 py-0.5 rounded uppercase block w-fit">
                            {IGBO_PROVERBS[proverbIndex].category}
                          </span>
                          <span className="text-[10px] font-mono text-gold-100 font-light tracking-wide block">
                            Pristine Lore Accent
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 w-full h-full bg-slate-950">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${IGBO_PROVERBS[proverbIndex].videoID}?start=${IGBO_PROVERBS[proverbIndex].videoOffset}&autoplay=1&mute=1&loop=1&playlist=${IGBO_PROVERBS[proverbIndex].videoID}`}
                          title={IGBO_PROVERBS[proverbIndex].videoTitle}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <div className="absolute bottom-2 left-2 right-2 bg-slate-950/70 p-1.5 rounded text-[9.5px] text-white font-mono text-center truncate">
                          📺 {IGBO_PROVERBS[proverbIndex].videoTitle}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Text Wisdom detail Column */}
                <div className="md:col-span-8 flex flex-col justify-between">
                  <motion.div
                    key={proverbIndex}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="bg-gradient-to-br from-gold-50/40 via-white to-gold-50/10 p-5 rounded-2xl border-2 border-gold-200/60 shadow-inner space-y-4 relative overflow-hidden flex flex-col justify-between h-full"
                  >
                    {/* Visual watermark motif */}
                    <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-5 rotate-45 select-none pointer-events-none">
                      <BookOpen className="w-56 h-56 text-gold-500" />
                    </div>

                    <div className="space-y-3.5 z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[9.5px] font-mono font-bold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                            {IGBO_PROVERBS[proverbIndex].category}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">Index #{proverbIndex + 1}</span>
                        </div>
                        
                        {/* Interactive Sound Trigger */}
                        <button
                          onClick={() => playTraditionalDrum(1.3)}
                          className="p-1 px-2.5 rounded bg-amber-50 hover:bg-amber-100 border border-gold-200 text-amber-900 text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer hover:border-gold-300 transition-all active:translate-y-[1px]"
                          title="Generate a traditional drum strike sound matching this proverb's aura"
                        >
                          <Volume2 className="w-3 h-3 text-amber-700 animate-pulse" />
                          Strike Drum
                        </button>
                      </div>

                      <h3 className="text-base md:text-xl font-serif font-bold text-slate-800 leading-snug italic">
                        &ldquo;{IGBO_PROVERBS[proverbIndex].proverb}&rdquo;
                      </h3>
                      
                      <div className="space-y-1 bg-white/70 p-2.5 rounded-xl border border-gold-200/40">
                        <span className="text-[9.5px] font-mono font-bold text-amber-700 uppercase flex items-center gap-1">
                          Pronunciation Guide
                        </span>
                        <p className="text-xs font-mono text-slate-600 leading-snug">
                          {IGBO_PROVERBS[proverbIndex].pronunciation}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gold-200/50 space-y-2 z-10">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Literal English Meaning</span>
                        <p className="text-xs font-semibold text-slate-800">
                          {IGBO_PROVERBS[proverbIndex].translation}
                        </p>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Communal Philosophy</span>
                        <p className="text-xs text-slate-500 font-light leading-relaxed">
                          {IGBO_PROVERBS[proverbIndex].meaning}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={drawNewProverb}
                  disabled={isShufflingProverb}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-maroon-800 to-maroon-900 text-white font-bold hover:from-maroon-900 hover:to-royal-950 transition-all cursor-pointer text-xs flex items-center justify-center gap-2 shadow-md active:translate-y-[1px] disabled:opacity-60"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isShufflingProverb ? 'animate-spin' : ''}`} />
                  {isShufflingProverb ? "Shuffling Lore..." : "Draw Wisdom & Guidance"}
                </button>
                <button
                  onClick={() => {
                    playTraditionalDrum(1.1);
                    onNavigate('culture');
                  }}
                  className="px-5 py-3 rounded-xl border border-gold-200 text-slate-600 hover:bg-gold-50 transition-all font-semibold text-xs cursor-pointer bg-white"
                >
                  Review Marriage Protocols
                </button>
              </div>
            </div>

            {/* Sidebar with index navigation */}
            <div className="lg:col-span-4 bg-slate-50/70 rounded-2xl border border-slate-200/50 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">
                  Lore Selector Deck
                </h4>
                <p className="text-[11px] text-gray-500 font-light leading-normal">
                  Toggle individual proverbs directly depending on the moral guidance or administrative intent required:
                </p>

                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {IGBO_PROVERBS.map((item, idx) => {
                    const active = idx === proverbIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          playTraditionalDrum(0.85 + idx * 0.1);
                          setProverbIndex(idx);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between border transition-all cursor-pointer ${
                          active
                            ? 'bg-amber-50 border-amber-300 shadow-xs'
                            : 'bg-white hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        <div className="min-w-0 flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono leading-none ${
                            active ? 'bg-amber-100 text-amber-900 font-bold' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className={`truncate font-medium ${active ? 'text-maroon-900 font-bold' : 'text-slate-700'}`}>
                            {item.proverb}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-gray-400">{item.category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-amber-50/50 border border-gold-200/40 p-4 rounded-xl text-[10.5px] text-amber-950 font-light leading-relaxed italic">
                &ldquo;Igbo philosophy teaches that proverbs are the palm-oil with which words are eaten. They represent pristine codes of conduct.&rdquo;
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Custom Greeting Composer Content */}
        {activeOracleTab === 'greetings' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
            {/* Control Panel Section */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                {/* 1. Recipient select */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block">
                    1. Select Recipient Personage
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {GREETING_RECIPIENTS.map((rec, idx) => {
                      const active = idx === recipientIndex;
                      return (
                        <button
                          key={rec.id}
                          onClick={() => {
                            playOgeneBell();
                            setRecipientIndex(idx);
                            setSelectedHonorificIndex(0);
                            setSelectedPurposeIndex(0);
                          }}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 items-start ${
                            active
                              ? 'bg-amber-50/50 border-amber-300 text-maroon-900 font-bold shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <span className="text-md leading-none">{rec.icon}</span>
                          <span className="text-xs leading-tight font-sans block truncate w-full mt-1">
                            {rec.title.split(' ')[0]} {rec.title.split(' ')[1] || ''}
                          </span>
                          <span className="text-[8.5px] font-mono tracking-wider font-semibold text-gray-400 leading-none">
                            {rec.role}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Honorific title selection */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block">
                    2. Choose Traditional Honorific Prefix
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {GREETING_RECIPIENTS[recipientIndex].honorifics.map((hon, idx) => {
                      const active = idx === selectedHonorificIndex;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            playTraditionalDrum((GREETING_RECIPIENTS[recipientIndex].audioTone || 1) * (0.8 + idx * 0.2));
                            setSelectedHonorificIndex(idx);
                          }}
                          className={`px-3.5 py-2 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                            active
                              ? 'bg-maroon-800 text-white border-maroon-900 font-semibold shadow-xs'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          <span className="font-bold">{hon.igbo}</span>
                          <span className="text-[9.5px] opacity-80 block font-light leading-none mt-0.5">
                            {hon.meaning}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Purpose Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block">
                    3. Define Traditional Intent or Gift Purpose
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {GREETING_RECIPIENTS[recipientIndex].purposes.map((pur, idx) => {
                      const active = idx === selectedPurposeIndex;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            playTraditionalDrum((GREETING_RECIPIENTS[recipientIndex].audioTone || 1) * (1.2 - idx * 0.15));
                            setSelectedPurposeIndex(idx);
                          }}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex justify-between items-center ${
                            active
                              ? 'bg-amber-50 border-amber-300 font-bold shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className={`text-[10.5px] block font-semibold ${active ? 'text-maroon-950 font-bold' : 'text-slate-800'}`}>
                              {pur.label}
                            </span>
                            <span className="text-[9.5px] text-gray-400 font-light block line-clamp-1 w-[90%]">
                              {pur.english}
                            </span>
                          </div>
                          <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] ${
                            active ? 'bg-maroon-800 text-white border-maroon-900 font-bold' : 'border-slate-300'
                          }`}>
                            {active && "✓"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action utilities */}
              <div className="flex gap-2">
                <button
                  onClick={copyGreetingToClipboard}
                  className={`px-5 py-3 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md w-full sm:w-auto ${
                    copied
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-maroon-800 hover:bg-maroon-900 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Greeting Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Compiled Greeting
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Dynamic Rendering Scroll Card Section with slide key triggers */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <motion.div
                key={`${recipientIndex}-${selectedHonorificIndex}-${selectedPurposeIndex}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="bg-stone-50 border-2 border-amber-300/60 p-5 md:p-6 rounded-2xl relative shadow-md space-y-4 flex-1 flex flex-col justify-between overflow-hidden"
                style={{ backgroundImage: "radial-gradient(#eeddbb 1px, transparent 1px)", backgroundSize: "16px 16px" }}
              >
                {/* Decorative border margins representing legal custom scroll paper */}
                <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-amber-400 opacity-30"></div>
                <div className="absolute right-2.5 top-0 bottom-0 w-0.5 bg-amber-400 opacity-30"></div>

                {/* IMAGES & VIDEOS ENGAGING UPPER PREVIEW BADGE */}
                <div className="relative pl-3 space-y-4">
                  
                  {/* Dynamic media preview block inside scroll */}
                  <div className="relative h-44 rounded-xl overflow-hidden border border-amber-300/80 bg-stone-900 shadow-inner group">
                    {greetingVisualMode === 'image' ? (
                      <>
                        <img 
                          src={GREETING_RECIPIENTS[recipientIndex].imageUrl} 
                          alt={GREETING_RECIPIENTS[recipientIndex].title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 space-y-0.5 text-white">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">{GREETING_RECIPIENTS[recipientIndex].icon}</span>
                            <span className="text-[8.5px] font-mono uppercase bg-gold-500 text-stone-950 font-bold px-1.5 py-0.5 rounded tracking-wider">
                              {GREETING_RECIPIENTS[recipientIndex].role}
                            </span>
                          </div>
                          <h4 className="text-xs md:text-sm font-serif font-bold tracking-wide">
                            {GREETING_RECIPIENTS[recipientIndex].title}
                          </h4>
                        </div>
                      </>
                    ) : (
                      <div className="relative w-full h-full bg-slate-950">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${GREETING_RECIPIENTS[recipientIndex].videoID}?start=${GREETING_RECIPIENTS[recipientIndex].videoOffset}&autoplay=1&mute=1`}
                          title={GREETING_RECIPIENTS[recipientIndex].title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <div className="absolute bottom-2 left-2 right-2 bg-stone-950/80 px-2 py-1 rounded text-[9px] text-white font-mono text-center truncate">
                          🎬 Umuode Community Assembly Assembly Video Footage
                        </div>
                      </div>
                    )}

                    {/* Compact Interactive Visual Mode Action Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playOgeneBell();
                        setGreetingVisualMode(greetingVisualMode === 'image' ? 'video' : 'image');
                      }}
                      className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-stone-900/95 border border-amber-400/40 text-amber-300 hover:text-amber-100 transition-all font-mono text-[9px] flex items-center gap-1 cursor-pointer shadow-md select-none active:translate-y-[1px]"
                    >
                      {greetingVisualMode === 'image' ? (
                        <>
                          <Video className="w-2.5 h-2.5" />
                          Play Video
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-2.5 h-2.5" />
                          See Portrait
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-b border-amber-300/40 pb-2">
                    <span className="text-[9px] font-mono tracking-widest text-amber-700 font-bold uppercase">
                      TRADITIONAL LITERARY GREETING SCROLL
                    </span>
                    <span className="text-[10px] text-amber-800 font-mono font-bold bg-amber-100/70 px-2 py-0.5 rounded">
                      Igbo • Nkanu East Custom
                    </span>
                  </div>

                  {/* Composed Igbo text blocks */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] font-mono text-amber-600 block mb-1">HONORIFIC SALUTATION:</span>
                      <p className="text-base md:text-lg font-serif font-bold text-slate-800 leading-tight">
                        {GREETING_RECIPIENTS[recipientIndex].honorifics[selectedHonorificIndex].igbo}
                      </p>
                      <span className="text-[10.5px] text-slate-400 font-light italic mt-0.5 block">
                        Translation: &ldquo;{GREETING_RECIPIENTS[recipientIndex].honorifics[selectedHonorificIndex].meaning}&rdquo;
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono text-amber-600 block mb-1">CORE BODY PROTOCOL MESSAGE:</span>
                      <p className="text-xs md:text-sm font-serif font-medium text-slate-800 leading-relaxed italic">
                        &ldquo;{GREETING_RECIPIENTS[recipientIndex].purposes[selectedPurposeIndex].igbo}&rdquo;
                      </p>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono text-amber-600 block mb-1">ENGLISH DECLARATION EQUIVALENT:</span>
                      <p className="text-xs font-sans text-slate-500 leading-relaxed">
                        &ldquo;{GREETING_RECIPIENTS[recipientIndex].purposes[selectedPurposeIndex].english}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-amber-300/40 space-y-2 relative pl-3">
                  <div>
                    <span className="text-[9px] font-mono text-amber-600 block mb-1">COMMUNAL CLOSING BENEDICTION:</span>
                    <p className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                      <span>{GREETING_RECIPIENTS[recipientIndex].closing}</span>
                      
                      <button
                        onClick={() => playOgeneBell()}
                        className="p-1 px-2 rounded bg-amber-100 hover:bg-amber-200 text-amber-950 text-[9px] font-mono font-bold cursor-pointer transition-all uppercase flex items-center gap-1"
                        title="Ring traditional Ogene bell and bless this scroll alignment"
                      >
                        🔔 Ring Bell
                      </button>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Umuode Cultural Heritage Day Section with Configurable Video Player */}
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-gold-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-gold-50 text-amber-800 text-xs font-mono font-medium uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              Community &amp; Festivals
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-maroon-900">
              Umuode Cultural Heritage Day
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl font-light">
              Experience the vibrant culture, colourful traditional attire, beautiful dances, and the deep communal spirit exhibited during the festive celebration.
            </p>
          </div>
          
          <button
            onClick={() => setShowVideoModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-maroon-800 to-maroon-900 text-white rounded-lg hover:from-maroon-900 hover:to-royal-950 transition-all font-medium inline-flex text-xs cursor-pointer"
            id="update-video-btn"
          >
            <Video className="w-4 h-4" />
            Set Custom YouTube Video
          </button>
        </div>

        {/* The YouTube Video Player */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="Umuode Cultural Heritage Day Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="bg-gold-50/50 p-5 rounded-2xl border border-gold-500/10 flex flex-col sm:flex-row md:items-center gap-4 justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-amber-950">Visual Archives</h4>
            <p className="text-xs text-amber-800 max-w-2xl font-light">
              Currently playing YouTube Video ID: <code className="bg-gold-100 px-1.5 py-0.5 rounded text-amber-950 font-mono font-medium">{youtubeId}</code>. You can copy-paste any custom YouTube video link from the community festivals to showcase it here.
            </p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${youtubeId}`}
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-xs text-amber-955 font-medium inline-flex items-center gap-1 hover:underline"
          >
            Watch directly on YouTube
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Latest Communal Dispatch Section */}
      <div className="space-y-8 animate-fade-in" id="communal-dispatch-home">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-gold-100 pb-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-maroon-50 text-maroon-800 text-xs font-mono font-medium uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5" />
              Blog Press &amp; Chronicles
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-maroon-900">Communal Dispatch</h2>
            <p className="text-gray-500 text-sm max-w-2xl font-light">
              Stay fully informed with the latest declarations, infrastructure progress, and cultural highlights from across Umuode.
            </p>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="group flex items-center gap-1.5 text-xs font-bold text-maroon-800 hover:text-maroon-950 transition-colors uppercase tracking-wider cursor-pointer font-display"
          >
            Visit Blog Press Hub
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEFAULT_POSTS.slice(0, 3).map((post) => {
            let badgeStyle = "bg-amber-50 text-amber-800 border-amber-200/50";
            if (post.category === 'Infrastructure') badgeStyle = "bg-blue-50 text-blue-800 border-blue-200/50";
            if (post.category === 'History & Peace') badgeStyle = "bg-slate-50 text-slate-800 border-slate-200/50";
            if (post.category === 'Ecological') badgeStyle = "bg-emerald-50 text-emerald-800 border-emerald-200/50";
            if (post.category === 'Welfare') badgeStyle = "bg-purple-50 text-purple-800 border-purple-200/50";

            return (
              <motion.div
                key={post.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-gold-100/70 p-6 flex flex-col justify-between hover:border-gold-500/30 hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9.5px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                      {post.category}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">{post.readTime}</span>
                  </div>

                  <h3 className="font-serif font-semibold text-slate-800 leading-snug hover:text-maroon-800 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-50 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10.5px] font-bold text-slate-800 truncate leading-none">{post.author}</div>
                      <div className="text-[9.5px] text-slate-400 font-light truncate mt-0.5">{post.authorRole}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <button
                      onClick={() => onNavigate('blog')}
                      className="text-maroon-800 hover:text-maroon-950 font-bold transition-all uppercase tracking-wider text-[10px] cursor-pointer"
                    >
                      Read Post &rarr;
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Custom & Tradition Code of Conduct Banner */}
      <div className="border border-red-500/10 bg-red-50/20 p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-serif font-bold text-red-950">
            Communal Custom &amp; Standard of Conduct
          </h3>
          <p className="text-gray-700 text-sm font-light leading-relaxed">
            In Umuode, our accepted code of ethics is the life-wire that guarantees unity and peaceful co-existence. The constitution sets strict rules, establishing zero tolerance for antisocial acts such as <strong className="font-medium text-red-950">elder abuse, child abuse, husband bashing, wife battering, theft, or assault</strong>. All offenders are processed transparently, and sanctioned or fined adequately to restore the custom equilibrium.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <button
            onClick={() => onNavigate('leadership')}
            className="px-5 py-3 bg-white text-rose-950 border border-red-200 hover:bg-rose-50 rounded-xl transition-all font-semibold font-display text-xs cursor-pointer shadow-sm"
          >
            Review Custom Judicial Fines
          </button>
        </div>
      </div>

      {/* Video Update Modal Dialogue */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 border border-gold-100 shadow-xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-maroon-900">Configure Documentary Video</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Paste a full YouTube URL or a specific 11-character video ID to load an alternative video of Umuode, traditional masquerades, or the Inyaba River.
            </p>
            
            <form onSubmit={handleUpdateLogo} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">YouTube URL or Video ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  value={embedInput}
                  onChange={(e) => setEmbedInput(e.target.value)}
                  className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-maroon-800"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 bg-slate-100 hover:bg-slate-200 rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-maroon-800 hover:bg-maroon-900 rounded-md cursor-pointer"
                >
                  Apply Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
