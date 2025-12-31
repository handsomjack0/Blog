import React, { useState } from 'react';
import { Post } from '../types';
import { motion as motionOriginal } from 'framer-motion';
import { optimizeImage } from '../lib/utils';

const motion = motionOriginal as any;

interface PostCardProps {
  post: Post;
  featured?: boolean;
  onClick: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false, onClick }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article 
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => onClick(post)}
      className={`cursor-pointer group relative flex flex-col bg-white dark:bg-[#1C1C1E] rounded-[2rem] overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 border border-gray-100 dark:border-gray-800 ${featured ? 'md:col-span-2' : ''}`}
    >
      
      {/* Image: Full bleed, high quality but optimized */}
      <div className={`relative overflow-hidden w-full bg-gray-100 dark:bg-gray-800 ${featured ? 'h-80 md:h-[28rem]' : 'h-64'}`}>
        <img 
          src={optimizeImage(post.coverImage, featured ? 1200 : 800)} 
          alt={post.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        <div className="absolute top-6 left-6">
             <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/90 bg-white/20 backdrop-blur-md rounded-full border border-white/20 shadow-sm">
                {post.category}
            </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col justify-center flex-grow">
        <div className="flex items-center text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wider">
          {post.date} &bull; {post.readTime}
        </div>

        <h2 className={`font-bold tracking-tight text-gray-900 dark:text-white mb-3 leading-tight ${featured ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
          {post.title}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 text-sm leading-relaxed font-medium">
          {post.excerpt}
        </p>

        {/* Author Line */}
        <div className="flex items-center mt-auto">
           {!imgError ? (
             <img 
               src={post.author?.avatar} 
               alt={post.author?.name} 
               onError={() => setImgError(true)}
               className="w-8 h-8 rounded-full mr-3 object-cover bg-gray-100 dark:bg-gray-800 shadow-sm"
             />
           ) : (
             <div className="w-8 h-8 rounded-full mr-3 bg-gray-200 dark:bg-gray-700"></div>
           )}
           <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
             {post.author?.name}
           </span>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;