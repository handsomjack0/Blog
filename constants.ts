import { Post } from './types';

export const SITE_CONFIG = {
  // [修改 1] 网站左上角的名称
  name: "Nova.zz.ac",
  
  // [修改 2] 首页中间的个人简介
  description: "Exploring the cloud, one bit at a time.",
  
  // [修改 3] 头像图片
  // 方式 A (使用网络图片): 保持 https://... 格式
  // 方式 B (使用本地图片): 
  //    1. 把你的照片 (如 me.jpg) 拖进项目的 public 文件夹
  //    2. 把下面这行改成: avatar: "/me.jpg",
  avatar: "https://picsum.photos/id/64/200/200", 
  
  github: "https://github.com/handsomjack0",
  links: {
    cloudLab: "https://epic.nova.zz.ac",
    fileTransfer: "https://pan.nova.zz.ac",
  }
};

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
    // [修改 4] 文章封面图 (修改方式同头像)
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