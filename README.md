# CIR4FUN Architecture Explorer

A responsive React + Vite website for exploring the CIR4FUN WP3, WP4 and WP5 architecture. Each component opens a detail view with a written description and its corresponding Canva resource embedded where Canva permits iframe display, plus a direct-open fallback.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this project folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Click **Deploy**. No environment variables are required.

The project is static and does not require a backend. Canva controls whether a particular page can be embedded; every component also includes a direct link to open its Canva resource in a new tab.

## Content notes

Descriptions are concise architecture summaries based on the CIR4FUN D2.3 Architecture Specifications and the relevant WP3 deliverable context. The original Canva links supplied for each component are preserved.
