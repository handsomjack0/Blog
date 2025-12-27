import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Github, Rss } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

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
      setIsScrolled(window.scrollY > 20);
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
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo: Changed to Serif for consistency */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <span className="text-2xl font-serif font-bold text-gray-900 dark:text-white tracking-tight italic">
              Nova<span className="text-gray-400 dark:text-gray-600 not-italic">.</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {['Home', 'Portfolio', 'Podcast', 'Blog', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item.toLowerCase())}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer relative group tracking-wide"
              >
                {item}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-1">
             <div className="flex items-center border-r border-gray-200 dark:border-gray-800 pr-3 mr-3 space-x-1">
                <a href="/rss.xml" target="_blank" className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" title="RSS Feed">
                  <Rss className="w-4 h-4" />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
             </div>
            
            <button 
              onClick={toggleDarkMode} 
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <button 
              onClick={toggleDarkMode} 
              className="p-2 mr-2 text-gray-500 dark:text-gray-400"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {['Home', 'Portfolio', 'Podcast', 'Blog', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item.toLowerCase())}
                className="block px-3 py-3 rounded-lg text-lg font-serif text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;