import { Post } from './types';

export const SITE_CONFIG = {
  name: "Nova.zz.ac",
  description: "Exploring the cloud, one bit at a time.",
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

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Away’s Expandable Suitcases Are Here – The Most Spacious Bags Yet',
    excerpt: 'Discover why flexibility in luggage is the new standard for modern digital nomads.',
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