import React, { useEffect, useState } from 'react';
import { Post } from '../types';
import { ArrowLeft, Calendar, Clock, Tag, Copy, Check, Share2, Linkedin, Twitter, Link as LinkIcon, Mail, Heart, Coffee, X, QrCode, Eye, MessageCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import Giscus from './Giscus';
import { motion as motionOriginal, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Prism from 'prismjs';
import { PostDetailSkeleton } from './Skeleton';
import { fetchPostWithFrontmatter } from '../lib/frontmatter';
import { useNavigate } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Mermaid from './Mermaid';
import confetti from 'canvas-confetti';

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

const CodeBlock = ({ children, className, node, ...rest }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const content = String(children).replace(/\n$/, '');

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

const DonateModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [method, setMethod] = useState<'wechat' | 'alipay'>('wechat');
    
    // Placeholder QR Codes - REPLACE THESE WITH YOUR ACTUAL URLS
    const qrCodes = {
        wechat: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WeChatPay_Placeholder", 
        alipay: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Alipay_Placeholder"
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 shadow-2xl z-[80] border border-gray-100 dark:border-gray-800"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Coffee className="w-5 h-5 text-yellow-500" />
                                Buy me a coffee
                            </h3>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
                            <button 
                                onClick={() => setMethod('wechat')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${method === 'wechat' ? 'bg-[#28C445] text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                            >
                                WeChat
                            </button>
                            <button 
                                onClick={() => setMethod('alipay')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${method === 'alipay' ? 'bg-[#1677FF] text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                            >
                                Alipay
                            </button>
                        </div>

                        <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-gray-800/50 aspect-square mb-4">
                            <img 
                                src={qrCodes[method]} 
                                alt={`${method} QR Code`} 
                                className="w-48 h-48 object-contain rounded-lg" // Placeholder style
                            />
                        </div>
                        
                        <p className="text-center text-xs text-gray-400 font-medium">
                            Thanks for supporting my work! <br/> Your contribution keeps the server running.
                        </p>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
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
    // Check local storage for user's personal "cheer"
    const storageKey = `cheered-${post.id}`;
    const userHasLiked = localStorage.getItem(storageKey) === 'true';
    setIsLiked(userHasLiked);
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

  // Handle Busuanzi Reload on Route Change
  useEffect(() => {
    if (!isLoading && (window as any).Busuanzi) {
        (window as any).Busuanzi.fetch();
    }
  }, [isLoading, post.id]);

  const handleCheer = () => {
    // This is now purely a client-side "fun" interaction
    const storageKey = `cheered-${post.id}`;
    localStorage.setItem(storageKey, 'true');
    setIsLiked(true);

    // Fire Confetti
    const scalar = 2;
    const heart = confetti.shapeFromPath({
        path: 'M16.7 3.98C13.5 1.1 9.03.68 6.09 3.1 3.15 5.5 2.5 9.8 4.7 13.5L12 21l7.3-7.5c2.2-3.7 1.55-8-1.39-10.4-1.2-1-2.6-1.3-3.9-1.1z'
    });

    confetti({
        particleCount: 30,
        scalar,
        spread: 60,
        origin: { y: 0.7 },
        shapes: [heart],
        colors: ['#FF3B30', '#FF9500', '#FFCC00']
    });
  };

  const scrollToComments = () => {
      document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = async (platform: 'twitter' | 'linkedin' | 'copy' | 'native' | 'email') => {
    const rawUrl = window.location.href;
    const decodedUrl = decodeURIComponent(rawUrl);
    const text = `Read "${post.title}" by ${post.author?.name}`;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(rawUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(rawUrl)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(text + '\n\n' + decodedUrl)}`, '_self');
        break;
      case 'copy':
        await navigator.clipboard.writeText(decodedUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
        break;
      case 'native':
        if (navigator.share) {
          navigator.share({ title: post.title, text: post.excerpt, url: rawUrl }).catch(console.error);
        } else {
          handleShare('copy');
        }
        break;
    }
  };

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary-500 origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <DonateModal isOpen={showDonate} onClose={() => setShowDonate(false)} />

      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white dark:bg-gray-900/40 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50 dark:opacity-80 z-20" />

        {/* Cover Image Area */}
        <div className="relative h-64 md:h-96 w-full group overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />
          
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
              <button 
                onClick={() => navigate('/')}
                className="self-start p-2.5 bg-black/30 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-all border border-white/20 shadow-lg"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              <div className="space-y-4">
                 <div className="flex flex-wrap items-center gap-4 text-sm text-white/90 font-medium">
                     <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-primary-500/80 backdrop-blur-md rounded-full shadow-sm border border-white/10">
                        {post.category}
                    </span>
                    <span className="flex items-center backdrop-blur-sm bg-black/20 px-2 py-1 rounded-md">
                        <Calendar className="w-4 h-4 mr-1.5 opacity-80" />
                        {post.date}
                    </span>
                     <span className="flex items-center backdrop-blur-sm bg-black/20 px-2 py-1 rounded-md">
                        <Clock className="w-4 h-4 mr-1.5 opacity-80" />
                        {post.readTime}
                    </span>
                    {/* Busuanzi View Count */}
                    <span className="flex items-center backdrop-blur-sm bg-black/20 px-2 py-1 rounded-md" id="busuanzi_container_page_pv" style={{ display: 'none' }}>
                        <Eye className="w-4 h-4 mr-1.5 opacity-80" />
                        <span id="busuanzi_value_page_pv">Loading...</span>
                    </span>
                 </div>

                 <div className="flex items-center">
                     {!imgError ? (
                       <img 
                         src={post.author?.avatar} 
                         alt={post.author?.name} 
                         onError={() => setImgError(true)}
                         className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-white/30 shadow-md"
                       />
                     ) : (
                       <div className="w-10 h-10 rounded-full mr-3 bg-white/20 border border-white/30 flex items-center justify-center text-white font-bold">
                         {post.author?.name?.charAt(0) || 'N'}
                       </div>
                     )}
                     <div className="flex flex-col text-white">
                        <span className="text-sm font-bold text-shadow-sm">{post.author?.name}</span>
                        <span className="text-xs text-white/70">Author</span>
                     </div>
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

          {/* Revised Interactions Section */}
          <div className="mt-12 flex flex-col items-center justify-center gap-6">
              <div className="flex flex-wrap justify-center gap-4">
                  {/* Cheer Button (Local only) */}
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCheer}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-lg border transition-all ${isLiked ? 'bg-red-50 text-red-500 border-red-200 shadow-red-500/10 dark:bg-red-900/20 dark:border-red-900/50' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-900'}`}
                  >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      <span className="font-bold">{isLiked ? 'Cheered!' : 'Cheer'}</span>
                  </motion.button>
                  
                  {/* Real Like (Scroll to Giscus) */}
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToComments}
                    className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg hover:text-primary-500 hover:border-primary-200 transition-all"
                  >
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-bold">Comment & React</span>
                  </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowDonate(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg shadow-orange-500/20 border border-white/20"
                  >
                      <Coffee className="w-5 h-5" />
                      <span className="font-bold">Sponsor</span>
                  </motion.button>
              </div>
              <p className="text-xs text-center text-gray-400 dark:text-gray-600 font-mono max-w-sm">
                  The "Cheer" button is just for fun (local). <br/>
                  To leave a <b>real</b> like, please use the reactions in the comments section below.
              </p>
          </div>

          {/* Share Section */}
          <div className="mt-10 flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
            <span className="text-sm font-bold text-gray-600 dark:text-gray-300 flex items-center">
              <Share2 className="w-4 h-4 mr-2 text-primary-500" />
              Share
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => handleShare('twitter')} className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-500 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-colors shadow-sm border border-gray-200 dark:border-gray-600" title="Twitter"><Twitter className="w-4 h-4" /></button>
              <button onClick={() => handleShare('linkedin')} className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-500 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors shadow-sm border border-gray-200 dark:border-gray-600" title="LinkedIn"><Linkedin className="w-4 h-4" /></button>
              <button onClick={() => handleShare('email')} className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors shadow-sm border border-gray-200 dark:border-gray-600" title="Email"><Mail className="w-4 h-4" /></button>
              <button onClick={() => handleShare('copy')} className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-500 hover:text-green-500 hover:bg-green-500/10 transition-colors shadow-sm border border-gray-200 dark:border-gray-600 relative group" title="Copy Link">
                {copiedLink ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                {copiedLink && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-2 py-1 rounded whitespace-nowrap">Link Copied!</span>}
              </button>
              {typeof navigator.share === 'function' && <button onClick={() => handleShare('native')} className="p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors shadow-sm shadow-primary-500/20"><Share2 className="w-4 h-4" /></button>}
            </div>
          </div>

          <div id="comments-section">
            <Giscus />
          </div>
        </div>
      </motion.article>
    </>
  );
};

export default PostDetail;