# Einstein Quest - Frontend Only

This is a static frontend application for the Einstein Quest registration system.

## Architecture

This application is now configured as a **client-only** application that makes API calls to external services. All server-side code and MongoDB connections have been removed.

## Structure

```
client/
├── src/
│   ├── components/     # React components
│   ├── lib/
│   │   └── api-client.ts   # External API client (using fetch)
│   ├── pages/          # Application pages
│   └── ...
dist/                   # Build output
```

## API Client

The application includes an API client (`client/src/lib/api-client.ts`) that makes HTTP requests to external APIs using the native `fetch` API. 

### Configuration

Set your external API URL in the environment variables:

```bash
VITE_API_URL=https://your-external-api.com/api
```

### Demo Mode

When no external API is configured, the application runs in demo mode with mock responses.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

This application can be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.) as it contains no server-side code.

### Vercel Deployment

The application is configured for Vercel static deployment. Simply push to your repository and Vercel will automatically build and deploy.

## API Integration

To integrate with your backend API:

1. Set the `VITE_API_URL` environment variable
2. Ensure your API supports CORS for the frontend domain
3. The API client expects the following endpoints:
   - `GET /health` - Health check
   - `POST /schools` - School registration
   - `GET /schools` - Get schools
   - `POST /mentors` - Mentor registration
   - `GET /mentors` - Get mentors
   - `POST /candidates` - Candidate registration
   - `GET /candidates` - Get candidates
   - `GET /statistics` - Get statistics

## Removed Components

The following have been completely removed:
- ❌ MongoDB connections and database logic
- ❌ Express.js server
- ❌ API routes and handlers
- ❌ Server-side authentication
- ❌ Backend data models and schemas

## Kept Components

The following are preserved:
- ✅ React frontend application
- ✅ API client with fetch requests
- ✅ UI components and styling
- ✅ Client-side routing
- ✅ Static asset serving
