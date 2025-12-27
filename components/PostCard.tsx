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
      className={`cursor-pointer group relative flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 ${featured ? 'md:grid md:grid-cols-2 md:gap-8' : ''}`}
    >
      
      {/* Image Container */}
      <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-full' : 'h-56'}`}>
        <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-primary-600 rounded-full shadow-md">
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
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-4">
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {post.date}
          </span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {post.readTime}
          </span>
        </div>

        <h2 className={`font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          <span className="focus:outline-none">
            {post.title}
          </span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed text-sm">
          {post.excerpt}
        </p>

        <div className="flex items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
           {!imgError ? (
             <img 
               src={post.author?.avatar} 
               alt={post.author?.name} 
               onError={() => setImgError(true)}
               className="w-8 h-8 rounded-full mr-3 object-cover"
             />
           ) : (
             <div className="w-8 h-8 rounded-full mr-3 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
               {post.author?.name?.charAt(0) || 'N'}
             </div>
           )}
           <span className="text-sm font-medium text-gray-900 dark:text-white">
             {post.author?.name}
           </span>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;