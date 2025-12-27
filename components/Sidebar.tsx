import React, { useState, useEffect } from 'react';
import { TAGS, SITE_CONFIG } from '../constants';
import { Mail, TrendingUp, Tag, Activity, Server, CheckCircle, Wifi } from 'lucide-react';

// Enhanced Hook for checking server status AND latency
const useHealthCheck = (url: string, interval = 30000) => {
  const [status, setStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      setStatus('checking');
      const start = performance.now();
      try {
        // 'no-cors' allows us to ping domains without CORS headers.
        await fetch(url, { mode: 'no-cors', method: 'HEAD' });
        const end = performance.now();
        setLatency(Math.round(end - start));
        setStatus('online');
      } catch (e) {
        console.error(`Health check failed for ${url}`, e);
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

const StatusItem: React.FC<{ label: string; url: string; icon: React.ReactNode }> = ({ label, url, icon }) => {
  const { status, latency } = useHealthCheck(url);
  
  // Mapping status to UI
  let statusColor = "bg-gray-300";
  let statusText = "Checking...";
  let textColor = "text-gray-500";
  let latencyBadge = null;

  if (status === 'online') {
    statusColor = "bg-green-500";
    statusText = "Online";
    textColor = "text-green-600 dark:text-green-400";
    
    // Color code the latency
    let latencyColor = "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
    if (latency && latency > 200) latencyColor = "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400";
    if (latency && latency > 500) latencyColor = "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400";

    latencyBadge = (
      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${latencyColor} border border-transparent dark:border-white/5`}>
        {latency}ms
      </span>
    );
  } else if (status === 'offline') {
    statusColor = "bg-red-500";
    statusText = "Offline";
    textColor = "text-red-600 dark:text-red-400";
  }

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/40 rounded-lg border border-gray-100 dark:border-gray-800 transition-all hover:border-gray-300 dark:hover:border-gray-600 group">
        <div className="flex items-center space-x-2">
            <div className="text-gray-400 group-hover:text-primary-500 transition-colors">
              {icon}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
        </div>
        <div className="flex items-center space-x-2">
            {latencyBadge}
            <div className="flex items-center space-x-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${statusColor} ${status === 'online' ? 'animate-pulse' : ''}`}></div>
                {/* Hide text on very small screens if needed, but sidebar is usually wide enough */}
                <span className={`text-xs font-mono font-medium ${textColor}`}>{statusText}</span>
            </div>
        </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="space-y-8">
      
      {/* Live System Status Widget */}
      <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary-500" />
                <h3 className="font-serif font-bold text-gray-900 dark:text-gray-100 text-lg">System Status</h3>
            </div>
            <Wifi className="w-4 h-4 text-gray-400" />
        </div>
        <div className="space-y-3">
            <StatusItem 
                label="Epic Core" 
                url={SITE_CONFIG.links.cloudLab} 
                icon={<Server className="w-4 h-4" />} 
            />
            <StatusItem 
                label="Cloud Pan" 
                url={SITE_CONFIG.links.fileTransfer} 
                icon={<CheckCircle className="w-4 h-4" />} 
            />
             <StatusItem 
                label="CDN Node" 
                url="https://cdnjs.cloudflare.com" 
                icon={<Activity className="w-4 h-4" />} 
            />
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-2 mb-4">
            <Mail className="w-5 h-5 text-primary-500" />
            <h3 className="font-serif font-bold text-gray-900 dark:text-gray-100 text-lg">Newsletter</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-light">
          Get the latest cloud labs and tech notes delivered to your inbox.
        </p>
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Your email address" 
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm dark:text-white transition-all placeholder-gray-400 dark:placeholder-gray-600"
          />
          <button className="w-full py-2 bg-gray-900 dark:bg-primary-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Subscribe
          </button>
        </form>
      </div>

      {/* Tags Cloud */}
      <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
         <div className="flex items-center space-x-2 mb-4">
            <Tag className="w-5 h-5 text-primary-500" />
            <h3 className="font-serif font-bold text-gray-900 dark:text-gray-100 text-lg">Tag Cloud</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-transparent dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-mono font-medium hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-200 dark:hover:border-gray-600 cursor-pointer transition-all"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;