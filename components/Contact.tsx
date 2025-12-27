import React, { useState } from 'react';
import { Send, Mail, MapPin, MessageSquare, Check, Loader2 } from 'lucide-react';
import { motion as motionOriginal, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../constants';

const motion = motionOriginal as any;

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // idle | submitting | success
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus('submitting');

    // Simulate network delay for better UX (Apple-like smooth interaction)
    setTimeout(() => {
      // 1. Construct the mailto link
      const subject = `New Message from ${formState.name} (Portfolio)`;
      const body = `Name: ${formState.name}%0D%0AEmail: ${formState.email}%0D%0A%0D%0AMessage:%0D%0A${formState.message}`;
      
      // 2. Open email client
      window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;

      // 3. Show success state
      setStatus('success');

      // 4. Reset form after a delay
      setTimeout(() => {
        setStatus('idle');
        setFormState({ name: '', email: '', message: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-[20%] -left-[10%] w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-12">
          
          {/* Info Side */}
          <div className="md:w-1/2 space-y-8">
            <div>
              <div className="p-2 inline-block bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                <MessageSquare className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Let's Connect</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Have a project in mind or just want to chat about tech? Feel free to send me a message. I usually respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm text-primary-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Email</p>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-gray-900 dark:text-white font-medium hover:text-primary-500 transition-colors">{SITE_CONFIG.email}</a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm text-primary-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Location</p>
                  <p className="text-gray-900 dark:text-white font-medium">Digital Nomad / Earth</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:w-1/2">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  disabled={status !== 'idle'}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white disabled:opacity-50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  disabled={status !== 'idle'}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white disabled:opacity-50"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea 
                  name="message"
                  rows={4} 
                  value={formState.message}
                  onChange={handleChange}
                  required
                  disabled={status !== 'idle'}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white resize-none disabled:opacity-50"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <motion.button 
                type="submit"
                disabled={status !== 'idle'}
                whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                className={`w-full py-3 rounded-xl font-bold shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
                  status === 'success' 
                    ? 'bg-green-500 text-white shadow-green-500/30' 
                    : 'bg-gradient-to-r from-primary-500 to-blue-600 text-white shadow-primary-500/30'
                } ${status === 'submitting' ? 'opacity-80 cursor-wait' : ''}`}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center space-x-2"
                    >
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </motion.div>
                  )}
                  
                  {status === 'submitting' && (
                    <motion.div 
                      key="submitting"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </motion.div>
                  )}

                  {status === 'success' && (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center space-x-2"
                    >
                      <span>Message Drafted</span>
                      <Check className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              
              {status === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-xs text-green-600 dark:text-green-400 font-medium mt-2"
                >
                  Opening your email client to send...
                </motion.p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;