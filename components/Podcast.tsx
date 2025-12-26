import React from 'react';
import { MOCK_PODCASTS } from '../constants';
import { Mic, Play, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Podcast: React.FC = () => {
  return (
    <section id="podcast" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* Header Area */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/3 sticky top-24"
          >
            <div className="flex items-center space-x-2 mb-4">
               <span className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                 <Mic className="w-6 h-6" />
               </span>
               <span className="text-sm font-bold tracking-wider text-purple-600 dark:text-purple-400 uppercase">Podcast</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Echoes from the Cloud
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Join me as I discuss the latest trends in software engineering, cloud architecture, and digital minimalism. New episodes every month.
            </p>
            <button className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center space-x-2 shadow-lg">
               <Play className="w-4 h-4 fill-current" />
               <span>Listen on Spotify</span>
            </button>
          </motion.div>

          {/* Episode List */}
          <div className="md:w-2/3 w-full grid gap-6">
            {MOCK_PODCASTS.map((episode, index) => (
              <motion.div 
                key={episode.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900/50 transition-colors flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                  <img 
                    src={episode.cover} 
                    alt={episode.title} 
                    className="w-full h-full object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 text-purple-600 ml-1 fill-current" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {episode.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {episode.description}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start space-x-6 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {episode.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {episode.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Podcast;