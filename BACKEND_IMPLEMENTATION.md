# BACKEND_IMPLEMENTATION.md

# Backend Implementation Checklist (FastAPI + PostgreSQL)

## Frontend Hosting - Cloudflare pages
## Backend Hosting - Render (FastAPI)


## Phase 1 -- Planning

-   [x] Decide on hosting provider
-   [x] Decide on domain and environment variables
-   [x] Create Git repository for backend

## Phase 2 -- Project Setup

-   [x] Create Python virtual environment
-   [x] Install FastAPI
-   [x] Install Uvicorn
-   [ ] Install SQLAlchemy
-   [ ] Install Alembic
-   [ ] Install psycopg (PostgreSQL driver)
-   [ ] Install python-dotenv
-   [ ] Create `.env` file

## Phase 3 -- PostgreSQL

-   [ ] Create PostgreSQL database
-   [ ] Create development user
-   [ ] Test connection from FastAPI
-   [ ] Configure Alembic migrations

## Phase 4 -- Database Models

-   [ ] User table
-   [ ] OAuth account table
-   [ ] Tasks table
-   [ ] Notes table
-   [ ] Settings/preferences table
-   [ ] Create initial migration
-   [ ] Apply migration

## Phase 5 -- Authentication

-   [ ] Register Google OAuth application
-   [ ] Register GitHub OAuth application
-   [ ] Implement OAuth callback endpoints
-   [ ] Create login/logout endpoints
-   [ ] Persist user records
-   [ ] Issue secure session/JWT

## Phase 6 -- Core API

-   [ ] User profile endpoints
-   [ ] CRUD endpoints for tasks
-   [ ] CRUD endpoints for notes
-   [ ] Validate all input
-   [ ] Protect endpoints with authentication

## Phase 7 -- Frontend Integration

-   [ ] Connect vanilla JS to backend
-   [ ] Store auth state
-   [ ] Handle expired sessions
-   [ ] Test on multiple browsers

## Phase 8 -- Production

-   [ ] Enable HTTPS
-   [ ] Configure CORS
-   [ ] Add rate limiting
-   [ ] Add logging
-   [ ] Add backups
-   [ ] Monitor errors

## Phase 9 -- Polish

-   [ ] Email verification (optional)
-   [ ] Password reset (if local auth added)
-   [ ] Account deletion
-   [ ] Export user data
-   [ ] Automated tests

# Free stack recommendation

-   Backend hosting: Railway (good free starter credits) or Render free
    tier.
-   Database: Neon PostgreSQL free tier (excellent for hobby projects).
-   Object/file storage (if needed later): Cloudflare R2 free allowance
    or Supabase Storage free tier.
-   CDN/static hosting: Cloudflare Pages or GitHub Pages.
-   Secrets: `.env` locally and host-managed environment variables in
    production.
