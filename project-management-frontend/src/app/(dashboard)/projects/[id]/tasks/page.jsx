'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import { useMembers } from '@/hooks/useMembers';
import { TaskCard } from '@/components/cards/TaskCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, RefreshCw } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { EmptyState } from '@/components/shared/EmptyState';

export default function ProjectTasksPage() {
  const params = useParams();
  const router = useRouter();
  const { projectId } = params;
  const { isAdmin, isAuthenticated } = useAuth();
  const { tasks, filteredTasks, isLoading, error, refetch, updateTaskStatus, deleteTask } = useTasks(projectId);
  const { getUserName, isLoading: membersLoading } = useMembers();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }

  if (isLoading || membersLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  const handleStatusUpdate = async (taskId, status) => {
    const { success } = await updateTaskStatus(taskId, status);
    if (success) {
      refetch();
    }
  };

  const handleDelete = async (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      const { success } = await deleteTask(taskId);
      if (success) {
        refetch();
      }
    }
  };

  const displayedTasks = filteredTasks.length > 0 ? filteredTasks : tasks;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Project Tasks</h1>
          <p className="text-muted-foreground">Manage tasks for this project</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={refetch} disabled={isLoading}>
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          {isAdmin && (
            <Button onClick={() => router.push(`/projects/${projectId}/tasks/create`)}>
              <Plus className="w-4 h-4 mr-2" /> Create Task
            </Button>
          )}
        </div>
      </div>

      {displayedTasks.length === 0 ? (
        <EmptyState
          title="No Tasks Yet"
          description={isAdmin ? "Create the first task to get started." : "No tasks assigned to you."}
          action={isAdmin ? <Button onClick={() => router.push(`/projects/${projectId}/tasks/create`)}>Create Task</Button> : null}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Task List ({displayedTasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {displayedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  assignedUserName={getUserName(task.assigned_to)}
                  onStatusUpdate={handleStatusUpdate}
                  onDelete={isAdmin ? () => handleDelete(task.id) : null}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}