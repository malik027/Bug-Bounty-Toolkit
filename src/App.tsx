import React, { useEffect } from 'react';
import Seo from './components/Seo';
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
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = e.currentTarget as HTMLAnchorElement;
        const targetId = target.getAttribute('href')?.substring(1);
        if (!targetId) return;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <>
      <Seo />
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
    </>
  );
}

export default App;
