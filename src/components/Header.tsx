import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold text-white">Bug Bounty Toolkit</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#commands" className="text-gray-300 hover:text-white transition-colors duration-200">
              Commands
            </a>
            <a href="#methodology" className="text-gray-300 hover:text-white transition-colors duration-200">
              Methodology
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">
              About
            </a>
            <a href="#contributors" className="text-gray-300 hover:text-white transition-colors duration-200">
              Contributors
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">
              Contact
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 bg-gray-800 rounded-lg">
            <div className="flex flex-col space-y-4 px-4">
              <a 
                href="#commands" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Commands
              </a>
              <a 
                href="#methodology" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Methodology
              </a>
              <a 
                href="#about" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#contributors" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contributors
              </a>
              <a 
                href="#contact" 
                className="text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;