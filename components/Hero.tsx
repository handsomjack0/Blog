import React, { useState } from 'react';
import { SITE_CONFIG } from '../constants';
import { Cloud, FileInput, BookOpen, ArrowUpRight, ArrowRight } from 'lucide-react';
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
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center overflow-hidden bg-noise">
      
      {/* Background: Subtle Minimalist Grid (Faded even more) */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      {/* Glow: Almost invisible warm fog */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[500px] bg-gray-100/40 dark:bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Avatar */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative inline-block mb-10"
      >
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.05)] overflow-hidden bg-white dark:bg-gray-800/80">
          {!imgError ? (
            <img 
              src={SITE_CONFIG.avatar} 
              alt="Profile" 
              onError={() => setImgError(true)}
              className="w-full h-full object-cover filter grayscale-[10%] hover:grayscale-0 transition-all duration-1000 ease-in-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600">
               <span className="text-4xl font-serif italic">N</span>
            </div>
          )}
        </div>
        
        {/* Status Indicator: Tiny and precise */}
        <div className="absolute bottom-3 right-3 flex h-3 w-3" title="System Online">
           <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 dark:bg-emerald-500 shadow-sm ring-2 ring-white dark:ring-gray-900"></span>
        </div>
      </motion.div>

      {/* Heading: [修改] 字重对比 - 极细 vs 衬线体 */}
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-5xl md:text-8xl tracking-tight mb-8"
      >
        <span className="font-sans font-light text-gray-400 dark:text-gray-500 mr-2 md:mr-4 tracking-normal">Hi, I'm</span>
        <span className="font-serif font-medium italic text-gray-900 dark:text-gray-100 relative inline-block">
            Nova
            <span className="text-primary-500 ml-1 not-italic text-4xl md:text-6xl absolute -top-2 md:top-0">.</span>
        </span>
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-2xl mx-auto mb-10"
      >
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-serif leading-relaxed italic mb-6">
           "{SITE_CONFIG.description}"
        </p>

        {/* Roles */}
        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-sm font-mono text-gray-400 dark:text-gray-500">
           <span className="text-gray-600 dark:text-gray-300">Cloud Architect</span>
           <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
           <span className="text-gray-600 dark:text-gray-300">Self-hosting Geek</span>
           <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
           <span className="text-gray-600 dark:text-gray-300">AI Explorer</span>
        </div>
      </motion.div>

      {/* GitHub Link: [修改] 极简文字链接，右上角箭头 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center justify-center mb-16"
      >
        <a 
          href={SITE_CONFIG.github} 
          target="_blank" 
          rel="noreferrer"
          className="group flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors border-b border-transparent hover:border-gray-900 dark:hover:border-white pb-0.5"
        >
          <span>Follow on GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </motion.div>

      {/* Cards: [修改] 软玻璃效果 + 图标色块 + 统一宽度 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mx-auto mb-20 px-4 sm:px-0"
      >
        {/* Card 1 */}
        <a 
          href={SITE_CONFIG.links.cloudLab}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="h-full px-6 py-5 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <Cloud className="w-5 h-5" />
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">Cloud Lab</span>
          </div>
        </a>

        {/* Card 2 */}
        <a 
          href={SITE_CONFIG.links.fileTransfer}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
           <div className="h-full px-6 py-5 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                <FileInput className="w-5 h-5" />
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">File Transfer</span>
          </div>
        </a>

        {/* Card 3 */}
        <button 
          onClick={onReadNotes}
          className="group block w-full h-full"
        >
          <div className="h-full px-6 py-5 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">Read Notes</span>
          </div>
        </button>
      </motion.div>

      {/* Latest Post Preview */}
      {latestPost && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center"
        >
            <button 
                onClick={() => navigate(`/post/${latestPost.id}`)}
                className="group flex items-center gap-3 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
                <span className="font-mono text-xs uppercase tracking-wider">Latest</span>
                <span className="w-px h-3 bg-gray-200 dark:bg-gray-800"></span>
                <span className="font-serif italic text-gray-600 dark:text-gray-300 group-hover:underline underline-offset-4 decoration-gray-300 group-hover:decoration-gray-900 transition-all">
                    {latestPost.title}
                </span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </button>
        </motion.div>
      )}

    </section>
  );
};

export default Hero;