import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setCredentials, logout as logoutAction } from '@/lib/redux/slices/authSlice';
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from '@/lib/redux/services/authApi';
import { toast } from 'sonner';

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();

  const login = async (credentials) => {
    try {
      const response = await loginMutation(credentials).unwrap();
      
      dispatch(setCredentials({
        user: response.user,
        token: response.token,
      }));
      
      toast.success('Login successful!');
      router.push('/projects');
      return { success: true };
    } catch (error) {
      const message = error?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (credentials) => {
    try {
      const response = await registerMutation(credentials).unwrap();
      
      dispatch(setCredentials({
        user: response.user,
        token: response.token,
      }));
      
      toast.success('Registration successful!');
      router.push('/projects');
      return { success: true };
    } catch (error) {
      const message = error?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      // Clear Redux state and localStorage first
      dispatch(logoutAction());
      
      // Try to call logout API (but don't let it block navigation)
      logoutMutation().catch((error) => {
        console.error('Logout API call failed:', error);
      });
      
      toast.success('Logged out successfully');
      
      // Force navigation to home page
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      
      router.push('/');
      router.refresh();
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return {
    user,
    token,
    isAuthenticated,
    isAdmin: isAdmin(),
    login,
    register,
    logout,
    isLoginLoading,
    isRegisterLoading,
  };
};