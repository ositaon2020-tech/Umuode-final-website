import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Upload, 
  X, 
  MapPin, 
  Grid, 
  Calendar, 
  Image as ImageIcon, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Camera, 
  CheckCircle,
  FileImage
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'culture' | 'landscape' | 'projects' | 'history';
  description: string;
  url: string;
  date: string;
  credit: string;
}

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Annual Umuode Cultural Heritage Day',
    category: 'culture',
    description: 'A spectacular display of ancestral choreographies, radiant traditional multi-tiered coral beads, and traditional royalty robes during our year-end community assembly.',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
    date: 'December 2025',
    credit: 'Umuode Editorial Council'
  },
  {
    id: 'g2',
    title: 'The Clean Flow of Inyaba River',
    category: 'landscape',
    description: 'The life-giving stream of the Inyaba River winding beautifully through our rainforest borders, long revered for its purity, peace, and spiritual purification in local folklore.',
    url: 'https://images.unsplash.com/photo-1547483238-f400e65ccd56?auto=format&fit=crop&q=80&w=800',
    date: 'March 2026',
    credit: 'Inyaba River Conservation Team'
  },
  {
    id: 'g3',
    title: 'Council of Elders Chamber Meeting',
    category: 'history',
    description: 'A historic session of the kindred elder delegates and titled cabinet chiefs debating boundary arbitration and standardizing regional burial by-laws.',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
    date: 'January 2026',
    credit: 'UTU Secretarial Unit'
  },
  {
    id: 'g4',
    title: 'Bountiful Yam Valley Plantations',
    category: 'landscape',
    description: 'The rich organic soil profile of Umuode valley is famous for producing highly sought-after white water yams, a primary element in cultural marriages and the New Yam Festival.',
    url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800',
    date: 'October 2025',
    credit: 'Nkanu Agricultural Syndicate'
  },
  {
    id: 'g5',
    title: 'Community Solar Utility grid',
    category: 'projects',
    description: 'A high-capacity clean energy borewell station constructed near the civic field to supply fresh filtered running water to our remote residential clans.',
    url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
    date: 'April 2026',
    credit: 'Diaspora Aid Committee'
  },
  {
    id: 'g6',
    title: 'Umuode Primary Healthcare Facility',
    category: 'projects',
    description: 'The outer corridor and triage wings of our modern local health clinic, offering maternal child welfare services, vaccinations, and crucial emergency responses.',
    url: 'https://images.unsplash.com/photo-1531058020387-3be344559767?auto=format&fit=crop&q=80&w=800',
    date: 'February 2026',
    credit: 'MoH Inspection Envoy'
  }
];

