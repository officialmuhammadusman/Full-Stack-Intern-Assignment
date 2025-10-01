import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setCurrentTask } from '@/lib/redux/slices/tasksSlice';
import {
  useGetProjectTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '@/lib/redux/services/tasksApi';
import { toast } from 'sonner';

export const useTasks = (projectId) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.tasks);
  
  const { data: tasksData, isLoading, error, refetch } = useGetProjectTasksQuery(projectId, {
    skip: !projectId,
  });
  
  const [createTaskMutation, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTaskMutation, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTaskMutation, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const tasks = tasksData?.tasks || [];

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filters.status === 'all' || task.status === filters.status;
    const assignedToMatch = filters.assignedTo === 'all' || task.assigned_to === parseInt(filters.assignedTo);
    return statusMatch && assignedToMatch;
  });

  const createTask = async (taskData) => {
    try {
      const response = await createTaskMutation({ projectId, taskData }).unwrap();
      toast.success('Task created successfully!');
      router.push(`/projects/${projectId}/tasks`);
      return { success: true, data: response.task };
    } catch (error) {
      const message = error?.data?.message || 'Failed to create task.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      const response = await updateTaskMutation({ projectId, taskId, taskData }).unwrap();
      toast.success('Task updated successfully!');
      return { success: true, data: response.task };
    } catch (error) {
      const message = error?.data?.message || 'Failed to update task.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await updateTaskMutation({ projectId, taskId, taskData: { status } }).unwrap();
      toast.success('Task status updated!');
      return { success: true };
    } catch (error) {
      const message = error?.data?.message || 'Failed to update status.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteTaskMutation({ projectId, taskId }).unwrap();
      toast.success('Task deleted successfully!');
      return { success: true };
    } catch (error) {
      const message = error?.data?.message || 'Failed to delete task.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const selectTask = (task) => {
    dispatch(setCurrentTask(task));
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return {
    tasks,
    filteredTasks,
    isLoading,
    error,
    isCreating,
    isUpdating,
    isDeleting,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    selectTask,
    getTasksByStatus,
    refetch,
  };
};