import React, { useEffect, useRef } from 'react';

const Giscus: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    
    // Configured based on user request
    script.setAttribute('data-repo', 'handsomjack0/forum');
    script.setAttribute('data-repo-id', 'R_kgDOQuWOHg');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOQuWOHs4C0NKu');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('data-loading', 'lazy');

    ref.current.appendChild(script);
  }, []);

  return (
    <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">评论</h3>
      <div ref={ref} className="min-h-[200px]" />
    </div>
  );
};

export default Giscus;