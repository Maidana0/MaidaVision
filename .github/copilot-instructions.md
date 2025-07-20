# MaidaVision AI Assistant Instructions

This document provides essential context for AI assistants working in the MaidaVision codebase.

## Project Overview

MaidaVision is a Next.js 15 application for discovering and tracking movies/TV shows across streaming platforms. Key features:
- Content discovery with TMDB API integration
- User authentication (Auth.js with Google/GitHub OAuth)
- Personalized watchlists and favorites 
- Streaming platform availability checking
- Responsive UI using Tailwind + shadcn/ui

## Architecture & Patterns

### Data Flow
- TMDB API integration via `lib/api/tmdb.ts` wrapper class
- Server-side data fetching in route handlers under `app/api/tmdb/`
- Client-state management using Zustand stores in `store/`:
  - `use-search-store.ts` - Search history
  - `use-trending-modal-store.ts` - Trending content modal state
  - `use-query-param-store.ts` - URL query parameters

### Authentication Flow
1. Auth.js handles OAuth via `lib/prisma/auth.ts`
2. Login/register forms in `components/auth/`
3. Protected routes managed by middleware.ts
4. Session management through Prisma adapter

### Type System
- TMDB types in `types/TMDB/`:
  - `media-result.ts` - Base response types
  - `movie-detail.ts`/`tv-detail.ts` - Media specific schemas
  - `common/common-types.ts` - Shared type definitions

### Component Organization
- Page-specific components under `app/(media)/` and `app/(media-detail)/`
- Shared UI components in `components/`:
  - Media cards (`cards/`)
  - Carousels (`carousel/`)
  - Filter/sort controls (`media/`)

## Key Development Workflows

### API Integration
```typescript
// Example TMDB API call pattern
const data = await tmdbFetcher.getMediaDetails<MovieDetails>({
  id: mediaID,
  mediaType: 'movie'
});
```

### Auth Implementation
```typescript
// Protected route pattern
const session = await auth();
if (!session) redirect("/login");
```

### State Management
```typescript
// Zustand store usage
const store = create<State>((set) => ({
  // State and actions
}));
```

## Common Patterns

### Error Handling
- API responses wrapped in `CustomResponse<T>` type
- Use `executeAction` utility for consistent error handling
- Always validate data with Zod schemas

### Caching Strategy
- TMDB responses cached based on content type:
  - Trending: 1 week for weekly, 1 day for daily
  - Search: 15 minutes
  - Details: 1 hour

### UI Conventions
- Dynamic imports with loading states
- Responsive design breakpoints
- shadcn/ui component customization

## Integration Points

### External Services
- TMDB API (movies/TV data)
- Auth.js (authentication)
- Prisma (database)

### Cross-Component Communication
- Zustand stores for global state
- URL parameters for filter/search state
- Custom hooks for reusable logic
