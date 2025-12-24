import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PostCard from './components/PostCard';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import PostDetail from './components/PostDetail';
import SEO from './components/SEO';
import { MOCK_POSTS } from './constants';
import { Post } from './types';
import { HelmetProvider } from 'react-helmet-async';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { fetchPostWithFrontmatter } from './lib/frontmatter';

const App: React.FC = () => {
  // Theme State
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

  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'post'>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Data State (Runtime fetching)
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Initial Data Load
  useEffect(() => {
    const initPosts = async () => {
      try {
        // 1. Production Mode: Try fetching the generated index first
        // This file is created by 'npm run build' (scripts/generate-posts.js)
        const response = await fetch('/posts.json');
        
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          // 2. Dev/Fallback Mode: If posts.json isn't found (e.g. running local dev without build)
          // manually fetch a few known posts to allow development.
          throw new Error("posts.json not found");
        }
      } catch (e) {
        console.warn("Falling back to runtime fetching:", e);
        // Fallback for demo/dev environment
        const postIds = ['1', '2', '3', '4', '5', '6']; 
        try {
          const promises = postIds.map(id => fetchPostWithFrontmatter(id));
          const loadedPosts = await Promise.all(promises);
          setPosts(loadedPosts);
        } catch (err) {
           console.error("Critical: Failed to load posts", err);
           setPosts(MOCK_POSTS);
        }
      } finally {
        setIsPostsLoading(false);
      }
    };

    initPosts();
  }, []);

  // Configure Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: ['title', 'excerpt', 'tags', 'category'],
      threshold: 0.4, // Fuzzy matching sensitivity
      includeScore: true
    });
  }, [posts]);

  // Apply theme
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setCurrentView('post');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedPost(null);
  };

  const handleReadNotes = () => {
    if (currentView === 'post') {
      handleBackToHome();
      setTimeout(() => {
        document.getElementById('blog-feed')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('blog-feed')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter Posts using Fuse.js
  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    return fuse.search(searchQuery).map(result => result.item);
  }, [searchQuery, posts, fuse]);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-500 selection:text-white">
        <SEO title={selectedPost?.title} description={selectedPost?.excerpt} />
        
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main>
          <AnimatePresence mode="wait">
            {currentView === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Profile / Hero Section */}
                <Hero onReadNotes={handleReadNotes} />

                {/* Content Area */}
                <div id="blog-feed" className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                  <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* Main Blog Feed */}
                    <div className="lg:w-2/3">
                      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                        <h2 className="text-2xl font-bold border-l-4 border-primary-500 pl-4 self-start sm:self-center">Latest Tech Notes</h2>
                        
                        {/* Search Bar */}
                        <div className="relative w-full sm:w-auto">
                           <input 
                              type="text" 
                              placeholder="Search (e.g., 'React' or 'DevOps')..." 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-shadow"
                           />
                           <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                        </div>
                      </div>

                      {isPostsLoading ? (
                         <div className="grid grid-cols-1 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white dark:bg-gray-800 h-64 rounded-2xl animate-pulse"></div>
                            ))}
                         </div>
                      ) : filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* First post is featured (only if no search query) */}
                          {!searchQuery && (
                            <div className="md:col-span-2">
                              <PostCard 
                                post={filteredPosts[0]} 
                                featured={true} 
                                onClick={handlePostClick} 
                              />
                            </div>
                          )}
                          
                          {/* Rest of the posts */}
                          {(searchQuery ? filteredPosts : filteredPosts.slice(1)).map((post) => (
                            <PostCard 
                              key={post.id} 
                              post={post} 
                              onClick={handlePostClick} 
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                          <p className="text-gray-500">No articles found matching "{searchQuery}"</p>
                        </div>
                      )}

                      {/* Pagination (Visual) */}
                      {!searchQuery && !isPostsLoading && (
                        <div className="mt-12 flex justify-center">
                            <button className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                                Load More Articles
                            </button>
                        </div>
                      )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-24">
                          <Sidebar />
                        </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {currentView === 'post' && selectedPost && (
              <motion.div
                 key="post"
                 className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-5xl"
              >
                  <PostDetail post={selectedPost} onBack={handleBackToHome} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default App;