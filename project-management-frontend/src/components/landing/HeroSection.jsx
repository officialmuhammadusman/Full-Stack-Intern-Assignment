// src/components/landing/sections/HeroSection.jsx
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection({ scrollToSection }) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="mb-4 inline-block bg-secondary text-secondary-foreground border border-primary/50 px-4 py-2 rounded-full font-medium">
             Trusted by 10,000+ Teams Worldwide
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Manage Projects
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Like Never Before
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Role-based project management that empowers admins to lead and teams to collaborate seamlessly. 
            Track progress, assign tasks, and achieve goals together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
         
            <Link href="/register">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6"
              >
                Get Started
              </Button>
            </Link>

            {/* Existing CTA */}
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                Start Free Today <ArrowRight className="ml-2" />
              </Button>
            </Link>

            <Button 
              onClick={() => scrollToSection('features')} 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6"
            >
              See How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
