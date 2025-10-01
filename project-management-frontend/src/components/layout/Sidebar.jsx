// src/components/layout/Sidebar.jsx (FIXED VERSION)
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useProjects } from '@/hooks/useProjects';
import { 
  FolderKanban, 
  ListTodo, 
  Users, 
  UserPlus,
  Plus,
  LogOut,
  ChevronRight,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getInitials } from '@/lib/utils/helpers';

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, logout } = useAuth();
  const { projects } = useProjects();
  
  // State for selected project for quick actions
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Auto-select first project when projects load
  useEffect(() => {
    if (projects && projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  // Common navigation items for all users
  const commonNavItems = [
    {
      href: '/projects',
      label: 'All Projects',
      icon: FolderKanban,
      description: 'View all projects',
    },
  ];

  // Admin-only navigation items
  const adminNavItems = [
    {
      href: '/projects/create',
      label: 'Create Project',
      icon: Plus,
      description: 'Start a new project',
    },
  ];

  // Admin Quick Actions - Now Clickable with Selected Project!
  const adminQuickActions = [
    {
      label: 'Manage Tasks',
      icon: ListTodo,
      action: () => {
        if (selectedProjectId) {
          router.push(`/projects/${selectedProjectId}/tasks`);
        } else {
          router.push('/projects');
        }
      },
      description: 'View and manage tasks',
      requiresProject: true,
    },
    {
      label: 'Create Task',
      icon: Plus,
      action: () => {
        if (selectedProjectId) {
          router.push(`/projects/${selectedProjectId}/tasks/create`);
        } else {
          router.push('/projects');
        }
      },
      description: 'Add a new task',
      requiresProject: true,
    },
    {
      label: 'Add Members',
      icon: UserPlus,
      action: () => {
        if (selectedProjectId) {
          router.push(`/projects/${selectedProjectId}/members`);
        } else {
          router.push('/projects');
        }
      },
      description: 'Add team members',
      requiresProject: true,
    },
  ];

  // Combine navigation based on role
  const navigationItems = isAdmin 
    ? [...commonNavItems, ...adminNavItems] 
    : commonNavItems;

  return (
    <aside className="hidden lg:flex flex-col w-72 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* User Profile Section */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        {isAdmin && (
          <div className="mt-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Admin
            </span>
          </div>
        )}
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="mb-4">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Navigation
          </h3>
        </div>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-start space-x-3 px-3 py-2.5 rounded-lg transition-all group',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <Icon className={cn(
                'h-5 w-5 mt-0.5 flex-shrink-0',
                isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
              )} />
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'text-sm font-medium',
                  isActive ? 'text-primary-foreground' : ''
                )}>
                  {item.label}
                </p>
                {item.description && (
                  <p className={cn(
                    'text-xs mt-0.5',
                    isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  )}>
                    {item.description}
                  </p>
                )}
              </div>
            </Link>
          );
        })}

        {/* Admin Quick Actions Section */}
        {isAdmin && (
          <>
            <Separator className="my-4" />
            <div className="mb-2">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Quick Actions
              </h3>
            </div>
            
            {/* Project Selector */}
            {projects && projects.length > 0 ? (
              <>
                <div className="px-3 mb-3">
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    Select Project
                  </label>
                  <Select
                    value={selectedProjectId?.toString() || ''}
                    onValueChange={(value) => setSelectedProjectId(Number(value))}
                  >
                    <SelectTrigger className="w-full h-8 text-xs">
                      <SelectValue placeholder="Choose project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem 
                          key={project.id} 
                          value={project.id.toString()}
                          className="text-xs"
                        >
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quick Action Buttons */}
                <div className="space-y-1">
                  {adminQuickActions.map((action, index) => {
                    const Icon = action.icon;
                    const isDisabled = action.requiresProject && !selectedProjectId;
                    
                    return (
                      <button
                        key={index}
                        onClick={action.action}
                        disabled={isDisabled}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all group",
                          isDisabled 
                            ? "text-muted-foreground/50 cursor-not-allowed"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          <span>{action.label}</span>
                        </div>
                        <ChevronRight className={cn(
                          "h-3.5 w-3.5 transition-opacity",
                          isDisabled ? "opacity-0" : "opacity-0 group-hover:opacity-100"
                        )} />
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="px-3 py-4 text-center">
                <FolderKanban className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-xs text-muted-foreground mb-3">
                  No projects yet. Create one to use quick actions.
                </p>
                <Link href="/projects/create">
                  <Button size="sm" variant="outline" className="w-full">
                    <Plus className="h-3.5 w-3.5 mr-2" />
                    Create Project
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}

        {/* Member View Info */}
        {!isAdmin && (
          <>
            <Separator className="my-4" />
            <div className="px-3 py-2 bg-secondary/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Your Role</p>
              <p className="text-sm font-medium">Team Member</p>
              <p className="text-xs text-muted-foreground mt-1">
                You can view projects and update assigned tasks
              </p>
            </div>
          </>
        )}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
};