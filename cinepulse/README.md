# CinePulse AI — upgraded full-stack project

This is an upgrade of the original CinePulse source. It includes three phases in one MERN application. It is a functional academic MVP, not a production security audit or a trained recommendation model.

## Prerequisites
Node.js 20+, MongoDB Community Server running locally, npm.

## Run on Windows (two VS Code terminals)

1. `cd cinepulse\server`
2. `npm install`
3. Copy `.env.example` to `.env` and **replace JWT_SECRET with a random 32+ character value**. Keep `MONGO_URI=mongodb://127.0.0.1:27017/cinepulse`.
4. `npm run seed` (inserts 8 sample movies; does not delete your existing legacy reviews).
5. `npm run dev` (expect API listening on 5000).
6. In another terminal: `cd cinepulse\client`, `npm install`, `npm run dev`.
7. Open `http://localhost:5173` (or `http://127.0.0.1:5173`).

**IMPORTANT migration note:** Original CinePulse stored review.movie as a text string and had no users. The upgraded version uses Movie and User ObjectIds, so old review records cannot be displayed as new-style reviews until migrated. Back up your existing database before upgrading. To start clean, use a different database name in `MONGO_URI`, such as `cinepulse_ai`, then run seed. This does not erase the original database.

## Features
- Phase 1: register/login with bcrypt password hashes and JWT, seeded movie catalog, signed-in movie creation and admin movie editing/deletion, movie search/genre filter/sorting, review create/read/edit/delete, watchlist, rating distribution and percentages.
- Phase 2: Bayesian weighted rating (prior=10, baseline=global review mean or 3.5), exponentially decayed trending score (lambda=.15 per day), Wilson lower bound (z=1.96) for review helpfulness, analytics API/dashboard.
- Phase 3: recommendations based on genre-vector cosine similarity of movies rated 4+ stars, similar-movie discovery via same recommendation logic, human-readable shared-genre explanations, transparent lexicon-based sentiment score. **Sentiment is a simple deterministic baseline, NOT a pretrained AI model.**

## Admin setup (no public admin signup)
Register a normal user, then in `mongosh` for the same database run:
`db.users.updateOne({email:'your-email@example.com'},{$set:{role:'admin'}})`
Log out and log back in for the role to be reflected in the JWT. Only do this on a database you administer.

## API endpoints
`GET /api/health`; `POST /api/auth/register`, `/api/auth/login`; `GET /api/auth/me`; `GET /api/movies`, `/api/movies/:id`; authenticated `POST /api/movies`; admin `PUT /api/movies/:id`, `DELETE /api/movies/:id`; `GET /api/reviews`, authenticated `POST /api/reviews`, `PUT /api/reviews/:id`, `DELETE /api/reviews/:id`, `POST /api/reviews/:id/vote`; `GET/POST/DELETE /api/watchlist`; `GET /api/recommendations`, `/api/analytics`.

## Limitations and next steps
- The sentiment model is a small English keyword lexicon. For real NLP, replace with a separately tested model/service.
- Recommendations require movie genres and a user's positive ratings; otherwise the app falls back to Bayesian popularity. No external movie API is required.
- React uses 10-second polling, not WebSockets. The review listing is capped at 300 and movie analytics load all reviews, so add aggregation/pagination for larger deployments.
- No email verification, password reset, rate limiting, or deployment hardening; do not expose this academic MVP publicly without those controls.
- Old reviews are not automatically migrated; use a fresh DB or perform a deliberate backup/migration.

## Add and rate a movie

In the Movie catalog, choose **+ Add movie**. Log in or register, enter the movie details, and select **Add movie & rate it**. The new movie opens with a rating and review form. Save your review to update its rating and analytics. Any signed-in user can add movies; editing and deleting movies remain admin-only.
