# CinePulse AI — upgraded full-stack project

This is an upgrade of the original CinePulse source. It includes three phases in one MERN application. It is a functional academic MVP, not a production security audit or a trained recommendation model.

## Prerequisites
Node.js 20+, MongoDB Community Server running locally, npm.

## Run on Windows (two VS Code terminals)

1. `cd cinepulse\server`
2. `npm install`
3. Copy `.env.example` to `.env` and **replace JWT_SECRET with a random 32+ character value**. Keep `MONGO_URI=mongodb://127.0.0.1:27017/cinepulse`.
4. `npm run seed` (adds a curated catalog across comedy, family, food, romance, action, mystery, documentary, nostalgia, and other genres; existing movies and reviews are preserved).
5. `npm run dev` (expect API listening on 5000).
6. In another terminal: `cd cinepulse\client`, `npm install`, `npm run dev`.
7. Open `http://localhost:5173` (or `http://127.0.0.1:5173`).

**IMPORTANT migration note:** Original CinePulse stored review.movie as a text string and had no users. The upgraded version uses Movie and User ObjectIds, so old review records cannot be displayed as new-style reviews until migrated. Back up your existing database before upgrading. To start clean, use a different database name in `MONGO_URI`, such as `cinepulse_ai`, then run seed. This does not erase the original database.

## Features
- Phase 1: register/login with bcrypt password hashes and JWT, seeded movie catalog, admin create/delete movie endpoints, movie search/genre filter/sorting, review create/read/edit/delete, watchlist, rating distribution and percentages.
- Phase 2: Bayesian weighted rating (prior=10, baseline=global review mean or 3.5), exponentially decayed trending score (lambda=.15 per day), Wilson lower bound (z=1.96) for review helpfulness, analytics API/dashboard.
- Phase 3: personalized recommendations based on genre-vector cosine similarity of movies rated 4+ stars; mood picks based on the viewer's current mood and desired movie vibe; human-readable explanations; transparent lexicon-based sentiment score. **Sentiment is a simple deterministic baseline, NOT a pretrained AI model.**

## Admin setup (no public admin signup)
Register a normal user, then in `mongosh` for the same database run:
`db.users.updateOne({email:'your-email@example.com'},{$set:{role:'admin'}})`
Log out and log back in for the role to be reflected in the JWT. Only do this on a database you administer.

## API endpoints
`GET /api/health`; `POST /api/auth/register`, `/api/auth/login`; `GET /api/auth/me`; `GET /api/movies`, `/api/movies/:id`; admin `POST /api/movies`, `PUT /api/movies/:id`, `DELETE /api/movies/:id`; `GET /api/reviews`, authenticated `POST /api/reviews`, `PUT /api/reviews/:id`, `DELETE /api/reviews/:id`, `POST /api/reviews/:id/vote`; `GET/POST/DELETE /api/watchlist`; `GET /api/recommendations`; `GET /api/mood-recommendations?mood=stressed&intent=relax`; `GET /api/analytics`.

## Limitations and next steps
- The sentiment model is a small English keyword lexicon. For real NLP, replace with a separately tested model/service.
- Recommendations require movie genres and a user's positive ratings; otherwise the app falls back to Bayesian popularity. No external movie API is required.
- React uses 10-second polling, not WebSockets. The review listing is capped at 300 and movie analytics load all reviews, so add aggregation/pagination for larger deployments.
- No email verification, password reset, rate limiting, or deployment hardening; do not expose this academic MVP publicly without those controls.
- Old reviews are not automatically migrated; use a fresh DB or perform a deliberate backup/migration.
