import React from 'react';
import { CommandCategory as CategoryType } from '../types';
import Command from './Command';

interface CommandCategoryProps {
  category: CategoryType;
}

const CommandCategory: React.FC<CommandCategoryProps> = ({ category }) => {
  return (
    <div id={category.id} className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-700">
        {category.title}
      </h2>
      <div className="space-y-4">
        {category.commands.map((command, index) => (
          <Command key={`${category.id}-${index}`} command={command} />
        ))}
      </div>
    </div>
  );
};

export default CommandCategory;