const fs = require('fs');
const path = require('path');

const posts = [
  // --- 2026 & Trends ---
  {
    slug: 'best-habit-tracker-apps-2026',
    title: {
      en: 'Top 10 Best Habit Tracker Apps for 2026: The Ultimate Guide',
      zh: '2026 年 10 款最佳习惯追踪 App 推荐：终极指南'
    },
    desc: {
      en: 'Discover the top rated habit trackers for 2026. Compare features, pricing, and find the perfect tool to reach your goals.',
      zh: '盘点 2026 年最值得使用的习惯追踪应用。对比功能、价格，帮你找到实现目标的最佳工具。'
    },
    category: 'Guides',
    tags: ['2026 habit tracker', 'productivity', 'best apps']
  },
  {
    slug: 'planner-with-habit-tracker-2026',
    title: {
      en: 'How to Setup Your Digital Planner with Habit Tracker for 2026',
      zh: '如何为 2026 年设置你的数字化习惯规划表'
    },
    desc: {
      en: 'Combine planning and tracking. Learn how to structure your 2026 goals using a digital planner with built-in habit tracking.',
      zh: '将规划与追踪结合。学习如何使用带有习惯追踪功能的数字化工具来构建你的 2026 年目标。'
    },
    category: 'Productivity',
    tags: ['planner with habit tracker 2026', 'goal setting', 'organization']
  },
  {
    slug: 'habit-tracker-printable-vs-app',
    title: {
      en: '2026 Habit Tracker: Printable PDF vs. Mobile App',
      zh: '2026 习惯追踪：纸质打印版 vs 手机 App，哪个更好？'
    },
    desc: {
      en: 'Still using printables? Here is why switching to a smart habit tracker app like DropDrop is the best move for 2026.',
      zh: '还在用纸质打卡表？本文将分析为什么在 2026 年，切换到 DropDrop 这样的智能 App 是更好的选择。'
    },
    category: 'Comparisons',
    tags: ['2026 habit tracker printable', 'digital transformation', 'efficiency']
  },
  // --- Android & Google Play ---
  {
    slug: 'best-habit-tracker-app-for-android',
    title: {
      en: 'The Best Habit Tracker App for Android in 2026',
      zh: '2026 年 Android 平台最佳习惯追踪应用推荐'
    },
    desc: {
      en: 'Looking for the best habit tracker on Google Play? Discover why DropDrop is the top choice for Android users.',
      zh: '正在 Google Play 寻找最好的习惯追踪器？了解为什么 DropDrop 是 Android 用户的首选。'
    },
    category: 'Android',
    tags: ['best habit tracker app for android', 'google play', 'android apps']
  },
  {
    slug: 'top-google-play-productivity-apps',
    title: {
      en: 'Must-Have Productivity Apps from Google Play in 2026',
      zh: '2026 年 Google Play 必装的效率类应用'
    },
    desc: {
      en: 'Boost your efficiency with these top-rated apps from the Google Play Store.',
      zh: '通过这些 Google Play 商店的高分应用，全面提升你的生活和工作效率。'
    },
    category: 'Android',
    tags: ['google play', 'productivity', 'android']
  },
  // --- Competitors (HabitKit) ---
  {
    slug: 'dropdrop-vs-habitkit',
    title: {
      en: 'DropDrop vs. HabitKit: Which Habit Tracker is Right for You?',
      zh: 'DropDrop vs. HabitKit：哪个习惯追踪器更适合你？'
    },
    desc: {
      en: 'A detailed comparison between DropDrop and HabitKit. Features, aesthetics, and methodology.',
      zh: 'DropDrop 与 HabitKit 的详细对比。从功能、设计美学到核心理念的深度分析。'
    },
    category: 'Comparisons',
    tags: ['habitkit', 'app comparison', 'reviews']
  },
  {
    slug: 'habitkit-alternatives-2026',
    title: {
      en: 'Top 5 HabitKit Alternatives to Try in 2026',
      zh: '2026 年值得尝试的 5 款 HabitKit 替代应用'
    },
    desc: {
      en: 'Love the grid style but want more insights? Check out these amazing alternatives to HabitKit.',
      zh: '喜欢网格风格但想要更多数据洞察？来看看这些 HabitKit 的优秀替代品。'
    },
    category: 'Comparisons',
    tags: ['habitkit', 'alternatives', 'habit tracker']
  },
  // --- Science & Methodology ---
  {
    slug: 'science-of-habit-tracking-software',
    title: {
      en: 'The Science Behind Habit Tracker Software: How It Rewires Your Brain',
      zh: '习惯记录软件背后的科学：它如何重塑你的大脑'
    },
    desc: {
      en: 'Understanding the psychology of feedback loops and how software automates habit formation.',
      zh: '了解反馈循环的心理学原理，以及软件如何自动化地辅助习惯养成。'
    },
    category: 'Science',
    tags: ['habit tracker software', 'psychology', 'brain science']
  },
  {
    slug: 'hrv-and-habits',
    title: {
      en: 'Why HRV is the Future of Habit Tracking',
      zh: '为什么 HRV (心率变异性) 是习惯追踪的未来'
    },
    desc: {
      en: 'Move beyond simple check-ins. Learn how physiological data like HRV can optimize your daily routine.',
      zh: '超越简单的打卡。了解 HRV 等生理数据如何优化你的日常生活节奏。'
    },
    category: 'Science',
    tags: ['hrv', 'health', 'advanced tracking']
  },
  {
    slug: 'gentle-discipline-guide',
    title: {
      en: 'Gentle Discipline: A New Approach to Consistency',
      zh: '温和自律：一种保持一致性的新方法'
    },
    desc: {
      en: 'Stop forcing yourself. Discover the power of gentle discipline and flow-based productivity.',
      zh: '停止强迫自己。探索温和自律和顺流而行的力量。'
    },
    category: 'Mindset',
    tags: ['mindfulness', 'mental health', 'discipline']
  },
  // --- Specific Habits ---
  {
    slug: '5-habits-to-start-january-2026',
    title: {
      en: '5 Essential Habits to Start in January 2026',
      zh: '2026 年 1 月你应该开始的 5 个关键习惯'
    },
    desc: {
      en: 'Kickstart the new year with these transformative daily habits.',
      zh: '用这几个能带来改变的日常习惯，开启你的新一年。'
    },
    category: 'Lifestyle',
    tags: ['2026', 'new year resolutions', 'january']
  },
  {
    slug: 'morning-routine-success',
    title: {
      en: 'Building the Perfect Morning Routine with a Habit Tracker',
      zh: '利用习惯追踪器构建完美的晨间流程'
    },
    desc: {
      en: 'How to structure your first hour of the day for maximum success.',
      zh: '如何规划你一天的第一个小时，以获得最大的成功。'
    },
    category: 'Lifestyle',
    tags: ['morning routine', 'success', 'productivity']
  },
  // --- Tips & Tutorials ---
  {
    slug: 'minimalist-habit-tracking',
    title: {
      en: 'Minimalist Habit Tracking: Less is More',
      zh: '极简主义习惯追踪：少即是多'
    },
    desc: {
      en: 'Why tracking too many habits leads to burnout, and how to simplify.',
      zh: '为什么追踪太多习惯会导致倦怠？如何简化你的系统。'
    },
    category: 'Tips',
    tags: ['minimalism', 'focus', 'simplicity']
  },
  {
    slug: 'how-to-use-dropdrop',
    title: {
      en: 'Getting Started with DropDrop: Your First 7 Days',
      zh: 'DropDrop 新手指南：你的前 7 天'
    },
    desc: {
      en: 'A step-by-step guide to setting up your first habits and understanding your energy score.',
      zh: '一步步教你设置第一个习惯，并理解你的能量分数。'
    },
    category: 'Guides',
    tags: ['tutorial', 'dropdrop', 'onboarding']
  },
  {
    slug: 'habit-stacking-guide',
    title: {
      en: 'Habit Stacking 101: The Secret to Lasting Change',
      zh: '习惯叠加法入门：持久改变的秘密'
    },
    desc: {
      en: 'Learn how to link new habits to existing ones for effortless adoption.',
      zh: '学习如何将新习惯与旧习惯链接，毫不费力地养成新行为。'
    },
    category: 'Tips',
    tags: ['habit stacking', 'james clear', 'methods']
  },
  // --- Niche ---
  {
    slug: 'adhd-habit-tracker-2026',
    title: {
      en: 'Best Habit Trackers for ADHD in 2026',
      zh: '2026 年最适合 ADHD (注意力缺陷) 的习惯追踪器'
    },
    desc: {
      en: 'Features to look for if you struggle with focus and consistency.',
      zh: '如果你受困于专注力和持续性，这些 App 功能对你至关重要。'
    },
    category: 'Wellness',
    tags: ['adhd', 'focus', 'mental health']
  },
  {
    slug: 'student-habit-planner',
    title: {
      en: 'The Ultimate Student Habit Planner for 2026',
      zh: '2026 年终极学生习惯规划指南'
    },
    desc: {
      en: 'Balancing study, sleep, and social life with a smart tracker.',
      zh: '利用智能追踪器平衡学习、睡眠和社交生活。'
    },
    category: 'Students',
    tags: ['students', 'study', 'education']
  },
  {
    slug: 'fitness-habit-tracking',
    title: {
      en: 'Tracking Fitness Goals: Beyond Just Step Counting',
      zh: '追踪健身目标：不仅仅是计步'
    },
    desc: {
      en: 'How to use a habit tracker to build a consistent workout routine.',
      zh: '如何使用习惯追踪器建立持续的锻炼流程。'
    },
    category: 'Fitness',
    tags: ['fitness', 'workout', 'health']
  },
  {
    slug: 'mindfulness-tracking',
    title: {
      en: 'Tracking Mindfulness: Making Meditation a Daily Habit',
      zh: '追踪正念：让冥想成为日常习惯'
    },
    desc: {
      en: 'Using technology to build a calmer, more present mind.',
      zh: '利用科技建立更平静、更专注的心态。'
    },
    category: 'Wellness',
    tags: ['meditation', 'mindfulness', 'calm']
  },
  {
    slug: 'digital-detox-habits',
    title: {
      en: 'Digital Detox: Using a Habit Tracker to Reduce Screen Time',
      zh: '数字排毒：用习惯追踪器减少屏幕时间'
    },
    desc: {
      en: 'Ironically, the best way to reduce phone usage might be a smart app.',
      zh: '讽刺的是，减少手机使用的最好方法可能正是一个智能 App。'
    },
    category: 'Wellness',
    tags: ['digital detox', 'screen time', 'wellness']
  }
];

