import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-gray-900 dark:text-white">Nova<span className="text-primary-600">.</span></span>
            <p className="text-sm text-gray-500 mt-2">© {new Date().getFullYear()} Nova Tech. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
             <a href="#" className="hover:text-primary-600 dark:hover:text-white">Privacy Policy</a>
             <a href="#" className="hover:text-primary-600 dark:hover:text-white">Terms of Service</a>
             <a href="#" className="hover:text-primary-600 dark:hover:text-white">RSS</a>
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