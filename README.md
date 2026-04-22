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

Arcadia will be powered by React, Express API with an SQL database.

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

Arcadia is an npm workspaces monorepo containing two apps:

- `apps/web` — the Next.js frontend (package name: `arcadia`), runs on port 3000
- `apps/api` — the Express backend (package name: `arcadia-api`), runs on port 4000

The frontend proxies `/api/*` to the Express server in development (configured in `apps/web/next.config.ts`), so the frontend can call `fetch('/api/...')` without CORS setup.

## First-time setup

From the repo root:

```
npm install
```

This installs dependencies for both apps into a shared `node_modules`.

## Running in development

From the repo root:

```
npm run dev
```

This starts both apps in parallel:
- Frontend: http://localhost:3000
- Backend:  http://localhost:4000

To run just one app at a time:

```
npm run dev:web   # frontend only
npm run dev:api   # backend only
```

## Building for production

```
npm run build     # builds both apps
npm run start:web # serve the built frontend
npm run start:api # serve the built backend
```

## Verifying the API

With the dev server running, the Express health endpoint should return `{"status":"ok","service":"arcadia-api"}`:

```
curl http://localhost:4000/api/health        # direct to Express
curl http://localhost:3000/api/health        # via the Next.js proxy
```

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
