import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const output = path.join(process.cwd(), 'public', 'og');

const pages = [
  {
    file: 'home.png',
    label: 'PORTFOLIO / BEYOND THE CODE',
    title: 'Manoj Pathak',
    subtitle: 'Full Stack & Flutter Developer · Kathmandu, Nepal',
    accent: '#597BFF',
  },
  {
    file: 'projects.png',
    label: 'SELECTED WORK',
    title: 'Case studies, not screenshots.',
    subtitle: 'SaaS, web, e-commerce, mobile, and business builds.',
    accent: '#597BFF',
  },
  {
    file: 'experience.png',
    label: 'EXPERIENCE',
    title: 'Where I have worked.',
    subtitle: 'Full-stack development in Kathmandu, verified and documented.',
    accent: '#A88CFF',
  },
  {
    file: 'about.png',
    label: 'ABOUT',
    title: 'More Than Just Writing Code.',
    subtitle: 'Web, backend, and Flutter products — end to end.',
    accent: '#A88CFF',
  },
  {
    file: 'blog.png',
    label: 'BUILD LOGS / NOTES',
    title: 'Notes from the build.',
    subtitle: 'Multi-tenancy, order state, performance, and the web.',
    accent: '#597BFF',
  },
  {
    file: 'lab.png',
    label: 'LAB / EXPERIMENTS',
    title: 'Small experiments, real code.',
    subtitle: 'Interaction, motion, and CSS studies built for this site.',
    accent: '#A88CFF',
  },
  {
    file: 'contact.png',
    label: 'CONTACT',
    title: 'Let us build something great together.',
    subtitle: 'manojjj123123@gmail.com · Kathmandu, Nepal',
    accent: '#597BFF',
  },
  {
    file: 'resume.png',
    label: 'RESUME',
    title: 'Manoj Pathak',
    subtitle: 'Full Stack & Flutter Developer · Webcreation Nepal',
    accent: '#A88CFF',
  },
];

const projectPreviews = [
  ['cargo-gbl', 'Cargo GBL', 'Logistics and cargo website', '#597BFF'],
  ['gvs-nepal', 'GVS Nepal', 'Corporate website and content system', '#A88CFF'],
  [
    'school-management-system',
    'Multi-Tenant School Management',
    'SaaS · roles, attendance, exams, analytics',
    '#597BFF',
  ],
  ['news-portal', 'News Portal', 'Next.js and Laravel news platform', '#A88CFF'],
  ['ecommerce-platform', 'E-Commerce Platform', 'Products, orders, responsive storefront', '#597BFF'],
];

const articlePreviews = [
  [
    'multi-tenant-isolation-laravel',
    'Multi-tenant isolation in Laravel',
    'The parts that actually break',
    '#597BFF',
  ],
  [
    'static-export-3d-portfolio',
    'A 3D scene on a static export',
    'Lifecycle, performance, and fallbacks',
    '#A88CFF',
  ],
  [
    'idempotent-order-processing',
    'Idempotent order processing',
    'Unique keys, state machines, transactions',
    '#597BFF',
  ],
];

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrap(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function template({ label, title, subtitle, accent }) {
  const maxChars = title.length > 26 ? 24 : 20;
  const titleSize = title.length > 26 ? 58 : 74;
  const titleLines = wrap(title, maxChars).slice(0, 3);
  const subtitleLines = wrap(subtitle, 58).slice(0, 2);
  const titleTop = 300;
  const titleSpans = titleLines
    .map(
      (line, index) =>
        `<tspan x="72" dy="${index === 0 ? 0 : Math.round(titleSize * 1.04)}">${escapeXml(line)}</tspan>`,
    )
    .join('');
  const subtitleSpans = subtitleLines
    .map(
      (line, index) =>
        `<tspan x="72" dy="${index === 0 ? 0 : 30}">${escapeXml(line)}</tspan>`,
    )
    .join('');
  const subtitleY = titleTop + (titleLines.length - 1) * Math.round(titleSize * 1.04) + 58;
  const gridLines = Array.from({ length: 14 }, (_, index) => {
    const position = 80 + index * 80;
    return `<path d="M${position} 0V630"/><path d="M0 ${position}H1200"/>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="78%" cy="42%" r="52%">
      <stop offset="0" stop-color="${accent}" stop-opacity=".2"/>
      <stop offset="1" stop-color="#080B12" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#E9F1FF"/>
      <stop offset="1" stop-color="${accent}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#080B12"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g stroke="#E9F1FF" stroke-opacity=".035" fill="none">${gridLines}</g>
  <g fill="none" stroke="${accent}">
    <circle cx="980" cy="300" r="286" stroke-opacity=".12"/>
    <circle cx="980" cy="300" r="218" stroke-opacity=".14"/>
    <circle cx="980" cy="300" r="146" stroke-opacity=".18"/>
    <circle cx="980" cy="300" r="84" stroke-opacity=".22"/>
  </g>
  <rect x="944" y="264" width="72" height="72" fill="#0B1220" stroke="url(#mark)" stroke-opacity=".6" transform="rotate(45 980 300)"/>
  <circle cx="980" cy="300" r="4" fill="#E9F1FF" fill-opacity=".85"/>
  <g transform="translate(72 56)">
    <rect width="42" height="42" fill="none" stroke="#E9F1FF" stroke-opacity=".18"/>
    <text x="21" y="27" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="14" letter-spacing="-0.5" fill="#E9F1FF">MP</text>
  </g>
  <text x="130" y="82" font-family="ui-monospace, Menlo, monospace" font-size="12" letter-spacing="4" fill="#9CAAC2">${escapeXml(label)}</text>
  <text x="72" y="${titleTop}" font-family="Helvetica Neue, Arial, sans-serif" font-size="${titleSize}" font-weight="500" letter-spacing="-2.5" fill="#E9F1FF">${titleSpans}</text>
  <text x="72" y="${subtitleY}" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" fill="#9CAAC2">${subtitleSpans}</text>
  <path d="M72 548H1128" stroke="#E9F1FF" stroke-opacity=".12"/>
  <text x="72" y="588" font-family="ui-monospace, Menlo, monospace" font-size="12" letter-spacing="3" fill="#9CAAC2">PATHAKMANOJ.COM.NP</text>
  <text x="1128" y="588" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="12" letter-spacing="3" fill="#9CAAC2">FULL STACK &amp; FLUTTER</text>
  <rect x="72" y="500" width="56" height="2" fill="${accent}"/>
</svg>`;
}

async function render(relativePath, data) {
  const file = path.join(output, relativePath);
  await mkdir(path.dirname(file), { recursive: true });
  const svg = template(data);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(file);
}

const jobs = [
  ...pages.map((page) => ({ file: page.file, data: page })),
  ...projectPreviews.map(([slug, title, subtitle, accent]) => ({
    file: `projects/${slug}.png`,
    data: {
      label: 'CASE STUDY / PROJECT',
      title,
      subtitle,
      accent,
    },
  })),
  ...articlePreviews.map(([slug, title, subtitle, accent]) => ({
    file: `blog/${slug}.png`,
    data: {
      label: 'BUILD LOG / ARTICLE',
      title,
      subtitle,
      accent,
    },
  })),
];

for (const job of jobs) {
  await render(job.file, job.data);
}

console.log(`Generated ${jobs.length} social preview images in public/og.`);
