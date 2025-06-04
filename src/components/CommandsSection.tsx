import React from 'react';
import { commandCategories } from '../utils/data';
import CommandCategory from './CommandCategory';

const CommandsSection: React.FC = () => {
  return (
    <section id="commands" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Command Library</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive collection of security commands organized by category for efficient bug hunting and penetration testing.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {commandCategories.map((category) => (
            <CommandCategory key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommandsSection;