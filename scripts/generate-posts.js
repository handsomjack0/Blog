import fs from 'fs';
import path from 'path';

// This script scans the public/posts directory, parses Frontmatter,
// calculates reading time, and generates both posts.json and rss.xml.

const POSTS_DIR = path.join(process.cwd(), 'public/posts');
const POSTS_JSON_FILE = path.join(process.cwd(), 'public/posts.json');
const RSS_FILE = path.join(process.cwd(), 'public/rss.xml');

const SITE_URL = "https://nova.zz.ac";

function parseFrontmatter(content) {
  // 1. Try Standard Frontmatter
  const standardRegex = /^\s*---\s*[\r\n]+([\s\S]*?)[\r\n]+---/;
  const standardMatch = content.match(standardRegex);

  if (standardMatch) {
    return parseRawFrontmatter(standardMatch[1], content.replace(standardMatch[0], '').trim());
  }

  // 2. Try Loose Frontmatter (missing delimiters)
  const looseRegex = /^((?:[a-z]+:\s*.*[\r\n]+)+)/i;
  const looseMatch = content.match(looseRegex);

  if (looseMatch && looseMatch[1].includes('title:')) {
    return parseRawFrontmatter(looseMatch[1], content.replace(looseMatch[0], '').trim());
  }

  return { metadata: null, body: content };
}

function parseRawFrontmatter(frontmatter, body) {
  const metadata = {};
  frontmatter.split(/\r?\n/).forEach(line => {
    if (!line.trim() || line.trim().startsWith('#')) return;
    
    const firstColonIndex = line.indexOf(':');
    if (firstColonIndex !== -1) {
      const key = line.slice(0, firstColonIndex).trim();
      let value = line.slice(firstColonIndex + 1).trim();

      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(s => s.trim());
      }
      metadata[key] = value;
    }
  });
  return { metadata, body };
}

// Calculate reading time: avg 200 words per minute
function calculateReadTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
}

function generateRSS(posts) {
  const date = new Date().toUTCString();
  const rssItemsXml = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/post/${post.id}</link>
      <guid>${SITE_URL}/post/${post.id}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>
  `).join('');

  return `<?xml version="1.0" ?>
<rss version="2.0">
  <channel>
    <title>Nova Tech Blog</title>
    <link>${SITE_URL}</link>
    <description>Exploring the cloud, one bit at a time.</description>
    <language>en-us</language>
    <lastBuildDate>${date}</lastBuildDate>
    ${rssItemsXml}
  </channel>
</rss>`;
}

async function generate() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error('Posts directory not found!');
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md') && !file.startsWith('_'));
  const posts = [];

  for (const file of files) {
    try {
      const rawContent = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      const { metadata, body } = parseFrontmatter(rawContent);
      
      const id = file.replace('.md', '');
      const title = metadata?.title || id.replace(/-/g, ' ');
      const date = metadata?.date || new Date().toDateString();
      const excerpt = metadata?.excerpt || body.slice(0, 150) + '...';
      const category = metadata?.category || 'General';
      const tags = Array.isArray(metadata?.tags) ? metadata.tags : (metadata?.tags ? [metadata.tags] : []);
      const coverImage = metadata?.coverImage || `https://picsum.photos/seed/${id}/800/600`;
      
      const readTime = metadata?.readTime || calculateReadTime(body);

      posts.push({
        id,
        title,
        excerpt,
        date,
        category,
        tags,
        coverImage,
        readTime,
        // Updated fallback avatar to local path matches public/avatar.jpg
        author: metadata?.author || { name: 'Nova', avatar: '/avatar.jpg' }
      });
    } catch (err) {
      console.warn(`Skipping file ${file} due to error:`, err.message);
    }
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(POSTS_JSON_FILE, JSON.stringify(posts, null, 2));
  console.log(`Generated JSON index for ${posts.length} posts.`);

  const rssContent = generateRSS(posts);
  fs.writeFileSync(RSS_FILE, rssContent);
  console.log(`Generated RSS Feed at ${RSS_FILE}`);
}

generate();