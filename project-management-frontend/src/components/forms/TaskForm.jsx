'use client';
import { Formik, Form, Field } from 'formik';
import { taskSchema } from '@/lib/utils/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTasks } from '@/hooks/useTasks';
import { useMembers } from '@/hooks/useMembers';
import { TASK_STATUS, TASK_STATUS_LABELS } from '@/lib/utils/constants';
import { useParams } from 'next/navigation';

export const TaskForm = ({ initialData, onSuccess }) => {
  const params = useParams();
  const projectId = params.id;
  const { createTask, updateTask, isCreating, isUpdating } = useTasks(projectId);
  const { availableMembers, isLoading: isMembersLoading } = useMembers();

  const isEditMode = !!initialData;

  const initialValues = initialData || {
    title: '',
    description: '',
    status: TASK_STATUS.PENDING,
    due_date: '',
    assigned_to: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    const result = isEditMode
      ? await updateTask(initialData.id, values)
      : await createTask(values);

    if (result.success) {
      resetForm();
      onSuccess?.();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={taskSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Field
              as={Input}
              id="title"
              name="title"
              placeholder="Design Homepage"
              className={errors.title && touched.title ? 'border-destructive' : ''}
            />
            {errors.title && touched.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Field
              as={Textarea}
              id="description"
              name="description"
              placeholder="Describe the task..."
              rows={4}
              className={errors.description && touched.description ? 'border-destructive' : ''}
            />
            {errors.description && touched.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={values.status}
                onValueChange={(value) => setFieldValue('status', value)}
              >
                <SelectTrigger className={errors.status && touched.status ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TASK_STATUS).map(([key, value]) => (
                    <SelectItem key={value} value={value}>
                      {TASK_STATUS_LABELS[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status && touched.status && (
                <p className="text-sm text-destructive">{errors.status}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date</Label>
              <Field
                as={Input}
                id="due_date"
                name="due_date"
                type="datetime-local"
                className={errors.due_date && touched.due_date ? 'border-destructive' : ''}
              />
              {errors.due_date && touched.due_date && (
                <p className="text-sm text-destructive">{errors.due_date}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assigned_to">Assign To</Label>
            <Select
              value={values.assigned_to?.toString()}
              onValueChange={(value) => setFieldValue('assigned_to', parseInt(value))}
              disabled={isMembersLoading}
            >
              <SelectTrigger className={errors.assigned_to && touched.assigned_to ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select a member" />
              </SelectTrigger>
              <SelectContent>
                {availableMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id.toString()}>
                    {member.name} ({member.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.assigned_to && touched.assigned_to && (
              <p className="text-sm text-destructive">{errors.assigned_to}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating
                ? isEditMode ? 'Updating...' : 'Creating...'
                : isEditMode ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};