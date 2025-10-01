// src/components/landing/sections/CTASection.jsx
import { Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function CTASsection() {
  return (
    <section id="signup" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-accent">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-card/10 backdrop-blur-sm border-card/20 overflow-hidden shadow-2xl">
          <CardContent className="p-12 text-center">
            <Award className="w-16 h-16 text-card mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-card mb-4">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-card/90 mb-8 max-w-2xl mx-auto">
              Join thousands of teams already using TaskFlow to manage projects efficiently. Start your free trial today—no credit card required!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-card text-primary hover:bg-card/90 text-lg px-10 py-6 shadow-xl font-semibold">
                  Start Free Trial <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-card text-card hover:bg-card hover:text-primary-foreground text-lg px-10 py-6">
                  Login Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}