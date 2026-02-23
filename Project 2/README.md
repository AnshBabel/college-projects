# Anonymous Confession Wall

A MERN stack application allowing users to post anonymous confessions with reactions and a secret code to edit/delete. Google OAuth 2.0 used for authentication.

## Setup

### Backend

1. Navigate to `backend` directory.
2. Install dependencies: `npm install`.
3. Create a `.env` file with the following:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/confessions
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```
4. Run server: `npm run dev` (requires nodemon) or `npm start`.

### Frontend

1. Open `frontend/index.html` in a browser or serve with a simple static server.
2. Ensure backend is running.

## Features
- Google login via OAuth 2.0
- Anonymous confession posting with secret code
- Reaction buttons (Like, Love, Laugh)
- Edit/delete with secret code verification

## API Endpoints
- `POST /confessions` create
- `GET /confessions` read all
- `PUT /confessions/:id` update
- `DELETE /confessions/:id` delete
- `POST /confessions/:id/react` add reaction

## Notes
- Secret code must be at least 4 characters.
- Use `http://localhost:5000` base for API calls.