// Helper to generate generic but SEO-rich content
function generateContent(post, lang) {
  const isEn = lang === 'en';
  const keyword = post.tags[0];
  
  if (isEn) {
    return `
<p>As we approach <strong>${new Date().getFullYear() + 1}</strong>, the landscape of personal development is evolving. One of the most trending topics is the <strong>${keyword}</strong>.</p>

<h2>Why ${post.title.en} Matters</h2>
<p>Building consistent habits is the cornerstone of success. Whether you are looking for a <strong>${keyword}</strong> or simply trying to improve your daily routine, choosing the right tool is essential.</p>

<h3>Key Features to Look For</h3>
<ul>
  <li><strong>Simplicity:</strong> A cluttered interface creates friction.</li>
  <li><strong>Data Insights:</strong> Look for apps like DropDrop that offer HRV analysis.</li>
  <li><strong>Cross-Platform:</strong> Essential for Android and iOS users.</li>
</ul>

<h2>The Rise of Smart Tracking</h2>
<p>In 2026, static PDF printables are being replaced by dynamic software. Apps like <strong>DropDrop</strong> adapt to your energy levels, unlike rigid paper trackers.</p>

<h3>Why Choose DropDrop?</h3>
<p>DropDrop stands out because it combines scientific data with gentle encouragement. Instead of breaking your streak when you are sick, it helps you recover.</p>

<h2>Conclusion</h2>
<p>Start your journey today. Don't wait for the perfect moment.</p>
    `.trim();
  } else {
    return `
<p>随着我们迈向 <strong>${new Date().getFullYear() + 1}</strong> 年，个人成长的领域正在发生变化。最热门的话题之一就是 <strong>${post.tags[0]}</strong>。</p>

<h2>为什么"${post.title.zh}"很重要？</h2>
<p>建立持续的习惯是成功的基石。无论你是在寻找<strong>${post.tags[0]}</strong>，还是仅仅想改善你的日常生活，选择正确的工具都至关重要。</p>

<h3>寻找的关键功能</h3>
<ul>
  <li><strong>简洁性：</strong> 复杂的界面会产生阻力。</li>
  <li><strong>数据洞察：</strong> 寻找像 DropDrop 这样提供 HRV 分析的 App。</li>
  <li><strong>跨平台：</strong> 对于 Android 和 iOS 用户都至关重要。</li>
</ul>

<h2>智能追踪的兴起</h2>
<p>在 2026 年，静态的 PDF 打印版正在被动态软件所取代。像 <strong>DropDrop</strong> 这样的应用会适应你的能量水平，这与死板的纸质追踪器不同。</p>

<h3>为什么选择 DropDrop？</h3>
<p>DropDrop 之所以脱颖而出，是因为它结合了科学数据和温和的鼓励。它不会在你生病时打断你的连续记录，而是帮助你恢复。</p>

<h2>结论</h2>
<p>今天就开始你的旅程。不要等待完美的时刻。</p>
    `.trim();
  }
}

