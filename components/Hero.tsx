import React from 'react';
import { SITE_CONFIG } from '../constants';
import { Cloud, FileInput, BookOpen, Github } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onReadNotes: () => void;
}

const Hero: React.FC<HeroProps> = ({ onReadNotes }) => {
  return (
    <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative inline-block mb-6"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-primary-500 to-purple-500 shadow-lg">
          <img 
            src={SITE_CONFIG.avatar} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-900"
          />
        </div>
        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full animate-pulse" title="System Online"></div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4"
      >
        Hi, I'm Nova<span className="text-primary-500">.</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
      >
        {SITE_CONFIG.description} <br />
        Full Stack Engineer, Cloud Enthusiast, and Digital Minimalist.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center justify-center space-x-4 mb-10"
      >
        <a 
          href={SITE_CONFIG.github} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center space-x-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <Github className="w-5 h-5" />
          <span>GitHub</span>
        </a>
      </motion.div>

      {/* Primary Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
      >
        <a 
          href={SITE_CONFIG.links.cloudLab}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-2 font-semibold"
          >
            <Cloud className="w-5 h-5" />
            <span>我的云端实验室</span>
          </motion.button>
        </a>

        <a 
          href={SITE_CONFIG.links.fileTransfer}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-xl shadow-sm flex items-center justify-center space-x-2 font-medium"
          >
            <FileInput className="w-5 h-5 text-green-500" />
            <span>极速文件传输</span>
          </motion.button>
        </a>

        <motion.button 
          onClick={onReadNotes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-xl shadow-sm flex items-center justify-center space-x-2 font-medium"
        >
          <BookOpen className="w-5 h-5 text-purple-500" />
          <span>技术笔记</span>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;