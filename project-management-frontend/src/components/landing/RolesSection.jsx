// src/components/landing/sections/RolesSection.jsx
import { useState } from 'react';
import { CheckCircle2, FileText, TrendingUp, MessageSquare, Layout, Users, Target, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; 
import { Badge } from "@/components/ui/badge";
export default function RolesSection() {
  const [activeTab, setActiveTab] = useState('admin');

  const adminFeatures = [
    {
      icon: Layout,
      title: 'Create & Manage Projects',
      description: 'Launch new projects, set goals, and oversee everything from one central dashboard',
      items: [
        'Create unlimited projects with custom workflows',
        'Set deadlines, milestones, and project priorities',
        'Monitor project health with real-time analytics'
      ]
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Add members, assign roles, and build high-performing teams',
      items: [
        'Invite team members with custom permissions',
        'Track individual and team performance',
        'Manage workload distribution efficiently'
      ]
    },
    {
      icon: Target,
      title: 'Task Assignment',
      description: 'Delegate tasks strategically and keep everyone on track',
      items: [
        'Assign tasks to specific team members instantly',
        'Set task priorities and dependencies',
        'Get notified when tasks are completed'
      ]
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Get insights into project progress and team productivity',
      items: [
        'View detailed project and task analytics',
        'Generate comprehensive performance reports',
        'Identify bottlenecks and optimize workflows'
      ]
    }
  ];

  const memberFeatures = [
    {
      icon: FileText,
      title: 'View Your Projects',
      description: 'Access all projects you\'re part of in one organized place',
      items: [
        'See all your assigned projects at a glance',
        'Understand project goals and timelines',
        'Stay updated with project announcements'
      ]
    },
    {
      icon: CheckCircle2,
      title: 'Manage Your Tasks',
      description: 'View, organize, and prioritize tasks assigned to you',
      items: [
        'See all tasks assigned specifically to you',
        'Filter by priority, deadline, and status',
        'Add notes and attachments to tasks'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Update Task Progress',
      description: 'Keep everyone informed with real-time status updates',
      items: [
        'Move tasks from Pending → In Progress → Completed',
        'Add progress notes and completion details',
        'Notify admins automatically when tasks complete'
      ]
    },
    {
      icon: MessageSquare,
      title: 'Collaborate Seamlessly',
      description: 'Work together with your team effectively',
      items: [
        'Comment on tasks and projects',
        'Tag team members for quick communication',
        'Share files and resources with the team'
      ]
    }
  ];

  const currentFeatures = activeTab === 'admin' ? adminFeatures : memberFeatures;
  const gradientClass = activeTab === 'admin' ? 'from-primary to-accent' : 'from-accent to-secondary';

  return (
    <section id="roles" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
         
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for Every Team Member
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're leading or collaborating, TaskFlow adapts to your role
          </p>
        </div>

        {/* Role Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-card rounded-lg p-1 inline-flex shadow-md border border-border">
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-8 py-3 rounded-md transition-all font-medium ${
                activeTab === 'admin'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setActiveTab('member')}
              className={`px-8 py-3 rounded-md transition-all font-medium ${
                activeTab === 'member'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Team Member
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {currentFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className={`bg-card ${activeTab === 'admin' ? 'border-primary/20 hover:border-primary/50' : 'border-accent/30 hover:border-accent/60'} hover:shadow-xl transition-all`}>
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-br ${gradientClass} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-foreground text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}