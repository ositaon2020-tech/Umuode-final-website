import React, { useState } from 'react';
import { CALENDAR_EVENTS, BRANCHES_FEDERATION, GENERAL_RETURN_TEXT } from '../data/activitiesData';
import { 
  Calendar, 
  MapPin, 
  UserCheck, 
  Clock, 
  Bell, 
  HelpCircle,
  Map,
  Share2,
  BookmarkCheck,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ActivitiesView() {
  const [selectedBranch, setSelectedBranch] = useState<number>(0);
  const [notifiedEvents, setNotifiedEvents] = useState<string[]>([]);

  const toggleEventNotification = (title: string) => {
    if (notifiedEvents.includes(title)) {
      setNotifiedEvents(notifiedEvents.filter((t) => t !== title));
    } else {
      setNotifiedEvents([...notifiedEvents, title]);
    }
  };

  return (
    <div className="space-y-12">
      {/* Upper Calendar Banner */}
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-gold-100 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-100 text-amber-800 text-xs font-mono font-medium uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            Active Community Calendar
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-maroon-900 leading-tight">
            Meetings &amp; General Planning Assemblies
          </h2>
          <p className="text-gray-600 text-sm font-light leading-relaxed max-w-2xl">
            {GENERAL_RETURN_TEXT}
          </p>
        </div>

        <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200/50 flex flex-col justify-between h-full">
          <span className="text-[10px] text-amber-800 font-mono font-bold uppercase block mb-1">PARAMOUNT SUMMIT DATE</span>
          <strong className="text-2xl font-serif font-bold text-maroon-900 block my-1">Dec 28th</strong>
          <span className="text-xs text-amber-950 font-light block leading-relaxed">
            Annual general return sum-up gathering of all Umuode indigenes worldwide.
          </span>
        </div>
      </div>

      {/* Structured Calendar Events List */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-xl text-slate-800">Paramount Annual &amp; Seasonal Gatherings</h3>
          <p className="text-xs text-gray-400 font-light">Turn on custom reminders or inspect dates of critical local development summits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CALENDAR_EVENTS.map((evt, idx) => {
            const hasReminder = notifiedEvents.includes(evt.title);
            return (
              <motion.div
                key={evt.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-gold-100 shadow-sm flex flex-col justify-between space-y-4 hover:border-gold-500/20 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[10px] font-mono text-amber-700 font-bold bg-amber-100/50 px-2.5 py-0.5 rounded">
                      {evt.frequency} Assembly
                    </span>
                    
                    <button
                      onClick={() => toggleEventNotification(evt.title)}
                      className={`p-2 rounded-full cursor-pointer transition-colors ${
                        hasReminder 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-slate-50 text-gray-400 hover:bg-slate-100'
                      }`}
                      title={hasReminder ? "Notification active!" : "Subscribe and add to Calendar"}
                    >
                      {hasReminder ? <BookmarkCheck className="w-4.5 h-4.5" /> : <Bell className="w-4.5 h-4.5" />}
                    </button>
                  </div>

                  <h4 className="font-serif font-bold text-base text-slate-800">{evt.title}</h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">{evt.description}</p>
                </div>

                {/* Logistics Footer bar */}
                <div className="pt-4 border-t border-gray-155 border-slate-100 grid grid-cols-2 gap-4 font-sans text-[10px] text-gray-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span className="truncate">{evt.location.split(',')[0]}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Global Branches map grid equivalent */}
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-gold-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gold-500/10 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 text-[10px] font-mono rounded uppercase tracking-wider font-semibold">
              <Map className="w-4 h-4" />
              Global Diaspora Grid
            </div>
            <h2 className="text-2xl font-serif font-bold text-maroon-900">Umuode Town Meeting Branches</h2>
            <p className="text-xs text-gray-500 max-w-2xl font-light">
              Umuode people living outside the town are actively integrated into general community affairs. Explore our federation meeting offices spread across Nigeria.
            </p>
          </div>

          <span className="px-3 py-1 bg-maroon-100 text-maroon-800 text-xs font-semibold rounded font-mono">
            {BRANCHES_FEDERATION.length} Active Cities
          </span>
        </div>

        {/* Horizontal interactive select block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branch checklist selector */}
          <div className="md:col-span-1 space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {BRANCHES_FEDERATION.map((branch, bpIdx) => (
              <button
                key={branch.name}
                onClick={() => setSelectedBranch(bpIdx)}
                className={`w-full text-left p-3 rounded-lg text-xs font-medium flex items-center justify-between border transition-all cursor-pointer ${
                  selectedBranch === bpIdx
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-slate-50 text-gray-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{branch.name}</span>
                <Check className={`w-3.5 h-3.5 ${selectedBranch === bpIdx ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
          </div>

          {/* Interactive Branch metadata display card */}
          <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-royal-950 text-white p-6 md:p-8 rounded-2xl flex flex-col justify-between min-h-[250px]">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-gold-500 tracking-wider font-bold uppercase block">
                NATIONAL TOWN DIASPORA PORT
              </span>
              <h3 className="text-2xl font-serif font-semibold text-gold-100">
                Umuode {BRANCHES_FEDERATION[selectedBranch].name}
              </h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Organizes monthly and emergency welfare assemblies representing Umuode citizens residing in the <strong>{BRANCHES_FEDERATION[selectedBranch].region}</strong>.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 justify-between items-center text-xs">
              <span className="text-gray-400 font-light">Coordination: Connected directly to Umuode Town Hall</span>
              <button
                onClick={() => alert(`Coordination contacts for Umuode Town Union (${BRANCHES_FEDERATION[selectedBranch].name}) can be obtained from the Town Union Secretariat.`)}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-md text-[10px] font-mono font-medium inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                Request Contact Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
