# 📋 Smarter Tasks - Project Management Application

> A comprehensive, full-featured project management web application built with modern React ecosystem, enabling teams to efficiently organize projects, manage tasks, and collaborate seamlessly.

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

## 🚀 Tech Stack

### Frontend Framework & Language
- **React 18** with **TypeScript** for type-safe, component-based development
- **Vite** for lightning-fast development and optimized production builds

### State Management
- **React Context API** with custom hooks for global state management
- **useReducer** for complex state logic across Projects, Tasks, Members, and Comments
- Custom dispatchers for organized action handling

### UI/UX
- **TailwindCSS** for utility-first styling and responsive design
- **Headless UI** for accessible, unstyled UI components (Dialog, Menu, Listbox, Switch, Transition)
- **Heroicons** for consistent iconography
- **Dark mode** support with theme context

### Form Handling
- **React Hook Form** for performant, flexible form validation and management

### Routing
- **React Router v6** for declarative, nested routing with protected routes
- Lazy loading for optimized code splitting

### Drag & Drop
- **@hello-pangea/dnd** (React Beautiful DnD) for intuitive task board interactions

### PWA Features
- **Vite PWA Plugin** for Progressive Web App capabilities
- **Service Worker** with Workbox for offline functionality
- Custom manifest with theme support

### Code Quality
- **ESLint** with TypeScript support for code consistency
- Strict TypeScript configuration for type safety

### Deployment
- **Netlify** for seamless CI/CD and hosting

## 🎯 Key Features

### 📊 Project Management
- ✅ Create, edit, and organize multiple projects
- ✅ Real-time project status tracking
- ✅ Project-specific task boards

### 📝 Task Management
- ✅ Kanban-style task boards with drag-and-drop functionality
- ✅ Three-column workflow: **Pending** → **In Progress** → **Done**
- ✅ Task assignments with member allocation
- ✅ Due date tracking
- ✅ Rich task descriptions and details
- ✅ Task creation, editing, and deletion

### 👥 Team Collaboration
- ✅ Member management system
- ✅ User authentication and authorization
- ✅ Role-based access control
- ✅ Comment system for task discussions
- ✅ Member profile management

### 💫 User Experience
- ✅ Responsive design for all device sizes
- ✅ Dark/Light theme toggle with persistence
- ✅ Protected routes for authenticated users
- ✅ Error boundaries for graceful error handling
- ✅ Suspense-based lazy loading with loading states
- ✅ Toast notifications for user feedback

## 🏗️ Architecture Highlights

### State Management Pattern
```typescript
// Centralized state with Context API
- Reducer pattern for predictable state updates
- Custom hooks (useProjectsState, useTasksDispatch, etc.)
- Separation of concerns with dedicated action creators
