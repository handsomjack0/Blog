import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-serif font-bold text-gray-900 dark:text-white italic">
                {SITE_CONFIG.name.split('.')[0]}<span className="text-gray-400 dark:text-gray-600 not-italic">.</span>
            </span>
            <p className="text-sm text-gray-500 mt-4 max-w-xs font-light">
                Designed for clarity and depth. <br/>
                © {new Date().getFullYear()} {SITE_CONFIG.name}.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
             <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link>
             <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">RSS Feed</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;