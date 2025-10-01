# TaskFlow - Project Management System

A modern, full-featured project management application built with **Next.js 15**, designed for efficient team collaboration and task tracking.

---

## Overview

TaskFlow is a comprehensive project management solution that enables teams to organize projects, manage tasks, and collaborate effectively. The application features role-based access control, and an intuitive user interface optimized for productivity.

---

## Features

### Core Functionality

- User authentication and authorization with role-based access control
- Project creation and management
- Task assignment and tracking with status updates
- Team member management and collaboration
- Responsive design for desktop and mobile devices
- Theme switching (light and dark modes)

### User Roles

- **Admin:** Full access to create projects, manage tasks, and add team members
- **Member:** View assigned projects and update task status

### Project Management

- Create and organize multiple projects
- Assign tasks to team members
- Track task progress with status indicators (**Pending, In Progress, Completed**)
- Quick actions for common operations
- Project-specific navigation and filtering

---

## Technology Stack

### Frontend Framework

- **Next.js 15:** React framework with App Router for server-side rendering and routing  
- **Tailwind CSS 4:** Utility-first CSS framework for styling  

### UI Components

- **shadcn/ui:** Pre-built, customizable component library  
- **Lucide React:** Icon library for consistent iconography  

### Development Tools

- **ESLint:** Code linting and quality assurance  
 
- **RTK Query:** For API state management and server interaction  

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher  
- npm, yarn, or pnpm package manager  

### Installation

Clone the repository:

```bash
git clone https://github.com/officialmuhammadusman/Full-Stack-Intern-Assignment.git
cd FrontendTask/project-management-frontend
npm install
cp .env.example .env.local
NEXT_PUBLIC_API_URL=your_api_endpoint
npm run dev


