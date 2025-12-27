import React, { useState } from 'react';
import { Post } from '../types';
import { Clock, Calendar } from 'lucide-react';
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
      whileHover={{ y: -5 }}
      onClick={() => onClick(post)}
      className={`cursor-pointer group relative flex flex-col bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 ${featured ? 'md:grid md:grid-cols-2 md:gap-8' : ''}`}
    >
      
      {/* Image Container */}
      <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-full' : 'h-56'}`}>
        <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md border border-white/20 rounded-full shadow-md">
                {post.category}
            </span>
        </div>
        <img 
          src={post.coverImage} 
          alt={post.title} 
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col justify-center">
        <div className="flex items-center text-xs font-mono text-gray-500 dark:text-gray-500 mb-3 space-x-4">
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {post.date}
          </span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {post.readTime}
          </span>
        </div>

        <h2 className={`font-serif font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          <span className="focus:outline-none">
            {post.title}
          </span>
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed text-sm font-light">
          {post.excerpt}
        </p>

        <div className="flex items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-800/50">
           {!imgError ? (
             <img 
               src={post.author?.avatar} 
               alt={post.author?.name} 
               onError={() => setImgError(true)}
               className="w-8 h-8 rounded-full mr-3 object-cover border border-gray-100 dark:border-gray-700"
             />
           ) : (
             <div className="w-8 h-8 rounded-full mr-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 text-xs font-bold">
               {post.author?.name?.charAt(0) || 'N'}
             </div>
           )}
           <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
             {post.author?.name}
           </span>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;