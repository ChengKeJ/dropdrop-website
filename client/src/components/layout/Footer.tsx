import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="py-12 bg-white text-center text-[#999999] text-sm font-light">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} DropDrop. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/privacy" className="hover:text-[#222222] transition-colors">隐私政策</Link>
          <Link href="/terms" className="hover:text-[#222222] transition-colors">用户协议</Link>
          <Link href="/faq" className="hover:text-[#222222] transition-colors">FAQ</Link>
          <a href="mailto:support@dropdrophabit.com" className="hover:text-[#222222] transition-colors">联系我们</a>
        </div>
      </div>
    </footer>
  );
}
