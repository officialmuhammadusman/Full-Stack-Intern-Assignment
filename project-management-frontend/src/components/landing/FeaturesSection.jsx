// src/components/landing/sections/FeaturesSection.jsx
import { Layout, Users, Bell, BarChart3, Shield, Calendar } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default function FeaturesSection() {
  const features = [
    {
      icon: Layout,
      title: 'Intuitive Dashboard',
      description: 'Beautiful, clean interface that shows everything at a glance. No clutter, just clarity.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Bring your team together. Assign roles, share updates, and work in perfect harmony.'
    },
    {
      icon: Bell,
      title: 'Real-time Notifications',
      description: 'Stay updated instantly. Get notified about task updates, deadlines, and team activities.'
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Track performance with detailed insights. See who is doing what and how projects evolve.'
    },
    {
      icon: Shield,
      title: 'Role-Based Access',
      description: 'Secure permissions ensure admins control and members collaborate without chaos.'
    },
    {
      icon: Calendar,
      title: 'Timeline Management',
      description: 'Visualize deadlines and milestones. Never miss an important date again.'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
       
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make project management effortless and enjoyable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-card border-border hover:border-primary/50 hover:shadow-xl transition-all hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 shadow-md">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}