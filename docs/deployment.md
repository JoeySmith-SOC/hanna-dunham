# Deployment

## Target

GitHub Pages

## Strategy

- Build static files with Vite
- Publish the `dist` artifact through GitHub Actions
- Use the repository name as the Vite build base
- Do not use Jekyll
- Do not publish from `/docs`
- Do not publish from a `gh-pages` branch unless explicitly requested later

## GitHub Pages Settings

- Current repository base path: `/hanna-dunham/`
- If the repository name changes, update `vite.config.ts`
- In GitHub, go to `Settings -> Pages -> Build and deployment -> Source`
- Set `Source` to `GitHub Actions`

## Final Checks

- Confirm the default branch name matches the workflow trigger
- Confirm `public/.nojekyll` is present so GitHub Pages serves the Vite output without Jekyll processing
- Confirm resume download files exist before enabling live download links
- Validate the deployed URL on mobile after each major content update
