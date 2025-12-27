import React, { useState } from 'react';
import { SITE_CONFIG } from '../constants';
import { Cloud, FileInput, BookOpen, ArrowUpRight, ArrowRight, Command } from 'lucide-react';
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

  // [修改] 容器动画：控制子元素的交错入场 (Stagger Children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // 每个子元素间隔 0.15s
        delayChildren: 0.2,
      }
    }
  };

  // [修改] 子元素动画：向上浮动淡入
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20
      }
    }
  };

  // [修改] 卡片悬停微交互
  const cardHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden min-h-[90vh] flex flex-col justify-center">
      
      {/* Background: Extremely subtle blur orb */}
      <div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 -z-10 w-[800px] md:w-[1200px] h-[600px] opacity-30 dark:opacity-10 pointer-events-none"
        style={{ 
          background: 'radial-gradient(50% 50% at 50% 50%, #007AFF 0%, rgba(255, 255, 255, 0) 100%)',
          filter: 'blur(100px)'
        }}
      ></div>

      <motion.div 
        className="flex flex-col items-center text-center w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* 1. Avatar */}
        <motion.div variants={itemVariants} className="relative mb-8 group">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-premium bg-white dark:bg-gray-800 p-1">
            <div className="w-full h-full rounded-full overflow-hidden">
                {!imgError ? (
                <img 
                    src={SITE_CONFIG.avatar} 
                    alt="Profile" 
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                    <span className="text-3xl font-bold">N</span>
                </div>
                )}
            </div>
          </div>
          {/* Status Dot */}
          <div className="absolute bottom-1 right-2 w-4 h-4 bg-[#34C759] rounded-full border-[3px] border-white dark:border-[#1C1C1E] shadow-sm"></div>
        </motion.div>

        {/* 2. Typography Polish */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6"
        >
          <span className="text-gray-900 dark:text-white">Hi, I'm </span>
          {/* 渐变色 + 紧凑字间距 */}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-gray-800 via-gray-900 to-black dark:from-white dark:via-gray-100 dark:to-gray-400 inline-block pb-2">
            Nova.
          </span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed font-medium mb-12 tracking-wide"
        >
           {SITE_CONFIG.description}
        </motion.p>

        {/* 3. Bento Grid: Responsive Fixes */}
        {/* 使用 w-full 和 max-w-4xl 限制最大宽度，同时确保 grid 在不同尺寸下自适应 */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-4xl mx-auto px-2"
        >
          {/* Widget 1 */}
          <a href={SITE_CONFIG.links.cloudLab} target="_blank" rel="noopener noreferrer" className="block w-full">
            <motion.div 
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="group bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-xl h-44 rounded-[24px] p-6 flex flex-col justify-between border border-white/40 dark:border-white/5 shadow-premium hover:shadow-premium-hover transition-all cursor-pointer w-full"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-[#007AFF]/10 dark:bg-[#007AFF]/20 flex items-center justify-center text-[#007AFF] group-hover:bg-[#007AFF] group-hover:text-white transition-colors duration-300">
                  <Cloud className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 transition-colors" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Cloud Lab</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Edge Server</p>
              </div>
            </motion.div>
          </a>

          {/* Widget 2 */}
          <a href={SITE_CONFIG.links.fileTransfer} target="_blank" rel="noopener noreferrer" className="block w-full">
            <motion.div 
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="group bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-xl h-44 rounded-[24px] p-6 flex flex-col justify-between border border-white/40 dark:border-white/5 shadow-premium hover:shadow-premium-hover transition-all cursor-pointer w-full"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-[#34C759]/10 dark:bg-[#34C759]/20 flex items-center justify-center text-[#34C759] group-hover:bg-[#34C759] group-hover:text-white transition-colors duration-300">
                  <FileInput className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 transition-colors" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Transfer</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">P2P Share</p>
              </div>
            </motion.div>
          </a>

          {/* Widget 3 - Full width on tablet (sm), regular on desktop (lg) */}
          <div onClick={onReadNotes} className="block w-full sm:col-span-2 lg:col-span-1 cursor-pointer">
             <motion.div 
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="group bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-xl h-44 rounded-[24px] p-6 flex flex-col justify-between border border-white/40 dark:border-white/5 shadow-premium hover:shadow-premium-hover transition-all w-full"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-[#AF52DE]/10 dark:bg-[#AF52DE]/20 flex items-center justify-center text-[#AF52DE] group-hover:bg-[#AF52DE] group-hover:text-white transition-colors duration-300">
                  <BookOpen className="w-6 h-6" />
                </div>
                <Command className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 transition-colors" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Read Notes</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Tech Blog</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Latest Post Pill */}
        {latestPost && (
          <motion.div
            variants={itemVariants}
            className="mt-12"
          >
             <button 
                onClick={() => navigate(`/post/${latestPost.id}`)}
                className="group flex items-center space-x-3 pl-1.5 pr-5 py-1.5 bg-white dark:bg-[#1C1C1E] rounded-full shadow-premium hover:shadow-premium-hover transition-all duration-300 border border-gray-100 dark:border-gray-800"
            >
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                  New
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {latestPost.title}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

      </motion.div>
    </section>
  );
};

export default Hero;