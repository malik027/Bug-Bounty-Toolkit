import React from 'react';
import { contributors } from '../utils/data';
import { Twitter, Github, Youtube, Instagram } from 'lucide-react';

const ContributorsSection: React.FC = () => {
  return (
    <section id="contributors" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Credit & Contributors</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A special thank you to CoffinXP and all the other incredible individuals whose tools, knowledge, and support have been a tremendous source of inspiration. Your dedication and expertise have fueled my passion for bug bounty hunting and played a key role in my growth as a security researcher. This project would not have been possible without your valuable contributions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {contributors.map((contributor, index) => (
            <div key={index} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-200">
              <img 
                src={contributor.imageUrl} 
                alt={contributor.username} 
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{contributor.username}</h3>
                {contributor.description && (
                  <p className="text-gray-400 text-sm mb-4">{contributor.description}</p>
                )}
                
                <div className="flex space-x-3">
                  {contributor.socialLinks.twitter && (
                    <a 
                      href={contributor.socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {contributor.socialLinks.github && (
                    <a 
                      href={contributor.socialLinks.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {contributor.socialLinks.youtube && (
                    <a 
                      href={contributor.socialLinks.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-400 transition-colors duration-200"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  )}
                  {contributor.socialLinks.instagram && (
                    <a 
                      href={contributor.socialLinks.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-400 transition-colors duration-200"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContributorsSection;