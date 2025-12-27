import { Post } from '../types';
import { SITE_CONFIG } from '../constants';

// A lightweight runtime parser to extract Frontmatter from Markdown string.
export function parseFrontmatter(markdown: string): { metadata: Partial<Post>; content: string } {
  // 1. Try Standard Frontmatter (--- ... ---)
  const standardRegex = /^\s*---\s*[\r\n]+([\s\S]*?)[\r\n]+---/;
  const standardMatch = markdown.match(standardRegex);

  if (standardMatch) {
    return parseRawFrontmatter(standardMatch[1], markdown.replace(standardMatch[0], '').trim());
  }

  // 2. Fallback: Try "Loose" Frontmatter (Missing opening/closing dashes)
  // Logic: Matches lines starting with "key:" at the very beginning of the file, 
  // until it hits a line starting with "#" or a double newline followed by non-key text.
  const looseRegex = /^((?:[a-z]+:\s*.*[\r\n]+)+)/i;
  const looseMatch = markdown.match(looseRegex);
  
  // Only apply loose parsing if we detect critical keys like 'title:' to avoid false positives
  if (looseMatch && looseMatch[1].includes('title:')) {
    return parseRawFrontmatter(looseMatch[1], markdown.replace(looseMatch[0], '').trim());
  }

  // 3. No metadata found
  return { metadata: {}, content: markdown };
}

function parseRawFrontmatter(frontmatterBlock: string, bodyContent: string) {
  const metadata: any = {};
  
  frontmatterBlock.split(/\r?\n/).forEach((line) => {
    // Skip empty lines or comments
    if (!line.trim() || line.trim().startsWith('#')) return;

    const firstColonIndex = line.indexOf(':');
    if (firstColonIndex !== -1) {
      const key = line.slice(0, firstColonIndex).trim();
      let value = line.slice(firstColonIndex + 1).trim();

      // Simple array parsing [Tag1, Tag2]
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1);
        metadata[key] = arrayContent.length > 0 
          ? arrayContent.split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
          : [];
      } else {
        // Remove quotes if present
        value = value.replace(/^['"]|['"]$/g, '');
        metadata[key] = value;
      }
    }
  });

  // Normalize author
  if (!metadata.author) {
    metadata.author = { name: SITE_CONFIG.name, avatar: SITE_CONFIG.avatar };
  } else if (typeof metadata.author === 'string') {
    metadata.author = { name: metadata.author, avatar: SITE_CONFIG.avatar };
  }

  return { metadata, content: bodyContent };
}

// Helper to fetch and parse a post dynamically
export async function fetchPostWithFrontmatter(id: string): Promise<Post> {
  const response = await fetch(`/posts/${id}.md`);
  if (!response.ok) throw new Error(`Post ${id} not found`);
  const text = await response.text();
  
  const { metadata, content } = parseFrontmatter(text);
  
  return {
    id,
    content,
    title: metadata.title || id.replace(/-/g, ' '), // Fallback to filename if title missing
    excerpt: metadata.excerpt || '',
    coverImage: metadata.coverImage || '',
    date: metadata.date || '',
    category: metadata.category || 'General',
    tags: metadata.tags || [],
    author: metadata.author || { name: 'Nova', avatar: SITE_CONFIG.avatar },
    readTime: metadata.readTime || '5 min',
  } as Post;
}
