'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FolderKanban, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils/helpers';

export const ProjectCard = ({ project, onSelect }) => {
  const taskCount = project.tasks?.length || 0;
  const memberCount = project.members?.length || 0;

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onSelect(project)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FolderKanban className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl text-foreground">{project.name}</CardTitle>
              <CardDescription className="mt-1 text-muted-foreground">
                Created {formatDate(project.created_at)}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Badge variant="secondary">{taskCount} Tasks</Badge>
            <Badge variant="outline">{memberCount} Members</Badge>
          </div>
          <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};