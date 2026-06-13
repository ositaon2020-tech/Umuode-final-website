import React, { useState } from 'react';
import { 
  TIMELINE, 
  REF_HEROES, 
  GOVT_PANELS, 
  CONFLICT_THEORIES, 
  CASTE_REJECTION_ARTICLE, 
  ORUKU_ARTICLE_SUMMARY 
} from '../data/historyData';
import { 
  FileText, 
  Calendar, 
  Award, 
  Briefcase, 
  Compass, 
  BookOpen, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle,
  HelpCircle,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function HistoryArchiveView() {
  const [activeSubTab, setActiveSubTab] = useState<'narrative' | 'timeline' | 'conflict' | 'heroes' | 'panels'>('narrative');
  const [selectedConflictStage, setSelectedConflictStage] = useState<number>(0);
  const [showOrukuArchive, setShowOrukuArchive] = useState(false);

  return (
    <div className="space-y-12">
      {/* Header and Sub Navigation */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gold-500/10 pb-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900 tracking-tight">
              Historical Archive &amp; Narrative
            </h1>
            <p className="text-gray-500 text-sm font-light max-w-2xl">
              A comprehensive chronicle of Umuode's resilience, marginalization, displacement, and ultimate actualization as an autonomous community.
            </p>
          </div>
          
          <button
            onClick={() => setShowOrukuArchive(!showOrukuArchive)}
            className="px-4 py-2 text-xs font-semibold bg-gold-100 hover:bg-gold-200 text-amber-900 border border-gold-300 rounded-lg transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            {showOrukuArchive ? "Show Umuode Struggle" : "Compare Oruku Perspectives"}
          </button>
        </div>

        {/* Local Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'narrative', label: '1. Cultural Struggle', icon: FileText },
            { id: 'timeline', label: '2. Chronology Timeline', icon: Calendar },
            { id: 'conflict', label: '3. Stages of Conflict', icon: AlertTriangle },
            { id: 'heroes', label: '4. Local Heroes', icon: Award },
            { id: 'panels', label: '5. State Commissions', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as any);
                  setShowOrukuArchive(false);
                }}
                className={`px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all inline-flex items-center gap-2 cursor-pointer ${
                  active && !showOrukuArchive
                    ? 'bg-maroon-800 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gold-100 hover:bg-gold-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conditionally reveal Oruku Article Summary vs Umuode Main Tabs */}
      <AnimatePresence mode="wait">
        {showOrukuArchive ? (
          <motion.div
            key="oruku-archive"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6 bg-white p-6 md:p-8 rounded-3xl border border-gold-100 shadow-sm">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                Comparative Archival Record
              </div>
              
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-800">
                {ORUKU_ARTICLE_SUMMARY.title}
              </h2>
              
              <div className="whitespace-pre-line text-sm text-gray-600 font-light leading-relaxed space-y-4">
                {ORUKU_ARTICLE_SUMMARY.content}
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-gray-500 italic mt-6 space-y-2">
                <span className="font-semibold text-slate-700 block">Note on Archival Objectivity:</span>
                We display the official Oruku document outline to offer historical completeness. It serves to highlight the severe constitutional modifications and land tensions that eventually necessitated Government-backed separation in 2019 to preserve human lives.
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-2xl space-y-4">
                <h3 className="font-serif font-semibold text-gold-500">Key Quarters &amp; Clans</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  The Oruku constitution lists original lines of habitation:
                </p>
                <ul className="text-xs space-y-2 text-gray-200">
                  <li className="flex gap-2 items-start">
                    <span className="text-gold-500">•</span>
                    <span><strong>Ihu Nnam quarter:</strong> Consisting of Umuchiani (12 family units) and integrated Umuode.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-gold-500">•</span>
                    <span><strong>Onuogo Owo quarter:</strong> Consisting of Umu Una Igwejike. Custody over Shrines.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gold-100 space-y-4">
                <h4 className="font-serif font-bold text-maroon-900 text-sm">Oruku Chieftaincy Ledger</h4>
                <div className="space-y-3 font-sans text-xs">
                  <div className="pb-2 border-b border-gray-100">
                    <span className="text-gray-400 block font-mono">1919 AD</span>
                    <span className="font-semibold text-slate-800">Chief Nnamene Nwogbu appointed first Warrant Chief.</span>
                  </div>
                  <div className="pb-2 border-b border-gray-100">
                    <span className="text-gray-400 block font-mono">1928 - 1958 AD</span>
                    <span className="font-semibold text-slate-800">Chief Okenwa Adenyi (Igwenezorvoha I), ruled for 30 years.</span>
                  </div>
                  <div className="pb-2 border-b border-gray-100">
                    <span className="text-gray-400 block font-mono">1981 - 1983 AD</span>
                    <span className="font-semibold text-slate-800">Igwe Nwatu Okenwa (Igwenezoruoha II), after whose death succession fractured.</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-mono">1990 AD</span>
                    <span className="font-semibold text-slate-800">HRH Igwe Dr. C. A. Nomeh elected amidst mounting tensions.</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="umuode-archive"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            {/* 1. Cultural Narrative / Struggle */}
            {activeSubTab === 'narrative' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8 bg-white p-6 md:p-10 rounded-3xl border border-gold-100 shadow-sm">
                  {/* Executive Summary Section */}
                  <div className="space-y-4">
                    <span className="px-3 py-1 bg-maroon-100 text-maroon-800 font-mono text-xs font-semibold rounded uppercase tracking-wider">
                      I. Introduction &amp; Territory
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-maroon-900">
                      Displacement and Actualization
                    </h2>
                    <p className="text-slate-700 leading-relaxed font-light text-base">
                      Umuode is an ancient community flowing with milk and honey, whose citizens have triumphed over systematic displacement. Situated in <strong className="font-semibold">Nkanu East, Enugu State</strong>, Umuode shares boundary borders with <strong className="font-medium text-slate-800">Akpuoga Nike</strong>, <strong className="font-medium text-slate-800">Nchatancha Nike</strong>, <strong className="font-medium text-slate-800">Akpugo</strong>, <strong className="font-medium text-slate-800">Akpawfu</strong>, <strong className="font-medium text-slate-800">Ezza-Akpugo</strong>, <strong className="font-medium text-slate-800">Amaechi Idodo</strong>, and <strong className="font-medium text-slate-800">Amagunze</strong>.
                    </p>
                  </div>

                  {/* Historical Friction Section */}
                  <div className="space-y-4 pt-4 border-t border-gold-100">
                    <span className="px-3 py-1 bg-maroon-100 text-maroon-800 font-mono text-xs font-semibold rounded uppercase tracking-wider">
                      II. Brief History of Discord (1976 - 1987)
                    </span>
                    <p className="text-slate-600 leading-relaxed font-light text-sm">
                      Historically, Umuode lived amicably as one of the three principal kindred families in old Oruku, alongside Umuchiani and Onogowo. In <strong>1976</strong>, a constitution was signed establishing a strict rotation of leadership (the Igweship) between these three lineages. Under this, Chief Nwatu Okenwa (Umuchiani) became the first monarch, ruling until 1981.
                    </p>
                    <p className="text-slate-600 leading-relaxed font-light text-sm">
                      Following his death, Onogowo selected their nominee which was rejected by elements of the Umuchiani quarter. By <strong>1987</strong>, using local administrative leverage, Raymond Okenwa unilaterally altered the constitution to bypass rotation, replacing it with a &ldquo;merit&rdquo; system, and gerrymandered kindred representations. They allotted <strong className="text-slate-900 font-semibold">12 units to Umuchiani, 6 to Onogowo, and only 5 to Umuode</strong>—even though Umuode represented over <strong className="text-rose-900 font-semibold">40% of the entire population</strong>. This systematic gerrymandering aimed to permanently sideline and disenfranchise Umuode.
                    </p>
                  </div>

                  {/* The Refugees Era */}
                  <div className="space-y-4 pt-4 border-t border-gold-100">
                    <span className="px-3 py-1 bg-red-100 text-red-800 font-mono text-xs font-semibold rounded uppercase tracking-wider">
                      III. Hostilities and Refugee Exile (1995 - 2007)
                    </span>
                    <p className="text-slate-600 leading-relaxed font-light text-sm">
                      Tensions erupted into outright carnage on <strong className="text-slate-900">October 9, 1995</strong>. During a state celebration welcoming federal minister and scientific pioneer <strong className="font-normal text-slate-900">Prof. Barth Nnaji</strong>, a sudden heavily armed attack was unleashed upon Umuode citizens. Women were assaulted, businesses looted, crops set ablaze, and citizens killed in cold blood. Thousands of Umuode residents fled, forced to survive as <strong>displaced refugees for eight painful years in exile</strong> across neighboring communities.
                    </p>
                    <p className="text-slate-600 leading-relaxed font-light text-sm">
                      On <strong className="text-slate-900">December 8, 2007</strong>, tired of refugee displacement, Umuode citizens courageously trooped en-masse back to occupy the extensive compound of Prof. Barth Nnaji’s building — the only secure mansion owned by an Umuode son. They faced subsequent military-style ambushes, including the tragic assassination of their first unifying king, <strong className="text-slate-900">Igwe Moses Ugwu (Ode I)</strong> in 2012, and road-side executions of John Nshiegbunam and Ifeanyi Nshi in 2019. Despite all efforts to dislodge them, they successfully held their ground.
                    </p>
                  </div>

                  {/* Rejection of Caste */}
                  <div className="space-y-4 pt-4 border-t border-gold-100 bg-amber-50/40 p-6 rounded-2xl">
                    <span className="text-amber-800 font-mono text-xs font-semibold block uppercase tracking-wider">
                      {CASTE_REJECTION_ARTICLE.title}
                    </span>
                    <p className="text-slate-600 leading-relaxed font-light text-xs whitespace-pre-line">
                      {CASTE_REJECTION_ARTICLE.content}
                    </p>
                  </div>
                </div>

                {/* Right Side Info Widgets */}
                <div className="space-y-6">
                  <div className="bg-maroon-900 text-white p-6 rounded-3xl space-y-4">
                    <h3 className="font-serif font-semibold text-gold-500 text-lg">Historic Autonomy</h3>
                    <p className="text-xs text-maroon-100/85 leading-relaxed font-light">
                      Umuode gained official autonomy in <strong className="text-white">June 1998</strong>. However, due to lingering regional hostilities, return and peaceful development was only finalized under Governor Ifeanyi Ugwuanyi's historic peace declaration on April 8, 2019.
                    </p>
                    <div className="pt-2">
                      <span className="text-[10px] font-mono bg-gold-500/20 text-gold-200 border border-gold-500/40 px-2 py-1 rounded block text-center">
                        TOWN AUTONOMY STATED JUNE 1998
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-gold-100 space-y-4">
                    <h4 className="font-serif font-bold text-slate-800 text-sm">Primary Bounding Communities</h4>
                    <p className="text-xs text-gray-500 font-light">
                      Umuode is a crucial agricultural bridge, bordered on all sides by key regional towns:
                    </p>
                    <div className="space-y-2">
                      {[
                        { title: 'North', desc: 'Akpuoga Nike & Nchatancha Nike' },
                        { title: 'West', desc: 'Akpugo & Akpawfu' },
                        { title: 'East', desc: 'Amaechi Idodo' },
                        { title: 'South', desc: 'Amagunze' }
                      ].map((item) => (
                        <div key={item.title} className="flex justify-between items-center text-xs pb-1.5 border-b border-gray-100">
                          <span className="font-mono text-amber-700">{item.title}</span>
                          <span className="font-medium text-slate-700">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-gold-100 space-y-4">
                    <h4 className="font-serif font-bold text-slate-800 text-sm">Conclusion &amp; Potential</h4>
                    <p className="text-xs text-gray-600 font-light leading-relaxed">
                      &rdquo;Umuode is metaphorically like Israel. They were leveled to all sorts of hardship, forced labor, and name-calling. But when it was time for them to leave Egypt to the promised land, they never looked back. Today, Umuode is a place of infinite human, technical and agricultural potential.&ldquo;
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Chronological Timeline */}
            {activeSubTab === 'timeline' && (
              <div className="bg-white p-6 md:p-10 rounded-3xl border border-gold-100 shadow-sm max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-serif font-bold text-maroon-900">Chronological Milestones</h2>
                  <p className="text-xs text-gray-500 font-light">A path from 1910 through exile to autonomy and peace.</p>
                </div>

                <div className="relative border-l-2 border-gold-500/30 pl-6 ml-4 md:ml-10 space-y-10 py-4">
                  {TIMELINE.map((evt, idx) => {
                    let badgeColor = "bg-blue-100 text-blue-800";
                    if (evt.type === 'conflict') badgeColor = "bg-red-100 text-red-800";
                    if (evt.type === 'resolution') badgeColor = "bg-emerald-100 text-emerald-800";
                    if (evt.type === 'development') badgeColor = "bg-amber-100 text-amber-800";

                    return (
                      <motion.div 
                        key={evt.year + evt.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="relative"
                      >
                        {/* Circular timeline marker */}
                        <div className="absolute -left-[33px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-2 border-gold-500 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-maroon-800"></div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-lg font-mono font-bold text-maroon-900">{evt.year}</span>
                            {evt.date && <span className="text-xs text-gray-400">({evt.date})</span>}
                            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${badgeColor}`}>
                              {evt.type}
                            </span>
                          </div>
                          <h3 className="text-base font-serif font-bold text-slate-800">{evt.title}</h3>
                          <p className="text-xs text-gray-600 font-light max-w-2xl leading-relaxed">{evt.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Five Stages of Conflict Analysis */}
            {activeSubTab === 'conflict' && (
              <div className="bg-white p-6 md:p-10 rounded-3xl border border-gold-100 shadow-sm space-y-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-50 text-amber-800 text-xs font-mono font-medium uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Conflict Resolution Science
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-maroon-900">Academic Conflict Breakdown</h2>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">
                    Conflict is as old as humanity. Following scholars such as <strong>Adenyi (2016)</strong>, <strong>Wright (1990)</strong>, and <strong>Jeong (2000)</strong>, we clarify the five stages of conflict and track how they manifested in our local history. Tap on a stage below to inspect the theoretical model and its direct occurrence in Umuode history.
                  </p>
                </div>

                {/* Left navigation column + Right definition block */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-4">
                  <div className="md:col-span-2 space-y-2">
                    {CONFLICT_THEORIES.map((theory, i) => (
                      <button
                        key={theory.stage}
                        onClick={() => setSelectedConflictStage(i)}
                        className={`w-full text-left p-4 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                          selectedConflictStage === i
                            ? 'bg-maroon-800 text-white border-maroon-800 shadow-sm'
                            : 'bg-slate-50 text-gray-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="font-mono">{i + 1}. {theory.stage}</span>
                        <ChevronRight className="w-4 h-4 ml-1 flex-shrink-0" />
                      </button>
                    ))}
                  </div>

                  <div className="md:col-span-3 bg-gold-50/50 p-6 md:p-8 rounded-2xl border border-gold-500/10 flex flex-col justify-between min-h-[300px]">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-amber-700 font-bold uppercase">Theory Definition</span>
                        <div className="h-px bg-gold-500/20 flex-1"></div>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-maroon-900">
                        {CONFLICT_THEORIES[selectedConflictStage].stage}
                      </h3>
                      <p className="text-xs text-gray-700 leading-relaxed font-light">
                        {CONFLICT_THEORIES[selectedConflictStage].definition}
                      </p>
                    </div>

                    <div className="space-y-3 pt-6 border-t border-gold-500/15">
                      <span className="text-xs font-mono text-red-800 font-bold block uppercase">How it Manifested in Umuode</span>
                      <p className="text-xs text-gray-600 bg-white p-4 rounded-lg border border-gold-200 italic font-sans leading-relaxed">
                        &ldquo;{CONFLICT_THEORIES[selectedConflictStage].customApp}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Local Heroes */}
            {activeSubTab === 'heroes' && (
              <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-maroon-900">The Architects of Our Liberation</h2>
                  <p className="text-xs text-gray-500">Honoring Umuode's legendary leaders who sacrificed cash and safety to establish our modern community.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {REF_HEROES.map((hr) => (
                    <div key={hr.name} className="bg-white p-6 rounded-2xl border border-gold-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold-500/10 text-gold-600 flex items-center justify-center">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-slate-800 text-sm md:text-base">{hr.name}</h3>
                          <span className="text-[10px] font-mono text-maroon-800 font-bold uppercase">{hr.role}</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-xs text-gray-600 font-light leading-relaxed">
                        {hr.contributions.map((con, idx) => (
                          <div key={idx} className="flex gap-2 items-start">
                            <span className="text-gold-500">•</span>
                            <span>{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. State Commissions and Carving */}
            {activeSubTab === 'panels' && (
              <div className="space-y-8">
                <div className="space-y-3">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-maroon-900">Panels, Arbitrations &amp; Peace Accords</h2>
                  <p className="text-gray-600 text-sm font-light max-w-3xl leading-relaxed">
                    Throughout our refugee exile years, the Enugu State Government and church arbitration panels made multiple formal inquiries into the Oruku displacement, offering formal solutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {GOVT_PANELS.map((p, idx) => (
                    <div key={p.name} className="bg-white p-6 rounded-2xl border border-gold-100 shadow-sm space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase">COMMISSION #{idx + 1}</span>
                          <span className="text-xs text-amber-700 bg-gold-100/50 px-2.5 py-0.5 rounded font-mono font-medium">{p.leader}</span>
                        </div>
                        <h3 className="text-base font-serif font-bold text-maroon-900">{p.name}</h3>
                        <p className="text-xs text-gray-600 font-light leading-relaxed">{p.recommendation}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-100 flex items-center gap-1.5 text-[10px] text-gray-400">
                        <CheckCircle className="w-3.5 h-3.5 text-gray-300" />
                        <span>Formal Panel Record</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ugwuanyi Accord Hero Banner */}
                <div className="bg-gradient-to-br from-emerald-900 via-emerald-850 to-teal-950 text-white p-8 rounded-3xl border border-emerald-500/10 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/15 text-gold-500 border border-white/15 text-xs font-mono font-bold rounded uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Historic Reconciliation Accord
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-gold-100">
                      The Leadership of Governor Ifeanyi Ugwuanyi (2015 - 2019)
                    </h3>
                    <p className="text-sm text-emerald-100/80 font-light leading-relaxed max-w-3xl">
                      Upon assuming office, Governor Ifeanyi Ugwuanyi visited the displacement zones directly, forcing a ceasefire. On <strong className="font-semibold text-white">August 8, 2019</strong>, they engineered a historic physical land survey. It resulted in carving out <strong className="font-semibold text-white">Aguikpa Village</strong> as an autonomous community for the Onogowo lineage, leaving <strong className="font-semibold text-white">Umuode</strong> established as an independent autonomous community.
                    </p>
                  </div>
                  
                  <blockquote className="bg-white/5 p-4 rounded-xl border border-white/10 italic text-xs text-teal-100 leading-relaxed">
                    &ldquo;Under this ultimate peace MoU, Umuode finally returned to their lands unhindered. Leaders of the three separated autonomous entities—including Hon. Emma Omaba (Umuode), Hon. Emma Mba (Oruku), and Hon. Raphael Ani (Aguikpa)—expressed deep regional gratitude for permanently bringing the decades-long clash to an end.&rdquo;
                  </blockquote>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
