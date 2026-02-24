# AGENTS.md

This document provides guidelines for AI agents working on this codebase.

## Project Overview

Two projects exist:
1. **Original (Vue 2)**: `Personal-Website-Navigation/` - Vue 2 website navigation
2. **New (React)**: `../personal-website-react/` - React + TypeScript + Vite rewrite (recommended for new development)

## Build Commands

### Original Vue 2 Project
```bash
cd Personal-Website-Navigation
pnpm install
pnpm serve            # Start dev server (port 8080)
pnpm build            # Production build to dist/
pnpm lint             # Run ESLint
pnpm start            # Run dev server + backend concurrently
pnpm deploy           # Deploy to gh-pages
```

### New React Project (Recommended)
```bash
cd personal-website-react
pnpm install
pnpm dev              # Start dev server (port 5173)
pnpm build            # Production build to dist/
pnpm preview          # Preview build
pnpm lint             # Run ESLint
```

## Testing

Neither project has a test framework configured. When adding tests:
- React: Use Vitest + React Testing Library
- Run a single test: `npx vitest run -t "test name"`

## Code Style Guidelines

### React + TypeScript Project (personal-website-react)

#### General
- React 18 with Hooks
- TypeScript for type safety
- ESLint with @typescript-eslint/recommended
- Run `pnpm lint` before committing

#### File Naming (kebab-case)
- Components: `web-item.tsx`, `search-box.tsx`
- Pages: `home-page.tsx`, `manage-page.tsx`
- Hooks: `use-categories.ts`, `use-language.ts`
- Styles: `web-item.module.less`

#### Components
- Component name: PascalCase in JSX, file in kebab-case
- Props: TypeScript interfaces
- Hooks: `use` prefix, camelCase
- Use `module.less` for component styles

#### TypeScript
- Variables/functions: camelCase
- Interfaces: PascalCase (e.g., `Category`, `Website`)
- Constants: UPPER_SNAKE_CASE
- No unused variables
- Use `const` over `let`
- Arrow functions preferred
- Semicolons required

#### Import Conventions
```typescript
// React core
import React, { useState, useEffect } from 'react'

// Components
import Layout from '@/components/layout'
import WebItem from '@/components/web-item'

// Hooks
import { useCategories, useLanguage } from '@/hooks'

// Stores
import { useSiteStore } from '@/stores'

// Styles
import styles from './component.module.less'
```

#### React/JSX
- Use functional components with Hooks
- PropTypes via TypeScript interfaces
- Event handlers: `onChange`, `onClick`
- Conditional rendering: `&&` or ternary
- Lists: map with `key` prop

#### CSS Modules (Less)
- Use scoped styles via CSS Modules
- Import in `.module.less` files
- Global styles in `assets/styles/`

#### Error Handling
- Use try/catch for async operations
- Error boundaries for components
- TypeScript for compile-time checks

## Project Structure

### React Project (personal-website-react)
```
personal-website-react/
├── src/
│   ├── components/         # Reusable components
│   │   ├── layout/         # Layout, Sidebar, Header
│   │   ├── web-item/       # Website card
│   │   ├── search-box/     # Search component
│   │   └── footer/         # Footer
│   ├── pages/              # Page components
│   │   ├── home-page/      # Home page
│   │   ├── manage-page/    # Management page
│   │   └── about-page/     # About page
│   ├── hooks/              # Custom Hooks
│   │   ├── use-categories.ts
│   │   └── use-language.ts
│   ├── stores/             # State management (Zustand)
│   │   └── site-store.ts
│   ├── types/              # TypeScript definitions
│   │   ├── category.ts
│   │   ├── website.ts
│   │   └── search-engine.ts
│   ├── assets/             # Static assets
│   │   ├── images/
│   │   └── styles/
│   │       ├── variables.less
│   │       └── global.less
│   ├── data/               # Static data
│   │   └── data.json
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
└── .eslintrc.cjs
```

### Vue 2 Project (Personal-Website-Navigation)
```
Personal-Website-Navigation/
├── src/
│   ├── assets/
│   │   ├── css/          # Bootstrap and theme CSS
│   │   ├── data.json     # Website/bookmark data
│   │   └── js/           # Utility scripts
│   ├── components/       # Reusable Vue components
│   ├── views/            # Page-level components
│   ├── App.vue
│   └── main.js
├── public/
├── server.js             # Express backend
└── package.json
```

## Conventions

### React Project
- Route path: lowercase, kebab-case (`/manage`, `/about`)
- Event handlers: camelCase (`onChange`, `onClick`)
- State updates via Hooks (`useState`, `useReducer`)
- Global state via Zustand
- CSS Modules for component isolation

### Vue 2 Project (Legacy)
- Route path: lowercase, kebab-case
- Event handlers: `@event` syntax
- Component props validation with Object syntax
- Lazy-loaded routes supported

## Adding New Features (React Project)

1. Create types in `src/types/` if needed
2. Create component in `src/components/`
3. Create or update page in `src/pages/`
4. Add routes in `src/App.tsx`
5. Update `src/data/data.json` for persistent data
6. Run `pnpm lint` to verify code quality
7. Run `pnpm build` to test production build

## Notes

- New development should use the React project in `../personal-website-react/`
- React project uses Vite for fast builds
- TypeScript provides compile-time type checking
- CSS Modules with Less for scoped styling
- Zustand for simple state management
- gh-pages deployment configured
