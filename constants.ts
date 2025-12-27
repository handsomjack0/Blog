import { Post, Project, PodcastEpisode } from './types';

export const SITE_CONFIG = {
  // [修改 1] 网站左上角的名称
  name: "Nova.zz.ac",
  
  // [修改 2] 首页中间的个人简介
  description: "Mastering the edge, exploring the unknown.",
  
  // [修改 3] 头像策略调整：
  // 直接使用 GitHub 头像 (https://github.com/username.png)。
  // 这样避免了本地上传图片变成乱码的问题，且能保持同步。
  avatar: "https://github.com/handsomjack0.png", 

  // [修改 4] 联系邮箱
  email: "Gunddam.X@gmail.com",
  
  github: "https://github.com/handsomjack0",
  links: {
    cloudLab: "https://epic.nova.zz.ac",
    fileTransfer: "https://pan.nova.zz.ac",
  }
};

// MOCK DATA FOR PORTFOLIO
export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Cloud Dashboard Pro',
    description: 'A real-time server monitoring dashboard built with Next.js and WebSocket integration.',
    image: 'https://picsum.photos/id/1/600/400',
    tags: ['Next.js', 'WebSocket', 'Tailwind'],
    link: 'https://epic.nova.zz.ac',
    github: 'https://github.com'
  },
  {
    id: '2',
    title: 'Nova File Transfer',
    description: 'Secure peer-to-peer file sharing service utilizing WebRTC for maximum privacy.',
    image: 'https://picsum.photos/id/20/600/400',
    tags: ['WebRTC', 'React', 'Node.js'],
    link: 'https://pan.nova.zz.ac',
    github: 'https://github.com'
  },
  {
    id: '3',
    title: 'AI Code Assistant',
    description: 'VS Code extension that uses local LLMs to suggest code completions.',
    image: 'https://picsum.photos/id/60/600/400',
    tags: ['TypeScript', 'AI', 'VS Code'],
    link: '#',
    github: 'https://github.com'
  }
];

// MOCK DATA FOR PODCAST
export const MOCK_PODCASTS: PodcastEpisode[] = [
  {
    id: '1',
    title: 'Ep. 01: The State of Serverless',
    description: 'Discussing the pros and cons of edge computing in 2024.',
    duration: '45:20',
    date: 'Oct 12, 2023',
    cover: 'https://picsum.photos/id/30/300/300'
  },
  {
    id: '2',
    title: 'Ep. 02: Minimalism in Tech',
    description: 'How reducing digital clutter can improve your code quality.',
    duration: '32:15',
    date: 'Nov 05, 2023',
    cover: 'https://picsum.photos/id/40/300/300'
  },
  {
    id: '3',
    title: 'Ep. 03: Kubernetes Nightmares',
    description: 'War stories from production outages and how we fixed them.',
    duration: '55:00',
    date: 'Dec 01, 2023',
    cover: 'https://picsum.photos/id/50/300/300'
  }
];

// NOTE: Content has been decoupled. 
// Please create a folder named 'posts' in your public root.
// Create markdown files named '1.md', '2.md', etc.

// 这些是开发环境或加载失败时的后备数据 (Fallback Data)
// 如果你想修改实际显示的文章，请去 public/posts/ 文件夹修改对应的 .md 文件
export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Away’s Expandable Suitcases Are Here – The Most Spacious Bags Yet',
    excerpt: 'Discover why flexibility in luggage is the new standard for modern digital nomads.',
    // [修改 4] 文章封面图
    coverImage: 'https://picsum.photos/id/48/800/600',
    date: '30 Nov 2023',
    category: 'Travel',
    tags: ['Lifestyle', 'Gear'],
    author: { name: 'Nova', avatar: SITE_CONFIG.avatar },
    readTime: '5 min'
  },
  {
    id: '2',
    title: 'Deploying a Serverless API with Cloudflare Workers',
    excerpt: 'A comprehensive guide to building low-latency APIs at the edge using Cloudflare ecosystem.',
    coverImage: 'https://picsum.photos/id/119/800/600',
    date: '15 Oct 2023',
    category: 'DevOps',
    tags: ['Cloudflare', 'Serverless', 'JavaScript'],
    author: { name: 'Nova', avatar: SITE_CONFIG.avatar },
    readTime: '8 min'
  },
  {
    id: '3',
    title: 'Understanding React Server Components',
    excerpt: 'How RSC changes the way we think about data fetching and bundle sizes in modern web development.',
    coverImage: 'https://picsum.photos/id/180/800/600',
    date: '02 Oct 2023',
    category: 'Frontend',
    tags: ['React', 'Web'],
    author: { name: 'Nova', avatar: SITE_CONFIG.avatar },
    readTime: '12 min'
  },
  {
    id: '4',
    title: 'Minimalist Desk Setup for Productivity',
    excerpt: 'Optimizing your physical space to maximize digital output. Less is more.',
    coverImage: 'https://picsum.photos/id/3/800/600',
    date: '28 Sep 2023',
    category: 'Lifestyle',
    tags: ['Workspace', 'Productivity'],
    author: { name: 'Nova', avatar: SITE_CONFIG.avatar },
    readTime: '4 min'
  },
  {
    id: '5',
    title: 'Kubernetes for Beginners: Pods and Services',
    excerpt: 'Breaking down the complexity of container orchestration into digestible concepts.',
    coverImage: 'https://picsum.photos/id/60/800/600',
    date: '10 Sep 2023',
    category: 'DevOps',
    tags: ['K8s', 'Docker'],
    author: { name: 'Nova', avatar: SITE_CONFIG.avatar },
    readTime: '15 min'
  },
  {
    id: '6',
    title: 'The Future of AI in Software Engineering',
    excerpt: 'Will LLMs replace junior developers? An analysis of the current trend.',
    coverImage: 'https://picsum.photos/id/201/800/600',
    date: '05 Sep 2023',
    category: 'Opinion',
    tags: ['AI', 'Career'],
    author: { name: 'Nova', avatar: SITE_CONFIG.avatar },
    readTime: '6 min'
  }
];

export const TAGS = ['React', 'Cloudflare', 'DevOps', 'Travel', 'Lifestyle', 'Coding', 'Design', 'Minimalism'];