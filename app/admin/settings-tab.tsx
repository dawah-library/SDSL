"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import booksData from "@/data/books.json";

export default function SettingsTab() {
  const [settings, setSettings] = useState({
    siteName: "",
    slogan: "",
    subtitle: "",
    headerImage: "",
    footerText: "",
    featuredBooks: [] as string[], // ✅ الكتب المميزة
  });

  // تحميل البيانات
  useEffect(() => {
    fetch("/api/save-settings")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  // تحديث القيم
  const handleChange = (field: string, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  // تحديث اختيار الكتب المميزة
  const toggleFeaturedBook = (bookId: string) => {
    setSettings((prev) => {
      const isSelected = prev.featuredBooks.includes(bookId);
      return {
        ...prev,
        featuredBooks: isSelected
          ? prev.featuredBooks.filter((id) => id !== bookId)
          : [...prev.featuredBooks, bookId],
      };
    });
  };

  // الحفظ
  const handleSave = async () => {
    const res = await fetch("/api/save-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (res.ok) {
      alert("✅ تم حفظ التغييرات بنجاح");
    } else {
      alert("❌ حدث خطأ أثناء الحفظ");
    }
  };

  return (
    <div className="space-y-6">
      {/* إعدادات عامة */}
      <div>
        <label className="block mb-1">اسم الموقع</label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => handleChange("siteName", e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block mb-1">الشعار (الآية)</label>
        <input
          type="text"
          value={settings.slogan}
          onChange={(e) => handleChange("slogan", e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block mb-1">النص تحت الشعار</label>
        <input
          type="text"
          value={settings.subtitle}
          onChange={(e) => handleChange("subtitle", e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block mb-1">صورة الهيدر (رابط)</label>
        <input
          type="text"
          value={settings.headerImage}
          onChange={(e) => handleChange("headerImage", e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block mb-1">نص الفوتر</label>
        <input
          type="text"
          value={settings.footerText}
          onChange={(e) => handleChange("footerText", e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>

      {/* التحكم في جديد الكتب */}
      <div>
        <label className="block mb-2 font-bold">اختر الكتب المميزة (جديد الكتب)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto border p-2 rounded">
          {booksData.map((book: any) => (
            <label key={book.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.featuredBooks.includes(book.id)}
                onChange={() => toggleFeaturedBook(book.id)}
              />
              {book.title}
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          لو لم تختر أي كتاب → سيتم عرض آخر 5 كتب مضافة تلقائيًا.
        </p>
      </div>

      <Button onClick={handleSave} className="mt-4">
        💾 حفظ التغييرات
      </Button>
    </div>
  );
}
