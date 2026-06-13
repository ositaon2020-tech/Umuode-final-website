import React, { useState } from 'react';
import { LEADERSHIP_ROLES, JUDICIARY_DETAILS } from '../data/leadershipData';
import { 
  ShieldAlert, 
  Scale, 
  Users, 
  CheckCircle,
  Clock, 
  HelpCircle,
  Gem,
  Award,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';

export default function LeadershipView() {
  const [selectedRole, setSelectedRole] = useState<number>(0);

  return (
    <div className="space-y-12">
      {/* Preamble & Intro Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-maroon-900 to-maroon-850 text-white p-8 md:p-10 shadow-lg">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative space-y-6 max-w-4xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/20 text-gold-300 border border-gold-500/40 text-[10px] font-mono rounded uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            Egalitarian Custom Charter
          </div>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gold-100 leading-tight">
            Administration &amp; Democratic Leadership
          </h1>
          
          <p className="text-maroon-50/90 text-sm md:text-base font-light leading-relaxed italic">
            &ldquo;In our determination and struggle for a just and egalitarian society where the principles of equity and justice are highly respected and observed in fairness of all, Umuode people resolved to be governed by free-minded rulers of like minds and aspirations, also independent and impartial in the discharge of their constitutional duties.&rdquo;
          </p>

          <p className="text-xs text-gold-200/80 font-mono">
            — Established under the Traditional Rulers Edit of 1976 &amp; amended by the Traditional Rulers Law of 1991.
          </p>
        </div>
      </div>

      {/* Leadership Organs Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side Role Selector Card */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-gold-100 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg text-maroon-900">Umuode Administrative Organs</h3>
            <p className="text-xs text-gray-400 font-light">Select an administrative organ to explore its structural configuration and responsibilities.</p>
          </div>

          <div className="space-y-2">
            {LEADERSHIP_ROLES.map((role, idx) => (
              <button
                key={role.title}
                onClick={() => setSelectedRole(idx)}
                className={`w-full text-left p-4 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                  selectedRole === idx
                    ? 'bg-maroon-800 text-white border-maroon-800 shadow-sm font-bold'
                    : 'bg-slate-50 text-gray-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="font-mono">{role.title}</span>
                <Gem className="w-3 px-0.5 h-3 text-gold-500" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side Detail Display Box */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-gold-100 shadow-sm min-h-[380px] flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] text-amber-700 font-mono font-bold uppercase block mb-1">SELECTED ADMINISTRATION BRANCH</span>
                <h4 className="text-xl font-serif font-bold text-slate-800">
                  {LEADERSHIP_ROLES[selectedRole].title}
                </h4>
              </div>
              <Award className="w-6 h-6 text-maroon-800" />
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div className="space-y-1">
                <span className="text-gray-400 font-mono block">OFFICIAL STATUS:</span>
                <p className="text-slate-800 font-semibold">{LEADERSHIP_ROLES[selectedRole].role}</p>
              </div>

              <div className="space-y-1">
                <span className="text-gray-400 font-mono block">COMPOSITION BASIS:</span>
                <p className="text-gray-600 font-light">{LEADERSHIP_ROLES[selectedRole].composition}</p>
              </div>

              <div className="space-y-2">
                <span className="text-gray-400 font-mono block">KEY CONSTITUTIONAL CHARGES:</span>
                <ul className="space-y-2">
                  {LEADERSHIP_ROLES[selectedRole].keyResponsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex gap-2 items-start text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-[9px] text-gray-400 italic pt-4 border-t border-gray-100">
            *All administrative bodies are bound to uphold absolute fidelity of human rights under secular Nigerian Law.
          </div>
        </div>
      </div>

      {/* Judicial Punishment Section */}
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-gold-101 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gold-500/10 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-800 text-[10px] font-mono rounded uppercase tracking-wider font-semibold">
              <ShieldAlert className="w-4 h-4" />
              Judicial Custom Penalizer
            </div>
            <h2 className="text-2xl font-serif font-bold text-maroon-900">{JUDICIARY_DETAILS.title}</h2>
            <p className="text-xs text-gray-500 max-w-2xl font-light">
              Under executive municipal bounds, the Town Union enforces standard fines for custom offenses to secure tranquility, safety, and mutual respect in the boundaries.
            </p>
          </div>

          <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-gold-200 rounded font-mono text-xs">
            Administered by the Town Union
          </span>
        </div>

        {/* Penalties Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JUDICIARY_DETAILS.offenses.map((off, oIdx) => (
            <div 
              key={off.crime}
              className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl flex flex-col justify-between hover:border-red-500/20 transition-all shadow-2xs"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-slate-400">OFFENSE CRIME</span>
                  <span className={`font-semibold font-mono uppercase px-2 py-0.5 rounded ${
                    off.gravity === 'Extremely Grave' || off.gravity === 'Capital Community Offense'
                      ? 'bg-red-150 text-red-900 border border-red-200'
                      : 'bg-orange-100 text-orange-850'
                  }`}>
                    {off.gravity}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-slate-800 text-base">{off.crime}</h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">{off.tradicPunish}</p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-200/60 flex items-center gap-1.5 text-[9px] text-gray-400 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>Standard Code Penalty</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
