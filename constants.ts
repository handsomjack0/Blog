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
  },
  
  // [关键配置] EmailJS
  emailJS: {
    // 1. Service ID: 已从你的截图获取
    serviceId: "service_0mcz7do",
    
    // 2. Template ID: 已从你的截图获取 (template_089s12c)
    templateId: "template_089s12c", 
    
    // 3. Public Key: 已从你的截图获取 (VxVx0shKi5swFTp6e)
    publicKey: "VxVx0shKi5swFTp6e"
  }
};

// MOCK DATA FOR PORTFOLIO
export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Cloud Dashboard Pro',
    description: 'A real-time server monitoring dashboard built with Next.js and WebSocket integration.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tags: ['Next.js', 'WebSocket', 'Tailwind'],
    link: 'https://epic.nova.zz.ac',
    github: 'https://github.com'
  },
  {
    id: '2',
    title: 'Nova File Transfer',
    description: 'Secure peer-to-peer file sharing service utilizing WebRTC for maximum privacy.',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=800&auto=format&fit=crop',
    tags: ['WebRTC', 'React', 'Node.js'],
    link: 'https://pan.nova.zz.ac',
    github: 'https://github.com'
  },
  {
    id: '3',
    title: 'AI Code Assistant',
    description: 'VS Code extension that uses local LLMs to suggest code completions.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop',
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
    cover: 'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Ep. 02: Minimalism in Tech',
    description: 'How reducing digital clutter can improve your code quality.',
    duration: '32:15',
    date: 'Nov 05, 2023',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Ep. 03: Kubernetes Nightmares',
    description: 'War stories from production outages and how we fixed them.',
    duration: '55:00',
    date: 'Dec 01, 2023',
    cover: 'https://images.unsplash.com/photo-1667372393119-c85c020799a3?q=80&w=400&auto=format&fit=crop'
  }
];

// NOTE: Content has been decoupled. 
// Please create a folder named 'posts' in your public root.
// Create markdown files named '1.md', '2.md', etc.

export const MOCK_POSTS: Post[] = [
  {
    id: '在年末的坐标上，开启科技与生活的记录',
    title: '在年末的坐标上，开启科技与生活的记录',
    excerpt: '今天是2025年12月31日。这是我的个人网站上的第一篇文字。选择在这样的时间点开始，或许是因为“年末”本身自带一种平静的仪式感——它不喧闹，只是提供一个坐标，让我们确认自己行至何处，又将去向何方。',
    coverImage: 'https://cloud-drive-911.pages.dev/api/file/BQACAgUAAyEGAATJBRGbAAIBYGlU5wkYpaqFwa72DD_NiDHZpog1AAL_GQACJDGoVsYj4WRqUnX_OAQ?key=Zzj123&filename=%E5%A4%95%E9%98%B3-%E5%A4%9C%E7%A9%BA-%E5%A4%A9%E9%99%85%E7%BA%BF.png',
    date: '2025-12-31',
    category: '随笔',
    tags: ['Year End', 'Tech', 'Life', '2025'],
    author: { name: 'Nova', avatar: 'https://github.com/handsomjack0.png' },
    readTime: '3 min',
    content: '' // Content is fetched dynamically via Markdown component, but this entry ensures the card appears.
  }
];

export const TAGS = ['React', 'Cloudflare', 'DevOps', 'Travel', 'Lifestyle', 'Coding', 'Design', 'Minimalism'];