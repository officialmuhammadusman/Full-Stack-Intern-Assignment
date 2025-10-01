'use client';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useMembers } from '@/hooks/useMembers';
import { AddMemberForm } from '@/components/forms/AddMemberForm';
import { MemberCard } from '@/components/cards/MemberCard';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AddMembersPage() {
  const router = useRouter();
  const params = useParams();
  const { isAdmin } = useAuth();
  const { users, isLoading } = useMembers();

  useEffect(() => {
    if (!isAdmin) {
      router.push(`/projects/${params.id}/tasks`);
    }
  }, [isAdmin, router, params.id]);

  if (!isAdmin) return null;

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[400px]" />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <h1 className="text-3xl font-bold mb-8">Add Team Members</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Member</CardTitle>
            <CardDescription>Select a user to add to this project</CardDescription>
          </CardHeader>
          <CardContent>
            <AddMemberForm />
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          <div className="space-y-3">
            {users.map((user) => (
              <MemberCard key={user.id} member={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
