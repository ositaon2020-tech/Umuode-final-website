import React, { useState } from 'react';
import { PROJECTS } from '../data/projectsData';
import { ProjectItem } from '../types';
import { 
  Building, 
  Search, 
  MapPin, 
  Plus, 
  Heart, 
  Bookmark, 
  Activity, 
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ProjectsView() {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(PROJECTS);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Propose New Project state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Infrastructure',
    supportedBy: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Filters logic
  const filteredProjects = projectsList.filter((proj) => {
    const matchesCategory = filterCategory === 'all' || proj.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || proj.status === filterStatus;
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          proj.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleProposeProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    const newProj: ProjectItem = {
      id: "proj-" + Date.now(),
      title: formData.title,
      description: formData.description,
      status: "Proposed",
      category: formData.category as any,
      supportedBy: formData.supportedBy || "Community Hand-raiser pool",
      imagePlaceholderColor: "from-slate-600 to-indigo-850"
    };

    setProjectsList([newProj, ...projectsList]);
    setFormData({ title: '', description: '', category: 'Infrastructure', supportedBy: '' });
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setShowForm(false);
    }, 2500);
  };

  const categoriesList = ['all', 'Education', 'Infrastructure', 'Healthcare', 'Agriculture', 'Religious', 'Social'];
  const statusesList = ['all', 'Completed', 'Under Construction', 'Ongoing', 'Proposed'];

  return (
    <div className="space-y-12">
      {/* Header with summary stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gold-500/10 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900 tracking-tight">
            Projects, Infrastructure &amp; Sites
          </h1>
          <p className="text-gray-500 text-sm font-light max-w-2xl">
            Reviewing physical community structures, academic schools, religious landmarks, and agricultural sites established in Umuode since returning to exile.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-white rounded-lg text-xs font-semibold shadow-md inline-flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Propose Project Idea
        </button>
      </div>

      {/* Dynamic Propose Form Overlay/Block */}
      {showForm && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white p-6 md:p-8 rounded-3xl border border-gold-500/20 shadow-md space-y-6 max-w-2xl mx-auto"
        >
          <div className="space-y-2">
            <h3 className="text-xl font-serif font-bold text-maroon-900">Propose New Community Site / Project</h3>
            <p className="text-xs text-gray-500">Submit development proposals for Town Union review. Approved proposals are logged directly below.</p>
          </div>

          {successMsg ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Idea submitted successfully! Your proposal has been appended to the live portal below.
            </div>
          ) : (
            <form onSubmit={handleProposeProject} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-600 block mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Modern Library Wing"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-maroon-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-600 block mb-1">Proposed Funding Facilitator</label>
                  <input
                    type="text"
                    placeholder="e.g. Diaspora Joint Group"
                    value={formData.supportedBy}
                    onChange={(e) => setFormData({ ...formData, supportedBy: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-maroon-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-600 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-maroon-800"
                  >
                    <option value="Education">Education</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Religious">Religious</option>
                    <option value="Social">Social</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-600 block mb-1">Description &amp; Community Value *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the developmental layout and benefits..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-maroon-800"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 bg-slate-100 hover:bg-slate-200 rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-maroon-805 bg-maroon-800 hover:bg-maroon-900 rounded-md cursor-pointer"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          )}
        </motion.div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gold-101 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search bar input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search community projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-maroon-800"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          {/* Category Dropdown */}
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
            >
              {categoriesList.map((c) => (
                <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-1">
            <Bookmark className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
            >
              {statusesList.map((s) => (
                <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid Display */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj, idx) => {
            let statusBadge = "bg-amber-100 text-amber-800";
            if (proj.status === 'Completed') statusBadge = "bg-emerald-100 text-emerald-800";
            if (proj.status === 'Proposed') statusBadge = "bg-slate-100 text-slate-800";
            if (proj.status === 'Under Construction') statusBadge = "bg-blue-100 text-blue-800 font-medium";

            return (
              <motion.div
                layout
                key={proj.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden border border-gold-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Decorative Visual Illustration Banner */}
                <div className={`h-36 bg-gradient-to-tr ${proj.imagePlaceholderColor} p-6 flex flex-col justify-between text-white relative`}>
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]"></div>
                  
                  <div className="flex justify-between items-start z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/10 text-[10px] uppercase font-mono tracking-wider font-semibold">
                      {proj.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-semibold ${statusBadge}`}>
                      {proj.status}
                    </span>
                  </div>

                  <Building className="w-8 h-8 opacity-75 z-10" />
                </div>

                {/* Text Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif font-bold text-slate-800 leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Supporting Facilitators */}
                  <div className="pt-4 border-t border-slate-100 space-y-1">
                    <span className="text-[9px] font-mono text-gray-400 block uppercase">PRIMARY SUPPORTER / POOL:</span>
                    <span className="text-xs font-semibold text-maroon-900 block leading-tight">
                      {proj.supportedBy}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-3xl">
          <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <h4 className="font-serif text-slate-700 font-semibold text-sm">No Projects Match Selected Filters</h4>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">Try resetting your search input query or choosing a broader status option.</p>
        </div>
      )}
    </div>
  );
}
