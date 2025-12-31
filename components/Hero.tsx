import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../constants';
import { Cloud, FileInput, BookOpen, ArrowUpRight, ArrowRight, Command, Sparkles, Timer } from 'lucide-react';
import { motion as motionOriginal } from 'framer-motion';
import { Post } from '../types';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const motion = motionOriginal as any;

interface HeroProps {
  onReadNotes: () => void;
  latestPost?: Post | null;
}

const Hero: React.FC<HeroProps> = ({ onReadNotes, latestPost }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  // Countdown Logic for 2026
  useEffect(() => {
    const targetDate = new Date('2026-01-01T00:00:00');
    
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    // Initial Celebration
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const duration = 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FFA500', '#ffffff']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FFA500', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    return () => clearInterval(timer);
  }, []);

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#007AFF', '#ffffff']
    });
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden min-h-[85vh] flex flex-col justify-center">
      
      {/* Background: Extremely subtle blur orb */}
      <div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 -z-10 w-[800px] md:w-[1200px] h-[600px] opacity-40 dark:opacity-20 pointer-events-none"
        style={{ 
          background: 'radial-gradient(50% 50% at 50% 50%, #007AFF 0%, rgba(255, 255, 255, 0) 100%)',
          filter: 'blur(120px)'
        }}
      ></div>

      <motion.div 
        className="flex flex-col items-center text-center w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* 1. Countdown Pill (New!) */}
        <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-4 px-4 py-2 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full shadow-lg">
                <span className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300">
                    <Timer className="w-4 h-4 text-[#007AFF]" />
                    Countdown to 2026
                </span>
                <div className="flex gap-2 text-sm font-mono font-bold text-gray-900 dark:text-white">
                    <span className="px-1.5 py-0.5 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800">{timeLeft.days}d</span>
                    <span className="px-1.5 py-0.5 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800">{timeLeft.hours}h</span>
                    <span className="px-1.5 py-0.5 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800">{timeLeft.minutes}m</span>
                    <span className="px-1.5 py-0.5 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800 text-[#007AFF]">{timeLeft.seconds}s</span>
                </div>
            </div>
        </motion.div>

        {/* 2. Avatar */}
        <motion.div variants={itemVariants} className="relative mb-8 group" onClick={triggerCelebration}>
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-premium bg-white dark:bg-gray-800 p-1.5 transition-transform duration-500 hover:scale-105 cursor-pointer">
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
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
                {/* Overlay for celebration click */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-8 h-8 text-yellow-400" />
                </div>
            </div>
          </div>
          {/* Status Dot */}
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-[#34C759] rounded-full border-[4px] border-white dark:border-[#1C1C1E] shadow-sm animate-pulse"></div>
        </motion.div>

        {/* 3. Typography Polish */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6"
        >
          <span className="text-gray-900 dark:text-white">Hello, </span>
          {/* 渐变色 + 紧凑字间距 */}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#FFD700] via-orange-500 to-red-500 dark:from-[#FFD700] dark:via-orange-400 dark:to-yellow-200 inline-block pb-2">
            2026.
          </span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed font-medium mb-12 tracking-wide"
        >
           Reflecting on 2025, preparing for the future. <br/>
           {SITE_CONFIG.description}
        </motion.p>

        {/* 4. Bento Grid: Responsive Fixes */}
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
              className="group bg-white/70 dark:bg-[#1C1C1E]/70 backdrop-blur-xl h-44 rounded-[24px] p-6 flex flex-col justify-between border border-white/50 dark:border-white/10 shadow-premium hover:shadow-premium-hover transition-all cursor-pointer w-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#007AFF]/10 dark:bg-[#007AFF]/20 flex items-center justify-center text-[#007AFF] group-hover:bg-[#007AFF] group-hover:text-white transition-colors duration-300">
                  <Cloud className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 transition-colors" />
              </div>
              <div className="text-left relative z-10">
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
              className="group bg-white/70 dark:bg-[#1C1C1E]/70 backdrop-blur-xl h-44 rounded-[24px] p-6 flex flex-col justify-between border border-white/50 dark:border-white/10 shadow-premium hover:shadow-premium-hover transition-all cursor-pointer w-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#34C759]/10 dark:bg-[#34C759]/20 flex items-center justify-center text-[#34C759] group-hover:bg-[#34C759] group-hover:text-white transition-colors duration-300">
                  <FileInput className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 transition-colors" />
              </div>
              <div className="text-left relative z-10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Transfer</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">P2P Share</p>
              </div>
            </motion.div>
          </a>

          {/* Widget 3 */}
          <div onClick={onReadNotes} className="block w-full sm:col-span-2 lg:col-span-1 cursor-pointer">
             <motion.div 
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="group bg-white/70 dark:bg-[#1C1C1E]/70 backdrop-blur-xl h-44 rounded-[24px] p-6 flex flex-col justify-between border border-white/50 dark:border-white/10 shadow-premium hover:shadow-premium-hover transition-all w-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#AF52DE]/10 dark:bg-[#AF52DE]/20 flex items-center justify-center text-[#AF52DE] group-hover:bg-[#AF52DE] group-hover:text-white transition-colors duration-300">
                  <BookOpen className="w-6 h-6" />
                </div>
                <Command className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 transition-colors" />
              </div>
              <div className="text-left relative z-10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Read Notes</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Tech Blog</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Latest Post Pill - Enhanced for New Year */}
        {latestPost && (
          <motion.div
            variants={itemVariants}
            className="mt-12"
          >
             <button 
                onClick={() => navigate(`/post/${latestPost.id}`)}
                className="group flex items-center space-x-3 pl-1.5 pr-5 py-1.5 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md rounded-full shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 border border-yellow-400/30 dark:border-yellow-500/30 ring-4 ring-yellow-400/5"
            >
                <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                  Year End Special
                </div>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {latestPost.title}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-yellow-500 transition-all" />
            </button>
          </motion.div>
        )}

      </motion.div>
    </section>
  );
};

export default Hero;