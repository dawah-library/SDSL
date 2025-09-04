"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SectionsTab() {
  const [sections, setSections] = useState([
    "العقيدة والتوحيد",
    "التفسير وعلومه",
    "الفقه وأصوله",
    "الحديث وعلومه",
    "التزكية والرقائق",
  ]);
  const [newSection, setNewSection] = useState("");

  const addSection = () => {
    if (newSection.trim() === "") return;
    setSections([...sections, newSection.trim()]);
    setNewSection("");
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">إدارة الأقسام</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="أدخل اسم القسم الجديد"
          value={newSection}
          onChange={(e) => setNewSection(e.target.value)}
        />
        <Button onClick={addSection}>➕ إضافة</Button>
      </div>

      <ul className="space-y-2">
        {sections.map((sec, i) => (
          <li
            key={i}
            className="flex justify-between items-center border rounded px-3 py-2"
          >
            <span>{sec}</span>
            <Button variant="destructive" size="sm" onClick={() => removeSection(i)}>
              🗑️ حذف
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
