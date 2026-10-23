# Portfolio

This is a data-driven Next.js portfolio.

## Customize the portfolio

Edit only the `data/` directory to replace the personal content.

- Edit `data/data.json` for profile, work, project, skill, and link data.
- Edit `data/ascii-art.json` for the name art and its colors.
- Replace `data/assets/avatar.png` for the profile image.
- Replace `data/assets/favicon.png` for the browser icon.
- Replace `data/assets/resume.pdf` for the resume.

Keep the asset file names unchanged. The application and SEO metadata read these files from `data/`.

## Run the portfolio

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `SITE_URL` to the public site URL when you do not deploy through Vercel.
