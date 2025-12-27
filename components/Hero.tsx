import React from 'react';
import { SITE_CONFIG } from '../constants';
import { Cloud, FileInput, BookOpen, Github, ArrowRight, Sparkles } from 'lucide-react';
import { motion as motionOriginal } from 'framer-motion';
import { Post } from '../types';
import { useNavigate } from 'react-router-dom';

const motion = motionOriginal as any;

interface HeroProps {
  onReadNotes: () => void;
  latestPost?: Post | null;
}

const Hero: React.FC<HeroProps> = ({ onReadNotes, latestPost }) => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center overflow-hidden">
      
      {/* 1. Background Enhancements: Grid & Ambient Glow */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-white dark:bg-gray-900 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[400px] bg-primary-500/20 rounded-full blur-[100px] opacity-50 dark:opacity-20 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative inline-block mb-8"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-primary-400 to-purple-500 shadow-xl shadow-primary-500/20">
          <img 
            src={SITE_CONFIG.avatar} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-900 bg-white"
          />
        </div>
        
        {/* 2. Enhanced Online Status with Ping Animation */}
        <div className="absolute bottom-2 right-2 flex h-6 w-6" title="System Online">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-6 w-6 bg-green-500 border-4 border-white dark:border-gray-900"></span>
        </div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6"
      >
        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">Nova</span>.
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        {SITE_CONFIG.description} <br />
        <span className="font-semibold text-gray-800 dark:text-gray-100">Full Stack Engineer</span>, 
        <span className="font-semibold text-gray-800 dark:text-gray-100 mx-2">Cloud Enthusiast</span>, 
        and <span className="font-semibold text-gray-800 dark:text-gray-100">Digital Minimalist</span>.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center justify-center space-x-4 mb-12"
      >
        <a 
          href={SITE_CONFIG.github} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors text-sm font-medium"
        >
          <Github className="w-4 h-4" />
          <span>Follow on GitHub</span>
        </a>
      </motion.div>

      {/* 3. Glassmorphism Buttons & Consistency */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mb-12"
      >
        <a 
          href={SITE_CONFIG.links.cloudLab}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto group"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none flex items-center justify-center space-x-3 group-hover:border-blue-500/50 transition-colors"
          >
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
               <Cloud className="w-5 h-5" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">Cloud Lab</span>
          </motion.button>
        </a>

        <a 
          href={SITE_CONFIG.links.fileTransfer}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto group"
        >
          <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="w-full px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none flex items-center justify-center space-x-3 group-hover:border-green-500/50 transition-colors"
          >
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
              <FileInput className="w-5 h-5" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">Transfer</span>
          </motion.button>
        </a>

        <motion.button 
          onClick={onReadNotes}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 rounded-2xl shadow-xl flex items-center justify-center space-x-3 font-semibold group"
        >
          <BookOpen className="w-5 h-5" />
          <span>Read Notes</span>
        </motion.button>
      </motion.div>

      {/* 4. Latest Post Preview Card - "Reducing Steps" */}
      {latestPost && (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
        >
            <div 
                onClick={() => navigate(`/post/${latestPost.id}`)}
                className="cursor-pointer inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
            >
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">Latest</span>
                </div>
                <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[200px] sm:max-w-none truncate">
                    {latestPost.title}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
            </div>
        </motion.div>
      )}

    </section>
  );
};

export default Hero;