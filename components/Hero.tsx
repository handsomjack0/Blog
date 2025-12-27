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
    <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center overflow-hidden">
      
      {/* Background: Minimalist Grid, darker and more subtle */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-gray-50 dark:bg-gray-950 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      {/* Glow: Changed from Blue/Purple to simple White/Gray fog */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[500px] bg-gray-200/40 dark:bg-gray-800/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative inline-block mb-10"
      >
        {/* Avatar Container: Removed Rainbow Gradient. Added Museum-style shadow and thin border. */}
        <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full bg-gray-100 dark:bg-gray-900 shadow-2xl shadow-gray-500/10 dark:shadow-black/50 ring-1 ring-gray-200 dark:ring-gray-800 overflow-hidden">
          {!imgError ? (
            <img 
              src={SITE_CONFIG.avatar} 
              alt="Profile" 
              onError={() => setImgError(true)}
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500">
               <span className="text-4xl font-serif italic">N</span>
            </div>
          )}
        </div>
        
        {/* Status Indicator: Minimalist Dot */}
        <div className="absolute bottom-4 right-4 flex h-4 w-4" title="System Online">
          <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500/80 border-2 border-white dark:border-gray-950"></span>
        </div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-5xl md:text-8xl font-serif font-medium text-gray-900 dark:text-gray-100 tracking-tight mb-8"
      >
        Hi, I'm <span className="italic relative inline-block">
            Nova
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full"></span>
        </span>.
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed tracking-wide"
      >
        {SITE_CONFIG.description} <br className="hidden md:block"/>
        <span className="mt-4 block text-sm md:text-base font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">
           Cloud Architect &nbsp;•&nbsp; Self-hosting Geek &nbsp;•&nbsp; AI Explorer
        </span>
      </motion.p>

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
          className="group flex items-center gap-3 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300"
        >
          <Github className="w-4 h-4" />
          <span className="text-sm font-medium">Follow on GitHub</span>
        </a>
      </motion.div>

      {/* Ghost Buttons: All consistent, minimalist, wireframe style */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full mb-16"
      >
        {/* Button 1 */}
        <a 
          href={SITE_CONFIG.links.cloudLab}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-48 px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <Cloud className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            <span className="font-medium">Cloud Lab</span>
          </motion.button>
        </a>

        {/* Button 2 */}
        <a 
          href={SITE_CONFIG.links.fileTransfer}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
           <motion.button 
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             className="w-full sm:w-48 px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <FileInput className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            <span className="font-medium">File Transfer</span>
          </motion.button>
        </a>

        {/* Button 3 */}
        <motion.button 
          onClick={onReadNotes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-48 px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-center gap-3 group"
        >
          <BookOpen className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
          <span className="font-medium">Read Notes</span>
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
                <span className="font-serif italic">Latest writing:</span>
                <span className="underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 group-hover:decoration-gray-900 dark:group-hover:decoration-white transition-all">
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