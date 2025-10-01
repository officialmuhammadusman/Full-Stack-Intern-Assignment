// src/lib/utils/validation.js
// Copy this ENTIRE file to: src/lib/utils/validation.js

import * as Yup from 'yup';

// Register Form Validation
export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Login Form Validation
export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

// Project Form Validation
export const projectSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Project name must be at least 3 characters')
    .max(100, 'Project name must not exceed 100 characters')
    .required('Project name is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
    .required('Description is required'),
});

// Task Form Validation
export const taskSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters')
    .required('Description is required'),
  status: Yup.string()
    .oneOf(['pending', 'in_progress', 'completed'], 'Invalid status')
    .required('Status is required'),
  due_date: Yup.date()
    .required('Due date is required')
    .min(new Date(), 'Due date must be in the future'),
  assigned_to: Yup.number()
    .required('Please assign this task to a user')
    .positive('Invalid user selection')
    .integer('Invalid user selection'),
});

// Add Member Form Validation
export const addMemberSchema = Yup.object({
  user_id: Yup.number()
    .required('Please select a user')
    .positive('Invalid user selection')
    .integer('Invalid user selection'),
});