# CIR4FUN Interactive Technology Architecture

A polished, responsive and interactive website based on the latest supplied CIR4FUN architecture image.

## Features
- Latest architecture image.
- Clickable component overlays for WP3, WP4 and WP5.
- Right-hand detail panel with component descriptions and main functions.
- Direct Canva links where a dedicated link was supplied.
- Components without a supplied Canva URL remain selectable and explicitly show that no link was provided.
- Search, Work Package filters, component directory and zoom controls.
- Responsive layout for desktop, tablet and mobile.

## Run locally
Open `index.html` in a browser. No dependencies or build step are required.

## Deploy to Vercel
This is a static HTML site, not a Next.js project.

In Vercel > Project Settings > Build & Development Settings:
- Framework Preset: **Other**
- Root Directory: `./`
- Build Command: leave empty
- Output Directory: `.`
- Install Command: leave empty

Then deploy the latest commit.

## Update GitHub
Upload the contents of this ZIP to the repository root. `index.html` must be at the root, alongside the `assets` folder.

If converting the repository from the previous Next.js version, remove old Next.js-only files/folders (such as `app/`, `package.json`, `next.config.mjs`, `tsconfig.json`, `postcss.config.mjs` and `tailwind.config.ts`) so Vercel does not keep detecting Next.js.

## Canva
Canva may block embedding in third-party websites. Therefore, the supplied Canva pages open in a new browser tab. No unavailable links are fabricated.
