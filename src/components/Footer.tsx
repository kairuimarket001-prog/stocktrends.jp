import { Link } from 'react-router-dom';
import { FileText, Mail, ExternalLink, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 border-t-2 border-blue-500/30 mt-0">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-6">
      {/* Footer Links Section */}
      <div className="pt-0">
        {/* Two Column Layout for Mobile and Desktop */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 mb-6">
        {/* Legal Documents */}
        <div>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-sm" style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
          <FileText className="w-4 h-4" />
          法的文書
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
          <li>
            <Link
            to="/terms"
            className="hover:underline flex items-center gap-1"
            style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
            利用規約 <ExternalLink className="w-3 h-3" />
            </Link>
          </li>
          <li>
            <Link
            to="/privacy"
            className="hover:underline flex items-center gap-1"
            style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
            プライバシーポリシー <ExternalLink className="w-3 h-3" />
            </Link>
          </li>
          <li>
            <Link
            to="/disclaimer"
            className="hover:underline flex items-center gap-1"
            style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
            免責事項 <ExternalLink className="w-3 h-3" />
            </Link>
          </li>
          <li>
            <Link
            to="/specified-commercial-transaction-act"
            className="hover:underline flex items-center gap-1"
            style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
            特定商取引法表記 <ExternalLink className="w-3 h-3" />
            </Link>
          </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-sm" style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
          <Mail className="w-4 h-4" />
          お問い合わせ
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
          <li>
            <Link
            to="/contact"
            className="hover:underline flex items-center gap-1"
            style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
            お問い合わせフォーム <ExternalLink className="w-3 h-3" />
            </Link>
          </li>
          <li>
            <Link
            to="/faq"
            className="hover:underline flex items-center gap-1"
            style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}
            >
            よくある質問 <ExternalLink className="w-3 h-3" />
            </Link>
          </li>
          <li className="flex items-center gap-1 mt-3" style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
            <Phone className="w-3 h-3" />
            <span>03-5944-8231</span>
          </li>
          <li style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
            support@stocktrends.jp
          </li>
          <li className="text-xs" style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
            受付時間: 平日 9:00-18:00
          </li>
          </ul>
        </div>

        </div>

        {/* Copyright Section */}
        <div className="border-t border-blue-500/20 pt-4 text-center">
        <p className="text-xs sm:text-sm mb-2 font-medium" style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
          &copy; {currentYear} 株式会社ネクストスフィア (NextSphere Co., Ltd.). All rights reserved.
        </p>
        <p className="text-[10px] sm:text-xs leading-relaxed max-w-3xl mx-auto" style={{ color: '#3c0800', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
          当サイトで提供される情報は投資勧誘を目的としたものではありません。
          投資に関する最終決定は、利用者ご自身の判断でなさるようお願いいたします。
          掲載されている情報の正確性については万全を期しておりますが、その内容の正確性、安全性、有用性を保証するものではありません。
        </p>
        </div>
      </div>
      </div>
    </footer>
  );
}
