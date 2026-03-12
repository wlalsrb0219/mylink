# Gemini CLI Project Context: My Profile

This project is a modern web application built with Next.js, featuring a clean and responsive design using Tailwind CSS.

## Project Overview

*   **Core Technology:** [Next.js](https://nextjs.org/) (v16.1.6) utilizing the **App Router** architecture.
*   **UI Framework:** [React](https://react.dev/) (v19.2.3).
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4) with PostCSS.
*   **Language:** [TypeScript](https://www.typescriptlang.org/) for type safety.
*   **Fonts:** Optimized using `next/font` with Geist Sans and Geist Mono.
*   **Structure:** The main application code is located within the `my-profile/` directory.

## Directory Structure (Key Areas)

*   `my-profile/app/`: Contains the application routes, layouts, and global styles.
    *   `layout.tsx`: The root layout defining the HTML structure and global font variables.
    *   `page.tsx`: The main entry point/home page of the application.
    *   `globals.css`: Global CSS and Tailwind directives.
*   `my-profile/public/`: Static assets such as images and SVGs.
*   `my-profile/next.config.ts`: Next.js specific configuration.
*   `my-profile/tsconfig.json`: TypeScript configuration.

## Building and Running

All commands should be executed from within the `my-profile/` directory:

| Task | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Starts the development server with Hot Module Replacement (HMR). |
| **Build** | `npm run build` | Compiles the application for production. |
| **Production** | `npm run start` | Starts the built application in production mode. |
| **Linting** | `npm run lint` | Runs ESLint to identify and fix code quality issues. |

## Development Conventions

*   **App Router:** Follow Next.js App Router conventions for routing and data fetching.
*   **Tailwind CSS 4:** Use utility-first CSS for styling. Configuration is managed via PostCSS.
*   **TypeScript:** Ensure all new components and logic are properly typed.
*   **Components:** Prefer functional components and React Hooks.
*   **Images:** Use the `next/image` component for optimized image loading and performance.
