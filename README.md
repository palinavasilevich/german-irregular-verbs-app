# Mighty Verbs

**Mighty Verbs** is a modern full-stack web application for learning
German irregular verbs.\
The project focuses on clean architecture, scalable structure, and a
distraction-free learning experience.

------------------------------------------------------------------------

## ✨ Features

-   📚 Browse German irregular verbs\
-   🔍 Filter verbs via query parameters\
-   🧠 Interactive training mode\
-   ⚡ Fast and responsive UI\
-   🔄 Cached and optimized data fetching\
-   🎯 Minimalistic, focused design

------------------------------------------------------------------------

# 🖥 Frontend

The frontend is built as a modern React SPA with a strong focus on
scalability and maintainability.

## 🚀 Tech Stack

-   React\
-   TypeScript\
-   Vite\
-   Tailwind CSS\
-   Zustand\
-   @tanstack/react-query\
-   React Router\
-   Fetch API

------------------------------------------------------------------------

## 🧠 State Management Approach

### Client State (Zustand)

-   Training mode settings\
-   UI state\
-   Local progress

### Server State (React Query)

-   Fetching verbs\
-   Caching responses\
-   Background refetching\
-   Loading & error handling

This separation improves predictability, testability, and scalability.

------------------------------------------------------------------------

## 🏗 Frontend Architecture

    src/
     ├── app/            # App configuration and global providers 
     ├── entries/        # Application bootstrap & routing setup
     ├── features/       # Feature-based modules
     ├── pages/          # Route-level pages
     ├── shared/         # Shared UI components, hooks, utilities

### Architectural Principles

-   Feature-based structure\
-   Clear separation of concerns\
-   Strong typing across layers\
-   Reusable and composable components\
-   Clean API abstraction layer

------------------------------------------------------------------------

## 🔌 API Integration

Example endpoints:

    GET /verbs
    GET /verbs?ids=1,3,7

Environment variable:

    VITE_API_URL=https://your-api-url.com

------------------------------------------------------------------------

# ⚙ Backend

The backend is built using:

-   Hono.js\
-   Prisma\
-   PostgreSQL

It provides REST endpoints for retrieving and filtering irregular verbs.

------------------------------------------------------------------------

# 🎯 Project Goals

-   Provide an intuitive tool for learning German irregular verbs\
-   Maintain production-ready architecture\
-   Demonstrate modern React patterns\
-   Ensure scalability for future features:
    -   Authentication\
    -   Progress tracking\
    -   Spaced repetition\
    -   User accounts

------------------------------------------------------------------------

# 📌 Future Improvements

-   Progress persistence\
-   User statistics dashboard\
-   Dark mode\
-   PWA support
