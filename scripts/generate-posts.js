import fs from 'fs';
import path from 'path';

// NOTE: You need to install 'gray-matter' to run this script locally:
// npm install gray-matter

// This script scans the public/posts directory, parses Frontmatter,
// and generates a posts.json file. This allows the frontend to know
// about all posts without manual updates to constants.ts.

const POSTS_DIR = path.join(process.cwd(), 'public/posts');
const OUTPUT_FILE = path.join(process.cwd(), 'public/posts.json');

// Simple regex parser for Frontmatter to avoid dependencies in this demo script
// In a real production setup, use 'gray-matter'
function parseFrontmatter(content) {
  // Enhanced regex to handle \r\n (Windows) and \n (Linux/Mac)
  // Also handles optional whitespace before the first dashes
  const match = content.match(/^\s*---\s*[\r\n]+([\s\S]*?)[\r\n]+---/);
  if (!match) return null;
  
  const metadata = {};
  const frontmatter = match[1];
  
  frontmatter.split(/\r?\n/).forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      let value = valueParts.join(':').trim();
      // Handle arrays like [a, b]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(s => s.trim());
      }
      metadata[key.trim()] = value;
    }
  });
  
  return metadata;
}

async function generate() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error('Posts directory not found!');
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  const posts = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const metadata = parseFrontmatter(content);
    
    if (metadata) {
      // Use filename as ID (e.g., "1.md" -> "1")
      const id = file.replace('.md', '');
      posts.push({
        id,
        ...metadata,
        // Ensure tags is an array
        tags: Array.isArray(metadata.tags) ? metadata.tags : [metadata.tags]
      });
    }
  }

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`Successfully generated metadata for ${posts.length} posts at ${OUTPUT_FILE}`);
}

generate();