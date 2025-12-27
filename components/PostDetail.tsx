import React, { useEffect, useState } from 'react';
import { Post } from '../types';
import { ArrowLeft, Calendar, Clock, Tag, Copy, Check } from 'lucide-react';
import Markdown from 'react-markdown';
import Giscus from './Giscus';
import { motion as motionOriginal, useScroll, useSpring } from 'framer-motion';
import Prism from 'prismjs';
import { PostDetailSkeleton } from './Skeleton';
import { fetchPostWithFrontmatter } from '../lib/frontmatter';
import { useNavigate } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Mermaid from './Mermaid';

// Add necessary Prism languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';

const motion = motionOriginal as any;

interface PostDetailProps {
  post: Post;
}

// Custom CodeBlock component
const CodeBlock = ({ children, className, node, ...rest }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const content = String(children).replace(/\n$/, '');

  // Intercept Mermaid blocks
  if (language === 'mermaid') {
    return <Mermaid chart={content} />;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!match) {
    return <code className={className} {...rest}>{children}</code>;
  }

  return (
    <div className="relative group rounded-xl overflow-hidden my-6 border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none">
      {/* Mac-style Window Controls */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-[#1a1a1c] border-b border-gray-200 dark:border-gray-800">
         <div className="flex gap-1.5">
           <div className="w-3 h-3 rounded-full bg-red-400/80" />
           <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
           <div className="w-3 h-3 rounded-full bg-green-400/80" />
         </div>
         <div className="text-xs text-gray-500 font-mono">{language}</div>
         <button 
           onClick={handleCopy}
           className="flex items-center justify-center p-1 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-400"
           title="Copy code"
         >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
         </button>
      </div>
      
      <div className="overflow-x-auto bg-gray-50 dark:bg-[#121214] p-4">
        <code className={`language-${language} text-sm font-mono leading-relaxed`}>
          {content}
        </code>
      </div>
    </div>
  );
};

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.id]);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      if (post.content) {
        setContent(post.content);
        setIsLoading(false);
        return;
      }

      try {
        const fullPost = await fetchPostWithFrontmatter(post.id);
        setContent(fullPost.content || '');
      } catch (err) {
        console.error(err);
        setContent('Error loading content.');
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, [post.id, post.content]);

  useEffect(() => {
    if (!isLoading && content) {
      setTimeout(() => Prism.highlightAll(), 0);
    }
  }, [content, isLoading]);

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white dark:bg-gray-900/40 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
      >
        {/* [新增] 顶部装饰性极光线条 */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50 dark:opacity-80 z-20" />

        <div className="relative h-64 md:h-96 w-full group">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex flex-col justify-end p-8">
              <button 
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors border border-white/10"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-primary-600/90 backdrop-blur-sm rounded-full shadow-lg shadow-primary-500/20">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-serif text-white mb-4 leading-tight drop-shadow-sm">{post.title}</h1>
              
              <div className="flex items-center text-gray-200 text-sm space-x-6 font-medium">
                 <div className="flex items-center">
                   {!imgError ? (
                     <img 
                       src={post.author?.avatar} 
                       alt={post.author?.name} 
                       onError={() => setImgError(true)}
                       className="w-8 h-8 rounded-full mr-2 border border-white/30 object-cover" 
                     />
                   ) : (
                     <div className="w-8 h-8 rounded-full mr-2 bg-gray-700 border border-white/30 flex items-center justify-center text-white text-xs font-bold">
                       {post.author?.name?.charAt(0) || 'N'}
                     </div>
                   )}
                   <span>{post.author?.name}</span>
                 </div>
                 <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 opacity-80" />
                    {post.date}
                 </div>
                 <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 opacity-80" />
                    {post.readTime}
                 </div>
              </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-p:leading-relaxed prose-li:marker:text-primary-500">
            <Markdown 
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                code: CodeBlock
              }}
            >
              {content}
            </Markdown>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
             {post.tags.map(tag => (
               <span key={tag} className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-mono hover:border-primary-500 transition-colors">
                  <Tag className="w-3 h-3 mr-2 text-gray-400" />
                  {tag}
               </span>
             ))}
          </div>

          <Giscus />
        </div>
      </motion.article>
    </>
  );
};

export default PostDetail;