import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Github, Rss } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: targetId } });
    } else {
      const element = document.getElementById(targetId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass-bar supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60' 
            : 'bg-transparent pt-4'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo: Clean Sans-Serif, SF Pro Style */}
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white transition-opacity hover:opacity-70">
                Nova
              </span>
            </div>

            {/* Desktop Navigation: Minimalist Text Links */}
            <nav className="hidden md:flex space-x-8">
              {['Home', 'Portfolio', 'Podcast', 'Blog', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item.toLowerCase())}
                  className="text-[13px] font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors tracking-wide"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Right Icons: macOS Control Center Style */}
            <div className="hidden md:flex items-center space-x-3">
              <a href="/rss.xml" target="_blank" className="p-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                <Rss className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              
              <button 
                onClick={toggleDarkMode} 
                className="ml-2 p-2 bg-gray-200/50 dark:bg-gray-800/50 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
                title="Toggle Theme"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={toggleDarkMode} 
                className="text-gray-500 dark:text-gray-400"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-900 dark:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-2xl"
          >
            <div className="px-6 py-6 space-y-4">
              {['Home', 'Portfolio', 'Podcast', 'Blog', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item.toLowerCase())}
                  className="block text-2xl font-bold text-gray-900 dark:text-white tracking-tight"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;