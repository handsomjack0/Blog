import React, { useState } from 'react';
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
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center overflow-hidden bg-noise">
      
      {/* Background: Subtle Minimalist Grid */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      {/* Glow: Changed to a very subtle warm gray fog */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[500px] bg-gray-200/30 dark:bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative inline-block mb-12"
      >
        {/* Avatar Container: [修改] 移除硬边框，增加柔和的“博物馆级”漫射阴影 */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.05)] overflow-hidden bg-gray-100 dark:bg-gray-800/80">
          {!imgError ? (
            <img 
              src={SITE_CONFIG.avatar} 
              alt="Profile" 
              onError={() => setImgError(true)}
              className="w-full h-full object-cover filter grayscale-[10%] hover:grayscale-0 transition-all duration-1000 ease-in-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500">
               <span className="text-4xl font-serif italic">N</span>
            </div>
          )}
        </div>
        
        {/* Status Indicator: [修改] 更小、更精致的绿色信号点，模拟设备指示灯 */}
        <div className="absolute bottom-2 right-4 flex h-3 w-3" title="System Online">
           <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600 dark:bg-emerald-500 shadow-lg shadow-emerald-500/50"></span>
        </div>
      </motion.div>

      {/* Heading: [修改] 整体统一为衬线体 (Serif)，增加字间距，颜色为深墨色 */}
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-5xl md:text-8xl font-serif font-medium text-[#1A1A1B] dark:text-gray-100 tracking-tight mb-8"
      >
        Hi, I'm <span className="italic">Nova</span>.
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-2xl mx-auto mb-12"
      >
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-serif leading-relaxed italic mb-6">
           "{SITE_CONFIG.description}"
        </p>

        {/* Roles: [修改] 使用 JetBrains Mono 等宽字体，去除圆点，使用 | 分隔 */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm md:text-base font-mono text-gray-500 dark:text-gray-500">
           <span>Cloud Architect</span>
           <span className="text-gray-300 dark:text-gray-700">|</span>
           <span>Self-hosting Geek</span>
           <span className="text-gray-300 dark:text-gray-700">|</span>
           <span>AI Explorer</span>
        </div>
      </motion.div>

      {/* GitHub Link: Minimalist Pill */}
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
          className="group flex items-center gap-3 px-5 py-2 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
        >
          <Github className="w-4 h-4" />
          <span className="text-xs font-mono tracking-wide">FOLLOW ON GITHUB</span>
        </a>
      </motion.div>

      {/* Ghost Buttons: Consistent Wireframe Style */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full mb-16"
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
            className="w-full sm:w-48 px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <Cloud className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            <span className="font-medium font-sans">Cloud Lab</span>
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
             className="w-full sm:w-48 px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <FileInput className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            <span className="font-medium font-sans">File Transfer</span>
          </motion.button>
        </a>

        <motion.button 
          onClick={onReadNotes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-48 px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-center gap-3 group"
        >
          <BookOpen className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
          <span className="font-medium font-sans">Read Notes</span>
        </motion.button>
      </motion.div>

      {/* Latest Post Preview: Simplified */}
      {latestPost && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center"
        >
            <button 
                onClick={() => navigate(`/post/${latestPost.id}`)}
                className="group flex items-center gap-3 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400">Latest</span>
                <span className="w-px h-3 bg-gray-300 dark:bg-gray-700"></span>
                <span className="font-serif italic underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 group-hover:decoration-gray-900 dark:group-hover:decoration-white transition-all">
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