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

  // Animation variants for "Pop" effect (Apple style)
  const popVariant = {
    hover: { scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 25 } },
    tap: { scale: 0.97 }
  };

  return (
    <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background: Extremely subtle blur orb, almost invisible */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[1000px] h-[600px] opacity-40 dark:opacity-20 pointer-events-none"
        style={{ 
          background: 'radial-gradient(50% 50% at 50% 50%, #007AFF 0%, rgba(255, 255, 255, 0) 100%)',
          filter: 'blur(120px)'
        }}
      ></div>

      <div className="flex flex-col items-center text-center">
        
        {/* Avatar: Simple, clean circle with subtle shadow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative mb-8"
        >
          <div className="w-28 h-28 rounded-full shadow-apple overflow-hidden bg-gray-100 dark:bg-gray-800">
            {!imgError ? (
              <img 
                src={SITE_CONFIG.avatar} 
                alt="Profile" 
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                 <span className="text-3xl font-bold">N</span>
              </div>
            )}
          </div>
          {/* Status Dot: Mimic AirPods case light */}
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-[3px] border-white dark:border-black shadow-sm"></div>
        </motion.div>

        {/* Heading: SF Pro Display Style - Big, Bold, Tight Tracking */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
        >
          Hi, I'm Nova.
        </motion.h1>
        
        {/* Subtitle: High legibility gray */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed font-medium mb-12"
        >
           {SITE_CONFIG.description}
        </motion.p>

        {/* Bento Grid: iOS Widget Style */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          {/* Widget 1: Cloud Lab (Large Square Widget) */}
          <a href={SITE_CONFIG.links.cloudLab} target="_blank" rel="noopener noreferrer" className="block h-full">
            <motion.div 
              variants={popVariant}
              whileHover="hover"
              whileTap="tap"
              className="glass-panel h-48 rounded-[2rem] p-6 flex flex-col justify-between hover:bg-white/90 dark:hover:bg-[#2C2C2E]/90 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-[#007AFF] flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                  <Cloud className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cloud Lab</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Experimental Edge Server</p>
              </div>
            </motion.div>
          </a>

          {/* Widget 2: File Transfer */}
          <a href={SITE_CONFIG.links.fileTransfer} target="_blank" rel="noopener noreferrer" className="block h-full">
            <motion.div 
              variants={popVariant}
              whileHover="hover"
              whileTap="tap"
              className="glass-panel h-48 rounded-[2rem] p-6 flex flex-col justify-between hover:bg-white/90 dark:hover:bg-[#2C2C2E]/90 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-[#34C759] flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                  <FileInput className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transfer</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">P2P File Sharing</p>
              </div>
            </motion.div>
          </a>

          {/* Widget 3: Blog/Notes */}
          <div onClick={onReadNotes} className="block h-full cursor-pointer">
             <motion.div 
              variants={popVariant}
              whileHover="hover"
              whileTap="tap"
              className="glass-panel h-48 rounded-[2rem] p-6 flex flex-col justify-between hover:bg-white/90 dark:hover:bg-[#2C2C2E]/90 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-[#AF52DE] flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <Command className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Read Notes</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Technical Blog</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Latest Post Pill */}
        {latestPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
             <button 
                onClick={() => navigate(`/post/${latestPost.id}`)}
                className="group flex items-center space-x-2 pl-1 pr-4 py-1 bg-white dark:bg-[#1C1C1E] rounded-full shadow-apple hover:shadow-apple-hover transition-all duration-300 border border-gray-100 dark:border-gray-800"
            >
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 group-hover:bg-[#007AFF] group-hover:text-white transition-colors">
                  New
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#007AFF] dark:group-hover:text-[#0A84FF] transition-colors">
                    {latestPost.title}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Hero;