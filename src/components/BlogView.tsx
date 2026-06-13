import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  User, 
  Clock, 
  Sparkles, 
  Pin, 
  Plus, 
  ChevronRight, 
  Send,
  X,
  FileText,
  MessageSquare,
  CheckCircle,
  ThumbsUp,
  Tag
} from 'lucide-react';
import { BlogPost, DEFAULT_POSTS } from '../data/blogData';

export default function BlogView() {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('umuode_blog_posts_v1');
    return saved ? JSON.parse(saved) : DEFAULT_POSTS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Suggested article draft states
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Infrastructure' | 'Culture & Festivals' | 'History & Peace' | 'Ecological' | 'Welfare'>('Culture & Festivals');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newAuthorRole, setNewAuthorRole] = useState('');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    localStorage.setItem('umuode_blog_posts_v1', JSON.stringify(posts));
  }, [posts]);

  const categories = ['All', 'Culture & Festivals', 'Infrastructure', 'History & Peace', 'Ecological', 'Welfare'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort: Pinned first, then sorted by date or ID
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0; // maintain default
  });

  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedPosts[postId]) {
      // Dislike
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes - 1 } : p));
      setLikedPosts({ ...likedPosts, [postId]: false });
    } else {
      // Like
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
      setLikedPosts({ ...likedPosts, [postId]: true });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent || !newAuthor) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    const newPost: BlogPost = {
      id: 'custom_' + Date.now(),
      title: newTitle,
      category: newCategory,
      excerpt: newExcerpt || (newContent.substring(0, 150) + '...'),
      content: newContent,
      author: newAuthor,
      authorRole: newAuthorRole || 'Community Writer',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: Math.max(1, Math.ceil(newContent.split(' ').length / 200)) + ' min read',
      likes: 1
    };

    setPosts([newPost, ...posts]);
    setSuccessMsg(true);
    setTimeout(() => {
      setNewTitle('');
      setNewExcerpt('');
      setNewContent('');
      setNewAuthor('');
      setNewAuthorRole('');
      setSuccessMsg(false);
      setShowSubmitModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-12 animate-fade-in" id="blog-view-section">
      
      {/* Editorial Header Banner */}
      <div className="relative rounded-3xl bg-slate-900 p-8 md:p-12 overflow-hidden border border-gold-300/30 text-white shadow-xl">
        {/* Dynamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#b45309_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        </div>

        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Official Press &amp; Chronicles
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight leading-tight">
            The Umuode <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-gold-400">Citizen Chronicles</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
            Historical retrospectives, agricultural developments, local constitutional amendments, and environmental insights from our constituent kindreds.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer border border-amber-400/30"
            >
              <Plus className="w-4 h-4 text-slate-955" />
              Write Article Draft
            </button>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              {posts.length} published studies
            </span>
          </div>
        </div>
      </div>

      {/* Categories & Search Grid */}
      <div className="p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-gold-200/50 flex flex-col lg:flex-row gap-4 items-center justify-between sticky top-18 z-20 shadow-xs">
        <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-maroon-900 text-white font-extrabold shadow-xs' 
                  : 'text-slate-600 hover:text-maroon-900 hover:bg-gold-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search blogs, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-gold-200 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-maroon-800 transition text-gray-800 font-medium"
          />
        </div>
      </div>

      {/* Primary Articles Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main list of posts */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {sortedPosts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-white border border-gold-100 rounded-3xl"
              >
                <BookOpen className="w-12 h-12 text-slate-250 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-700">No matching chronicles found</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto font-light">
                  Please revise your search keyword or explore other structural categories like 'History &amp; Peace' or 'Ecological'.
                </p>
              </motion.div>
            ) : (
              sortedPosts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedPost(post)}
                  className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 cursor-pointer bg-white hover:shadow-md flex flex-col justify-between group ${
                    post.isPinned 
                      ? 'border-amber-400 border-2 shadow-2xs relative' 
                      : 'border-gold-100'
                  }`}
                >
                  {/* Pinned Marker */}
                  {post.isPinned && (
                    <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 text-[8px] font-mono font-bold uppercase py-0.5 px-2 rounded-full flex items-center gap-1">
                      <Pin className="w-2.5 h-2.5" />
                      Pinned Chronicle
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2.5 text-[10px] text-gray-400 font-mono">
                      <span className="bg-gold-50 text-amber-800 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl md:text-2xl font-serif font-extrabold text-slate-900 group-hover:text-maroon-900 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-500 font-light text-xs md:text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-none">{post.author}</p>
                        <p className="text-[10px] text-gray-400 leading-none mt-1 font-mono">{post.authorRole}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleLike(post.id, e)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                          likedPosts[post.id]
                            ? 'bg-red-50 border-red-200 text-red-600 font-bold'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${likedPosts[post.id] ? 'fill-red-650' : ''}`} />
                        <span>{post.likes}</span>
                      </button>

                      <span className="text-xs font-bold text-maroon-800 group-hover:translate-x-1.5 transition-all inline-flex items-center gap-1">
                        Read Story <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar / Informational Block & Action Panel */}
        <div className="space-y-6">
          
          {/* Historical Factbox */}
          <div className="p-6 bg-gradient-to-br from-gold-50 to-amber-50 rounded-3xl border border-gold-300/60 shadow-xs space-y-4">
            <h3 className="font-serif font-black text-maroon-900 text-md flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              The Assembly Gazette
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed font-light">
              This digital press organ is supervised by the Town Union Information wing. We cover traditional laws, infrastructure progress, and cultural events affecting Umuode Community, Enugu.
            </p>
            <div className="space-y-1 bg-white p-3 rounded-2xl border border-gold-200/50">
              <span className="text-[9px] font-mono text-amber-700 uppercase font-black tracking-wider block">Editorial Mandate</span>
              <p className="text-[11px] text-gray-500 font-sans leading-normal">
                To guarantee fact-checked, elder-corroborated storytelling for coming generations, shielding rural families from memory distortion.
              </p>
            </div>
          </div>

          {/* Quick Stats sidebar widget */}
          <div className="p-6 bg-white rounded-3xl border border-gold-100 space-y-4">
            <h4 className="text-xs font-mono font-bold text-gold-700 uppercase tracking-widest">Portal Metrics</h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="block text-2xl font-serif font-bold text-maroon-900">{posts.length}</span>
                <span className="text-[9px] font-mono text-gray-400 uppercase">Articles</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="block text-2xl font-serif font-bold text-maroon-900">
                  {posts.reduce((acc, current) => acc + current.likes, 0)}
                </span>
                <span className="text-[9px] font-mono text-gray-400 uppercase">Likes Given</span>
              </div>
            </div>
          </div>

          {/* Suggest Draft Card CTA */}
          <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-4 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-600/20 to-transparent rounded-full"></div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold font-serif text-amber-300">Are you a community writer?</h4>
              <p className="text-[11px] text-gray-400 font-light max-w-xs mx-auto">
                Sons and daughters with verified historical narratives, marriage updates, or lineage data can draft a community essay.
              </p>
            </div>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 active:translate-y-[1px] transition-all cursor-pointer border border-amber-400/20"
            >
              Write Essay Draft
            </button>
          </div>

        </div>
      </div>

      {/* Full Article Modal Reading pane */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setSelectedPost(null)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-3xl bg-white border border-gold-300 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
            >
              {/* Gold Top Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-maroon-800 via-amber-500 to-royal-900"></div>

              {/* Close controls */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-lg text-gray-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Metadata */}
              <div className="space-y-4">
                <span className="bg-gold-55 text-amber-800 font-mono font-bold text-[10px] px-2.5 py-0.5 rounded uppercase tracking-widest border border-gold-200">
                  {selectedPost.category}
                </span>

                <h1 className="text-2xl md:text-3xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight pt-2">
                  {selectedPost.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-1 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <User className="w-4 h-4 text-amber-600" />
                    <span>{selectedPost.author}</span>
                    <span className="text-gray-300 font-normal">|</span>
                    <span className="text-[10px] text-gray-400 font-mono leading-none">{selectedPost.authorRole}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[10px]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Published {selectedPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[10px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedPost.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Body Content paragraph rendering */}
              <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-light font-sans max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
                {selectedPost.content.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Footer Panel */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={(e) => {
                    handleLike(selectedPost.id, e);
                    // Mirror state inside modal
                    setSelectedPost({
                      ...selectedPost,
                      likes: likedPosts[selectedPost.id] ? selectedPost.likes - 1 : selectedPost.likes + 1
                    });
                  }}
                  className={`inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-bold font-sans transition border cursor-pointer ${
                    likedPosts[selectedPost.id]
                      ? 'bg-red-50 border-red-200 text-red-650'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Approved by {selectedPost.likes} readers</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      alert("Sharing citation: " + selectedPost.title + " by " + selectedPost.author);
                    }}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-650 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Share Article
                  </button>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Finished Reading
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Suggest Essay Modal Panel */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setShowSubmitModal(false)}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl bg-white border border-gold-300 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center text-amber-700">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-md font-serif font-bold text-maroon-900">Umuode Chronicles Submission</h3>
                    <p className="text-[10px] text-gray-400 font-mono">Submit historical notes or developmental reviews</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="p-1 px-2.5 hover:bg-slate-100 rounded-lg text-xs font-semibold text-gray-400 hover:text-slate-700 transition cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {successMsg ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle className="w-6 h-6 animate-bounce" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">Draft Completed Successfully!</h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Your chronicle has been published instantly on the news feed for residents to read, comment on, and save.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gold-700 uppercase tracking-wider font-bold">Chronicle Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Traditional Title Ceremonies"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-maroon-800 transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gold-700 uppercase tracking-wider font-bold">Article Category</label>
                      <select
                        value={newCategory}
                        onChange={(e: any) => setNewCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-maroon-800 transition text-slate-700"
                      >
                        <option value="Culture & Festivals">Culture &amp; Festivals</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="History & Peace">History &amp; Peace</option>
                        <option value="Ecological">Ecological</option>
                        <option value="Welfare">Welfare</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gold-700 uppercase tracking-wider font-bold">Short Excerpt (One-sentence teaser)</label>
                    <input
                      type="text"
                      placeholder="e.g. A review of traditional titles and Ozo rites in Umuode..."
                      value={newExcerpt}
                      onChange={(e) => setNewExcerpt(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-maroon-800 transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gold-700 uppercase tracking-wider font-bold">Chronicle Essay Body</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your article paragraphs here. Use line gaps to structure different paragraphs. Write with clarity, precision, and respectful tone."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-maroon-800 transition text-gray-800 font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gold-700 uppercase tracking-wider font-bold">Author Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Elder Osita Onu"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-maroon-800 transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gold-700 uppercase tracking-wider font-bold">Author Communal Role / Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Kindred head, Youth Leader"
                        value={newAuthorRole}
                        onChange={(e) => setNewAuthorRole(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-maroon-800 transition"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShowSubmitModal(false)}
                      className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 hover:bg-opacity-95 bg-maroon-800 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Publish Draft
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
