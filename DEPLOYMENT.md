# 🚀 KBE Platform - Vercel Deployment Guide

## � IMPORTANT: Fix for 405 Registration Errors

**Your registration 405 error is happening because Vercel doesn't know how to handle your backend API routes.**

I've created serverless function versions of your API endpoints in the `/api` folder:

- `/api/health.ts` - Health check endpoint
- `/api/contacts.ts` - Contact form endpoints  
- `/api/registrations.ts` - Registration endpoints
- `/api/registrations/[id].ts` - Individual registration lookup

## �📋 Pre-Deployment Checklist

### ✅ Configuration Files Ready
- `vercel.json` - Vercel deployment configuration
- `package.json` - Updated with production scripts
- `vite.config.ts` - Optimized for production builds
- `.env.example` - Environment variables template

### ✅ Build Successfully Tested
```bash
npm run build
# ✓ Client built to dist/public/
# ✓ Server built to dist/index.js
```

## 🔧 Environment Variables

Create these environment variables in your Vercel dashboard:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=your_production_database_url
SESSION_SECRET=your_secure_random_string
```

## 🚀 Deployment Steps

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your `einstein-quest` repository
   - Configure build settings:
     - **Framework Preset**: Other
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist/public`
     - **Install Command**: `npm install`

3. **Add Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add your production environment variables

4. **Deploy:**
   - Click "Deploy"
   - Your site will be live at `https://your-project-name.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

## 🔗 Custom Domain Setup

1. **Add Custom Domain:**
   - Go to Project Settings → Domains
   - Add your domain (e.g., `kbeeducation.org`)

2. **Configure DNS:**
   ```
   Type: CNAME
   Name: www
   Value: your-project-name.vercel.app
   
   Type: A
   Name: @
   Value: 76.76.19.61 (Vercel IP)
   ```

## 📊 Performance Optimizations

### ✅ Code Splitting
- React and React-DOM in separate chunk
- UI components bundled together
- Swiper library isolated
- Icons in separate chunk

### ✅ Asset Optimization
- Images optimized and lazy-loaded
- CSS minified and gzipped
- JavaScript minified with esbuild
- No source maps in production

### ✅ Bundle Sizes
```
CSS: 106.29 kB (19.08 kB gzipped)
JavaScript: 618.69 kB (199.09 kB gzipped)
Images: ~10.2 MB total
```

## 🛠 Production Build Commands

```bash
# Build for production
npm run build

# Build only client
npm run build:client

# Build only server
npm run build:server

# Start production server locally
npm start

# Preview production build
npm run preview
```

## 🔍 Troubleshooting

### Build Errors
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear dist and rebuild
rm -rf dist
npm run build
```

### Environment Issues
- Ensure all environment variables are set in Vercel dashboard
- Check that NODE_ENV is set to "production"
- Verify database connection strings

### Image Loading Issues
- Images are in `client/public/Website Data/`
- Paths should start with `/Website Data/`
- Verify images copied to `dist/public/` during build

## 📈 Post-Deployment

1. **Test All Pages:**
   - Home page with hero slider
   - About page with statistics
   - Exams page with syllabus
   - Gallery with image categories

2. **Performance Testing:**
   - Google PageSpeed Insights
   - GTmetrix analysis
   - Mobile responsiveness test

3. **SEO Setup:**
   - Add meta descriptions
   - Configure Open Graph tags
   - Submit sitemap to Google

## 🎯 Live URLs

- **Production**: `https://your-project-name.vercel.app`
- **Custom Domain**: `https://kbeeducation.org` (when configured)

## 📞 Support

For deployment issues:
1. Check Vercel dashboard logs
2. Review build output
3. Verify environment variables
4. Test local production build first

---

**🎉 Your KBE Platform is now ready for production deployment on Vercel!**
