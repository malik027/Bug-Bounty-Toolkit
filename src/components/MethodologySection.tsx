import React from 'react';
import { advancedMethodologies } from '../utils/data';
import AdvancedMethodology from './AdvancedMethodology';

const MethodologySection: React.FC = () => {
  return (
    <section id="methodology" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Advanced Methodology</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Detailed workflows and techniques for sophisticated security testing and bug hunting.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-xl shadow-2xl border border-gray-700">
          <div className="grid grid-cols-1 gap-6">
            {advancedMethodologies.map((methodology) => (
              <AdvancedMethodology key={methodology.id} methodology={methodology} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;