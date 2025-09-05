import json
import sys
import re
from bs4 import BeautifulSoup

if len(sys.argv) < 2:
    print("❌ برجاء تحديد ملف HTML")
    print("مثال: python convert.py el3lam.htm")
    sys.exit(1)

input_file = sys.argv[1]
output_file = input_file.replace(".htm", ".json").replace(".html", ".json")

with open(input_file, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

book_data = {
    "title": "الإعلام بحرمة أهل العلم والإسلام",
    "author": "محمد بن أحمد بن إسماعيل المقدم",
    "pages": [],
    "footnotes": [],
    "toc": []
}

page_divs = soup.find_all("div", class_="PageText")

current_bab = None
current_chapter = None

for page_index, page in enumerate(page_divs, start=1):
    page_clone = page.decode_contents()

    # استخراج الحواشي
    notes_list = []
    footnotes = page.find_all("div", class_="footnote")
    for i, note in enumerate(footnotes, start=1):
        note_text = note.get_text(" ", strip=True)
        if note_text:
            notes_list.append({"number": i, "text": note_text})
        # استبدال نص الحاشية في الصفحة بعلامة رقم فقط
        page_clone = page_clone.replace(str(note), f"({i})")

    # تنظيف النص
    clean_page = BeautifulSoup(page_clone, "html.parser").get_text(" ", strip=True)

    # ✅ إزالة أرقام الصفحات مثل "ص: ٢٥٨"
    clean_page = re.sub(r"ص\s*[:：]\s*\d+", "", clean_page)

    # حفظ الصفحة والهوامش
    book_data["pages"].append(clean_page)
    book_data["footnotes"].append(notes_list)

    # استخراج الفهرس
    titles = page.find_all("span", class_="title")
    for t in titles:
        title_text = t.get_text(" ", strip=True)
        if not title_text:
            continue

        if title_text.startswith("الباب"):
            current_bab = {
                "title": title_text,
                "type": "باب",
                "page": page_index,
                "children": []
            }
            book_data["toc"].append(current_bab)
            current_chapter = None

        elif title_text.startswith("الفصل"):
            if current_bab is None:
                current_bab = {
                    "title": "باب غير محدد",
                    "type": "باب",
                    "page": page_index,
                    "children": []
                }
                book_data["toc"].append(current_bab)
            current_chapter = {
                "title": title_text,
                "type": "فصل",
                "page": page_index,
                "children": []
            }
            current_bab["children"].append(current_chapter)

        else:
            target = current_chapter if current_chapter else current_bab
            if target is None:
                target = {
                    "title": "باب غير محدد",
                    "type": "باب",
                    "page": page_index,
                    "children": []
                }
                book_data["toc"].append(target)
                current_bab = target

            target["children"].append({
                "title": title_text,
                "type": "فرعي",
                "page": page_index
            })

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(book_data, f, ensure_ascii=False, indent=2)

print(f"✅ تم إنشاء الملف: {output_file}")
