'use client';
import { Formik, Form, Field } from 'formik';
import { registerSchema } from '@/lib/utils/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export const RegisterForm = () => {
  const { register, isRegisterLoading } = useAuth();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = async (values) => {
    await register(values);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Get started with TaskFlow today</CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className={errors.name && touched.name ? 'border-destructive' : ''}
                />
                {errors.name && touched.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className={errors.email && touched.email ? 'border-destructive' : ''}
                />
                {errors.email && touched.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className={errors.password && touched.password ? 'border-destructive' : ''}
                />
                {errors.password && touched.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isRegisterLoading}>
                {isRegisterLoading ? 'Creating account...' : 'Create Account'}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};