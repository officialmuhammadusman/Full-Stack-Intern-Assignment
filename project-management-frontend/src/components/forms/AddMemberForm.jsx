'use client';
import { Formik, Form } from 'formik';
import { addMemberSchema } from '@/lib/utils/validation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProjects } from '@/hooks/useProjects';
import { useMembers } from '@/hooks/useMembers';
import { useParams } from 'next/navigation';

export const AddMemberForm = ({ onSuccess }) => {
  const params = useParams();
  const projectId = params.id;
  const { addMember, isAddingMember } = useProjects();
  const { availableMembers, isLoading: isMembersLoading } = useMembers();

  const initialValues = {
    user_id: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    const result = await addMember(projectId, values.user_id);
    if (result.success) {
      resetForm();
      onSuccess?.();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addMemberSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user_id">Select Member</Label>
            <Select
              value={values.user_id?.toString()}
              onValueChange={(value) => setFieldValue('user_id', parseInt(value))}
              disabled={isMembersLoading}
            >
              <SelectTrigger className={errors.user_id && touched.user_id ? 'border-destructive' : ''}>
                <SelectValue placeholder="Choose a user" />
              </SelectTrigger>
              <SelectContent>
                {availableMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id.toString()}>
                    {member.name} ({member.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.user_id && touched.user_id && (
              <p className="text-sm text-destructive">{errors.user_id}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isAddingMember || isMembersLoading}>
              {isAddingMember ? 'Adding...' : 'Add Member'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};