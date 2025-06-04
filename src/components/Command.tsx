import React, { useState, useEffect } from 'react';
import { Command as CommandType } from '../types';
import { Copy, Check } from 'lucide-react';

interface CommandProps {
  command: CommandType;
}

const Command: React.FC<CommandProps> = ({ command }) => {
  const [copied, setCopied] = useState(false);

  // Normalize jadi array of string
  const normalizeCommand = (cmd: string | string[]) =>
    Array.isArray(cmd) ? cmd : [cmd];

  const [generatedCommand, setGeneratedCommand] = useState<string[]>(
    normalizeCommand(command.command)
  );

  useEffect(() => {
    const handleTargetChange = (event: CustomEvent) => {
      const newTarget = event.detail;
      const baseCommands = normalizeCommand(command.command);

      if (newTarget) {
        const replaced = baseCommands.map(line =>
          line.replace(/\{target\}/g, newTarget)
        );
        setGeneratedCommand(replaced);
      } else {
        setGeneratedCommand(baseCommands);
      }
    };

    window.addEventListener('targetChange', handleTargetChange as EventListener);
    return () => {
      window.removeEventListener('targetChange', handleTargetChange as EventListener);
    };
  }, [command.command]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCommand.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 hover:bg-gray-750 transition-colors duration-200 border border-gray-700 hover:border-gray-600">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg text-white font-medium">{command.name}</h3>
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
          aria-label="Copy command"
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>
      {command.description && (
        <p className="text-gray-400 text-sm mb-2">{command.description}</p>
      )}
      <div className="bg-gray-900 p-3 rounded font-mono text-sm text-gray-300 overflow-x-auto border border-gray-700 whitespace-pre-wrap">
        {generatedCommand.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
};

export default Command;
