'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useAuth } from '@/hooks/useAuth';
import { TaskCard } from '@/components/cards/TaskCard';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Users, ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function TasksPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id;
  const { isAdmin } = useAuth();
  const { 
    filteredTasks, 
    isLoading, 
    error, 
    updateTaskStatus, 
    deleteTask,
    refetch 
  } = useTasks(projectId);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [deletingTaskName, setDeletingTaskName] = useState('');

  const handleEdit = (task) => {
    router.push(`/projects/${projectId}/tasks/${task.id}`);
  };

  const handleDeleteClick = (taskId, taskName) => {
    setDeletingTaskId(taskId);
    setDeletingTaskName(taskName);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingTaskId) {
      await deleteTask(deletingTaskId);
      refetch();
    }
    setIsDeleteModalOpen(false);
    setDeletingTaskId(null);
    setDeletingTaskName('');
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeletingTaskId(null);
    setDeletingTaskName('');
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[400px]" />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load tasks"
        message="There was an error loading tasks. Please try again."
        onRetry={refetch}
      />
    );
  }

  return (
    <div>
      <Button variant="ghost" onClick={() => router.push('/projects')} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Projects
      </Button>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground mt-2">Manage project tasks and assignments</p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <>
              <Link href={`/projects/${projectId}/members`}>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Add Members
                </Button>
              </Link>
              <Link href={`/projects/${projectId}/tasks/create`}>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Task
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          description="Create your first task to get started"
          action={
            isAdmin && (
              <Link href={`/projects/${projectId}/tasks/create`}>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              </Link>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={(taskId) => handleDeleteClick(taskId, task.title)} // Pass taskId and name to modal
              onStatusChange={updateTaskStatus}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              Delete Task
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the task "<strong>{deletingTaskName}</strong>"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}