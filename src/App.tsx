import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CommandsSection from './components/CommandsSection';
import MethodologySection from './components/MethodologySection';
import AboutSection from './components/AboutSection';
import ContributorsSection from './components/ContributorsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Update document title
    document.title = 'Bug Bounty Toolkit';
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for fixed header
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Hero />
      <CommandsSection />
      <MethodologySection />
      <AboutSection />
      <ContributorsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;