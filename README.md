# Greysheet Developer API Demo

A modern, developer-friendly API documentation website for rare coin pricing and valuation data, inspired by Mapbox's pricing page and Greysheet's design.

## 🚀 Quick Deploy Options (All Free!)

### Option 1: Deploy to Vercel (Easiest - 2 minutes)
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub/GitLab/Bitbucket (free)
3. Click "Add New Project" → "Import Third-Party Git Repository"
4. Paste this project's path or upload the folder
5. Click "Deploy" - Done! You'll get a link like `https://your-project.vercel.app`

### Option 2: Deploy to Netlify (Drag & Drop)
1. Go to [netlify.com](https://netlify.com)
2. Sign up (free, no credit card)
3. Drag the `out` folder directly to the Netlify dashboard
4. Done! Instant deployment with a link like `https://amazing-newton-123.netlify.app`

### Option 3: Deploy with Surge.sh (Command Line - 30 seconds)
```bash
# Install surge globally (one time)
npm install -g surge

# Deploy from the out directory
cd out
surge

# You'll be prompted to:
# 1. Create account (just email)
# 2. Choose domain (e.g., greysheet-api.surge.sh)
# Done! Live in seconds
```

### Option 4: Deploy to Render.com
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (free)
3. New → Static Site
4. Choose "Deploy an existing image from a registry"
5. Build Command: `npm run build`
6. Publish Directory: `out`
7. Deploy! Get link like `https://greysheet-api.onrender.com`

### Option 5: GitHub Pages (If using GitHub)
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Source: Deploy from branch
4. Branch: main, folder: /out
5. Save - Site will be at `https://yourusername.github.io/repo-name`

## 📦 Already Built Files

The `out` folder contains all the static files ready to deploy. You can upload this folder to:
- Any web hosting service
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Any CDN

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Opens at http://localhost:3000

# Build static files
npm run build
# Creates/updates the 'out' folder
```

## 🎨 Features

- **Interactive Pricing Calculator** - Mapbox-style sliders for API usage estimation
- **Real Greysheet API Structure** - Based on actual CDN Public API V2
- **4 Pricing Tiers** - Basic (Free), Standard, Advanced, Enterprise
- **API Models Documentation** - Catalog, Pricing, Collectibles, Market Analytics
- **Responsive Design** - Works on all devices
- **Greysheet Branding** - Navy (#1e3a5f) and Gold (#d4af37) color scheme

## 📁 Project Structure

```
greysheet-developer-demo/
├── out/               # Static files (ready to deploy!)
├── app/               # Next.js app directory
├── components/        # React components
│   ├── navigation.tsx
│   ├── hero-section.tsx
│   ├── pricing-section.tsx
│   ├── api-models-section.tsx
│   ├── developer-resources.tsx
│   └── footer.tsx
└── public/           # Static assets
```

## 🌐 After Deployment

Your site will be available at:
- **Vercel**: `https://[project-name].vercel.app`
- **Netlify**: `https://[random-name].netlify.app` (customizable)
- **Surge**: `https://[chosen-name].surge.sh`
- **Render**: `https://[project-name].onrender.com`
- **GitHub Pages**: `https://[username].github.io/[repo-name]`

All platforms provide:
- ✅ Free HTTPS/SSL
- ✅ Custom domain support (bring your own)
- ✅ Automatic deployments
- ✅ Global CDN

## 🚀 Quickest Option

For the absolute fastest deployment:
```bash
npx surge out
```
This deploys in under 30 seconds with just an email address!