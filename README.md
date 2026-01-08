# React Auth Dashboard

A small React application that simulates a real-world authentication flow with a protected dashboard and API integration. Built as a frontend assignment for a Frontend Developer role.

## 🚀 Live Demo

- **Live URL**: https://your-vercel-app-url.vercel.app
- **GitHub Repo**: https://github.com/your-username/auth-dashboard-react

_(Replace the links above with your actual URLs.)_

---

## 📌 Features

- Login screen with email and password
- Mocked + real API-based login (ReqRes) with graceful fallback
- Token stored in `localStorage`
- Protected dashboard route (cannot access without login)
- User list fetched from JSONPlaceholder API
- Loading and error states for all API calls
- Retry button on API failure
- Logout flow (clears token and redirects to login)
- Token expiry handling with remaining time display
- Axios instance with request/response interceptors
- Environment-based configuration using `.env`

---

## 🧱 Tech Stack

- **Framework**: React (Vite)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Styling**: Simple inline styles + basic global CSS
- **Build Tool**: Vite

---

## 📁 Project Structure

```bash
src/
├── components/
│   ├── Navbar.jsx          # Top navigation bar with logout + session warning
│   └── ProtectedRoute.jsx  # Wrapper to protect routes based on auth state
├── pages/
│   ├── Login.jsx           # Login form, API/mock auth, token storage
│   └── Dashboard.jsx       # Protected dashboard, users list, retry, expiry info
├── services/
│   └── api.js              # Axios instances + interceptors
├── utils/
│   └── auth.js             # Token + expiry helpers (set/get/remove/check)
├── App.jsx                 # Route definitions
└── main.jsx                # App entry point with router
🔐 Authentication Flow
User enters email and password on the Login page.

App first tries to authenticate with ReqRes API (/login).

On success:

Token is stored in localStorage with an expiry timestamp.

User is redirected to /dashboard.

If the API login fails (e.g. network issue), a mock login fallback kicks in:

Any non-empty email + password is accepted.

A dummy token is generated and stored.

Access to /dashboard is guarded by ProtectedRoute, which:

Checks if a valid (non-expired) token exists.

Redirects unauthenticated users back to /login.

⏱ Token & Session Handling
Token management is handled in src/utils/auth.js:

setToken(token)
Stores the token and calculates an expiry time based on VITE_TOKEN_EXPIRY_MINUTES.

getToken()
Returns the token only if it has not expired; otherwise cleans up and returns null.

isAuthenticated()
Uses getToken() to determine if the user is currently logged in.

getRemainingTime()
Returns remaining session time (in minutes) for display on the dashboard.

The dashboard shows:

“Session expires in: X min”

A warning message when less than or equal to 5 minutes remain.

🌐 API Integration
Auth API (ReqRes)
Base URL: VITE_API_BASE_URL (default: https://reqres.in/api)

Endpoint used: POST /login

Example body:

json
{
  "email": "eve.holt@reqres.in",
  "password": "your-password"
}
Users API (JSONPlaceholder)
Base URL: VITE_USERS_API_URL (default: https://jsonplaceholder.typicode.com)

Endpoint used: GET /users

The dashboard:

Fetches users on mount

Shows a loader while fetching

Displays a clear error message if the request fails

Provides a Retry button to re-trigger the request

⚙️ Axios Configuration
Located in src/services/api.js:

Auth Axios instance (api):

Uses VITE_API_BASE_URL

Request interceptor:

Reads token from localStorage

Attaches Authorization: Bearer <token> header if present

Response interceptor:

Handles common error codes (401, 403, 404, 5xx)

On 401, clears token and redirects to /login

External API instance (externalApi):

Uses VITE_USERS_API_URL for JSONPlaceholder calls

This keeps API concerns separate from UI components and makes the code easier to maintain.

🌱 Environment Variables
Create a .env file in the project root:

text
VITE_API_BASE_URL=https://reqres.in/api
VITE_USERS_API_URL=https://jsonplaceholder.typicode.com
VITE_TOKEN_EXPIRY_MINUTES=30
For sharing the project, include a .env.example:

text
VITE_API_BASE_URL=your_api_base_url
VITE_USERS_API_URL=your_users_api_url
VITE_TOKEN_EXPIRY_MINUTES=30
Note: .env is ignored by git and should not be committed.

🧪 How to Run Locally
Prerequisites
Node.js (LTS recommended)

npm or yarn

Steps
bash
# 1. Clone the repo
git clone https://github.com/your-username/auth-dashboard-react.git

cd auth-dashboard-react

# 2. Install dependencies
npm install

# 3. Create env file
cp .env.example .env
# (Or manually create .env with the variables above)

# 4. Start development server
npm run dev
The app will be available at something like:

http://localhost:5173 (Vite default, may vary slightly)

🔑 Test Credentials
For ReqRes API login:

Email: eve.holt@reqres.in

Password: any non-empty string

If the ReqRes API is unreachable (network restrictions), the app falls back to mock login:

Any non-empty email + password combination will work.

🎯 Assignment Requirements Mapping
Login screen with username/password ✔️

Token stored in localStorage ✔️

Protected dashboard (route-level protection) ✔️

Dashboard fetching list data from public API ✔️

Route protection with redirect to login when unauthenticated ✔️

Logout clears token and redirects to login ✔️

Loader during API calls ✔️

Meaningful error messages ✔️

Retry option on failure ✔️

Clear separation of concerns (pages, components, utils, services) ✔️

Predictable state flow using React hooks ✔️

User-friendly messages & hints ✔️

Bonus:

Axios interceptors ✔️

Environment-based configuration ✔️

Basic token expiry handling ✔️

📦 Build & Deploy
Build
bash
npm run build
Preview Production Build
bash
npm run preview
Deploy (Vercel Example)
Push the repository to GitHub

Import the repo in Vercel

Vercel automatically detects Vite and builds the app

Make sure .env variables are added in Vercel project settings

👤 Author
Name: Gurmeet Singh Rathor

Email: gurigurmeet1234567@gmail.com

GitHub: https://github.com/Guri9368/

LinkedIn: https://www.linkedin.com/in/gurmeet-singh-rathor-1bbbaa270/