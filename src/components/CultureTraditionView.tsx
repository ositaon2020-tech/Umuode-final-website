import React, { useState } from 'react';
import { 
  COMPOSITE_UNITS, 
  MONTHS_OF_YEAR, 
  MARRIAGE_STAGES, 
  FESTIVALS, 
  SHRINES, 
  TRADITIONAL_MUSIC, 
  MASQUERADES 
} from '../data/cultureData';
import { 
  Heart, 
  Calendar, 
  Compass, 
  Music, 
  Search, 
  Check, 
  SlidersHorizontal,
  Home,
  Bookmark,
  Sparkles,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

export default function CultureTraditionView() {
  const [activeTab, setActiveTab] = useState<'kindreds' | 'marriage' | 'calendar' | 'masquerades'>('kindreds');
  
  // Masquerade search & filtering
  const [masqueradeSearch, setMasqueradeSearch] = useState('');
  const [masqueradeCategory, setMasqueradeCategory] = useState<'all' | 'omaba' | 'others'>('all');

  // Filtered masquerades list
  const filteredMasquerades = MASQUERADES.filter((m) => {
    const matchesSearch = m.toLowerCase().includes(masqueradeSearch.toLowerCase());
    
    // Categorize standard Omaba-affiliated masks vs other traditional masks based on index or text
    const isOmabaLineage = m.toLowerCase().includes('omaba') || m.toLowerCase().includes('adani') || m.toLowerCase().includes('ezema');
    
    if (masqueradeCategory === 'omaba') return matchesSearch && isOmabaLineage;
    if (masqueradeCategory === 'others') return matchesSearch && !isOmabaLineage;
    return matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900 tracking-tight">
          Our Culture &amp; Tradition
        </h1>
        <p className="text-gray-500 text-sm font-light max-w-3xl leading-relaxed">
          Umuode is enriched with beautiful traditional dances, robust custom guidelines, historic family lineages, sacred festivals, and noble cultural protocols that have survived generations.
        </p>

        {/* Culture Subnavigation */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            { id: 'kindreds', label: '15 Composite Family Units', icon: Home },
            { id: 'marriage', label: 'Marriage Protocol (6 Stages)', icon: Heart },
            { id: 'calendar', label: 'Native Calendar & Festivals', icon: Calendar },
            { id: 'masquerades', label: 'Custom Masquerade Directory', icon: SlidersHorizontal }
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all inline-flex items-center gap-2 cursor-pointer ${
                  active 
                    ? 'bg-maroon-800 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gold-100 hover:bg-gold-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Kindreds and Family Units */}
      {activeTab === 'kindreds' && (
        <div className="space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gold-100 shadow-sm space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-maroon-900">
              The 15 Family Units &amp; 5 Kindred Groups
            </h2>
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              Our community is mathematically structured around five (5) major ancestral family groups comprising fifteen (15) individual family units. This structured hierarchy defines representative cabinet seating and town union executive allocation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPOSITE_UNITS.map((group, idx) => (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-gold-100 shadow-sm space-y-4 flex flex-col justify-between hover:border-gold-500/20"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-amber-700 font-bold bg-amber-100/50 px-2.5 py-0.5 rounded">
                      KINDRED GROUP {idx + 1}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">{group.families.length} Units</span>
                  </div>
                  
                  <h3 className="font-serif font-bold text-maroon-900 text-base md:text-lg border-b border-gold-500/10 pb-2">
                    {group.name}
                  </h3>
                  
                  <ul className="space-y-2 text-xs text-slate-700 font-light font-sans">
                    {group.families.map((fam, fIdx) => (
                      <li key={fam} className="flex gap-2 items-start">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{fam}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100 text-[10px] text-gray-400 font-mono">
                  Seated equally in Umuode Chieftaincy
                </div>
              </motion.div>
            ))}
          </div>

          {/* Shrines and Music section embedded inline under Kindreds tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {/* Shrines */}
            <div className="bg-white p-8 rounded-3xl border border-gold-100 shadow-sm space-y-6">
              <h3 className="text-xl font-serif font-bold text-maroon-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-600" />
                Constitutional Family Shrines
              </h3>
              <p className="text-gray-500 text-xs font-light leading-relaxed">
                As codified in the community, citizens have individual rights to allegiance with ancient shrines. Shrines are respected as historical elements of cultural continuity without discrimination.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {SHRINES.map((sh) => (
                  <div key={sh} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-medium text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>{sh.split('(')[0].trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Traditional Music */}
            <div className="bg-white p-8 rounded-3xl border border-gold-100 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-maroon-900 flex items-center gap-2">
                  <Music className="w-5 h-5 text-amber-600" />
                  Pre-eminent Traditional Music
                </h3>
                <p className="text-gray-500 text-xs font-light leading-relaxed">
                  The constitution recognizes two principal cultural dances as highly revered representing communal defense and royal greetings.
                </p>

                <div className="space-y-4 font-sans text-xs pt-2">
                  <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100 space-y-1">
                    <span className="font-semibold text-orange-950 block text-sm">{TRADITIONAL_MUSIC.igede.name}</span>
                    <p className="text-gray-600 text-xs font-light">{TRADITIONAL_MUSIC.igede.description}</p>
                    <span className="inline-block mt-1 text-[10px] font-mono text-amber-900 bg-amber-200/50 px-2 py-0.5 rounded font-semibold">
                      Groups: Igede Umuode &amp; Igede Umuanegu
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                    <span className="font-semibold text-emerald-950 block text-sm">{TRADITIONAL_MUSIC.ikpa.name}</span>
                    <p className="text-gray-600 text-xs font-light">{TRADITIONAL_MUSIC.ikpa.description}</p>
                    <span className="inline-block mt-1 text-[10px] font-mono text-emerald-900 bg-emerald-200/50 px-2 py-0.5 rounded font-semibold">
                      Open to all eligible citizens
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-gray-400 italic">
                *The Town Union encourages all village age-grades to continue practicing and performing these dances unhindered.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Marriage Protocol Walkthrough */}
      {activeTab === 'marriage' && (
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gold-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-800">
              <Heart className="w-5 px-0.5 h-5 fill-rose-100" />
              <h2 className="text-xl md:text-2xl font-serif font-bold text-maroon-900">
                The 6 Phases of Umuode Traditional Marriage
              </h2>
            </div>
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              Traditional marriage operates under six custom boundaries to protect family sanity, maintain community integration, and safeguard couples. By custom decree, wedding ingredients must never be commercialized, and violations spark local Town Union reviews.
            </p>
          </div>

          {/* Sequential Phases Walkthrough */}
          <div className="space-y-4">
            {MARRIAGE_STAGES.map((st) => (
              <div 
                key={st.phase} 
                className="bg-white p-6 rounded-2xl border border-gold-100 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:border-gold-500/20"
              >
                <div className="md:col-span-2 flex justify-start md:justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-center font-mono font-bold text-lg">
                    {st.phase}
                  </div>
                </div>
                <div className="md:col-span-10 space-y-1">
                  <h3 className="font-serif font-bold text-slate-800 text-base">{st.name}</h3>
                  <p className="text-xs text-gray-600 font-light leading-relaxed">{st.description}</p>
                  
                  {/* Highlight core custom instructions based on stage */}
                  {st.phase <= 3 && (
                    <span className="text-[10px] inline-block font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded mt-1 border border-amber-200/50">
                      ⚠️ restriction: The bride MUST NOT search with palm-wine during this introduction phase.
                    </span>
                  )}
                  {st.phase === 5 && (
                    <div className="space-y-1.5 mt-2 bg-rose-50/50 p-3 rounded-lg border border-rose-200/40 text-[11px] text-rose-950 font-light">
                      <p><strong>• Matriarchal Rule:</strong> If the mother of the bride hail from Umuode community, no additional payments for mother's wine (&ldquo;mmanya ndi nne&rdquo;) shall be charged as it is integrated here. If she belongs to another community, additional provisions are declared.</p>
                      <p><strong>• Supervision &amp; Food:</strong> The Town Union supervises details and palm wine must be of prime quality certified by the Marriage Committee.</p>
                    </div>
                  )}
                  {st.phase === 6 && (
                    <span className="text-[10px] inline-block font-mono bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded mt-1 border border-emerald-200/50">
                      ✔ Law: Marriage is fully legal once stages 1-5 are met. Financial payment equivalents go directly to the Town Union treasury.
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Native Months Calendar & Sacred Festivals */}
      {activeTab === 'calendar' && (
        <div className="space-y-10">
          {/* Festivals Card Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-800">
            {/* New Yam Festival */}
            <div className="bg-gradient-to-br from-amber-50 to-gold-50 p-8 rounded-3xl border border-gold-500/10 space-y-4 flex flex-col justify-between min-h-[280px]">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-amber-900 bg-amber-100 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold">
                  ANNUAL AGRICULTURAL FESTIVAL
                </span>
                <h3 className="text-xl font-serif font-bold text-amber-950">{FESTIVALS.newYam.name}</h3>
                <p className="text-xs text-amber-900/90 leading-relaxed font-light font-sans">
                  {FESTIVALS.newYam.description}
                </p>
              </div>

              <div className="bg-white/80 p-4 rounded-xl border border-gold-200 text-xs">
                <span className="text-gray-400 font-mono block">DATE CONSTITUTION RULE:</span>
                <strong className="text-amber-950 font-medium">{FESTIVALS.newYam.dateRule}</strong>
              </div>
            </div>

            {/* Omaba Festival */}
            <div className="bg-gradient-to-br from-maroon-50 to-maroon-100 p-8 rounded-3xl border border-maroon-900/5 space-y-4 flex flex-col justify-between min-h-[280px]">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-maroon-900 bg-maroon-100 border border-maroon-200 px-2.5 py-0.5 rounded-full font-bold">
                  BIENNIAL ANCESTRAL PERFORMANCE
                </span>
                <h3 className="text-xl font-serif font-bold text-maroon-900">{FESTIVALS.omaba.name}</h3>
                <p className="text-xs text-maroon-900/90 leading-relaxed font-light font-sans">
                  {FESTIVALS.omaba.description}
                </p>
              </div>

              <div className="bg-white/80 p-4 rounded-xl border border-gold-100 text-xs">
                <span className="text-gray-400 font-mono block">FREQUENCY CONSTITUTION RULE:</span>
                <strong className="text-maroon-900 font-medium">{FESTIVALS.omaba.dateRule}</strong>
              </div>
            </div>
          </div>

          {/* Native Months of the Year Grid */}
          <div className="bg-white p-8 rounded-3xl border border-gold-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-maroon-900">The 12 Native Recognized Months</h3>
              <p className="text-xs text-gray-500 font-light">
                The seasonal cycle of Umuode traditional administration adheres to these native lunar cycles:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {MONTHS_OF_YEAR.map((mn) => (
                <div key={mn.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 hover:bg-gold-50/50">
                  <div className="flex justify-between items-center text-gray-400 font-mono text-xs">
                    <span>Month {mn.id}</span>
                    <span>🌗</span>
                  </div>
                  <strong className="font-serif font-bold text-sm text-slate-800 block">{mn.name}</strong>
                  <span className="text-[10px] text-gray-400 block font-light leading-snug">{mn.translation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Masquerade Custom Directory with searching */}
      {activeTab === 'masquerades' && (
        <div className="bg-white p-8 rounded-3xl border border-gold-100 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-maroon-900">Umuode Cultural Masquerade Search</h2>
              <p className="text-xs text-gray-400 font-light">Browse and search the official constitution list of corporate local masquerades.</p>
            </div>

            {/* Quick stats check */}
            <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-200 rounded-full font-mono text-xs font-semibold">
              {MASQUERADES.length} Recognized Masks
            </span>
          </div>

          {/* Filter Bar and Input */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search custom masquerades e.g. Utobo, Ezema..."
                value={masqueradeSearch}
                onChange={(e) => setMasqueradeSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-maroon-800"
              />
            </div>
            
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'All recognized' },
                { id: 'omaba', label: 'Omaba Group' },
                { id: 'others', label: 'Other Spirits' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setMasqueradeCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    masqueradeCategory === cat.id
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          {filteredMasquerades.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMasquerades.map((m) => {
                const isOmaba = m.toLowerCase().includes('omaba') || m.toLowerCase().includes('adani') || m.toLowerCase().includes('ezema');
                return (
                  <motion.div
                    layout
                    key={m}
                    className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 hover:border-gold-500/20 transition-all flex flex-col justify-between min-h-[100px]"
                  >
                    <div>
                      <span className="text-[9px] font-mono uppercase bg-white px-2 py-0.5 rounded border border-gray-200 block w-max">
                        {isOmaba ? "OMABA GROUP" : "TRADITIONAL SPIRIT"}
                      </span>
                      <strong className="font-serif font-bold text-sm text-slate-800 block mt-2">{m}</strong>
                    </div>
                    <span className="text-[10px] text-gray-400 block font-light">Custom ritual protection</span>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl">
              <span className="text-2xl block mb-2">🎭</span>
              <p className="text-sm text-gray-400">No matching cultural masquerades found in the constitutional schedule.</p>
            </div>
          )}

          {/* Guidelines info box */}
          <div className="p-4 bg-gold-50/50 border border-gold-200 rounded-xl text-xs flex gap-3 text-amber-900 leading-relaxed font-light">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-amber-950 block">Constitution Clause Rule:</strong>
              The sections in Umuode that have been celebrating or officiating in these masquerade performances are encouraged to continue doing so in accordance with this constitution, so long as no Umuode citizen is discriminated against in participation or initiation.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
