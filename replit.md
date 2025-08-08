# replit.md

## Overview

KBE (Kaun Banega Einstein) is a young scientist competition platform designed to inspire and nurture scientific minds among students from grades V to XII+. The application provides a comprehensive platform for students to participate in science competitions, access training programs, and compete for prizes including ISRO tours, scientific equipment, and scholarships. The platform features a modern web interface with exam registration, contact forms, training programs, and a gallery showcasing student achievements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using **React with TypeScript** and follows a component-based architecture:

- **UI Framework**: React 18 with TypeScript for type safety and modern development practices
- **Styling**: Tailwind CSS with a custom design system featuring KBE brand colors (blue, purple, orange, emerald)
- **Component Library**: Radix UI primitives with shadcn/ui components for consistent, accessible interface elements
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for robust form management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
The server-side follows a **REST API architecture** using Express.js:

- **Framework**: Express.js with TypeScript for the web server
- **API Design**: RESTful endpoints for contacts and exam registrations
- **Data Validation**: Zod schemas for request/response validation
- **Storage Layer**: Abstracted storage interface with in-memory implementation (IStorage pattern)
- **Development Setup**: Vite middleware integration for hot module replacement during development

### Data Storage Solutions
The application implements a **flexible storage architecture**:

- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL configured via Neon Database serverless
- **Schema Management**: Centralized schema definitions in `shared/schema.ts` with Zod validation
- **Migration Strategy**: Drizzle Kit for database migrations and schema changes
- **Current Implementation**: In-memory storage for development with easy database switching capability

### Database Schema Design
The data model consists of three main entities:

- **Users**: Basic user management with username/password authentication
- **Contacts**: Contact form submissions with student information and messages
- **Registrations**: Exam registrations supporting both mains and advance exam types with payment tracking

### API Structure
RESTful API endpoints organized by resource:

- **POST /api/contacts**: Contact form submission
- **GET /api/contacts**: Retrieve all contacts (admin)
- **POST /api/registrations**: Exam registration submission
- **GET /api/registrations**: Retrieve all registrations (admin)

### Authentication and Authorization
Currently implements a **basic foundation** for user management:

- User schema defined with username/password fields
- Storage interface includes user management methods
- Ready for implementation of session-based or JWT authentication
- Admin endpoints exist but lack access control implementation

## External Dependencies

### Database and Cloud Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Environment Configuration**: DATABASE_URL for database connectivity

### UI and Design Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Lucide React**: Icon library for consistent iconography

### Development and Build Tools
- **Vite**: Fast build tool with HMR support and development server
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer

### Form and Validation Libraries
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### State Management and API
- **TanStack Query**: Server state management with caching and synchronization
- **Wouter**: Lightweight routing library for single-page application navigation

### Development Environment
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Runtime Error Overlay**: Development error handling and debugging
- **Cartographer**: Replit-specific development tooling