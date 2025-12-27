import React from 'react';
import { SITE_CONFIG } from '../constants';
import { Cloud, FileInput, BookOpen, Github, ArrowRight } from 'lucide-react';
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
      
      {/* Background Enhancements: Grid & Ambient Glow */}
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
        
        {/* Enhanced Online Status with Ping Animation */}
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
        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 animate-gradient-x pb-2">Nova</span>.
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
      >
        {SITE_CONFIG.description} <br />
        <span className="font-semibold text-gray-800 dark:text-gray-100">Cloud Architect</span>
        <span className="mx-3 text-gray-400">•</span>
        <span className="font-semibold text-gray-800 dark:text-gray-100">Self-hosting Geek</span>
        <span className="mx-3 text-gray-400">•</span>
        <span className="font-semibold text-gray-800 dark:text-gray-100">AI Explorer</span>
      </motion.p>

      {/* Improved GitHub Button: More distinct pill shape */}
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
          className="group flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600"
        >
          <Github className="w-4 h-4" />
          <span className="font-medium text-sm">Follow on GitHub</span>
          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
        </a>
      </motion.div>

      {/* Buttons: Fixed Widths & Colored Glows */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full mb-12"
      >
        {/* Primary Button: Cloud Lab (Blue Glow) */}
        <a 
          href={SITE_CONFIG.links.cloudLab}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto group"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-48 px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/50 transition-all duration-300 flex items-center justify-center space-x-3 font-semibold"
          >
            <Cloud className="w-5 h-5" />
            <span>我的云端实验室</span>
          </motion.button>
        </a>

        {/* Secondary Button: Transfer (Green Glow) */}
        <a 
          href={SITE_CONFIG.links.fileTransfer}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto group"
        >
           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="w-full sm:w-48 px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-green-500/20 hover:border-green-500/30 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <div className="text-green-600 dark:text-green-400">
              <FileInput className="w-5 h-5" />
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-200">极速文件传输</span>
          </motion.button>
        </a>

        {/* Secondary Button: Notes (Purple Glow) */}
        <motion.button 
          onClick={onReadNotes}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-48 px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/30 transition-all duration-300 flex items-center justify-center space-x-3"
        >
          <div className="text-purple-600 dark:text-purple-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-semibold text-gray-700 dark:text-gray-200">技术笔记</span>
        </motion.button>
      </motion.div>

      {/* Latest Post Preview Card */}
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