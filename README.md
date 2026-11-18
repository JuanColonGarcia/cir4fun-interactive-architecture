# CIR4FUN Interactive Architecture

Static single-page site based on the exact architecture image supplied by the user. The image remains the visual canvas; transparent clickable regions are positioned over its components. Each region opens a description and the corresponding Canva URL in an embedded frame, with an external Canva link as fallback.

## Run locally
Open `index.html` in a browser. No dependencies or build step.

## Deploy to Vercel
Push this folder to GitHub and import it in Vercel. Choose **Other**, leave Build Command and Install Command empty, and set Output Directory to `.`.

The Canva embed may be restricted by Canva's own frame/security settings; the direct link remains available.
