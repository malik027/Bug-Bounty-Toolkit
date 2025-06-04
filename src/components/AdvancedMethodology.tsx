import React, { useState } from 'react';
import { AdvancedMethodology as MethodologyType } from '../types';
import Command from './Command';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AdvancedMethodologyProps {
  methodology: MethodologyType;
}

const AdvancedMethodology: React.FC<AdvancedMethodologyProps> = ({ methodology }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors duration-200">
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center p-4 text-left focus:outline-none hover:bg-gray-750 transition-colors duration-200"
      >
        <h3 className="text-xl font-semibold text-white">{methodology.title}</h3>
        <span className="text-gray-400">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </button>
      
      {isOpen && (
        <div className="p-4 pt-0 bg-gray-800">
          <div className="space-y-4">
            {methodology.commands.map((command, index) => (
              <Command key={`${methodology.id}-${index}`} command={command} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedMethodology;