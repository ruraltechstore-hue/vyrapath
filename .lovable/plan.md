Plan: Replace the home page hero image with a sharp, high-quality stock photo

1. Audit current image references in `src/data/site.ts` and `src/routes/index.tsx` to confirm which image is the home page hero and what dimensions/aspect ratio it needs.
2. Source a new high-resolution Unsplash/Pexels photo matching the existing "Emerald Prestige" palette and the career-services theme (professional students/graduates, modern workspace, resume/interview/career guidance mood). Prefer a crisp, well-lit shot that does not look generic or AI-generated.
3. Update `src/data/site.ts` to point `images.heroMain` at the new URL with appropriate width/quality parameters.
4. Update the `alt` text in `src/routes/index.tsx` if the subject changes.
5. Clean up any now-unused local asset pointer file left from the previous hero image.
6. Verify the build passes and the hero renders sharply at desktop, tablet, and mobile viewports.

No other pages or business logic will be touched.