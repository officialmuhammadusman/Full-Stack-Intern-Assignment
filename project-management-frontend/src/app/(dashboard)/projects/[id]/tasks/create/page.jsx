'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import { useMembers } from '@/hooks/useMembers';
import { TaskForm } from '@/components/forms/TaskForm';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateTaskPage() {
  const params = useParams();
  const router = useRouter();
  const { projectId } = params;
  const { isAdmin, isAuthenticated } = useAuth();
  const { createTask, isCreating } = useTasks(projectId);
  const { availableMembers, isLoading: membersLoading } = useMembers();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (!isAdmin) {
      router.push(`/projects/${projectId}/tasks`);
    }
  }, [isAuthenticated, isAdmin, projectId, router]);

  if (!isAuthenticated || !isAdmin) {
    return <LoadingSpinner />;
  }

  const handleSubmit = async (formData) => {
    const { success } = await createTask({
      title: formData.title,
      description: formData.description,
      status: formData.status,
      due_date: formData.due_date,
      assigned_to: parseInt(formData.assigned_to),
    });
    if (success) {
      router.push(`/projects/${projectId}/tasks`);
    }
  };

  if (membersLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Task</CardTitle>
          <CardDescription>
            Assign a task to a project member for {availableMembers.find(m => m.id === parseInt(availableMembers[0]?.id))?.name || 'a member'}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm
            onSubmit={handleSubmit}
            isLoading={isCreating}
            members={availableMembers}
            defaultValues={{ status: 'pending' }}
          />
         
          
        </CardContent>
      </Card>
    </div>
  );
}