import { Post } from '../types';
import { SITE_CONFIG } from '../constants';

// A lightweight runtime parser to extract Frontmatter from Markdown string.
// This allows the app to fetch .md files directly and display them
// without needing a build step for the demo environment.
export function parseFrontmatter(markdown: string): { metadata: Partial<Post>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content: markdown };
  }

  const frontmatterBlock = match[1];
  const content = markdown.replace(frontmatterRegex, '').trim();
  const metadata: any = {};

  frontmatterBlock.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const trimmedKey = key.trim();
      let value = valueParts.join(':').trim();

      // Simple array parsing [Tag1, Tag2]
      if (value.startsWith('[') && value.endsWith(']')) {
        // Remove brackets and split by comma
        const arrayContent = value.slice(1, -1);
        metadata[trimmedKey] = arrayContent.length > 0 
          ? arrayContent.split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
          : [];
      } else {
        // Remove quotes if present
        value = value.replace(/^['"]|['"]$/g, '');
        metadata[trimmedKey] = value;
      }
    }
  });

  // Normalize author if just a name string is provided or if missing
  if (!metadata.author) {
    metadata.author = { name: SITE_CONFIG.name, avatar: SITE_CONFIG.avatar };
  } else if (typeof metadata.author === 'string') {
    metadata.author = { name: metadata.author, avatar: SITE_CONFIG.avatar };
  }

  return { metadata, content };
}

// Helper to fetch and parse a post dynamically
export async function fetchPostWithFrontmatter(id: string): Promise<Post> {
  const response = await fetch(`/posts/${id}.md`);
  if (!response.ok) throw new Error(`Post ${id} not found`);
  const text = await response.text();
  
  const { metadata, content } = parseFrontmatter(text);
  
  return {
    id,
    content, // We store the body content here
    title: metadata.title || 'Untitled',
    excerpt: metadata.excerpt || '',
    coverImage: metadata.coverImage || '',
    date: metadata.date || '',
    category: metadata.category || 'General',
    tags: metadata.tags || [],
    author: metadata.author || { name: 'Nova', avatar: SITE_CONFIG.avatar },
    readTime: metadata.readTime || '5 min',
  } as Post;
}