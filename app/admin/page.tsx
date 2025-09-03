"use client";
import { useState } from "react";
import sectionsData from "@/data/sections.json";

export default function AdminPage() {
  const [sections, setSections] = useState<string[]>(sectionsData);
  const [newSection, setNewSection] = useState("");

  const addSection = () => {
    if (!newSection.trim()) return;
    setSections([...sections, newSection.trim()]);
    setNewSection("");
    alert("تمت إضافة القسم (لكن لن يتم الحفظ الدائم إلا بعد ربط قاعدة بيانات).");
  };

  const deleteSection = (sec: string) => {
    setSections(sections.filter((s) => s !== sec));
    alert("تم حذف القسم (لكن لن يتم الحفظ الدائم إلا بعد ربط قاعدة بيانات).");
  };

  return (
    <div dir="rtl" className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">لوحة الإدارة - الأقسام</h1>

      <div className="mb-6 flex gap-2">
        <input
          value={newSection}
          onChange={(e) => setNewSection(e.target.value)}
          placeholder="أدخل اسم القسم الجديد"
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={addSection}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          إضافة
        </button>
      </div>

      <ul className="space-y-2">
        {sections.map((sec) => (
          <li
            key={sec}
            className="flex items-center justify-between border px-3 py-2 rounded"
          >
            <span>{sec}</span>
            <button
              onClick={() => deleteSection(sec)}
              className="text-red-600 hover:underline"
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
