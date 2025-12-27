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
    <section className="relative pt-48 pb-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center overflow-hidden">
      
      {/* Background: Clean, Pure with Ambient Glow */}
      {/* 移除之前的网格背景，只保留一个非常柔和的中心光晕 */}
      <div 
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[800px] rounded-full pointer-events-none opacity-60 dark:opacity-20"
        style={{ 
          background: 'radial-gradient(circle at 50% 50%, rgba(224, 231, 255, 0.5) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(80px)'
        }}
      ></div>
      
      {/* Avatar Container: 增加悬浮感 (Layered Shadows) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative inline-block mb-12 group"
      >
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden bg-white dark:bg-gray-800 transition-transform duration-500 ease-out group-hover:scale-105">
          {!imgError ? (
            <img 
              src={SITE_CONFIG.avatar} 
              alt="Profile" 
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600">
               <span className="text-4xl font-serif italic">N</span>
            </div>
          )}
        </div>
        
        {/* Status Indicator: 移除硬边框，使用更自然的阴影 */}
        <div className="absolute bottom-3 right-3 flex h-3.5 w-3.5" title="System Online">
           <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 shadow-sm border-2 border-[#F9FAFB] dark:border-gray-950"></span>
        </div>
      </motion.div>

      {/* Heading: 统一视觉重量，颜色加深 */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-5xl md:text-8xl tracking-tight mb-8"
      >
        {/* Hi, I'm: Medium weight, Dark Slate */}
        <span className="font-sans font-medium text-slate-900 dark:text-white mr-3 md:mr-5 tracking-tight">Hi, I'm</span>
        {/* Nova: Bold Italic, Serif */}
        <span className="font-serif font-bold italic text-slate-900 dark:text-white relative inline-block">
            Nova
            <span className="text-primary-500 ml-1 not-italic text-4xl md:text-6xl absolute -top-1 md:top-1">.</span>
        </span>
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-2xl mx-auto mb-12"
      >
        {/* Quote: 去掉引号，颜色变淡，字体适中 */}
        <p className="text-base md:text-lg text-slate-500 dark:text-gray-400 font-serif leading-relaxed italic mb-8">
           {SITE_CONFIG.description}
        </p>

        {/* Roles: 极客风 Mono 字体，点分隔符 */}
        <div className="flex flex-wrap justify-center items-center gap-3 text-sm font-mono text-slate-500 dark:text-slate-400 tracking-wide">
           <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">Cloud Architect</span>
           <span className="text-slate-300 dark:text-gray-700">·</span>
           <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">Self-hosting Geek</span>
           <span className="text-slate-300 dark:text-gray-700">·</span>
           <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-default">AI Explorer</span>
        </div>
      </motion.div>

      {/* GitHub Link: 保持极简 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center justify-center mb-20"
      >
        <a 
          href={SITE_CONFIG.github} 
          target="_blank" 
          rel="noreferrer"
          className="group flex items-center gap-1.5 text-xs font-mono font-medium text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest border-b border-transparent hover:border-slate-900 dark:hover:border-white pb-0.5"
        >
          <span>Follow on GitHub</span>
          <ArrowUpRight className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </motion.div>

      {/* Cards: 软玻璃效果保持不变 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl mx-auto mb-20 px-4 sm:px-0"
      >
        {/* Card 1 */}
        <a 
          href={SITE_CONFIG.links.cloudLab}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="h-full px-6 py-5 bg-white/70 dark:bg-gray-900/40 backdrop-blur-md border border-gray-100 dark:border-gray-800 rounded-2xl hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl hover:shadow-gray-200/40 dark:hover:shadow-none transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <Cloud className="w-5 h-5" />
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">Cloud Lab</span>
          </div>
        </a>

        {/* Card 2 */}
        <a 
          href={SITE_CONFIG.links.fileTransfer}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
           <div className="h-full px-6 py-5 bg-white/70 dark:bg-gray-900/40 backdrop-blur-md border border-gray-100 dark:border-gray-800 rounded-2xl hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl hover:shadow-gray-200/40 dark:hover:shadow-none transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                <FileInput className="w-5 h-5" />
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">File Transfer</span>
          </div>
        </a>

        {/* Card 3 */}
        <button 
          onClick={onReadNotes}
          className="group block w-full h-full"
        >
          <div className="h-full px-6 py-5 bg-white/70 dark:bg-gray-900/40 backdrop-blur-md border border-gray-100 dark:border-gray-800 rounded-2xl hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl hover:shadow-gray-200/40 dark:hover:shadow-none transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center">
            <div className="p-2.5 bg-purple-50 dark:bg-purple-900/20 rounded-full text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">Read Notes</span>
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