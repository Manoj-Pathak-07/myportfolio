# Beyond the Code — Manoj Pathak

A bilingual (English / Nepali), fully static portfolio for Manoj Pathak — Full Stack Developer, Flutter Developer, and Software Engineer based in Kathmandu. The site keeps the original dark 3D identity, adds an equally complete light theme, and presents verified work from Webcreation Nepal and Shakta Technology.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 App Router, static export |
| Language | TypeScript, strict + `noUncheckedIndexedAccess` |
| Styling | Tailwind CSS 3 with CSS-channel design tokens |
| Themes | `next-themes`, system default, persisted preference, blocking head script |
| 3D | Three.js, React Three Fiber, Drei |
| Motion | GSAP + ScrollTrigger; Motion for React |
| Content | Typed local files and MDX |
| Syntax highlighting | rehype-pretty-code + Shiki |
| SEO | Metadata API, hreflang, sitemap, robots, RSS, JSON-LD, generated OG images |

No database, authentication, CMS, admin panel, or backend service is required.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000 → /en/ (rewrite)
npm run build      # generates OG images, static export in out/, postbuild root pages
npm start          # serve out/
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
npm test           # content, attribution, translation, asset, and CV checks
npm run verify     # typecheck + lint + tests + build
```

## Routes

- `/en/`, `/ne/`
- `/en/about/`, `/experience/`, `/projects/`, `/projects/[slug]/`, `/blog/`, `/blog/[slug]/`, `/lab/`, `/contact/`, `/resume/`
- The same routes exist under `/ne/`.

`app/[locale]/layout.tsx` is the root layout so `lang` is correct per locale. `scripts/postbuild.mjs` writes the static `/` language chooser and `404.html`.

## Content map

| Content | File |
| --- | --- |
| Name, role, contact, WhatsApp, Instagram, languages, bio, resume | `content/profile.ts` |
| Experience and education | `content/experience.ts` |
| Projects, workstreams, optional hidden records | `content/projects.ts` |
| Skills | `content/skills.ts` |
| Services and performance highlights | `content/services.ts` |
| UI copy | `content/translations/en.json`, `ne.json` |
| Articles | `content/blog/*.mdx` |

### Profile and contact

`content/profile.ts` is the single source for contact details. The verified LinkedIn URL from the existing project is retained. WhatsApp, Instagram, GitHub, email, location, and CV paths are all read from this file. `availableForHire` is `false`, so no availability badge is rendered.

### Experience and education

The current Webcreation Nepal role and the previous Shakta Technology role are both published, without invented dates. Shakta projects stay attributed to Shakta. BCA is listed at Janamaitri Multiple Campus, Tribhuvan University, in the 8th semester. The +2 Science record intentionally omits an unverified college, dates, and grades.

### Projects

Five public Shakta Technology case studies support category, employer, role, stack, status, live link, contributions, and case study. Cargo GBL and GVS Nepal have verified public URLs. No metrics or screenshots are invented.

Webcreation Nepal current work is represented as four workstreams plus a Flutter workstream, not as fabricated named case studies. The Mobile Applications filter shows an honest empty state until public Flutter case studies exist. The project gallery supports real cover images and screenshots; current covers are original abstract artwork, clearly not screenshots.

Two optional records, College Patro and Restaurant POS SaaS, remain `visible: false` until their details can be verified. To publish one, fill in real links, attribution, stack, and screenshots first.

### Themes

Dark is the default, with light mode available from the header. The preference is stored under `manoj-pathak-theme`; if no explicit choice exists, `prefers-color-scheme` decides. An inline head script sets the theme before paint, and `next-themes` keeps it in sync after hydration. Design tokens live in `app/globals.css` and `tailwind.config.ts`; `chalk` is foreground, `ink` is background, so both themes share one component vocabulary. The 3D scene adjusts fog, lights, materials, and canvas opacity per theme.

### Internationalization

English and Nepali dictionaries have identical structures. Missing Nepali strings fall back through the deep merge, but the test suite enforces parity and non-empty values. Blog metadata is bilingual; a full Nepali article body can be added as `article.ne.mdx`. Nepali uses Noto Sans Devanagari.

### Resume / CV

`/en/resume/` and `/ne/resume/` are print-optimized. `public/resume/manoj-pathak-cv.pdf` is generated from the English resume and served by the Download CV actions. Regenerate it when profile, experience, or education content changes:

```bash
npm run build
python3 -m http.server 4173 --directory out
# then print http://127.0.0.1:4173/en/resume/ to PDF with headless Chrome
```

Set `profile.resume.pdf` to `null` to fall back to the print route instead of a direct download.

### Blog

MDX frontmatter supports bilingual title, description, category, tags, date, featured, and related projects. Reading time and table of contents are generated from the body. Do not publish placeholder articles.

## 3D

The fixed home canvas is decorative and `aria-hidden`. Six scroll chapters cover introduction, about, skills, projects, experience, and contact. The scene is lazy-loaded, pauses when hidden, caps DPR, and has no shadows or post-processing. A complete CSS fallback is used for reduced motion or unavailable WebGL. Skills and projects remain available as semantic HTML links outside the canvas.

## SEO and accessibility

- Unique titles, descriptions, canonicals, Open Graph, and Twitter cards.
- English/Nepali `hreflang` and `x-default`.
- JSON-LD: `Person`, `WebSite`, `ProfilePage`, `BlogPosting`, `CreativeWork`, `BreadcrumbList`.
- Generated sitemap, robots, RSS, web manifest, and 16 OG images.
- Semantic headings, skip link, keyboard-operable tabs/menus, visible focus, 44px targets.
- Reduced motion disables the canvas and non-essential motion.
- Contrast is AA-oriented in both themes; content remains crawlable HTML.

No rankings, Lighthouse scores, client counts, or performance percentages are claimed.

## Contact form

Static hosting cannot send email securely. The contact page uses verified `mailto:`, WhatsApp, Instagram, and social links plus copy-email. To add an external form, set `NEXT_PUBLIC_CONTACT_FORM_URL` to an `https://` endpoint; otherwise no form is rendered.

## Deployment

Publish `out/` to any static host (Netlify, Cloudflare Pages, S3, GitHub Pages, Vercel). `trailingSlash: true` keeps directory URLs stable. `out/.nojekyll` is included for GitHub Pages. If the domain changes, update `profile.siteUrl`; canonicals, sitemap, and RDF follow it.

## Verification

`npm test` checks unique project slugs, bilingual completeness, hidden-record rules, employer attribution, role verification, education status, translation parity, article metadata, heading IDs, cover assets, skill-project references, required routes, and the CV PDF.

The production export was also checked in headless Chrome across all 32 localized routes, both themes, and desktop/mobile viewports, plus theme persistence, language switching, mobile-menu focus handling, reduced motion, JSON-LD, and the CV download. This browser pass is not part of the committed test suite; rerun it after substantial UI changes.
