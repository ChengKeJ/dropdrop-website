
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEO/SEOHead';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { breadcrumbSchema, pageSchema } from '@/lib/structuredData';
import { appStoreUrl } from '@/lib/productFacts';

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
    const baseUrl = language === 'zh' ? 'https://www.dropdrophabit.com/zh' : 'https://www.dropdrophabit.com';
    const homeUrl = language === 'zh' ? baseUrl : `${baseUrl}/`;

    const releases: ReleaseNote[] = [
        {
            version: '1.1.1',
            date: '2026-05-08',
            title: {
                zh: '计时习惯、周月历浏览与头像同步',
                en: 'Timed habits, calendar browsing, and avatar sync'
            },
            features: [
                {
                    type: 'new',
                    desc: {
                        zh: '新增专门的计时习惯体验，达到目标时长后可自动完成。',
                        en: 'Added a dedicated timed habit experience with automatic completion when the target duration is reached.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '加入 iOS Live Activity 支持基础能力，让进行中的计时习惯可以延伸到应用外查看。',
                        en: 'Added iOS Live Activity support plumbing for active timer habit sessions.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '优化周历与月历浏览体验，丰富周模式并统一月视图日期顺序。',
                        en: 'Improved weekly and monthly calendar browsing with richer week mode and unified month date ordering.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '新增个人头像编辑、同步头像存储与可复用头像展示组件。',
                        en: 'Added profile avatar editing with synced avatar storage and reusable avatar display components.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '打磨计划页缓存、健康建议展示、小组件、CloudKit 同步，并更新 1.1.1+2 发布元数据。',
                        en: 'Polished plan page caching, health suggestion display, widgets, CloudKit sync, and release metadata for 1.1.1+2.'
                    }
                },
            ]
        },
        {
            version: '1.0.9',
            date: '2026-04-24',
            title: {
                zh: '深度分析、健康洞察与灵感小组件',
                en: 'Advanced analytics, health insights, and inspiration widgets'
            },
            features: [
                {
                    type: 'new',
                    desc: {
                        zh: '新增 Advanced Data Analysis，帮助用户更深入复盘习惯表现、趋势与长期进展信号。',
                        en: 'Added Advanced Data Analysis for deeper habit performance, trend, and long-term progress review.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '扩展健康指标详情与 readiness 相关分析，让健康上下文更容易理解。',
                        en: 'Expanded health metric details and readiness-related analysis for clearer health context.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '新增 iOS Inspiration 小组件，支持小、中、大尺寸，快速查看习惯与任务提示。',
                        en: 'Added iOS Inspiration widgets in small, medium, and large sizes for quick habit and task prompts.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '优化统计、Apple Calendar、CloudKit 与小组件设置界面，发布体验更顺畅。',
                        en: 'Polished Stats, Apple Calendar, CloudKit, and widget settings for a smoother release experience.'
                    }
                },
                {
                    type: 'fix',
                    desc: {
                        zh: '提升健康教练稳定性、小组件数据可靠性，并完善关键界面的本地化文案。',
                        en: 'Improved health coach stability, widget data reliability, and localization across key screens.'
                    }
                },
            ]
        },
        {
            version: '1.0.8',
            date: '2026-04-11',
            title: {
                zh: '日历模式、Timeline 与会员修复',
                en: 'Calendar modes, timeline updates, and membership fixes'
            },
            features: [
                {
                    type: 'new',
                    desc: {
                        zh: '首页新增日历显示模式，可在 Compact、Stacked 与 Detailed 视图之间切换。',
                        en: 'Added home calendar display modes for switching between Compact, Stacked, and Detailed views.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: 'Timeline 支持更灵活的多模式显示，更贴合不同用户的规划习惯。',
                        en: 'Improved Timeline with flexible display modes to better match different planning styles.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '刷新习惯与任务灵感列表，让创建流程里的建议更丰富、更好上手。',
                        en: 'Refreshed habit and task inspiration lists to make setup faster and more varied.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '打磨周历、图标样式与色彩系统，核心界面视觉语言更统一。',
                        en: 'Polished the week calendar, icon styling, and color system for a more cohesive visual language.'
                    }
                },
                {
                    type: 'fix',
                    desc: {
                        zh: '修复订阅过期、计划页绕过会员限制、升级弹窗交互与统计图溢出等问题。',
                        en: 'Fixed subscription expiry, plan habit limit bypass, upgrade dialog issues, and stats chart overflow.'
                    }
                },
            ]
        },
        {
            version: '1.0.7',
            date: '2026-04-09',
            title: {
                zh: '任务详情视觉优化',
                en: 'Task detail polish'
            },
            features: [
                {
                    type: 'improve',
                    desc: {
                        zh: '优化任务详情页的打卡记录卡片，层级更轻、间距更清晰。',
                        en: 'Refined task detail check-in cards with a lighter visual hierarchy and cleaner spacing.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '将打卡数值整理为紧凑徽章，提升记录浏览与快速扫描效率。',
                        en: 'Promoted check-in values into compact badges for faster scanning.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '重新协调编辑与删除操作按钮，使用更轻盈的图标与更克制的危险操作样式。',
                        en: 'Polished edit and delete actions with lighter icons and more restrained destructive styling.'
                    }
                },
                {
                    type: 'fix',
                    desc: {
                        zh: '更新版本元数据与应用内版本展示，确保 1.0.7 发布信息显示正确。',
                        en: 'Updated release metadata and in-app version records for the 1.0.7 release.'
                    }
                },
            ]
        },
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
                zh: 'Timeline、健康页与模板库升级',
                en: 'Timeline, Health page, and template library upgrades'
            },
            features: [
                {
                    type: 'new',
                    desc: {
                        zh: '新增 Timeline 模式，让用户可以一眼查看当天所有习惯。',
                        en: 'New Timeline Mode: visualize all your habits for the day at a glance.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '升级健康页，支持健康分趋势、习惯建议与计划推荐。',
                        en: 'Upgraded Health Page: track health score trends and get habit and plan recommendations.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '扩展习惯与计划模板库，让创建和管理更容易。',
                        en: 'Expanded Habit and Plan Library with more templates for easier creation and management.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '新增健康因子与趋势报告，支持周度和月度长期追踪。',
                        en: 'Added Health Factors and Trend Reports with weekly and monthly trend analysis.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '增强周期与归档管理，并加入久坐、喝水等智能健康提醒。',
                        en: 'Improved habit management with enhanced cycle and archiving features, plus smart health reminders.'
                    }
                },
            ]
        },
        {
            version: '1.0.4',
            date: '2026-01-10',
            title: {
                zh: '计划行动、健康集成与情绪记录',
                en: 'Plans, actions, health integration, and mood recording'
            },
            features: [
                {
                    type: 'new',
                    desc: {
                        zh: '新增计划与行动相关能力，让习惯推进更有结构。',
                        en: 'Added Plan and Action features for more structured habit progress.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '接入健康集成、情绪记录与 HRV 折线图能力。',
                        en: 'Added health integration, mood recording, and HRV line chart support.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '新增引导页与 marker popup 功能。',
                        en: 'Added the guide page and marker popup functionality.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '优化登录流程、图标尺寸和 marker popup 样式。',
                        en: 'Optimized login flow, icon sizing, and marker popup styling.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '细化 marker 规则，让提示和标记行为更准确。',
                        en: 'Refined marker rules for more accurate prompts and marker behavior.'
                    }
                },
            ]
        },
        {
            version: '1.0.3',
            date: '2025-11-22',
            title: {
                zh: '完成庆祝、深色模式与 Pro Hub',
                en: 'Completion celebration, dark mode, and Pro Hub'
            },
            features: [
                {
                    type: 'new',
                    desc: {
                        zh: '完成全部习惯时新增庆祝彩带效果。',
                        en: 'Added confetti when you complete all habits.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '优化深色模式主题表现。',
                        en: 'Improved the dark mode theme.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '增强 Pro Hub 体验。',
                        en: 'Enhanced the Pro Hub experience.'
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
                    type: 'fix',
                    desc: {
                        zh: '提升提醒稳定性。',
                        en: 'Improved reminder stability.'
                    }
                },
                {
                    type: 'fix',
                    desc: {
                        zh: '修复通知相关问题。',
                        en: 'Fixed notification issues.'
                    }
                },
            ]
        },
        {
            version: '1.0.1',
            date: '2025-09-20',
            title: {
                zh: '性能与界面微调',
                en: 'Performance and UI tweaks'
            },
            features: [
                {
                    type: 'improve',
                    desc: {
                        zh: '进行性能与 UI 细节微调。',
                        en: 'Performance and UI tweaks.'
                    }
                },
                {
                    type: 'fix',
                    desc: {
                        zh: '修复问题并提升整体稳定性。',
                        en: 'Bug fixes and improvements.'
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
                        zh: 'DropDrop 正式发布，提供核心习惯追踪能力。',
                        en: 'DropDrop is officially released with core habit tracking functionality.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '支持基础健康数据集成、用户认证与个人资料管理。',
                        en: 'Added basic health data integration, user authentication, and profile management.'
                    }
                },
                {
                    type: 'new',
                    desc: {
                        zh: '加入主题系统与中英文双语本地化。',
                        en: 'Added the theme system and English/Chinese localization support.'
                    }
                },
                {
                    type: 'improve',
                    desc: {
                        zh: '建立基础个人习惯管理与使用体验。',
                        en: 'Established the foundational habit management experience.'
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
        { name: language === 'zh' ? '首页' : 'Home', url: homeUrl },
        { name: t('changelog.title'), url: `${baseUrl}/changelog` }
    ]);
    const changelogSchema = pageSchema({
        type: 'CollectionPage',
        name: t('changelog.title'),
        description: t('changelog.seo.description'),
        url: `${baseUrl}/changelog`,
        language,
    });

    return (
        <>
            <SEOHead
                title={`${t('changelog.title')} - DropDrop`}
                description={t('changelog.seo.description')}
                canonical="https://www.dropdrophabit.com/changelog"
                structuredData={[breadcrumbs, changelogSchema]}
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
                                    ? '内容根据公开发版记录与项目内部 changelog 汇总，最后核对于 2026-05-08。'
                                    : 'Compiled from public release history and the app project changelog, last verified on May 8, 2026.'}
                                {' '}
                                <a
                                    href={appStoreUrl}
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
