import React from 'react';
import { ShieldAlert, Lock, Search } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A passionate bug hunter and cybersecurity enthusiast dedicated to building tools that simplify recon and automation.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src="https://avatars.githubusercontent.com/u/213606152?v=4?auto=compress&cs=tinysrgb&w=600" 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <h3 className="text-2xl font-bold text-white mb-3">Malik027</h3>
                <p className="text-gray-400 mb-4">
                  Security researcher focused on bug bounty hunting, vulnerability assessment, and ethical hacking. Passionate about discovering security flaws and supporting the cybersecurity community through continuous learning and responsible disclosure.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <a 
                    href="https://twitter.com/malikkk027" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded-full inline-flex items-center"
                  >
                    Twitter: @malik027
                  </a>
                  <a 
                    href="https://github.com/malik027" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-700 text-white text-xs font-medium py-1 px-3 rounded-full inline-flex items-center"
                  >
                    GitHub: malik027
                  </a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-red-500 mb-2 flex justify-center">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <h4 className="text-center text-white font-medium">Security Focus</h4>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-yellow-500 mb-2 flex justify-center">
                      <Search className="w-6 h-6" />
                    </div>
                    <h4 className="text-center text-white font-medium">Recon Expert</h4>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-green-500 mb-2 flex justify-center">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h4 className="text-center text-white font-medium">Tool Builder</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;