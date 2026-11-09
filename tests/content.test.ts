import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { projects, publicProjects, featuredProjects, workstreams } from '../content/projects.ts';
import {
  education,
  experience,
  publicExperience,
} from '../content/experience.ts';
import { skillClusters } from '../content/skills.ts';
import {
  getAllPosts,
  getTableOfContents,
  localizePost,
} from '../content/blog.ts';
import { locales } from '../content/types.ts';

const root = process.cwd();
const readJson = (file: string) =>
  JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, nested]) => [key, shape(nested)]),
    );
  }
  return typeof value;
}

function collectStrings(value: unknown, output: string[] = []): string[] {
  if (typeof value === 'string') output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, output));
  else if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => collectStrings(item, output));
  }
  return output;
}

test('visible project records are complete and uniquely identified', () => {
  const slugs = publicProjects.map((project) => project.slug);
  assert.equal(new Set(slugs).size, slugs.length, 'project slugs must be unique');
  assert.ok(publicProjects.length >= 5, 'expected at least five public projects');

  for (const project of publicProjects) {
    for (const locale of locales) {
      assert.ok(project.summary[locale]?.trim(), `${project.slug} summary missing ${locale}`);
      assert.ok(project.description[locale]?.trim(), `${project.slug} description missing ${locale}`);
      assert.ok(project.role[locale]?.trim(), `${project.slug} role missing ${locale}`);
      assert.ok(project.challenge[locale]?.trim(), `${project.slug} challenge missing ${locale}`);
      assert.ok(project.solution[locale]?.trim(), `${project.slug} solution missing ${locale}`);
      assert.ok(project.seoTitle[locale]?.trim(), `${project.slug} SEO title missing ${locale}`);
      assert.ok(project.seoDescription[locale]?.trim(), `${project.slug} SEO description missing ${locale}`);
    }
    for (const feature of project.features) {
      assert.ok(feature.en.trim() && feature.ne.trim());
    }
    for (const layer of project.architecture) {
      assert.ok(layer.name.en.trim() && layer.name.ne.trim());
      assert.ok(layer.detail.en.trim() && layer.detail.ne.trim());
    }
  }
});

test('projects keep their real employer attribution', () => {
  const shaktaSlugs = ['cargo-gbl', 'gvs-nepal', 'ecommerce-platform', 'news-portal', 'school-management-system'];
  for (const slug of shaktaSlugs) {
    const project = publicProjects.find((item) => item.slug === slug);
    assert.ok(project, `missing Shakta project ${slug}`);
    assert.equal(project.employer, 'Shakta Technology');
    assert.ok(project.contributions?.length, `${slug} should list contributions`);
    assert.equal(project.category === 'mobile', false, `${slug} is not a mobile project`);
  }
  assert.ok(workstreams.length >= 4, 'expected current workstream groups');
  for (const stream of workstreams) {
    assert.equal(stream.employer, 'Webcreation Nepal');
    assert.ok(stream.title.en.trim() && stream.title.ne.trim());
    assert.ok(stream.summary.en.trim() && stream.summary.ne.trim());
  }
});

test('hidden project records never leak into the public list', () => {
  const hidden = projects.filter((project) => !project.visible);
  assert.ok(hidden.length >= 1, 'optional projects should remain in the data');
  for (const project of hidden) {
    assert.equal(
      publicProjects.some((item) => item.slug === project.slug),
      false,
      `${project.slug} is hidden but published`,
    );
  }
  for (const project of publicProjects) {
    assert.equal(project.visible, true);
  }
});

test('featured projects are a valid, ordered subset', () => {
  assert.ok(featuredProjects.length >= 3);
  for (const project of featuredProjects) {
    assert.equal(project.visible, true);
    assert.equal(project.featured, true);
  }
  const orders = featuredProjects.map((project) => project.order);
  assert.deepEqual(orders, [...orders].sort((a, b) => a - b));
});

test('all public links are absolute https URLs', () => {
  for (const project of publicProjects) {
    for (const link of Object.values(project.links)) {
      if (!link) continue;
      assert.match(link, /^https:\/\/[^\s]+$/, `${project.slug} has an invalid link`);
      assert.equal(link.includes('example.com'), false);
    }
  }
});

