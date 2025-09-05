"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import booksData from "@/data/books.json";

export default function ReaderPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { id } = params as { id: string };

  const [book, setBook] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [gotoPage, setGotoPage] = useState("");
  const [showToc, setShowToc] = useState(false); // ✅ للجوال

  // ✅ افتح على الصفحة المطلوبة من الرابط ?page=
  useEffect(() => {
    const startPage = parseInt(searchParams.get("page") || "1", 10) - 1;
    setPage(startPage >= 0 ? startPage : 0);
  }, [searchParams]);

  // ✅ تحميل الكتاب من قاعدة البيانات + ملف JSON
  useEffect(() => {
    const selectedBook = (booksData as any[]).find((b) => b.id === id);
    if (selectedBook && selectedBook.contentFile) {
      fetch(selectedBook.contentFile)
        .then((res) => res.json())
        .then((data) => setBook({ ...selectedBook, ...data }));
    }
  }, [id]);

  if (!book) return <div className="p-4">... جاري التحميل</div>;

  // ✅ استبدال أرقام الحواشي داخل النص بروابط
  const renderPageText = (text: string, pageIndex: number) => {
    if (!book.footnotes || !book.footnotes[pageIndex]) return text;

    let processed = text;
    book.footnotes[pageIndex].forEach((note: any) => {
      const marker = `(${note.number})`;
      const link = `<sup id="ref-${pageIndex}-${note.number}">
        <a href="#note-${pageIndex}-${note.number}" class="text-blue-600 hover:underline">(${note.number})</a>
      </sup>`;
      processed = processed.replace(marker, link);
    });

    return <div dangerouslySetInnerHTML={{ __html: processed }} />;
  };

  // ✅ دالة عرض الفهرس كشجرة
  const renderTocTree = (toc: any[]) => (
    <ul className="space-y-2 text-sm leading-6">
      {toc.map((item, i) => (
        <li key={i}>
          {item.children && item.children.length > 0 ? (
            <details open>
              <summary
                className={`cursor-pointer font-semibold ${
                  item.type === "باب"
                    ? "text-gray-800"
                    : item.type === "فصل"
                    ? "text-gray-700"
                    : "text-gray-600"
                }`}
              >
                {item.type === "باب" && "📂 "}
                {item.type === "فصل" && "📑 "}
                {item.type === "فرعي" && "🔹 "}
                {item.title}
              </summary>
              <div className="ml-4 mt-1">{renderTocTree(item.children)}</div>
            </details>
          ) : (
            <button
              onClick={() => setPage(item.page - 1)}
              className={`hover:underline ${
                page === item.page - 1 ? "text-blue-600 font-semibold" : "text-gray-600"
              }`}
            >
              {item.type === "باب" && "📂 "}
              {item.type === "فصل" && "📑 "}
              {item.type === "فرعي" && "🔹 "}
              {item.title}
            </button>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-4 gap-6" dir="rtl">
      {/* ✅ الفهرس الجانبي (كمبيوتر) */}
      {book.toc && book.toc.length > 0 && (
        <aside className="hidden lg:block lg:w-1/4 border rounded p-4 bg-gray-50 sticky top-4 max-h-[90vh] overflow-y-auto">
          <h3 className="font-bold mb-3">📑 الفهرس</h3>
          {renderTocTree(book.toc)}
        </aside>
      )}

      {/* ✅ القائمة المنسدلة (موبايل) */}
      {book.toc && book.toc.length > 0 && (
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowToc(!showToc)}
            className="w-full px-4 py-2 border rounded bg-gray-100 font-bold"
          >
            📑 عرض الفهرس
          </button>
          {showToc && (
            <div className="mt-2 border rounded p-3 bg-gray-50 max-h-64 overflow-y-auto">
              {renderTocTree(book.toc)}
            </div>
          )}
        </div>
      )}

      {/* ✅ النص + الهوامش */}
      <main className="flex-1">
        <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
        <p className="text-gray-600 mb-4">بقلم: {book.author}</p>

        {/* ✅ النص الأساسي بخط عثمان طه */}
        <div
          style={{ fontSize: `${fontSize}px` }}
          className="reader-text border p-6 rounded min-h-[600px] leading-relaxed bg-white shadow"
        >
          {book.pages[page]
            ? renderPageText(book.pages[page], page)
            : "لا يوجد نص لهذه الصفحة"}
        </div>

        {/* ✅ الهوامش */}
        {book.footnotes &&
          book.footnotes[page] &&
          book.footnotes[page].length > 0 && (
            <div className="mt-4 p-3 border-t text-sm bg-gray-50">
              <h3 className="font-semibold mb-2">الهوامش:</h3>
              <ul className="list-none pr-2 space-y-1">
                {book.footnotes[page].map(
                  (f: { number: number; text: string }, i: number) => (
                    <li key={i} id={`note-${page}-${f.number}`}>
                      ({f.number}) {f.text}{" "}
                      <a
                        href={`#ref-${page}-${f.number}`}
                        className="text-blue-500 hover:underline"
                      >
                        ↩
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

        {/* ✅ أدوات التحكم */}
        <div className="flex flex-wrap gap-3 mt-4 items-center">
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

          {/* ✅ تكبير/تصغير الخط */}
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

          {/* ✅ الانتقال لرقم صفحة */}
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={gotoPage}
              onChange={(e) => setGotoPage(e.target.value)}
              placeholder="رقم الصفحة"
              className="border rounded px-2 py-1 w-24"
            />
            <button
              onClick={() => {
                const p = parseInt(gotoPage, 10) - 1;
                if (!isNaN(p) && p >= 0 && p < book.pages.length) {
                  setPage(p);
                }
              }}
              className="px-3 py-1 border rounded"
            >
              انتقال
            </button>
          </div>

          {/* ✅ فتح النسخة المصورة */}
          {book.pdfUrl && (
            <button
              onClick={() => window.open(book.pdfUrl, "_blank")}
              className="ml-auto px-3 py-1 border rounded bg-blue-600 text-white"
            >
              📕 عرض النسخة المصورة
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
