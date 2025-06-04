import React, { useState } from 'react';
import { Terminal, ShieldAlert } from 'lucide-react';

const Hero: React.FC = () => {
  const [target, setTarget] = useState('');

  // Update all commands when target changes
  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTarget(value);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('targetChange', { detail: value }));
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed py-20 px-4"
      style={{
        backgroundImage: 'linear-gradient(rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.9)), url("https://i.pinimg.com/736x/91/f1/64/91f164d561efe7a7105e9076f9c41f76.jpg?auto=compress&cs=tinysrgb&w=1920")',
      }}
    >
      <div className="container mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <ShieldAlert className="w-16 h-16 text-red-500 animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          Bug Bounty <span className="text-red-500">Toolkit</span>
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          A comprehensive collection of security tools and commands for efficient bug hunting and penetration testing.
        </p>
        
        <div className="max-w-xl mx-auto bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-2xl">
          <div className="mb-6">
            <label htmlFor="target" className="block text-gray-300 text-lg mb-3 flex items-center justify-center">
              <span className="mr-2">🔧</span> Enter your target (e.g. domain or IP):
            </label>
            <input
              type="text"
              id="target"
              value={target}
              onChange={handleTargetChange}
              placeholder="example.com"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#commands" 
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center transform hover:scale-105"
            >
              <Terminal className="mr-2 w-5 h-5" />
              View Commands
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;