// Generate Files
const baseDir = path.join(__dirname, '../client/src/content/blog');

posts.forEach((post, index) => {
  // Generate EN
  const enDir = path.join(baseDir, 'en');
  if (!fs.existsSync(enDir)) fs.mkdirSync(enDir, { recursive: true });
  
  const enContent = `--- 
title: "${post.title.en}"
description: "${post.desc.en}"
date: "2026-01-${String(index + 1).padStart(2, '0')}"
author: "DropDrop Team"
image: "/images/logo.png"
category: "${post.category}"
tags:
${post.tags.map(t => `  - ${t}`).join('\n')}
readTime: ${Math.floor(Math.random() * 5) + 3}
---

${generateContent(post, 'en')}
`;
  fs.writeFileSync(path.join(enDir, `${post.slug}.md`), enContent);

  // Generate ZH
  const zhDir = path.join(baseDir, 'zh');
  if (!fs.existsSync(zhDir)) fs.mkdirSync(zhDir, { recursive: true });

  const zhContent = `--- 
title: "${post.title.zh}"
description: "${post.desc.zh}"
date: "2026-01-${String(index + 1).padStart(2, '0')}"
author: "DropDrop Team"
image: "/images/logo.png"
category: "${post.category}"
tags:
${post.tags.map(t => `  - ${t}`).join('\n')}
readTime: ${Math.floor(Math.random() * 5) + 3}
---

${generateContent(post, 'zh')}
`;
  fs.writeFileSync(path.join(zhDir, `${post.slug}.md`), zhContent);
});

console.log("Generated ${posts.length * 2} blog posts successfully.");
