'use client';

import { useProjects } from '@/hooks/useProjects';
import { useAuth } from '@/hooks/useAuth';
import { FolderKanban, Users, CheckSquare, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AdminOnly } from '@/components/layout/RoleBasedUI';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { useEffect } from 'react';

export default function ProjectsPage() {
  const { projects, isLoading, error, refetch } = useProjects();
  const { isAdmin, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      refetch(); // Refetch on auth change or role detection to ensure fresh data
    }
  }, [isAuthenticated, isAdmin, refetch]);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login'; // Hard redirect for protection
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; // Or loading spinner
  }

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Loading projects...</div>;
  }

  // Handle errors: for non-admins, 403 means no access/projects, show empty; for admins, show error/retry
  if (error) {
    if (error.status === 403 && !isAdmin) {
      return (
        <EmptyState
          title="No Projects"
          description="You haven't been assigned to any projects yet. Contact your admin."
        />
      );
    } else {
      return (
        <ErrorMessage
          title="Failed to load projects"
          message="There was an error loading projects. Please try again."
          onRetry={refetch}
        />
      );
    }
  }

  // For admins, if no projects, encourage creation; for members, show message
  const showNoProjects = projects.length === 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isAdmin ? 'All Projects' : 'My Projects'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isAdmin ? 'Manage all projects in the system' : 'Projects you\'re assigned to'}
          </p>
        </div>
        
        <AdminOnly>
          <Button asChild>
            <Link href="/projects/create" className="gap-2">
              <Plus className="w-4 h-4" />
              Create Project
            </Link>
          </Button>
        </AdminOnly>
      </div>

      {showNoProjects ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <FolderKanban className="w-16 h-16 text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No projects yet
          </h3>
          <p className="text-muted-foreground mb-4">
            {isAdmin 
              ? 'Get started by creating your first project' 
              : 'You haven\'t been assigned to any projects yet'}
          </p>
          <AdminOnly>
            <Button asChild className="mt-4">
              <Link href="/projects/create">Create Project</Link>
            </Button>
          </AdminOnly>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${isAdmin ? 'bg-primary/10' : 'bg-secondary/10'} rounded-lg flex items-center justify-center`}>
                  <FolderKanban className={`w-6 h-6 ${isAdmin ? 'text-primary' : 'text-secondary'}`} />
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-foreground mb-2">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{project.users?.length || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckSquare className="w-4 h-4" />
                  <span>0</span> {/* Tasks count not available in project response; fetch separately if needed */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}