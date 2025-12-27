import React, { useState, useEffect } from 'react';
import { TAGS, SITE_CONFIG } from '../constants';
import { Mail, Tag, Activity, Server, CheckCircle, Wifi, ArrowRight } from 'lucide-react';

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
            <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-[#34C759] shadow-[0_0_8px_rgba(52,199,89,0.5)]' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
        </div>
        <span className="text-xs font-mono text-gray-400">
           {status === 'online' ? `${latency}ms` : 'OFF'}
        </span>
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="space-y-6">
      
      {/* System Status Widget */}
      <div className="glass-panel p-6 rounded-[1.5rem]">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">System Status</h3>
        <div className="flex flex-col">
            <StatusRow label="Epic Core" url={SITE_CONFIG.links.cloudLab} />
            <StatusRow label="Cloud Pan" url={SITE_CONFIG.links.fileTransfer} />
            <StatusRow label="CDN Node" url="https://cdnjs.cloudflare.com" />
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="glass-panel p-6 rounded-[1.5rem] bg-gradient-to-br from-white to-gray-50 dark:from-[#1C1C1E] dark:to-[#2C2C2E]">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-1.5 bg-[#007AFF] rounded-lg text-white">
                <Mail className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">Newsletter</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium leading-relaxed">
          Weekly thoughts on design & tech.
        </p>
        <form className="relative" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Email address" 
            className="w-full pl-4 pr-10 py-3 rounded-xl bg-gray-100 dark:bg-black/50 border-none outline-none text-sm dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#007AFF]/50 transition-all"
          />
          <button className="absolute right-2 top-2 p-1 bg-[#007AFF] text-white rounded-lg hover:bg-[#0062CC] transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Tags Cloud */}
      <div className="glass-panel p-6 rounded-[1.5rem]">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Explore</h3>
        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1.5 bg-gray-100 dark:bg-black/40 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-semibold hover:bg-[#007AFF] hover:text-white dark:hover:bg-[#0A84FF] dark:hover:text-white transition-all cursor-pointer"
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