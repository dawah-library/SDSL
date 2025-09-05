"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import sections from "@/data/sections.json";
import authorsData from "@/data/authors.json";
import booksData from "@/data/books.json";
import settings from "@/data/settings.json";

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState("");
  const [activeAuthor, setActiveAuthor] = useState("");

  const filteredBooks = useMemo(() => {
    return booksData
      .filter((b: any) =>
        (!activeTopic || b.topics.includes(activeTopic)) &&
        (!activeAuthor || b.author === activeAuthor) &&
        (!query || b.title.includes(query) || b.author.includes(query))
      )
      .sort(
        (a: any, b: any) =>
          new Date(b.addedAt).valueOf() - new Date(a.addedAt).valueOf()
      );
  }, [query, activeTopic, activeAuthor]);

  return (
    <div dir="rtl">
      {/* ===== الهيدر مع صورة الخلفية ===== */}
      <header
        className="relative bg-cover bg-center text-white"
        style={{
          backgroundImage: `url('${settings.headerImage}')`,
        }}
      >
        <div className="bg-black/50 py-16 px-6">
          <div className="max-w-7xl mx-auto text-right">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
              {settings.siteName}
            </h1>
            <p className="text-lg md:text-xl mb-2 font-bold">
              ﴿قُلْ هَذِهِ سَبِيلِي أَدْعُو إِلَى اللَّهِ عَلَى بَصِيرَةٍ أَنَا وَمَنِ اتَّبَعَنِي﴾ (يوسف: 108)
            </p>
            <p className="text-sm md:text-base">{settings.subtitle}</p>
            <div className="mt-4">
              <Button onClick={() => (window.location.href = "/admin")}>
                لوحة الإدارة
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== البحث ===== */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث بالعنوان أو المؤلف"
          className="border rounded-2xl px-3 py-2 w-full"
        />
        <div className="mt-3 text-sm text-gray-600 text-center">
          اختر موضوعًا أو مؤلفًا من القائمة للتصفية
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-6">
        {/* ===== الأقسام ===== */}
        <aside className="lg:col-span-4 order-last lg:order-first">
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">أقسام المكتبة</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((sec: string) => (
                <button
                  key={sec}
                  className="flex items-center gap-2 text-sm border rounded-xl px-3 py-2 hover:bg-gray-50"
                  onClick={() => setActiveTopic(sec)}
                >
                  {sec}
                </button>
              ))}
              {(activeTopic || activeAuthor) && (
                <Button
                  variant="outline"
                  className="sm:col-span-2"
                  onClick={() => {
                    setActiveAuthor("");
                    setActiveTopic("");
                  }}
                >
                  مسح المرشّحات
                </Button>
              )}
            </CardContent>
          </Card>

          {/* ===== المؤلفون ===== */}
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">المؤلفون والمشايخ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {authorsData.map((a: any) => (
                <div key={a.id} className="flex items-center justify-between">
                  <Button
                    size="sm"
                    variant={activeAuthor === a.name ? "default" : "outline"}
                    onClick={() => setActiveAuthor(a.name)}
                  >
                    {a.name}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* ===== جديد الكتب ===== */}
        <main className="lg:col-span-8 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">جديد الكتب</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBooks.slice(0, 5).map((b: any) => (
                <div key={b.id} className="border rounded-xl p-3">
                  <div className="font-bold">{b.title}</div>
                  <div className="text-sm text-gray-600">{b.author}</div>
                  <Button
                    size="sm"
                    className="mt-2"
                    onClick={() => (window.location.href = `/reader/${b.id}`)}
                  >
                    قراءة
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* ===== الفوتر ===== */}
      <footer className="mt-10 border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-600 flex flex-col sm:flex-row gap-2 items-center justify-between">
          <div>{settings.footerText}</div>
        </div>
        {settings.footerImage && (
          <div className="w-full mt-4">
            <img
              src={settings.footerImage}
              alt="صورة الفوتر"
              className="w-full max-h-40 object-cover"
            />
          </div>
        )}
      </footer>
    </div>
  );
}
