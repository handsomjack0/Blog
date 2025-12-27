import React, { useState, useRef } from 'react';
import { Send, Mail, MapPin, MessageSquare, Check, Loader2, Copy, AlertCircle } from 'lucide-react';
import { motion as motionOriginal, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '../constants';
import emailjs from '@emailjs/browser';

const motion = motionOriginal as any;

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // idle | submitting | success | error
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Strict check: Ensure the user has replaced ALL placeholder values
    if (
      SITE_CONFIG.emailJS.serviceId === "YOUR_SERVICE_ID" ||
      SITE_CONFIG.emailJS.templateId === "YOUR_TEMPLATE_ID" ||
      SITE_CONFIG.emailJS.publicKey === "YOUR_PUBLIC_KEY"
    ) {
        setErrorMessage("Configuration incomplete. Please check constants.ts and fill in your EmailJS IDs.");
        setStatus('error');
        return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Send via EmailJS
      await emailjs.sendForm(
        SITE_CONFIG.emailJS.serviceId,
        SITE_CONFIG.emailJS.templateId,
        formRef.current!,
        SITE_CONFIG.emailJS.publicKey
      );

      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);

    } catch (error: any) {
      console.error('FAILED...', error);
      setStatus('error');
      setErrorMessage('Failed to send message. Please check your network or try again later.');
    }
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
              <div className="flex items-center space-x-4 group cursor-pointer" onClick={handleCopyEmail}>
                <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm text-primary-500 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Email</p>
                    {emailCopied && <span className="text-[10px] text-green-500 font-bold animate-pulse">COPIED</span>}
                  </div>
                  <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium hover:text-primary-500 transition-colors">
                     {SITE_CONFIG.email}
                     <Copy className="w-3.5 h-3.5 text-gray-400" />
                  </div>
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
            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
              {/* Hidden field for title to support default EmailJS templates that use {{title}} */}
              <input type="hidden" name="title" value="New Inquiry" />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input 
                  type="text" 
                  name="name" // Important: matches the variable in your EmailJS template (e.g. {{name}})
                  value={formState.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white disabled:opacity-50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email" // Important: matches the variable in your EmailJS template (e.g. {{email}})
                  value={formState.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white disabled:opacity-50"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea 
                  name="message" // Important: matches the variable in your EmailJS template (e.g. {{message}})
                  rows={4} 
                  value={formState.message}
                  onChange={handleChange}
                  required
                  disabled={status === 'submitting' || status === 'success'}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white resize-none disabled:opacity-50"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <motion.button 
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                whileHover={{ scale: status === 'idle' || status === 'error' ? 1.02 : 1 }}
                whileTap={{ scale: status === 'idle' || status === 'error' ? 0.98 : 1 }}
                className={`w-full py-3 rounded-xl font-bold shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
                  status === 'success' 
                    ? 'bg-green-500 text-white shadow-green-500/30' 
                    : status === 'error'
                      ? 'bg-red-500 text-white shadow-red-500/30'
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
                      <span>Sent Successfully!</span>
                      <Check className="w-5 h-5" />
                    </motion.div>
                  )}

                   {status === 'error' && (
                    <motion.div 
                      key="error"
                      initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center space-x-2"
                    >
                      <span>Retry</span>
                      <AlertCircle className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              
              {/* Error Message Feedback */}
              {status === 'error' && (
                 <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-red-500 text-xs text-center mt-2 font-medium"
                 >
                    {errorMessage}
                 </motion.p>
              )}

              {status === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-xs text-green-600 dark:text-green-400 font-medium mt-2"
                >
                  I'll get back to you shortly.
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