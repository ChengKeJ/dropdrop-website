import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Download, Smartphone, TrendingUp, Bell, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/useMobile";

/**
 * DropDrop Official Website
 * Design: Modern Mobile-First + Progressive Information Architecture
 * Color: Ocean Blue (#4A89DC) + Clean White
 * Typography: Playfair Display (titles) + Inter (body)
 */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="DropDrop" className="w-8 h-8 md:w-10 md:h-10" />
            <span className="text-xl md:text-2xl font-bold text-[#1E293B]">DropDrop</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className="text-[#64748B] hover:text-[#1E293B] transition">
              功能
            </button>
            <button onClick={() => scrollToSection('showcase')} className="text-[#64748B] hover:text-[#1E293B] transition">
              应用预览
            </button>
            <button onClick={() => scrollToSection('download')} className="text-[#64748B] hover:text-[#1E293B] transition">
              下载
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#1E293B] hover:bg-gray-100 rounded-lg transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100">
            <div className="container py-4 space-y-2">
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-4 py-3 text-[#64748B] hover:bg-gray-50 hover:text-[#1E293B] rounded-lg transition"
              >
                功能特点
              </button>
              <button
                onClick={() => scrollToSection('showcase')}
                className="block w-full text-left px-4 py-3 text-[#64748B] hover:bg-gray-50 hover:text-[#1E293B] rounded-lg transition"
              >
                应用预览
              </button>
              <button
                onClick={() => scrollToSection('download')}
                className="block w-full text-left px-4 py-3 text-[#64748B] hover:bg-gray-50 hover:text-[#1E293B] rounded-lg transition"
              >
                立即下载
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Enhanced for Mobile */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-[#4A89DC] rounded-full text-sm font-semibold">
              专业习惯追踪应用
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E293B] mb-6 leading-tight">
              养成好习惯
              <br />
              <span className="text-[#4A89DC]">从每一滴开始</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-[#64748B] mb-8 leading-relaxed px-4 md:px-0">
              DropDrop 帮助你通过可视化进度、智能提醒和成就系统，
              <br className="hidden md:block" />
              坚持不懈地养成更好的习惯。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 md:px-0">
              <button
                onClick={() => scrollToSection('download')}
                className="btn-primary flex items-center justify-center gap-2 text-base md:text-lg py-3 md:py-4 px-6 md:px-8"
              >
                立即下载 <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('showcase')}
                className="btn-secondary text-base md:text-lg py-3 md:py-4 px-6 md:px-8"
              >
                查看演示
              </button>
            </div>

            {/* Stats Section */}
            <div className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#4A89DC] mb-1">10万+</div>
                <div className="text-xs md:text-sm text-[#64748B]">活跃用户</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#4A89DC] mb-1">500万+</div>
                <div className="text-xs md:text-sm text-[#64748B]">习惯打卡</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#4A89DC] mb-1">4.8★</div>
                <div className="text-xs md:text-sm text-[#64748B]">用户评分</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase Section - NEW */}
      <section id="showcase" className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F8FAFB]">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4">
              简洁优雅的设计
            </h2>
            <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto px-4">
              精心打磨的界面，让习惯追踪成为一种享受
            </p>
          </div>

          {/* App Screenshots Showcase */}
          <div className="max-w-6xl mx-auto">
            {/* Desktop View - Horizontal Scroll */}
            <div className="hidden md:grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                <img
                  src="/images/app-screenshot-1.png"
                  alt="健康计划管理"
                  className="w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.src = '/images/feature-tracking.png';
                  }}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-[#1E293B] mb-1">健康计划</h3>
                  <p className="text-sm text-[#64748B]">定制专属成长路径</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                <img
                  src="/images/app-screenshot-2.png"
                  alt="习惯选择"
                  className="w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.src = '/images/feature-analytics.png';
                  }}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-[#1E293B] mb-1">丰富习惯库</h3>
                  <p className="text-sm text-[#64748B]">多种习惯任你选择</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                <img
                  src="/images/app-screenshot-3.png"
                  alt="每日打卡"
                  className="w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.src = '/images/feature-reminders.png';
                  }}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-[#1E293B] mb-1">每日打卡</h3>
                  <p className="text-sm text-[#64748B]">轻松完成每日目标</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                <img
                  src="/images/app-screenshot-4.png"
                  alt="数据统计"
                  className="w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.src = '/images/feature-analytics.png';
                  }}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-[#1E293B] mb-1">数据统计</h3>
                  <p className="text-sm text-[#64748B]">可视化进度追踪</p>
                </div>
              </div>
            </div>

            {/* Mobile View - Carousel */}
            <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-4 w-max">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 flex-shrink-0">
                  <img
                    src="/images/app-screenshot-1.png"
                    alt="健康计划管理"
                    className="w-full h-auto"
                    onError={(e) => {
                      e.currentTarget.src = '/images/feature-tracking.png';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1E293B] mb-1">健康计划</h3>
                    <p className="text-sm text-[#64748B]">定制专属成长路径</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 flex-shrink-0">
                  <img
                    src="/images/app-screenshot-2.png"
                    alt="习惯选择"
                    className="w-full h-auto"
                    onError={(e) => {
                      e.currentTarget.src = '/images/feature-analytics.png';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1E293B] mb-1">丰富习惯库</h3>
                    <p className="text-sm text-[#64748B]">多种习惯任你选择</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 flex-shrink-0">
                  <img
                    src="/images/app-screenshot-3.png"
                    alt="每日打卡"
                    className="w-full h-auto"
                    onError={(e) => {
                      e.currentTarget.src = '/images/feature-reminders.png';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1E293B] mb-1">每日打卡</h3>
                    <p className="text-sm text-[#64748B]">轻松完成每日目标</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 flex-shrink-0">
                  <img
                    src="/images/app-screenshot-4.png"
                    alt="数据统计"
                    className="w-full h-auto"
                    onError={(e) => {
                      e.currentTarget.src = '/images/feature-analytics.png';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1E293B] mb-1">数据统计</h3>
                    <p className="text-sm text-[#64748B]">可视化进度追踪</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 px-4 md:px-0">
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl md:text-3xl">💧</span>
                </div>
                <h4 className="font-semibold text-[#1E293B] mb-1 text-sm md:text-base">每日打卡</h4>
                <p className="text-xs md:text-sm text-[#64748B]">轻松记录进度</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl md:text-3xl">📊</span>
                </div>
                <h4 className="font-semibold text-[#1E293B] mb-1 text-sm md:text-base">数据分析</h4>
                <p className="text-xs md:text-sm text-[#64748B]">可视化统计</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl md:text-3xl">🏆</span>
                </div>
                <h4 className="font-semibold text-[#1E293B] mb-1 text-sm md:text-base">成就系统</h4>
                <p className="text-xs md:text-sm text-[#64748B]">解锁奖章</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl md:text-3xl">⏰</span>
                </div>
                <h4 className="font-semibold text-[#1E293B] mb-1 text-sm md:text-base">智能提醒</h4>
                <p className="text-xs md:text-sm text-[#64748B]">不错过任何时刻</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced Mobile */}
      <section id="features" className="py-16 md:py-24 bg-[#F8FAFB]">
        <div className="container px-4 md:px-0">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4">
              强大的功能
            </h2>
            <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto">
              DropDrop 提供了一套完整的工具，帮助你更有效地管理和追踪日常习惯
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1: Tracking */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-6">
                <img
                  src="/images/feature-tracking.png"
                  alt="Habit Tracking"
                  className="w-full h-40 md:h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1E293B] mb-3">习惯追踪</h3>
              <p className="text-[#64748B] mb-4 leading-relaxed text-sm md:text-base">
                直观的圆形进度指示器实时显示你的完成度，每一次打卡都是向目标迈进的一步。
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[#1E293B] text-sm md:text-base">
                  <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  每日打卡提醒
                </li>
                <li className="flex items-center gap-2 text-[#1E293B] text-sm md:text-base">
                  <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  连续天数统计
                </li>
                <li className="flex items-center gap-2 text-[#1E293B] text-sm md:text-base">
                  <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  自定义目标设置
                </li>
              </ul>
            </div>

            {/* Feature 2: Analytics */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-6">
                <img
                  src="/images/feature-analytics.png"
                  alt="Advanced Analytics"
                  className="w-full h-40 md:h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1E293B] mb-3">数据分析</h3>
              <p className="text-[#64748B] mb-4 leading-relaxed text-sm md:text-base">
                详细的统计图表和热力图帮助你深入了解习惯养成的规律和进度。
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[#1E293B] text-sm md:text-base">
                  <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  完成率统计
                </li>
                <li className="flex items-center gap-2 text-[#1E293B] text-sm md:text-base">
                  <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  热力图展示
                </li>
                <li className="flex items-center gap-2 text-[#1E293B] text-sm md:text-base">
                  <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  趋势分析
                </li>
              </ul>
            </div>

            {/* Feature 3: Reminders */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-6">
                <img
                  src="/images/feature-reminders.png"
                  alt="Smart Reminders"
                  className="w-full h-40 md:h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1E293B] mb-3">智能提醒</h3>
              <p className="text-[#64748B] mb-4 leading-relaxed text-sm md:text-base">
                灵活的提醒设置确保你不会错过任何一个重要的习惯养成时刻。
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[#1E293B] text-sm md:text-base">
                  <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  自定义提醒时间
                </li>
                <li className="flex items-center gap-2 text-[#1E293B] text-sm md:text-base">
                  <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  多种提醒方式
                </li>
                <li className="flex items-center gap-2 text-[#1E293B] text-sm md:text-base">
                  <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  智能推送通知
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section - Enhanced Mobile */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-0">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-6">
                升级会员
                <br />
                解锁更多功能
              </h2>
              <p className="text-base md:text-lg text-[#64748B] mb-8 leading-relaxed">
                DropDrop Pro 会员提供无限习惯创建、云端同步、自定义主题等高级功能，帮助你更好地管理生活。
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-[#4A89DC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E293B] mb-1 text-base md:text-lg">无限习惯创建</h3>
                    <p className="text-[#64748B] text-sm md:text-base">创建无限数量的习惯，不受任何限制</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#10B981]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E293B] mb-1 text-base md:text-lg">高级数据分析</h3>
                    <p className="text-[#64748B] text-sm md:text-base">获取更详细的数据分析和趋势预测</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 md:w-6 md:h-6 text-[#9333EA]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E293B] mb-1 text-base md:text-lg">云端同步备份</h3>
                    <p className="text-[#64748B] text-sm md:text-base">跨设备同步你的所有数据，永不丢失</p>
                  </div>
                </div>
              </div>
              <button className="btn-primary w-full md:w-auto">了解会员计划</button>
            </div>
            <div className="order-first md:order-last">
              <div className="bg-gradient-to-br from-[#4A89DC] to-[#5A9AFF] rounded-3xl p-8 md:p-12 text-white">
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-white/20 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
                    <p className="text-sm font-semibold opacity-80 mb-2">免费版</p>
                    <p className="text-2xl md:text-3xl font-bold">¥0</p>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4 md:p-6 backdrop-blur-sm border-2 border-white/50">
                    <p className="text-sm font-semibold opacity-80 mb-2">Pro 会员</p>
                    <p className="text-2xl md:text-3xl font-bold">¥9.99/月</p>
                    <p className="text-sm mt-2 opacity-90">或 ¥99/年，省 17%</p>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
                    <p className="text-sm font-semibold opacity-80 mb-2">14 天免费试用</p>
                    <p className="text-base md:text-lg">立即体验所有功能</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section - Enhanced Mobile */}
      <section id="download" className="py-16 md:py-24 bg-gradient-to-b from-[#F8FAFB] to-white">
        <div className="container text-center px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-6">
            立即开始养成好习惯
          </h2>
          <p className="text-base md:text-lg text-[#64748B] mb-12 max-w-2xl mx-auto">
            DropDrop 现已在 iOS 和 Android 上线。下载应用，开始你的习惯养成之旅。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto sm:max-w-none">
            <a
              href="https://apps.apple.com/us/app/habit-tracker-dropdrop/id6749170464"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-2 text-base md:text-lg py-3 md:py-4 px-6 md:px-8"
            >
              <Download className="w-5 h-5" />
              App Store
            </a>
            <button className="btn-primary flex items-center justify-center gap-2 text-base md:text-lg py-3 md:py-4 px-6 md:px-8">
              <Download className="w-5 h-5" />
              Google Play
            </button>
          </div>

          {/* QR Code Section for Mobile */}
          <div className="mt-12 inline-block bg-white rounded-2xl p-6 shadow-lg">
            <p className="text-sm text-[#64748B] mb-4">扫码下载</p>
            <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
              <span className="text-4xl">📱</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced Mobile */}
      <footer className="bg-[#1E293B] text-white py-12 md:py-16">
        <div className="container px-4 md:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="/images/logo.png" alt="DropDrop" className="w-8 h-8 invert" />
                <span className="text-lg font-bold">DropDrop</span>
              </div>
              <p className="text-[#94A3B8] text-sm">
                养成好习惯，从每一滴开始
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm md:text-base">产品</h4>
              <ul className="space-y-2 text-[#94A3B8] text-sm">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition">功能</button></li>
                <li><a href="#" className="hover:text-white transition">定价</a></li>
                <li><button onClick={() => scrollToSection('download')} className="hover:text-white transition">下载</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm md:text-base">公司</h4>
              <ul className="space-y-2 text-[#94A3B8] text-sm">
                <li><a href="#" className="hover:text-white transition">关于我们</a></li>
                <li><a href="#" className="hover:text-white transition">博客</a></li>
                <li><a href="#" className="hover:text-white transition">联系我们</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm md:text-base">法律</h4>
              <ul className="space-y-2 text-[#94A3B8] text-sm">
                <li><a href="#" className="hover:text-white transition">隐私政策</a></li>
                <li><a href="#" className="hover:text-white transition">服务条款</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#334155] pt-8">
            <p className="text-[#94A3B8] text-sm text-center">
              © 2025 DropDrop. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
