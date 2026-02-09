# Einstein Quest - Frontend Only

This is a static frontend application for the Einstein Quest registration system.

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
# Development
VITE_API_BASE_URL=http://localhost:5001

# Production
VITE_API_BASE_URL=https://einstein-quest-server.onrender.com
```

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
