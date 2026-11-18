# CIR4FUN Interactive Architecture

Static single-page website based on the exact architecture image supplied by the user. Transparent clickable regions are positioned over the original diagram. Each region opens a component description and a direct link to its Canva presentation.

## Canva display note
Canva blocks embedded display in third-party websites for these supplied links (`ERR_BLOCKED_BY_RESPONSE`). Therefore the site does not use an iframe. It displays the description and opens the original Canva design in a new tab using the supplied URL.

## Run locally
Open `index.html` in a browser. No dependencies or build step.

## Deploy to Vercel
Push this folder to GitHub and import it in Vercel. Choose **Other**, leave Build Command and Install Command empty, and set Output Directory to `.`.
