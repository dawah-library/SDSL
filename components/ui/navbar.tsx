"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* شعار المكتبة */}
        <Link href="/" className="font-extrabold text-xl text-indigo-700">
          مكتبة الدعوة السلفية
        </Link>

        {/* روابط */}
        <div className="flex items-center gap-4">
          <Link href="/about" className="text-sm hover:underline">
            التعريف بالمكتبة
          </Link>
          <Link href="/authors" className="text-sm hover:underline">
            المؤلفون
          </Link>
          <Link href="/topics" className="text-sm hover:underline">
            الأقسام
          </Link>
          <Link href="/articles" className="text-sm hover:underline">
            المقالات
          </Link>
        </div>

        {/* زر لوحة الإدارة */}
        <Button onClick={() => (window.location.href = "/admin")}>
          لوحة الإدارة
        </Button>
      </div>
    </nav>
  )
}