export default function GalleryView() {
  const [items, setItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('umuode_gallery_v1');
    return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'culture' | 'landscape' | 'projects' | 'history'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Upload/Contribution form states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<'culture' | 'landscape' | 'projects' | 'history'>('culture');
  const [newCredit, setNewCredit] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    localStorage.setItem('umuode_gallery_v1', JSON.stringify(items));
  }, [items]);

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.credit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle local image file upload (FileReader convert to data URI)
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (png/jpeg/webp).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Please provide or upload an image file.');
      return;
    }

    const newItem: GalleryItem = {
      id: 'custom_' + Date.now(),
      title: newTitle || 'Untitled Archive Photo',
      category: newCategory,
      description: newDesc || 'No caption provided.',
      url: imageUrl,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      credit: newCredit || 'Community Contributor'
    };

    setItems([newItem, ...items]);
    setSuccessMsg(true);
    setTimeout(() => {
      // Reset form states
      setNewTitle('');
      setNewDesc('');
      setNewCredit('');
      setImageUrl('');
      setSuccessMsg(false);
      setShowUploadModal(false);
    }, 2000);
  };

  const handlePrevImage = () => {
    if (activeLightboxIndex === null) return;
    const newIdx = activeLightboxIndex === 0 ? filteredItems.length - 1 : activeLightboxIndex - 1;
    setActiveLightboxIndex(newIdx);
  };

  const handleNextImage = () => {
    if (activeLightboxIndex === null) return;
    const newIdx = activeLightboxIndex === filteredItems.length - 1 ? 0 : activeLightboxIndex + 1;
    setActiveLightboxIndex(newIdx);
  };

  const selectedLightboxItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div className="space-y-12" id="gallery-view-section">
      
      {/* Visual Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-maroon-900 to-royal-955 p-8 md:p-12 overflow-hidden border border-gold-400/20 shadow-xl text-white">
        <div className="absolute inset-0 opacity-15 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#d97706_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        </div>

        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-300 text-xs font-mono font-medium uppercase tracking-wider border border-gold-500/20">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Digital Preservation Core
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight leading-tight">
            The Umuode <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-gold-400">Media Sanctuary</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
            Preserving history in light and shadow. Browse through high-definition ecological records of the Inyaba wetlands, cultural dances, construction archives, and citizen-contributed moments.
          </p>
          
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer border border-amber-400/30"
            >
              <Camera className="w-4 h-4 text-slate-955" />
              Contribute Photos
            </button>
            <span className="text-xs text-gray-400 font-mono flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              {items.length} records archived
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="sticky top-18 z-20 bg-gold-50/90 backdrop-blur-md p-4 rounded-2xl border border-gold-200/50 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
        {/* Category Pill Filters (No Icons in active controls to remain clean) */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { id: 'all' as const, label: 'All Media' },
            { id: 'culture' as const, label: 'Festivals & Dance' },
            { id: 'landscape' as const, label: 'Ecology & Flora' },
            { id: 'projects' as const, label: 'Infrastructure & Aid' },
            { id: 'history' as const, label: 'Elder Archives' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeCategory === cat.id 
                  ? 'bg-maroon-900 text-white shadow-sm font-extrabold' 
                  : 'text-slate-600 hover:text-maroon-900 hover:bg-gold-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search archives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gold-200 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-maroon-800 transition text-gray-800 font-medium font-sans"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-gray-500 hover:bg-slate-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid of Archive Cards */}
      <AnimatePresence mode="popLayout">
        {filteredItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20 bg-white border border-gold-200/40 rounded-3xl space-y-3"
          >
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No media matches found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto font-light">
              We couldn't locate any records matching your criteria. Try redefining the search query or selecting a different filter.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layoutId={`card-container-${item.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveLightboxIndex(idx)}
                className="group bg-white rounded-2xl border border-gold-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Media frame */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.url}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-[10px] font-mono text-gold-300 tracking-wider uppercase font-semibold">
                      Click to expand
                    </span>
                  </div>
                  
                  {/* Category Pin */}
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs px-2.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest font-bold text-amber-400 border border-amber-500/20">
                    {item.category}
                  </div>
                </div>

                {/* Info block */}
                <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-maroon-900 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-light line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono">By: {item.credit}</span>
                    <span className="text-maroon-800 group-hover:translate-x-1 transition font-bold text-[9px] uppercase tracking-wider">
                      Details &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal Carousel */}
      <AnimatePresence>
        {selectedLightboxItem && activeLightboxIndex !== null && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-xs"
              onClick={() => setActiveLightboxIndex(null)}
            />

            {/* Panel */}
            <motion.div
              layoutId={`card-container-${selectedLightboxItem.id}`}
              className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row text-white"
            >
              {/* Outer Close Button */}
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-[40%] md:top-[50%] md:-translate-y-1/2 z-20 p-3 text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 rounded-full transition cursor-pointer flex items-center justify-center"
                title="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-4 top-[40%] md:top-[50%] md:-translate-y-1/2 z-20 p-3 text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 rounded-full transition cursor-pointer flex items-center justify-center"
                title="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Media Column */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[250px] md:min-h-[450px]">
                <img
                  src={selectedLightboxItem.url}
                  alt={selectedLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[500px] object-contain"
                />
              </div>

              {/* Text Information Column */}
              <div className="w-full md:w-80 bg-slate-900 p-6 flex flex-col justify-between border-t md:border-l border-slate-800 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-bold tracking-widest inline-block">
                      {selectedLightboxItem.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block mt-1">
                      Archived {selectedLightboxItem.date}
                    </span>
                  </div>

                  <h3 className="text-md font-serif font-bold text-white tracking-tight">
                    {selectedLightboxItem.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {selectedLightboxItem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Source/Author:</span>
                    <span className="text-slate-200">{selectedLightboxItem.credit}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500 justify-center">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    <span>Nkanu East, Enugu, NG</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        alert("Mock Download: Image reference URI copy complete! This feature saves photo assets to local registry directories.");
                      }}
                      className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] uppercase tracking-wider font-semibold cursor-pointer transition text-slate-200"
                    >
                      Copy Reference
                    </button>
                    <button
                      onClick={() => setActiveLightboxIndex(null)}
                      className="w-full py-1.5 bg-maroon-800 hover:bg-maroon-700 rounded-lg text-[10px] uppercase tracking-wider font-semibold cursor-pointer transition text-white"
                    >
                      Close Viewer
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Suggestion / Photo Contribution Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setShowUploadModal(false)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl bg-white border border-gold-300 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-amber-800">
                    <Camera className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-md font-serif font-bold text-maroon-900">Media Preservation Submission</h3>
                    <p className="text-[10px] text-gray-400 font-mono">Contribute community photos or historical imagery</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-1 px-2.5 hover:bg-slate-100 rounded-lg text-xs font-semibold text-gray-400 hover:text-slate-705 transition cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {successMsg ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle className="w-6 h-6 animate-bounce" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">Thank you! Submitting Archive Record...</h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Your photo was registered into the Umuode local catalog. It is instantly viewable on the filter dashboard.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Photo Drag & Drop Zone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gold-700 uppercase tracking-wider font-bold">Step 1: Visual Asset File</label>
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                        dragActive ? 'border-amber-500 bg-amber-50/20' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      {imageUrl ? (
                        <div className="space-y-2">
                          <img
                            src={imageUrl}
                            alt="Preview file"
                            className="h-28 mx-auto rounded-lg object-cover border border-slate-105"
                          />
                          <p className="text-[10px] text-slate-500 font-mono">Image loaded successfully. Click below or drop a new file to change.</p>
                          <button
                            type="button"
                            onClick={() => setImageUrl('')}
                            className="text-[10px] px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="py-4 space-y-2 flex flex-col items-center">
                          <Upload className="w-8 h-8 text-slate-400 group-hover:scale-110 transition" />
                          <div className="text-xs text-slate-600 font-medium">
                            Drag and drop an image file, or{' '}
                            <label className="text-maroon-800 font-bold hover:underline cursor-pointer">
                              <span>browse computer</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <p className="text-[10px] text-gray-400 font-mono">Supports PNG, JPG, or WEBP formats up to 4MB</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono justify-center">
                      <span>— or insert public web URL —</span>
                    </div>

                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-gray-800 font-mono focus:outline-none focus:border-maroon-800 transition"
                    />
                  </div>

                  {/* Metadata Fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gold-700 uppercase tracking-wider font-bold">Photo Caption Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Village Square Coronation"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-maroon-800 transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gold-700 uppercase tracking-wider font-bold">Section Category</label>
                      <select
                        value={newCategory}
                        onChange={(e: any) => setNewCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-maroon-800 transition text-slate-700"
                      >
                        <option value="culture">Festivals &amp; Dance</option>
                        <option value="landscape">Ecology &amp; Flora</option>
                        <option value="projects">Infrastructure &amp; Aid</option>
                        <option value="history">Elder Archives</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gold-700 uppercase tracking-wider font-bold">Description / Cultural Context</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Explain what is going on here, the lineage or people involved, and why this represents Umuode cultural heritage."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-maroon-800 transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gold-700 uppercase tracking-wider font-bold">Photographer / Author Credit</label>
                    <input
                      type="text"
                      placeholder="e.g. Elder Osita Onu, UTU Youth wing"
                      value={newCredit}
                      onChange={(e) => setNewCredit(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-maroon-800 transition"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="px-4 py-2 border border-slate-200 text-slate-650 hover:bg-slate-50 rounded-xl text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 hover:bg-opacity-90 bg-maroon-800 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 border border-maroon-900"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Publish to Portal
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
