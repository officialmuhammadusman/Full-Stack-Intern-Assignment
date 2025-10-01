import { useGetAllUsersQuery } from '@/lib/redux/services/usersApi';

export const useMembers = () => {
  const { data: usersData, isLoading, error, refetch } = useGetAllUsersQuery();

  const users = usersData?.users || [];
  
  const availableMembers = users.filter((user) => user.role !== 'admin');

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const getUserName = (userId) => {
    const user = getUserById(userId);
    return user?.name || 'Unknown User';
  };

  return {
    users,
    availableMembers,
    isLoading,
    error,
    getUserById,
    getUserName,
    refetch,
  };
};