/**
 * Optimizes external image URLs using wsrv.nl (a free global image proxy).
 * Features:
 * 1. Converts to WebP (smaller file size).
 * 2. Resizes based on the 'width' parameter.
 * 3. Compresses with quality setting (default increased to 85 for better aesthetics).
 * 4. Caches globally via Cloudflare CDN.
 */
export function optimizeImage(url: string, width: number = 1200, quality: number = 85): string {
  if (!url) return '';
  
  // Skip optimization for:
  // 1. Local images (starting with /)
  // 2. Data URLs (base64)
  // 3. URLs that are already optimized or don't support external proxies easily
  if (
    url.startsWith('/') || 
    url.startsWith('data:') || 
    url.includes('wsrv.nl') ||
    url.includes('localhost')
  ) {
    return url;
  }

  // Remove protocol to prevent double encoding issues in some edge cases
  // output=webp: WebP format (high quality, low size)
  // il: Progressive load
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&q=${quality}&output=webp&il`;
}