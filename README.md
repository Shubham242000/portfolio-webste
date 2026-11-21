# Portfolio — Shubham Shrivastava

Personal site of a frontend engineer (SDE-2 @ PayPay India). Built to be fast,
calm, and a little bit personal — the site itself is the work sample.

**Live:** https://shubham-shrivastava.vercel.app

## Highlights

- **Lean by design** — React + Vite, two runtime dependencies (`react`, `react-dom`),
  code-split so returning visitors only re-fetch ~9 KB of app code.
- **Ink portrait** with its background cut away, so it stands on the hero's closing line in
  both themes — responsive WebP (61 KB at 1×, 113 KB at 2×) with fixed dimensions to avoid layout shift
  ([`components/Portrait.jsx`](components/Portrait.jsx)).
- **Postcards lightbox** of travel photos, lazy-loaded and size-reserved to avoid layout shift.
- **Theming** — light/dark via a `data-theme` attribute set before first paint (no flash),
  with the choice remembered.
- Core Web Vitals tracked with Vercel Speed Insights.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run lint
```

## Structure

- `src/App.jsx` — layout, theme logic, section order
- `components/` — one file per section, plus the portrait / clock / hobbies widgets
- `content/portfolio.js` — all copy and data (experience, capabilities, postcards)
- `src/App.css` — design tokens and styles
