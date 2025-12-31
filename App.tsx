import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PostCard from './components/PostCard';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import PostDetail from './components/PostDetail';
import Portfolio from './components/Portfolio';
import Podcast from './components/Podcast';
import Contact from './components/Contact';
import SEO from './components/SEO';
import { PrivacyPolicy, TermsOfService } from './components/Legal';
import { MOCK_POSTS, SITE_CONFIG } from './constants';
import { Post } from './types';
import { HelmetProvider } from 'react-helmet-async';
import { Search } from 'lucide-react';
import { motion as motionOriginal, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { fetchPostWithFrontmatter } from './lib/frontmatter';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';

const motion = motionOriginal as any;

// Wrapper to handle Home Logic including Scroll
const Home = ({ 
  posts, 
  isPostsLoading, 
  handlePostClick,
  searchQuery,
  setSearchQuery,
  fuse 
}: any) => {
  const location = useLocation();
  
  // Handle "Return from blog post" scrolling
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
      // Clear state to prevent scrolling on refresh (optional, depends on preference)
    }
  }, [location]);

  // Filter Posts
  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    return fuse.search(searchQuery).map((result: any) => result.item);
  }, [searchQuery, posts, fuse]);

  const handleReadNotes = () => {
    document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get the absolute latest post for Hero section
  const latestPost = posts.length > 0 ? posts[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div id="home">
        {/* Pass latestPost to Hero */}
        <Hero onReadNotes={handleReadNotes} latestPost={latestPost} />
      </div>

      <Portfolio />
      <Podcast />

      <div id="blog" className="py-20 bg-[#FAFAFA] dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 border-l-4 border-gray-300 dark:border-gray-600 pl-4 self-start sm:self-center">Latest Tech Notes</h2>
                <div className="relative w-full sm:w-auto">
                   <input 
                      type="text" 
                      placeholder="Search..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-mono focus:ring-2 focus:ring-gray-400 outline-none transition-shadow text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600"
                   />
                   <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>

              {isPostsLoading ? (
                 <div className="grid grid-cols-1 gap-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-gray-100 dark:bg-gray-800 h-64 rounded-2xl animate-pulse"></div>
                    ))}
                 </div>
              ) : filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {!searchQuery && (
                    <div className="md:col-span-2">
                      <PostCard 
                        post={filteredPosts[0]} 
                        featured={true} 
                        onClick={handlePostClick} 
                      />
                    </div>
                  )}
                  {(searchQuery ? filteredPosts : filteredPosts.slice(1)).map((post: Post) => (
                    <PostCard 
                      key={post.id} 
                      post={post} 
                      onClick={handlePostClick} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <p className="text-gray-500 font-mono">
                    {searchQuery ? `No articles found matching "${searchQuery}"` : "No articles yet. Stay tuned!"}
                  </p>
                </div>
              )}

              {!searchQuery && !isPostsLoading && filteredPosts.length > 0 && (
                <div className="mt-12 flex justify-center">
                    <button className="px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-mono text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
                        LOAD MORE ARTICLES
                    </button>
                </div>
              )}
            </div>
            <div className="lg:w-1/3">
                <div className="sticky top-24">
                  <Sidebar />
                </div>
            </div>
          </div>
        </div>
      </div>

      <Contact />
    </motion.div>
  );
};

// Wrapper for Post Detail to fetch params
const PostView = ({ posts }: { posts: Post[] }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === id) || { 
    id: id || '', 
    title: 'Loading...', 
    excerpt: '', 
    date: '', 
    category: '', 
    tags: [], 
    coverImage: '', 
    readTime: '', 
    author: { name: '', avatar: '' } 
  };

  return (
    <motion.div
       key="post"
       className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-5xl"
    >
       <PostDetail post={post} />
    </motion.div>
  );
};

const AppContent: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const initPosts = async () => {
      try {
        const response = await fetch('/posts.json');
        if (response.ok) {
          const data = await response.json();
          const sanitizedData = data.map((post: any) => ({
            ...post,
            author: post.author || { name: SITE_CONFIG.name, avatar: SITE_CONFIG.avatar }
          }));
          setPosts(sanitizedData);
        } else {
          throw new Error("posts.json not found");
        }
      } catch (e) {
        console.warn("Falling back to empty state:", e);
        setPosts(MOCK_POSTS);
      } finally {
        setIsPostsLoading(false);
      }
    };
    initPosts();
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: ['title', 'excerpt', 'tags', 'category'],
      threshold: 0.4,
      includeScore: true
    });
  }, [posts]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handlePostClick = (post: Post) => {
    navigate(`/post/${post.id}`);
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-gray-300 selection:text-black dark:selection:bg-gray-700 dark:selection:text-white transition-colors duration-500">
        <SEO />
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    posts={posts} 
                    isPostsLoading={isPostsLoading} 
                    handlePostClick={handlePostClick}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    fuse={fuse}
                  />
                } 
              />
              <Route 
                path="/post/:id" 
                element={<PostView posts={posts} />} 
              />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;