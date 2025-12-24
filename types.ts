export interface Author {
  name: string;
  avatar: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  category: string;
  tags: string[];
  author: Author;
  readTime: string;
  content?: string; // Optional: content is now fetched dynamically
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}