// src/components/landing/LandingPage.jsx (updated import)
import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';

import FeaturesSection from './FeaturesSection';
import RolesSection from './RolesSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';
import FooterSection from './FooterSection'; // New import
import Navigation from './Navigation';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        scrolled={scrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        scrollToSection={scrollToSection} 
      />
      <HeroSection scrollToSection={scrollToSection} />
    
      <FeaturesSection />
      <RolesSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection /> {/* Add footer */}
    </div>
  );
}