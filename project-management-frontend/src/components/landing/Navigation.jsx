// src/components/landing/Navigation.jsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, Target  } from 'lucide-react';

export default function Navigation({ scrolled, isMenuOpen, setIsMenuOpen, scrollToSection }) {
  return (
    <>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-card shadow-lg' : 'bg-card/80 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">TaskFlow</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-muted-foreground hover:text-primary transition font-medium">Features</button>
              <button onClick={() => scrollToSection('roles')} className="text-muted-foreground hover:text-primary transition font-medium">Roles</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-muted-foreground hover:text-primary transition font-medium">Reviews</button>
              <Link href="/login">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-foreground">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <button onClick={() => scrollToSection('features')} className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-primary hover:bg-muted rounded">Features</button>
              <button onClick={() => scrollToSection('roles')} className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-primary hover:bg-muted rounded">Roles</button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-primary hover:bg-muted rounded">Reviews</button>
              <Link href="/login">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground mb-2">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}