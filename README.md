# CIR4FUN Interactive Architecture

Static interactive website based on the exact architecture image supplied by the user. Transparent clickable regions sit over the original diagram. Clicking a component opens a **left-side information drawer** with its work package, title, description and a button to open its corresponding Canva page in a new tab.

Canva blocks embedding in third-party websites for these links, so the site intentionally opens Canva externally instead of showing a broken iframe.

## Run locally
Open `index.html` in a browser. No dependencies or build step.

## Deploy to Vercel
Push this folder to GitHub and import it in Vercel. Choose **Other**, leave Build Command and Install Command empty, and set Output Directory to `.`.
