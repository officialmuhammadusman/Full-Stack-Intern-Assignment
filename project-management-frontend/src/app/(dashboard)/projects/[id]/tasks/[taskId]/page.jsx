'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import { TaskForm } from '@/components/forms/TaskForm';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const { isAdmin } = useAuth();
  const projectId = params.id;
  const taskId = params.taskId;
  const { tasks, isLoading, updateTask, refetch } = useTasks(projectId);
  const [currentTask, setCurrentTask] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      router.push(`/projects/${projectId}/tasks`);
    }
  }, [isAdmin, router, projectId]);

  useEffect(() => {
    if (tasks.length > 0 && taskId) {
      const task = tasks.find((t) => t.id === parseInt(taskId));
      if (task) {
        setCurrentTask({
          ...task,
          due_date: task.due_date ? new Date(task.due_date).toISOString().slice(0, 16) : '',
        });
      } else {
        router.push(`/projects/${projectId}/tasks`); // Redirect if task not found
      }
    }
  }, [tasks, taskId, projectId, router]);

  if (!isAdmin || isLoading || !currentTask) {
    return <LoadingSpinner size="lg" className="min-h-[400px]" />;
  }

  const handleSubmit = async (formData) => {
    setIsUpdating(true);
    try {
      const { success } = await updateTask(taskId, {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        due_date: formData.due_date,
        assigned_to: parseInt(formData.assigned_to),
      });
      if (success) {
        toast.success('Task updated successfully!');
        await refetch(); // Refetch to update cache
        router.replace(`/projects/${projectId}`); // Redirect to project details page (dashboard/project/[id]/page.jsx)
      }
    } catch (error) {
      toast.error('Failed to update task. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <h1 className="text-3xl font-bold mb-8">Edit Task</h1>
      <Card>
        <CardHeader>
          <CardTitle>Update Task Details</CardTitle>
          <CardDescription>Modify the task information below</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm 
            initialData={currentTask} 
            onSubmit={handleSubmit}
            isLoading={isUpdating}
          />
        </CardContent>
      </Card>
    </div>
  );
}