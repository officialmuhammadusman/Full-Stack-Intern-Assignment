'use client';
import { Formik, Form, Field } from 'formik';
import { projectSchema } from '@/lib/utils/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProjects } from '@/hooks/useProjects';

export const ProjectForm = ({ onSuccess }) => {
  const { createProject, isCreating } = useProjects();

  const initialValues = {
    name: '',
    description: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    const result = await createProject(values);
    if (result.success) {
      resetForm();
      onSuccess?.();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={projectSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Field
              as={Input}
              id="name"
              name="name"
              placeholder="E-commerce Website"
              className={errors.name && touched.name ? 'border-destructive' : ''}
            />
            {errors.name && touched.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Field
              as={Textarea}
              id="description"
              name="description"
              placeholder="Describe your project..."
              rows={4}
              className={errors.description && touched.description ? 'border-destructive' : ''}
            />
            {errors.description && touched.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
