import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مكتبة الدعوة السلفية",
  description: "مشروع لحفظ تراث الدعوة السلفية وتيسيره للباحثين وطلاب العلم",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
