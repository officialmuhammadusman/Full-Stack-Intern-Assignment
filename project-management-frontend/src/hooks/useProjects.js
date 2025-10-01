import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setCurrentProject } from '@/lib/redux/slices/projectsSlice';
import {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useAddMemberToProjectMutation,
} from '@/lib/redux/services/projectsApi';
import { toast } from 'sonner';

export const useProjects = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { data: projectsData, isLoading, error, refetch } = useGetAllProjectsQuery();
  const [createProjectMutation, { isLoading: isCreating }] = useCreateProjectMutation();
  const [addMemberMutation, { isLoading: isAddingMember }] = useAddMemberToProjectMutation();

  const projects = projectsData?.projects || [];

  const createProject = async (projectData) => {
    try {
      const response = await createProjectMutation(projectData).unwrap();
      toast.success('Project created successfully!');
      router.push(`/projects/${response.project.id}`);
      return { success: true, data: response.project };
    } catch (error) {
      const message = error?.data?.message || 'Failed to create project.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const addMember = async (projectId, userId) => {
    try {
      const response = await addMemberMutation({ projectId, user_id: userId }).unwrap();
      toast.success('Member added successfully!');
      return { success: true, data: response.project };
    } catch (error) {
      const message = error?.data?.message || 'Failed to add member.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const selectProject = (project) => {
    dispatch(setCurrentProject(project));
    router.push(`/projects/${project.id}/tasks`);
  };

  return {
    projects,
    isLoading,
    error,
    isCreating,
    isAddingMember,
    createProject,
    addMember,
    selectProject,
    refetch,
  };
};