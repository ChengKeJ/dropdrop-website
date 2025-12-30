import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Download, Smartphone, TrendingUp, Bell } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * DropDrop Official Website
 * Design: Minimalist + Progressive Information Architecture
 * Color: Ocean Blue (#4A89DC) + Clean White
 * Typography: Playfair Display (titles) + Inter (body)
 */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="DropDrop" className="w-8 h-8 md:w-10 md:h-10" />
            <span className="text-xl md:text-2xl font-bold text-[#1E293B]">DropDrop</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[#64748B] hover:text-[#1E293B] transition">
              功能
            </a>
            <a href="#download" className="text-[#64748B] hover:text-[#1E293B] transition">
              下载
            </a>
            <a href="#about" className="text-[#64748B] hover:text-[#1E293B] transition">
              关于
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img
            src="/images/hero-background.png"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-[#1E293B] mb-6 leading-tight">
              养成好习惯
              <br />
              从每一滴开始
            </h1>
            <p className="text-lg md:text-xl text-[#64748B] mb-8 leading-relaxed">
              DropDrop 是一款专业的习惯追踪应用，帮助你通过可视化进度、智能提醒和成就系统，坚持不懈地养成更好的习惯。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary flex items-center justify-center gap-2">
                立即下载 <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary">了解更多</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-[#F8FAFB]">
        <div className="container">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-4">
              强大的功能
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              DropDrop 提供了一套完整的工具，帮助你更有效地管理和追踪日常习惯
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {/* Feature 1: Tracking */}
            <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-lg transition-shadow duration-300">
              <div className="mb-6">
                <img
                  src="/images/feature-tracking.png"
                  alt="Habit Tracking"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1E293B] mb-3">习惯追踪</h3>
              <p className="text-[#64748B] mb-4 leading-relaxed">
                直观的圆形进度指示器实时显示你的完成度，每一次打卡都是向目标迈进的一步。
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[#1E293B]">
                  <Check className="w-5 h-5 text-[#10B981]" />
                  每日打卡提醒
                </li>
                <li className="flex items-center gap-2 text-[#1E293B]">
                  <Check className="w-5 h-5 text-[#10B981]" />
                  连续天数统计
                </li>
                <li className="flex items-center gap-2 text-[#1E293B]">
                  <Check className="w-5 h-5 text-[#10B981]" />
                  自定义目标设置
                </li>
              </ul>
            </div>

            {/* Feature 2: Analytics */}
            <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-lg transition-shadow duration-300">
              <div className="mb-6">
                <img
                  src="/images/feature-analytics.png"
                  alt="Advanced Analytics"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1E293B] mb-3">数据分析</h3>
              <p className="text-[#64748B] mb-4 leading-relaxed">
                详细的统计图表和热力图帮助你深入了解习惯养成的规律和进度。
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[#1E293B]">
                  <Check className="w-5 h-5 text-[#10B981]" />
                  完成率统计
                </li>
                <li className="flex items-center gap-2 text-[#1E293B]">
                  <Check className="w-5 h-5 text-[#10B981]" />
                  热力图展示
                </li>
                <li className="flex items-center gap-2 text-[#1E293B]">
                  <Check className="w-5 h-5 text-[#10B981]" />
                  趋势分析
                </li>
              </ul>
            </div>

            {/* Feature 3: Reminders */}
            <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-lg transition-shadow duration-300">
              <div className="mb-6">
                <img
                  src="/images/feature-reminders.png"
                  alt="Smart Reminders"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1E293B] mb-3">智能提醒</h3>
              <p className="text-[#64748B] mb-4 leading-relaxed">
                灵活的提醒设置确保你不会错过任何一个重要的习惯养成时刻。
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-[#1E293B]">
                  <Check className="w-5 h-5 text-[#10B981]" />
                  自定义提醒时间
                </li>
                <li className="flex items-center gap-2 text-[#1E293B]">
                  <Check className="w-5 h-5 text-[#10B981]" />
                  多种提醒方式
                </li>
                <li className="flex items-center gap-2 text-[#1E293B]">
                  <Check className="w-5 h-5 text-[#10B981]" />
                  智能推送通知
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6">
                升级会员，解锁更多功能
              </h2>
              <p className="text-lg text-[#64748B] mb-8 leading-relaxed">
                DropDrop Pro 会员提供无限习惯创建、云端同步、自定义主题等高级功能，帮助你更好地管理生活。
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-[#4A89DC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E293B] mb-1">无限习惯创建</h3>
                    <p className="text-[#64748B]">创建无限数量的习惯，不受任何限制</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-[#4A89DC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E293B] mb-1">高级数据分析</h3>
                    <p className="text-[#64748B]">获取更详细的数据分析和趋势预测</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Bell className="w-6 h-6 text-[#4A89DC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E293B] mb-1">云端同步备份</h3>
                    <p className="text-[#64748B]">跨设备同步你的所有数据，永不丢失</p>
                  </div>
                </div>
              </div>
              <button className="btn-primary">了解会员计划</button>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-[#4A89DC] to-[#5A9AFF] rounded-3xl p-12 text-white">
                <div className="space-y-6">
                  <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                    <p className="text-sm font-semibold opacity-80 mb-2">免费版</p>
                    <p className="text-3xl font-bold">¥0</p>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                    <p className="text-sm font-semibold opacity-80 mb-2">Pro 会员</p>
                    <p className="text-3xl font-bold">¥9.99/月</p>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                    <p className="text-sm font-semibold opacity-80 mb-2">14 天免费试用</p>
                    <p className="text-lg">立即体验所有功能</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 md:py-32 bg-[#F8FAFB]">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6">
            立即开始养成好习惯
          </h2>
          <p className="text-lg text-[#64748B] mb-12 max-w-2xl mx-auto">
            DropDrop 现已在 iOS 和 Android 上线。下载应用，开始你的习惯养成之旅。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              App Store
            </button>
            <button className="btn-primary flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Google Play
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E293B] text-white py-12 md:py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/images/logo.png" alt="DropDrop" className="w-8 h-8 invert" />
                <span className="text-lg font-bold">DropDrop</span>
              </div>
              <p className="text-[#94A3B8] text-sm">
                养成好习惯，从每一滴开始
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">产品</h4>
              <ul className="space-y-2 text-[#94A3B8] text-sm">
                <li><a href="#" className="hover:text-white transition">功能</a></li>
                <li><a href="#" className="hover:text-white transition">定价</a></li>
                <li><a href="#" className="hover:text-white transition">下载</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">公司</h4>
              <ul className="space-y-2 text-[#94A3B8] text-sm">
                <li><a href="#" className="hover:text-white transition">关于我们</a></li>
                <li><a href="#" className="hover:text-white transition">博客</a></li>
                <li><a href="#" className="hover:text-white transition">联系我们</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">法律</h4>
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
