// src/app/(dashboard)/layout.jsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { DashboardNav } from '@/components/layout/DashboardNav';
import { Sidebar } from '@/components/layout/Sidebar';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useGetAllProjectsQuery } from '@/lib/redux/services/projectsApi';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Fetch projects via RTK Query (no axios)
  const { data: projectsData, isLoading, error } = useGetAllProjectsQuery();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Loading state (projects fetch)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load projects.
      </div>
    );
  }

  const projects = projectsData?.data || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation Bar */}
      <DashboardNav />

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1">
        {/* Pass projects into Sidebar */}
        <Sidebar projects={projects} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
