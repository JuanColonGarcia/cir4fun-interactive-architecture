# CIR4FUN Interactive Technology Architecture

A Next.js application that presents the supplied CIR4FUN architecture image with interactive component hotspots and a details panel.

## Requirements
- Node.js 18.17 or later
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel
1. Push this project to a GitHub repository.
2. Import that repository into Vercel.
3. Keep the default Next.js build settings.
4. Deploy.

## Add Canva links
In `app/page.tsx`, find the `components` array. Add a `page` property to the matching component, for example:

```ts
page: 'https://www.canva.com/design/your-public-design-link/view'
```

The details panel will then show an **Open Canva page** link for that component.

## Notes
- The original supplied architecture image is preserved in `public/cir4fun-architecture.png`.
- Interactive hotspot positions are percentage-based against the original 1288 × 1221 image.
- Descriptions are initial explanatory copy and should be reviewed against the project's approved technical documentation before publication.
- Canva links entered in the UI are currently held in browser memory only; persistent management can be added later with Supabase.
