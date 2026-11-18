# CIR4FUN Interactive Technology Architecture

A responsive Next.js website for exploring the CIR4FUN WP3, WP4 and WP5 architecture.

## Features
- Updated architecture artwork supplied for 18 November 2026.
- Clickable component hotspots with descriptions and main functions.
- Canva links for every component for which a link was supplied.
- Components without a supplied Canva URL intentionally show no link.
- Work-package filters, component search and zoom controls.
- Responsive detail panel and links to the CIR4FUN website and GitHub repository.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Production build
```bash
npm run build
npm start
```

## Deploy to Vercel
1. Upload/commit the contents of this folder to the root of the connected GitHub repository.
2. In Vercel, keep Framework Preset as **Next.js**.
3. Set Root Directory to `./`.
4. Build Command: `npm run build` (or leave the Next.js default).
5. Install Command: `npm install` (or leave the default).
6. Deploy.

The architecture image is stored at `public/assets/cir4fun-architecture.png`.
Component data and Canva URLs are stored in `data/components.json`.
