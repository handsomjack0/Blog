import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-gray-900 dark:text-white">{SITE_CONFIG.name.split('.')[0]}<span className="text-primary-600">.</span></span>
            <p className="text-sm text-gray-500 mt-2">© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
             <Link to="/privacy" className="hover:text-primary-600 dark:hover:text-white transition-colors">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-primary-600 dark:hover:text-white transition-colors">Terms of Service</Link>
             <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-white transition-colors">RSS</a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-400">
            Powered by React, Tailwind & Cloudflare Pages.
        </div>
      </div>
    </footer>
  );
};

export default Footer;