# Baculpo Webprog

## Frontend

Install dependencies and start the Vite app:

```bash
npm install
npm run dev
```

The frontend expects the API host at `http://localhost:8000/api` by default.

## Backend

Open a second terminal, go to the `server` folder, and install backend dependencies:

```bash
cd server
npm install
cp .env.example .env
```

Then start the backend:

```bash
npm run dev
```

## Notes

- The backend will run on port `8000` by default.
- The frontend should be able to login using `/api/users/login`.
- If you need to change the frontend API URL, update `VITE_API_URL` in a root `.env` file.

## Deployment

### Frontend on Vercel

Deploy the repository root as a Vite app. The included `vercel.json` uses:

```bash
npm run build
```

and serves the `dist` folder. Add this environment variable in Vercel:

```bash
VITE_API_URL=https://your-backend-url.com/api
```

Replace the URL with the deployed backend URL.

### Backend

Deploy the `server` folder to a Node host such as Render, Railway, Fly.io, or a VPS. Use:

```bash
npm install
npm start
```

Set these backend environment variables on your backend host:

```bash
MONGO_URI=your MongoDB Atlas connection string
MONGO_DB_NAME=baculpo_db
JWT_SECRET=your long random secret
FRONTEND_ORIGIN=https://your-vercel-app.vercel.app
```

For Render, add these in your service's **Environment** tab. `MONGO_URI` should be the Atlas Node.js driver URI, with `<db_password>` replaced by the password for your Atlas database user. If your password has special characters, URL-encode it before pasting. The backend also accepts `MONGODB_URI` or `DATABASE_URL`, but `MONGO_URI` is the recommended name.

For multiple allowed frontend URLs, use `FRONTEND_ORIGINS` as a comma-separated list. For Vercel preview deployments, set `ALLOW_VERCEL_PREVIEWS=true`.
