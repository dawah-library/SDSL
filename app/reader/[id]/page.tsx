"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import booksData from "@/data/books.json";

export default function ReaderPage() {
  const params = useParams();
  const { id } = params as { id: string };

  const [book, setBook] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    const selectedBook = (booksData as any[]).find((b) => b.id === id);
    if (selectedBook && selectedBook.contentFile) {
      fetch(selectedBook.contentFile)
        .then((res) => res.json())
        .then((data) => setBook(data));
    }
  }, [id]);

  if (!book) return <div className="p-4">...جاري التحميل</div>;

  return (
    <div className="max-w-3xl mx-auto p-4" dir="rtl">
      <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
      <p className="text-gray-600 mb-4">بقلم: {book.author}</p>

      <div
        style={{ fontSize: `${fontSize}px` }}
        className="border p-4 rounded min-h-[400px] leading-relaxed bg-white shadow"
      >
        {book.pages[page]}
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className="px-3 py-1 border rounded"
        >
          ◀ السابق
        </button>
        <span className="px-3 py-1">
          {page + 1} / {book.pages.length}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(book.pages.length - 1, p + 1))}
          className="px-3 py-1 border rounded"
        >
          التالي ▶
        </button>
        <button
          onClick={() => setFontSize((s) => s + 2)}
          className="px-3 py-1 border rounded"
        >
          تكبير
        </button>
        <button
          onClick={() => setFontSize((s) => Math.max(12, s - 2))}
          className="px-3 py-1 border rounded"
        >
          تصغير
        </button>
      </div>
    </div>
  );
}
