
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { breadcrumbSchema } from '@/lib/structuredData';

interface LocalizedText {
    zh: string;
    en: string;
}

interface ReleaseNote {
    version: string;
    date: string;
    title: LocalizedText;
    features: { type: 'new' | 'fix' | 'improve'; desc: LocalizedText }[];
}

export default function Changelog() {
    const { t, language } = useLanguage();

    const releases: ReleaseNote[] = [
        {
            version: '1.0.6',
            date: '2026-03-21',
            title: {
                zh: 'Spark Gallery 细节打磨',
                en: 'Spark Gallery polish'
            },
            features: [
                {
                    type: 'improve',
                    desc: {
                        zh: '精简 My Sparks 顶部筛选标签的视觉比例，让整行看起来更轻、更克制。',
                        en: 'Refined the My Sparks filter tags with a slimmer and lighter visual style.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '优化标签间距、字重与字号，并弱化选中态填充，使浏览体验更优雅。',
                        en: 'Improved chip spacing, typography, and selected-state polish for a more elegant browsing experience.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '在更紧凑的视觉高度下，保留了筛选标签的点击舒适度。',
                        en: 'Kept tap comfort while making the filter row visually more compact.'
                    }
                },
                {
                    type: 'fix',
                    desc: {
                        zh: '更新版本元数据与应用内版本展示，确保 1.0.6 发布信息显示正确。',
                        en: 'Updated release metadata and in-app version records to surface 1.0.6 correctly.'
                    }
                },
            ]
        },
        {
            version: '1.0.5',
            date: '2026-02-10',
            title: {
                zh: '计划、HRV 与个性化推荐',
                en: 'Plans, HRV, and smarter guidance'
            },
            features: [
                {
                    type: 'new',
                    desc: {
                        zh: '新增「计划」功能，提供更结构化的习惯养成方案，帮助用户按目标推进。',
                        en: 'Added Plans, giving users curated, goal-oriented habit-building programs.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '接入 HRV 监测，可结合 Health 数据查看压力与恢复趋势。',
                        en: 'Introduced HRV monitoring with Health data to surface stress and recovery trends.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '加入个性化习惯推荐，降低新用户开始时的选择成本。',
                        en: 'Added personalized habit recommendations for easier onboarding.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '优化情绪记录触发频率，加入更克制的冷却机制，减少打扰。',
                        en: 'Improved mood tracking with a non-intrusive cooldown system.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '细化习惯详情页和打卡过渡动画，整体体验更顺滑。',
                        en: 'Polished the habit detail page and check-in transitions for a smoother experience.'
                    }
                },
            ]
        },
        {
            version: '1.0.4',
            date: '2026-01-10',
            title: {
                zh: '主题、进阶统计与云同步',
                en: 'Themes, advanced analytics, and cloud sync'
            },
            features: [
                {
                    type: 'new',
                    desc: {
                        zh: '支持自定义主题和更丰富的视觉配色，让习惯拥有更鲜明的个性化外观。',
                        en: 'Added custom themes and richer color personalization for habits.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '上线 Advanced Stats 页面，提供完成率、趋势、周模式与时间分布等更深层统计。',
                        en: 'Added an Advanced Stats page with completion trends, weekly patterns, and time-of-day insights.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: 'Pro 会员支持云同步、自动备份与跨设备恢复。',
                        en: 'Added cloud sync, backup, and restore for Pro members.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '优化习惯详情页，加入补打卡、日期标签可读性提升和更清晰的日历指示。',
                        en: 'Improved habit details with retroactive check-ins, clearer date labels, and better calendar indicators.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '统计总览默认打开周视图，并改善单习惯与多习惯场景下的布局可读性。',
                        en: 'Refined the statistics overview with a weekly default view and better readability.'
                    }
                },
            ]
        },
        {
            version: '1.0.3',
            date: '2025-11-22',
            title: {
                zh: '免费 Premium 试用与稳定性强化',
                en: 'Free Premium trial and stability improvements'
            },
            features: [
                {
                    type: 'new',
                    desc: {
                        zh: '推出限时 14 天高级版免费试用，让用户可以无门槛体验完整功能。',
                        en: 'Launched a limited 14-day free Premium trial with full feature access.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '更新 UI 细节与交互流畅度，整体使用更顺手。',
                        en: 'Refined the UI and interaction flow for a smoother experience.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '提升性能与响应速度，日常使用更快更稳。',
                        en: 'Improved app performance and responsiveness.'
                    }
                },
                {
                    type: 'fix',
                    desc: {
                        zh: '进行系统稳定性优化，减少使用过程中的异常情况。',
                        en: 'Applied stability updates for better reliability.'
                    }
                },
            ]
        },
        {
            version: '1.0.2',
            date: '2025-10-30',
            title: {
                zh: '动画、统计与同步体验优化',
                en: 'Smoother tracking, better stats, and faster sync'
            },
            features: [
                {
                    type: 'improve',
                    desc: {
                        zh: '习惯追踪动画更顺滑，打卡过程更轻快。',
                        en: 'Improved habit tracking with smoother animations.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '统计数据可视化更清晰，洞察更直观。',
                        en: 'Enhanced statistics visualization for clearer insights.'
                    }
                },
                {
                    type: 'fix',
                    desc: {
                        zh: '修复已知问题并进行常规性能优化。',
                        en: 'Fixed known issues and improved overall performance.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '优化数据同步流程，让更新更快。',
                        en: 'Optimized sync for faster data updates.'
                    }
                },
            ]
        },
        {
            version: '1.0.0',
            date: '2025-09-06',
            title: {
                zh: '首次公开发布',
                en: 'Public launch'
            },
            features: [
                {
                    type: 'new',
                    desc: {
                        zh: '上线时间轴模式，更直观地查看一天内的所有习惯。',
                        en: 'Launched Timeline Mode for an at-a-glance view of the day’s habits.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '健康页升级，支持健康分趋势查看，并可基于状态推荐习惯与计划。',
                        en: 'Introduced an upgraded Health page with score trends and habit or plan recommendations.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '扩充习惯与计划模板库，降低创建门槛。',
                        en: 'Expanded the habit and plan library with more ready-to-use templates.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '加入周报与月报维度的健康因子和趋势报告。',
                        en: 'Added weekly and monthly health factor trend reports.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '增加久坐、喝水等智能健康提醒。',
                        en: 'Added smart health reminders for sitting, hydration, and similar behaviors.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '完善周期与归档管理，复盘和长期跟踪更方便。',
                        en: 'Improved cycle and archive management for easier long-term review.'
                    }
                },
            ]
        }
    ];

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'new': return 'bg-[#4CAF93] text-white hover:bg-[#4CAF93]/90';
            case 'improve': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
            case 'fix': return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeText = (type: string) => {
        switch (type) {
            case 'new': return language === 'zh' ? '新增' : 'NEW';
            case 'improve': return language === 'zh' ? '优化' : 'IMPROVED';
            case 'fix': return language === 'zh' ? '修复' : 'FIXED';
            default: return type.toUpperCase();
        }
    };

    const breadcrumbs = breadcrumbSchema([
        { name: 'Home', url: 'https://www.dropdrophabit.com/' },
        { name: 'Changelog', url: 'https://www.dropdrophabit.com/changelog' }
    ]);

    return (
        <>
            <SEOHead
                title={`${t('changelog.title')} - DropDrop`}
                description={t('changelog.seo.description')}
                canonical="https://www.dropdrophabit.com/changelog"
                structuredData={breadcrumbs}
            />

            <div className="min-h-screen bg-[#FAFAFA] text-[#222222] font-sans">
                <Navbar />

                <section className="pt-40 pb-20 px-4">
                    <div className="container max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-16"
                        >
                            <h1 className="text-4xl md:text-5xl font-light text-[#222222] mb-6">
                                {t('changelog.title')}
                            </h1>
                            <p className="text-lg text-[#666666] font-light">
                                {t('changelog.subtitle')}
                            </p>
                            <p className="mt-4 text-sm text-[#999999] font-light">
                                {language === 'zh'
                                    ? '内容根据公开发版记录与项目内部 changelog 汇总，最后核对于 2026-03-23。'
                                    : 'Compiled from public release history and the app project changelog, last verified on March 23, 2026.'}
                                {' '}
                                <a
                                    href="https://apps.apple.com/us/app/habit-tracker-dropdrop/id6749170464"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#4CAF93] hover:underline"
                                >
                                    {language === 'zh' ? '查看来源' : 'View source'}
                                </a>
                            </p>
                        </motion.div>

                        <div className="space-y-12 relative before:absolute before:left-0 md:before:left-8 before:top-2 before:bottom-0 before:w-px before:bg-gray-200">
                            {releases.map((release, index) => (
                                <motion.div
                                    key={release.version}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-8 md:pl-24"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-[-5px] md:left-[27px] top-6 w-3 h-3 bg-white border-2 border-[#4CAF93] rounded-full z-10" />

                                    {/* Version & Date - Mobile Layout optimized */}
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-4 md:absolute md:left-[-120px] md:top-5 md:w-32 md:text-right">
                                        <span className="text-2xl font-bold text-[#222222]">{release.version}</span>
                                        <span className="text-sm text-[#999999] flex items-center md:justify-end gap-1">
                                            <Calendar size={12} />
                                            {release.date}
                                        </span>
                                    </div>

                                    <div className="bg-white border border-[#E5E5E5] rounded-3xl p-8 shadow-soft hover:border-[#4CAF93]/30 transition-colors">
                                        <h3 className="text-xl font-medium text-[#222222] mb-6">
                                            {language === 'zh' ? release.title.zh : release.title.en}
                                        </h3>
                                        <ul className="space-y-4">
                                            {release.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <Badge className={`shrink-0 mt-0.5 ${getTypeColor(feature.type)}`}>
                                                        {getTypeText(feature.type)}
                                                    </Badge>
                                                    <span className="text-[#666666] leading-relaxed">
                                                        {language === 'zh' ? feature.desc.zh : feature.desc.en}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
