'use client';

import { useAuth } from '@/hooks/useAuth';

export function AdminOnly({ children, fallback = null }) {
  const { isAdmin } = useAuth();
  return isAdmin ? <>{children}</> : <>{fallback}</>;
}

export function UserOnly({ children, fallback = null }) {
  const { isAdmin } = useAuth();
  return !isAdmin ? <>{children}</> : <>{fallback}</>;
}

export function RoleBasedRender({ adminContent, userContent }) {
  const { isAdmin } = useAuth();
  return isAdmin ? <>{adminContent}</> : <>{userContent}</>;
}