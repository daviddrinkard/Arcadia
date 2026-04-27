# Arcadia v0.1a

# An Online Arcade Tracking App

an OSU CS361 Student Project by Joshua David Drinkard

# About

Arcadia is an online arcade tracker, allowing users to identify, rate and share arcades throughout the world. Share your favorite local arcade
with the world by adding photos, events, game lists, and more to a collected database visible by users throughout the world. Find a new place to play
or find your favorite game nearby all from one place.

Arcadia is something that I have imagined in my head for many, many years. The original idea was to make some type of repository for arcades nearby,
because I love arcades and struggled to find one near me. After years and years of my favorite places closing down, I felt like I needed to have a
community driven page where others could share their local arcades, allowing others to migrate to these places to play. Arcades are magical places
for people like me, and just being in one brings me immense joy. Having an arcade machine at my house is not the same as visiting an arcade, and I
wanted to be able to provide a resource for people like me to find either they game they love or an entirely new venue to checkout.

Arcadia is powered by Next.js (React) with API routes, backed by Supabase (Postgres).

# How It Works

Arcadia is powered by the users, who can create postings for arcades and then add information about the arcade to share it with the world. Much like
wikipedia. A user can create a LOCATION of the arcade, and then them and other users can populate the location with pictures, game lists, events or
any other information they choose. Users can submit ratings for each arcade, with stars and details outlining their experience. This rating system
would carry over to rating all arcades in the system, and helping users decide which arcade they'd love to visit.
As a authenticated user, you have free reign to create and add information as you see fit. I put a lot of faith in the user base for this initial push
as moderation is not included. Ultimately in later versions I would like to add moderation to all creation and additions, but reviews can remain unmoderated.
Anonymous users will be allowed full access to browse arcades listed in the database. They can view all information about an arcade, but not contribute
anything. In order to contribute to the database, you must be authenticated and logged in.

# The Future

I wish to progress this project past a student project into a full-fledged, live application out in the world. It's been a dream of mine for years
to have this project come to light and I wish to continue to support it after I finish this class. I hope to give back to the arcade community, which is
something I've loved for decades.

# Running the App

Arcadia is a Next.js application with its API built in as Next.js API Routes, so frontend and backend deploy together as a single Vercel project.

- Pages live under `src/pages/`
- API routes live under `src/pages/api/` and are served from the same origin at `/api/*`

## First-time setup

```
npm install
cp .env.example .env.local
```

Then open `.env.local` and fill in real values (Supabase URL + keys). See [Environment variables](#environment-variables) below for what each one is.

## Running in development

```
npm run dev
```

The app will be available at http://localhost:4242.

## Building for production

```
npm run build
npm run start
```

## Verifying the API

With the dev server running, the health endpoint pings Supabase and should return:

```
{"status":"ok","service":"arcadia-api","supabase":"connected"}
```

```
curl http://localhost:4242/api/health
```

If the Supabase URL or publishable key is missing or wrong, the endpoint returns a 503 with `supabase: "unreachable"` and the underlying error message.

## Environment variables

Config lives in `.env.local` (gitignored) for local dev and in Vercel's Environment Variables panel for deployed environments. `.env.example` is the committed template — keep it in sync when you add new variables.

| Variable                        | Where           | Purpose                                                                                                          |
| ------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | client + server | Canonical URL of the app. Used for absolute URLs (OG tags, emails, etc.).                                        |
| `NEXT_PUBLIC_SUPABASE_URL`      | client + server | Supabase project URL. Safe to expose.                                                                            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + server | Supabase publishable (anon) key. Safe to expose — Row Level Security gates access.                               |
| `SUPABASE_SECRET_KEY`           | server only     | Supabase secret (service role) key. Bypasses RLS — treat like a DB password. Never expose to the browser.        |

**Rules of thumb:**
- `NEXT_PUBLIC_` prefix → readable from browser code (bundled into client JS). Never put secrets behind this prefix.
- No prefix → server-side only (API routes, `getServerSideProps`, etc.).
- After changing `.env.local`, restart `npm run dev` for Next to pick up the new values.

**Setting these in Vercel:**
Project Settings → Environment Variables → add each one. Scope `NEXT_PUBLIC_SITE_URL` to **Production** only (set it to `https://arcadia-sandy.vercel.app`). Scope the Supabase variables to whichever environments should hit the database — typically all three (Production, Preview, Development) pointing at the same project, or separate Supabase projects per environment.

## Deployment

The app deploys to Vercel as a single project. In Vercel project settings:

- **Framework Preset:** Next.js
- **Root Directory:** leave as the repo root (`/`)

Install / Build / Output commands can be left as Vercel's defaults.

# Development Rules for github/git

The repository is split into 2 major branches: main and dev. 'main' is the production branch, where production code lives. 'dev' is the development branch
where development changes will be conducted. You will develop code in the 'dev' branch which will be for testing and development only. When a feature is
ready for release into production, a release branch will be pulled from 'dev' and merged into 'main.' After merging, code from 'main' will be deployed to
the production site.
All development code will be developed in bespoke branches pulled from 'dev.' For example if you wish to create a new feature, you will pull all current
'dev' changes and then 'git checkout -b feat/branch-name-here.' When your code is ready for review, push your new branch to github and create a PR against
the 'dev' branch. Once approved, all merged to 'dev' will be SQUASH AND MERGE. This will keep major changes relegated to a simple git history, as we do not
need to see 50,000 commits when merging a production branch.
Production releases will be from branches pulled from 'dev' to merge into 'main.' These merges will be merge commits, allowing the squished commit history
to be preserved in the main branch. This allows for a simpler, cleaner history of features or larger tasks and fixes.
