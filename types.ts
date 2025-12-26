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

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  cover: string;
  audioUrl?: string; // Optional link to audio
}