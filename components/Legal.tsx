import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SITE_CONFIG } from '../constants';

const LegalLayout: React.FC<{ title: string; children: React.ReactNode; lastUpdated: string }> = ({ title, children, lastUpdated }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 max-w-4xl"
    >
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last Updated: {lastUpdated}</p>
        
        <div className="prose prose-lg dark:prose-invert max-w-none prose-a:text-primary-600">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export const PrivacyPolicy: React.FC = () => {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="January 1, 2025">
      <p>
        Your privacy is important to us. It is {SITE_CONFIG.name}'s policy to respect your privacy regarding any information we may collect from you across our website.
      </p>

      <h3>1. Information We Collect</h3>
      <p>
        We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
      </p>
      <ul>
        <li><strong>Log Data:</strong> When you visit our website, our servers may automatically log the standard data provided by your web browser.</li>
        <li><strong>Comments:</strong> We use Giscus for comments, which requires GitHub authentication. We do not store your GitHub credentials directly.</li>
      </ul>

      <h3>2. How We Use Your Information</h3>
      <p>
        We use the information we collect in various ways, including to:
      </p>
      <ul>
        <li>Provide, operate, and maintain our website</li>
        <li>Improve, personalize, and expand our website</li>
        <li>Understand and analyze how you use our website</li>
        <li>Find and prevent fraud</li>
      </ul>

      <h3>3. Third-Party Services</h3>
      <p>
        We may use third-party services (such as Google Analytics or Cloudflare) that collect, monitor, and analyze this type of information in order to increase our Service's functionality. These third-party service providers have their own Privacy Policies addressing how they use such information.
      </p>

      <h3>4. Contact Us</h3>
      <p>
        If you have any questions about this Privacy Policy, you can contact us:
      </p>
      <ul>
        <li>By email: {SITE_CONFIG.email}</li>
      </ul>
    </LegalLayout>
  );
};

export const TermsOfService: React.FC = () => {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="January 1, 2025">
      <h3>1. Terms</h3>
      <p>
        By accessing the website at {SITE_CONFIG.name}, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
      </p>

      <h3>2. Use License</h3>
      <p>
        Permission is granted to temporarily download one copy of the materials (information or software) on {SITE_CONFIG.name}'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      </p>
      <ul>
        <li>modify or copy the materials;</li>
        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
        <li>attempt to decompile or reverse engineer any software contained on {SITE_CONFIG.name}'s website;</li>
        <li>remove any copyright or other proprietary notations from the materials; or</li>
        <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
      </ul>

      <h3>3. Disclaimer</h3>
      <p>
        The materials on {SITE_CONFIG.name}'s website are provided on an 'as is' basis. {SITE_CONFIG.name} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </p>

      <h3>4. Limitations</h3>
      <p>
        In no event shall {SITE_CONFIG.name} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on {SITE_CONFIG.name}'s website.
      </p>

      <h3>5. Accuracy of Materials</h3>
      <p>
        The materials appearing on {SITE_CONFIG.name}'s website could include technical, typographical, or photographic errors. {SITE_CONFIG.name} does not warrant that any of the materials on its website are accurate, complete or current. {SITE_CONFIG.name} may make changes to the materials contained on its website at any time without notice.
      </p>
    </LegalLayout>
  );
};
