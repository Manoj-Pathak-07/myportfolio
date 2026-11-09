import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const out = path.join(process.cwd(), 'out');
await mkdir(out, { recursive: true });

const index = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Manoj Pathak — Full Stack Developer</title>
  <meta name="description" content="Portfolio of Manoj Pathak, a full stack developer in Kathmandu, Nepal." />
  <link rel="canonical" href="https://pathakmanoj.com.np/en/" />
  <meta http-equiv="refresh" content="0; url=/en/" />
  <meta name="robots" content="noindex" />
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px;
      background: #080B12; color: #E9F1FF; font-family: "Helvetica Neue", Arial, sans-serif; }
    main { width: min(560px, 100%); border-top: 1px solid rgba(233,241,255,.12); padding-top: 28px; }
    .mark { width: 40px; height: 40px; display: grid; place-items: center; border: 1px solid rgba(233,241,255,.2);
      font-family: ui-monospace, Menlo, monospace; font-size: 11px; letter-spacing: .08em; margin-bottom: 40px; }
    p.eyebrow { font-family: ui-monospace, Menlo, monospace; font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
      color: #9CAAC2; margin: 0 0 16px; }
    h1 { font-size: clamp(2rem, 7vw, 3.2rem); line-height: 1; letter-spacing: -.04em; font-weight: 500; margin: 0 0 18px; }
    p.lead { color: #9CAAC2; font-size: 14px; line-height: 1.7; margin: 0 0 32px; max-width: 42ch; }
    .links { display: flex; flex-wrap: wrap; gap: 10px; }
    a.primary, a.secondary { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 22px;
      font-size: 13px; text-decoration: none; }
    a.primary { background: #E9F1FF; color: #080B12; }
    a.secondary { border: 1px solid rgba(233,241,255,.18); color: #E9F1FF; }
    footer { margin-top: 48px; font-family: ui-monospace, Menlo, monospace; font-size: 10px; letter-spacing: .16em;
      text-transform: uppercase; color: #9CAAC2; opacity: .6; }
  </style>
</head>
<body>
  <main>
    <div class="mark" aria-hidden="true">MP</div>
    <p class="eyebrow">Full Stack Developer · Kathmandu, Nepal</p>
    <h1>Beyond the code.</h1>
    <p class="lead">Choose a language to enter the portfolio. English is the default; Nepali is fully supported.</p>
    <div class="links">
      <a class="primary" href="/en/">Enter in English</a>
      <a class="secondary" href="/ne/" lang="ne">नेपालीमा खोल्नुहोस्</a>
    </div>
    <footer>pathakmanoj.com.np</footer>
  </main>
</body>
</html>
`;

const notFound = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Page not found — Manoj Pathak</title>
  <meta name="robots" content="noindex" />
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px;
      background: #080B12; color: #E9F1FF; font-family: "Helvetica Neue", Arial, sans-serif; }
    main { width: min(560px, 100%); border-top: 1px solid rgba(233,241,255,.12); padding-top: 28px; }
    p.eyebrow { font-family: ui-monospace, Menlo, monospace; font-size: 10px; letter-spacing: .22em; color: #597BFF; margin: 0 0 16px; }
    h1 { font-size: clamp(2rem, 7vw, 3.2rem); line-height: 1; letter-spacing: -.04em; font-weight: 500; margin: 0 0 18px; }
    p { color: #9CAAC2; font-size: 14px; line-height: 1.7; margin: 0 0 30px; }
    .links { display: flex; flex-wrap: wrap; gap: 10px; }
    a { display: inline-flex; min-height: 46px; align-items: center; padding: 0 22px; font-size: 13px; text-decoration: none; }
    a.primary { background: #E9F1FF; color: #080B12; }
    a.secondary { border: 1px solid rgba(233,241,255,.18); color: #E9F1FF; }
  </style>
</head>
<body>
  <main>
    <p class="eyebrow">404 / ROUTE NOT FOUND</p>
    <h1>This route doesn't resolve.</h1>
    <p>The page has moved or never existed. The rest of the site is still here. यो पृष्ठ भेटिएन।</p>
    <div class="links">
      <a class="primary" href="/en/">English home</a>
      <a class="secondary" href="/ne/" lang="ne">नेपाली गृहपृष्ठ</a>
    </div>
  </main>
</body>
</html>
`;

await writeFile(path.join(out, 'index.html'), index, 'utf8');
await writeFile(path.join(out, '404.html'), notFound, 'utf8');
await writeFile(path.join(out, '.nojekyll'), '', 'utf8');
console.log('Postbuild: wrote out/index.html, out/404.html, and out/.nojekyll.');
