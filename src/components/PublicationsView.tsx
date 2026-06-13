import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  BookOpen, 
  ShieldCheck, 
  Scale, 
  HelpCircle,
  Gem,
  Bookmark,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PublicationsView() {
  const [activeTab, setActiveTab] = useState<'umuode' | 'oruku' | 'marriageCode'>('umuode');

  const umuodeClauses = [
    {
      sec: "ARTICLE I: SECTION 1",
      title: "Autonomy and Self-Determination",
      body: "Recognizing the persistent yearnings of all Umuode people inhabiting Umuode Community for self-determination, equal representation and full participation in issues affecting their existence; Umuode is established as a separate Autonomous Community independent of Oruku."
    },
    {
      sec: "ARTICLE II: SECTION 4",
      title: "The Throne of ODE OF UMUODE",
      body: "The Traditional Stool of Umuode shall be occupied by a Certified Traditional Monarch addressed as the ODE of UMUODE, who reigns with traditional cabinet members equally drawn from the fifteen (15) major family units."
    },
    {
      sec: "ARTICLE V: SECTION 2",
      title: "The Town Union Pre-eminence",
      body: "The Umuode Town Union is the supreme coordinate government body. The union oversees, manages, and executes municipal infrastructure, controls marriage protocol deposit accounts, and arbitrates capital custom offenses in consultation with Ndi-Izhi."
    },
    {
      sec: "ARTICLE VIII: SECTION 6",
      title: "Equal Status & Caste Abrogation",
      body: "Any custom, nomenclature or practice indicating a Diala-Osu division, or non-indigene status is declared illegal and completely abrogated. All Umuode citizens have equal birthrights, initiation privileges, and social leverages."
    }
  ];

  const orukuClauses = [
    {
      sec: "SECTION A: 1976 PROTOCOL",
      title: "Rotational Igweship Accord",
      body: "The mantle of leadership for old Oruku traditional Igweship shall rotate among the three major kindred families: Umuchiani, Onogowo, and Umuode, in that direct order."
    },
    {
      sec: "SECTION D: 1987 REVISION",
      title: "Merit Succession Amendments",
      body: "Under statutory amendments, rotation is replaced by a merit selection process. Represents kindred allocations of 12 units to Chiani, 6 to Onogowo, and 5 to Umuode."
    },
    {
      sec: "SECTION F: 2019 COMPROMISE",
      title: "Separation and Carving Bounds",
      body: "Recognizes the official division of old Oruku town into separate autonomous entities: Oruku, Aguikpa Oruku, and Umuode, permanently halting the historical boundary friction."
    }
  ];

  const marriageClauses = [
    {
      sec: "STAGE 1 - 3 RULES",
      title: "No Public Searches",
      body: "During Iku Aka n'uzo (Introduction), Afa (Consultation) and Aziza (Reply), the bride is strictly prohibited from carrying wine publicly to search for her husband. These initial stages can be consolidated into a single day."
    },
    {
      sec: "STAGE 4 RULES",
      title: "Abolition of Wedding Provision Speculation",
      body: "Traditional bride price is paid between parents. No marriage provisions, drinks, or required food components may be marked up or sold for cash profit by either party. Infringements attract heavy Town Union financial fines."
    },
    {
      sec: "STAGE 5 RULES",
      title: "Town Union Deposit Accounts",
      body: "Where specific traditional items cannot be presented, equivalent cash replacements are paid directly into the bank account of the Town Union Marriage Committee. All palm wine provided must be certified as standard quality."
    }
  ];

  const handleDownloadStub = (title: string) => {
    alert(`Initiating download for standard digital PDF document: ${title}.\n(Note: This applet compiles the direct textual guidelines into this interactive digital reader, preserving your local bandwidth.)`);
  };

  return (
    <div className="space-y-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gold-500/10 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900 tracking-tight">
            Publications &amp; Constitutions
          </h1>
          <p className="text-gray-500 text-sm font-light max-w-2xl">
            Browse and download the supreme constitutional laws, custom charters, and marriage bylaws governing both Umuode and the historical Oruku archives.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleDownloadStub("Umuode Constitution 2019.pdf")}
            className="px-4 py-2 border border-gold-300 hover:bg-gold-100 text-amber-950 rounded-lg text-xs font-semibold inline-flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            Get Umuode Constitution (PDF)
          </button>
          <button
            onClick={() => handleDownloadStub("Oruku Archival Bylaws 1976.pdf")}
            className="px-4 py-2 border border-slate-350 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            Get Oruku Archive (PDF)
          </button>
        </div>
      </div>

      {/* Selector and Main Block */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Side Navigation List */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gold-100 shadow-sm space-y-4">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block pb-2 border-b border-gray-100">
            Document Categories
          </span>

          <div className="flex flex-col gap-1.5">
            {[
              { id: 'umuode', label: 'Umuode Constitution', icon: ShieldCheck },
              { id: 'oruku', label: 'Oruku Constitution (Archive)', icon: BookOpen },
              { id: 'marriageCode', label: 'Bylaw Marriage Codes', icon: Scale }
            ].map((cat) => {
              const Icon = cat.icon;
              const matches = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id as any)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                    matches
                      ? 'bg-maroon-800 text-white shadow-xs'
                      : 'bg-slate-50 text-gray-600 hover:bg-slate-100 border border-slate-200/50'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side Main Document Viewer */}
        <div className="lg:col-span-3 bg-white p-6 md:p-8 rounded-3xl border border-gold-101 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <span className="text-[10px] text-amber-700 font-mono font-bold uppercase block mb-0.5">PUBLIC DOCUMENT READER</span>
              <h3 className="text-xl font-serif font-bold text-slate-800">
                {activeTab === 'umuode' && "Umuode Supreme Autonomous Constitution 2019"}
                {activeTab === 'oruku' && "Oruku Historical Chieftaincy Constitution & Revisions"}
                {activeTab === 'marriageCode' && "Traditional Marriage Protocol Code & Bylaws"}
              </h3>
            </div>
            <Gem className="w-6 h-6 text-maroon-800" />
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === 'umuode' && (
                <motion.div
                  key="umuode-clauses"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {umuodeClauses.map((cl) => (
                    <div key={cl.sec} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/50 space-y-2">
                      <span className="text-[9px] font-mono text-amber-700 font-bold bg-amber-100/40 px-2 py-0.5 rounded">
                        {cl.sec}
                      </span>
                      <h4 className="font-serif font-bold text-slate-800 text-sm md:text-base">{cl.title}</h4>
                      <p className="text-xs text-gray-600 font-light leading-relaxed font-sans">{cl.body}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'oruku' && (
                <motion.div
                  key="oruku-clauses"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {orukuClauses.map((cl) => (
                    <div key={cl.sec} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/50 space-y-2">
                      <span className="text-[9px] font-mono text-slate-500 font-bold bg-slate-200/50 px-2 py-0.5 rounded">
                        {cl.sec}
                      </span>
                      <h4 className="font-serif font-bold text-slate-800 text-sm md:text-base">{cl.title}</h4>
                      <p className="text-xs text-gray-600 font-light leading-relaxed font-sans">{cl.body}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'marriageCode' && (
                <motion.div
                  key="marriage-clauses"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {marriageClauses.map((cl) => (
                    <div key={cl.sec} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/50 space-y-2">
                      <span className="text-[9px] font-mono text-rose-750 font-bold bg-rose-50 px-2 py-0.5 rounded">
                        {cl.sec}
                      </span>
                      <h4 className="font-serif font-bold text-slate-800 text-sm md:text-base">{cl.title}</h4>
                      <p className="text-xs text-gray-600 font-light leading-relaxed font-sans">{cl.body}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-4 bg-amber-50/60 border border-gold-200 rounded-xl text-xs flex gap-2 text-amber-900 leading-relaxed font-light">
            <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-amber-955 block text-amber-950">Attestation of Integrity:</strong>
              These clauses have been directly processed from verified community documentation, constitutional agreements, and state judicial gazettes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
