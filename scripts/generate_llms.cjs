const {
  BASE_URL,
  getBlogSlugs,
  writeStaticAsset,
} = require('./site-manifest.cjs');
const { loadGeneratedBlogPosts } = require('./blog-data.cjs');
const productFacts = require('../client/src/data/product-facts.json');

const blogPosts = loadGeneratedBlogPosts();

function readPostMeta(slug) {
  return blogPosts.find((post) => post.slug === slug && post.language === 'en')
    || blogPosts.find((post) => post.slug === slug)
    || null;
}

function getPreferredPosts() {
  const preferredPosts = new Map();

  blogPosts.forEach((post) => {
    const existingPost = preferredPosts.get(post.slug);

    if (!existingPost || (existingPost.language !== 'en' && post.language === 'en')) {
      preferredPosts.set(post.slug, post);
    }
  });

  return [...preferredPosts.values()];
}

function generateLlmsTxt() {
  const keySlugs = [
    'best-habit-tracker-apps-2026',
    'how-many-days-to-build-a-habit',
    'how-to-build-habits-that-last',
    'digital-detox-screen-time-habits',
  ].filter((slug) => getBlogSlugs().includes(slug));

  const lines = [
    '# DropDrop',
    '',
    '> DropDrop is a bilingual habit-tracking product site focused on HRV-aware, gentle habit building. Use this file to discover the core product pages, trust pages, FAQ, and key habit-science articles.',
    '',
    'Important notes:',
    '- The site is available in English and Simplified Chinese.',
    '- Product guidance emphasizes evidence-informed habit building, HRV, mood, and activity signals rather than streak pressure.',
    '- For editorial and methodology details, prefer the dedicated trust pages linked below.',
    '',
    '## Product',
    `- [Home](${BASE_URL}/): Product overview and core positioning`,
    `- [FAQ](${BASE_URL}/faq): Product, pricing, privacy, and usage questions`,
    `- [Changelog](${BASE_URL}/changelog): Product release history`,
    '',
    '## Trust',
    `- [Editorial Policy](${BASE_URL}/editorial-policy): How content is researched, reviewed, and corrected`,
    `- [Research Methodology](${BASE_URL}/research-methodology): How claims are sourced and how product statements differ from science summaries`,
    `- [About](${BASE_URL}/about): Company mission and contact path`,
    '',
    '## Blog',
  ];

  keySlugs.forEach((slug) => {
    const post = readPostMeta(slug);
    if (!post) return;

    lines.push(`- [${post.title}](${BASE_URL}/blog/${slug}): ${post.description}`);
  });

  lines.push('', '## Optional', `- [llms-full.txt](${BASE_URL}/llms-full.txt): Expanded machine-readable context for assistants and agents`);

  return lines.join('\n');
}

function generateLlmsFullTxt() {
  const posts = getPreferredPosts()
    .sort((left, right) => new Date(right.datePublished) - new Date(left.datePublished));
  const sections = [
    '# DropDrop',
    '',
    '> Expanded context for AI assistants about DropDrop, its product, trust pages, FAQ, and major blog topics.',
    '',
    'DropDrop is a bilingual habit-tracking product positioned around gentle, state-aware habit building. It emphasizes HRV, mood, recovery, and activity data as decision inputs instead of treating every day as identical.',
    '',
    '## Product Summary',
    '- Core promise: help users build habits that fit their current physical and mental state.',
    '- Primary differentiator: bio-responsive suggestions using HRV, mood, and activity context.',
    '- Philosophy: long-term consistency over streak anxiety.',
    `- Availability: currently distributed through the App Store for ${productFacts.deviceAvailability.en}.`,
    `- Main product page: ${BASE_URL}/`,
    '',
    '## Pricing and Policies',
    '- DropDrop includes a free experience.',
    '- Current subscription and in-app purchase options should be taken from the App Store listing and in-app purchase screen, not from static site copy.',
    `- Pricing FAQ: ${BASE_URL}/faq`,
    `- Privacy policy: ${BASE_URL}/privacy`,
    `- Terms of service: ${BASE_URL}/terms`,
    '',
    '## FAQ Summary',
    '- Device availability should be treated as Apple-only based on the current App Store listing.',
    '- Subscription management and refunds are handled through the App Store.',
    '- Missing one day does not erase overall progress; the product philosophy favors consistency over perfection.',
    '- The public website is available in English and Simplified Chinese.',
    '',
    '## Trust Pages',
    `- Editorial Policy: ${BASE_URL}/editorial-policy`,
    `- Research Methodology: ${BASE_URL}/research-methodology`,
    `- About: ${BASE_URL}/about`,
    '',
    '## Methodology Summary',
    '- Priority sources: original research, institutional guidance, official platform docs, and first-party product information.',
    '- Comparison pages are evaluated using explicit dimensions such as reminders, analytics depth, sync support, recovery-awareness, and cost.',
    '- High-intent pages should expose visible references, review dates, reviewer metadata, and answer-first formatting for AI retrieval.',
    '',
    '## Key Blog Topics',
  ];

  posts.forEach((post) => {
    sections.push(`- ${post.title} — ${BASE_URL}/blog/${post.slug}`);
  });

  return sections.join('\n');
}

writeStaticAsset('llms.txt', generateLlmsTxt());
writeStaticAsset('llms-full.txt', generateLlmsFullTxt());

console.log('Generated llms.txt and llms-full.txt.');
