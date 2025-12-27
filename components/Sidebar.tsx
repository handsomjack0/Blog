import React, { useState, useEffect } from 'react';
import { TAGS, SITE_CONFIG } from '../constants';
import { Mail, Tag, Activity, ArrowRight, Loader2, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

const useHealthCheck = (url: string, interval = 30000) => {
  const [status, setStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      setStatus('checking');
      const start = performance.now();
      try {
        await fetch(url, { mode: 'no-cors', method: 'HEAD' });
        const end = performance.now();
        setLatency(Math.round(end - start));
        setStatus('online');
      } catch (e) {
        setStatus('offline');
        setLatency(null);
      }
    };

    checkStatus();
    const timer = setInterval(checkStatus, interval);
    return () => clearInterval(timer);
  }, [url, interval]);

  return { status, latency };
};

const StatusRow: React.FC<{ label: string; url: string }> = ({ label, url }) => {
  const { status, latency } = useHealthCheck(url);
  
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0 border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${status === 'online' ? 'bg-[#34C759] shadow-[0_0_8px_rgba(52,199,89,0.5)]' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
           {status === 'online' ? `${latency}ms` : 'OFF'}
        </span>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Prepare parameters compatible with your existing EmailJS template
    const templateParams = {
      name: "New Subscriber", // Hardcoded name for subscription
      email: email,
      message: "I would like to subscribe to the newsletter.",
      title: "Newsletter Subscription" // Useful context for subject line
    };

    try {
      await emailjs.send(
        SITE_CONFIG.emailJS.serviceId,
        SITE_CONFIG.emailJS.templateId,
        templateParams,
        SITE_CONFIG.emailJS.publicKey
      );
      setStatus('success');
      setEmail('');
      
      // Reset success state after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <aside className="space-y-8">
      
      {/* System Status Widget */}
      <div className="bg-white dark:bg-[#1C1C1E] p-6 rounded-[2rem] shadow-premium border border-gray-100 dark:border-gray-800">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Activity className="w-3 h-3" />
            System Status
        </h3>
        <div className="flex flex-col">
            <StatusRow label="Epic Core" url={SITE_CONFIG.links.cloudLab} />
            <StatusRow label="Cloud Pan" url={SITE_CONFIG.links.fileTransfer} />
            <StatusRow label="CDN Node" url="https://cdnjs.cloudflare.com" />
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-white dark:bg-[#1C1C1E] p-6 rounded-[2rem] shadow-premium border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#007AFF]/5 rounded-full blur-2xl -translate-y-10 translate-x-10 group-hover:bg-[#007AFF]/10 transition-colors duration-500"></div>
        
        <div className="flex items-center gap-3 mb-2 relative">
            <div className="p-2 bg-[#007AFF]/10 rounded-xl text-[#007AFF]">
                <Mail className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">Newsletter</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 font-medium leading-relaxed relative">
          Weekly thoughts on design & tech. No spam.
        </p>
        
        <form className="relative" onSubmit={handleSubscribe}>
          <input 
            type="email" 
            placeholder={status === 'success' ? 'Subscribed!' : 'Email address'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border-none outline-none text-sm dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#007AFF]/20 transition-all font-medium disabled:opacity-70"
          />
          <button 
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`absolute right-2 top-2 p-1.5 rounded-lg text-white transition-all shadow-lg ${
                status === 'success' ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' : 
                status === 'error' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' :
                'bg-[#007AFF] hover:bg-[#0062CC] shadow-blue-500/20'
            }`}
          >
            {status === 'loading' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : status === 'success' ? (
                <Check className="w-3.5 h-3.5" />
            ) : (
                <ArrowRight className="w-3.5 h-3.5" />
            )}
          </button>
        </form>
      </div>

      {/* Tags Cloud */}
      <div className="bg-white dark:bg-[#1C1C1E] p-6 rounded-[2rem] shadow-premium border border-gray-100 dark:border-gray-800">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Tag className="w-3 h-3" />
            Explore
        </h3>
        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-bold hover:bg-[#007AFF] hover:text-white hover:border-[#007AFF] dark:hover:bg-[#0A84FF] dark:hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;