import React, { useState } from 'react';
import { Post } from '../types';
import { motion as motionOriginal } from 'framer-motion';

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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => onClick(post)}
      className={`cursor-pointer group relative flex flex-col bg-white dark:bg-[#1C1C1E] rounded-[2rem] overflow-hidden shadow-apple hover:shadow-apple-hover transition-shadow duration-300 ${featured ? 'md:col-span-2' : ''}`}
    >
      
      {/* Image: Full bleed, high quality */}
      <div className={`relative overflow-hidden w-full ${featured ? 'h-80 md:h-96' : 'h-64'}`}>
        <img 
          src={post.coverImage} 
          alt={post.title} 
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {/* Subtle gradient overlay for text readability if needed */}
        <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-black/0 transition-colors" />
        
        <div className="absolute top-6 left-6">
             <span className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white/90 bg-black/40 backdrop-blur-md rounded-full">
                {post.category}
            </span>
        </div>
      </div>

      {/* Content: Minimalist Apple Style */}
      <div className="p-8 flex flex-col justify-center">
        <div className="flex items-center text-xs font-medium text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-wide">
          {post.date} &bull; {post.readTime}
        </div>

        <h2 className={`font-bold tracking-tight text-gray-900 dark:text-white mb-3 leading-tight ${featured ? 'text-3xl' : 'text-xl'}`}>
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
               className="w-6 h-6 rounded-full mr-2 object-cover bg-gray-100 dark:bg-gray-800"
             />
           ) : (
             <div className="w-6 h-6 rounded-full mr-2 bg-gray-200 dark:bg-gray-700"></div>
           )}
           <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
             {post.author?.name}
           </span>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;