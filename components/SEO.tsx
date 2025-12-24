import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const siteTitle = "Nova Tech Space";
  const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const finalDescription = description || "Exploring the cloud, one bit at a time. A personal tech blog.";

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;