// src/components/landing/sections/TestimonialsSection.jsx
import { Star } from 'lucide-react';
import { Card, CardContent,  } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Project Manager',
      company: 'Tech Innovations',
      image: 'https://randomuser.me/api/portraits/women/44.jpg', 
      text: 'TaskFlow transformed how we manage projects. The role-based system is exactly what we needed!'
    },
    {
      name: 'Michael Chen',
      role: 'Team Lead',
      company: 'Digital Solutions',
      image: 'https://randomuser.me/api/portraits/men/32.jpg', 
      text: 'Our team productivity increased by 40% after switching to TaskFlow. The interface is incredible!'
    },
    {
      name: 'Emily Rodriguez',
      role: 'CEO',
      company: 'StartUp Hub',
      image: 'https://randomuser.me/api/portraits/women/65.jpg', 
      text: 'Best investment for our growing team. Simple, powerful, and gets the job done perfectly.'
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
         
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Loved by Teams Everywhere
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what real users have to say about TaskFlow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover border border-border" 
                  />
                  <div>
                    <div className="text-foreground font-semibold">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                    <div className="text-primary text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