test('every referenced cover image exists', () => {
  for (const project of projects) {
    const asset = path.join(root, 'public', project.cover.replace(/^\//, ''));
    assert.equal(fs.existsSync(asset), true, `missing cover ${project.cover}`);
  }
  for (const project of projects) {
    for (const screenshot of project.screenshots) {
      const asset = path.join(root, 'public', screenshot.replace(/^\//, ''));
      assert.equal(fs.existsSync(asset), true, `missing screenshot ${screenshot}`);
    }
  }
});

test('experience publishes only verified roles and one current role', () => {
  assert.ok(publicExperience.length >= 1);
  for (const role of publicExperience) {
    assert.equal(role.visible, true);
    assert.equal(role.verified, true);
    assert.ok(role.summary.en.trim() && role.summary.ne.trim());
    assert.ok(role.responsibilities.length > 0);
  }
  assert.ok(
    publicExperience.filter((role) => role.current).length <= 1,
    'only one current role may be published',
  );
  const unverified = experience.filter((role) => !role.verified);
  for (const role of unverified) {
    assert.equal(role.visible, false, 'unverified roles must stay hidden');
  }
  const firstEducation = education[0];
  assert.ok(firstEducation);
  assert.match(firstEducation.qualification.en, /Bachelor of Computer Applications/i);
  assert.match(firstEducation.status.en, /8th semester/i);
  assert.equal(education.length >= 2, true, 'expected both verified education records');
});

test('English and Nepali dictionaries have identical structure and no blanks', () => {
  const en = readJson('content/translations/en.json');
  const ne = readJson('content/translations/ne.json');
  assert.deepEqual(shape(ne), shape(en));
  for (const value of [...collectStrings(en), ...collectStrings(ne)]) {
    assert.ok(value.trim().length > 0, 'dictionary contains an empty string');
  }
});

test('articles have bilingual metadata, valid dates, and unique headings', () => {
  const files = fs
    .readdirSync(path.join(root, 'content', 'blog'))
    .filter((file) => file.endsWith('.mdx'));
  assert.ok(files.length >= 3, 'expected at least three articles');

  const slugs = new Set();
  for (const file of files) {
    const raw = fs.readFileSync(path.join(root, 'content', 'blog', file), 'utf8');
    const { data, content } = matter(raw);
    assert.ok(data.title?.trim(), `${file} missing title`);
    assert.ok(data.titleNe?.trim(), `${file} missing titleNe`);
    assert.ok(data.description?.trim(), `${file} missing description`);
    assert.ok(data.descriptionNe?.trim(), `${file} missing descriptionNe`);
    assert.ok(data.category?.trim() && data.categoryNe?.trim());
    assert.match(String(data.date), /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(Array.isArray(data.tags) && data.tags.length > 0);
    assert.ok(Array.isArray(data.relatedProjects));
    assert.ok(content.trim().length > 500, `${file} body is too short`);
    assert.equal(slugs.has(file), false);
    slugs.add(file);

    const toc = getTableOfContents(content);
    assert.ok(toc.length >= 3, `${file} has too few headings`);
    assert.equal(new Set(toc.map((item) => item.id)).size, toc.length, `${file} has duplicate heading ids`);
  }

  const posts = getAllPosts();
  assert.equal(posts.length, files.length);
  for (const post of posts) {
    const localized = localizePost(post, 'ne');
    assert.ok(localized.title.trim());
    assert.equal(typeof localized.isFallback, 'boolean');
    assert.ok(localized.content.trim().length > 500);
  }
});

test('skills clusters reference published projects', () => {
  const published = new Set(publicProjects.map((project) => project.slug));
  for (const cluster of skillClusters) {
    assert.ok(cluster.label.en.trim() && cluster.label.ne.trim());
    assert.ok(cluster.skills.length > 0);
    for (const slug of cluster.relatedProjects) {
      assert.equal(published.has(slug), true, `unknown related project ${slug}`);
    }
  }
});

test('required route files and social images exist', () => {
  const routes = ['projects', 'experience', 'about', 'blog', 'lab', 'contact', 'resume'];
  for (const route of routes) {
    const file = path.join(root, 'app', '[locale]', route, 'page.tsx');
    assert.equal(fs.existsSync(file), true, `missing route ${route}`);
  }
  assert.equal(fs.existsSync(path.join(root, 'app', '[locale]', 'layout.tsx')), true);
  assert.equal(fs.existsSync(path.join(root, 'app', '[locale]', 'projects', '[slug]', 'page.tsx')), true);
  assert.equal(fs.existsSync(path.join(root, 'app', '[locale]', 'blog', '[slug]', 'page.tsx')), true);
  assert.equal(fs.existsSync(path.join(root, 'public', 'favicon.svg')), true);
  const cv = path.join(root, 'public', 'resume', 'manoj-pathak-cv.pdf');
  assert.equal(fs.existsSync(cv), true, 'missing generated CV download');
  assert.ok(fs.statSync(cv).size > 100000, 'CV download is unexpectedly small');
});

test('no fabricated contact details beyond the supplied profile', () => {
  const profile = fs.readFileSync(path.join(root, 'content', 'profile.ts'), 'utf8');
  assert.match(profile, /manojjj123123@gmail\.com/);
  assert.match(profile, /\+977 9813405728/);
  assert.match(profile, /wa\.me\/9779813405728/);
  assert.match(profile, /instagram\.com\/manoj_pathak_ig/);
  assert.match(profile, /github\.com\/manoj-pathak-07/);
  assert.equal(/testimonial/i.test(profile), false);
});
