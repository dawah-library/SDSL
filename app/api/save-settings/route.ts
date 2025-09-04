import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// مسار ملف settings.json
const settingsFile = path.join(process.cwd(), "data", "settings.json");

// جلب الإعدادات
export async function GET() {
  const data = fs.readFileSync(settingsFile, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

// حفظ الإعدادات
export async function POST(request: Request) {
  try {
    const body = await request.json();
    fs.writeFileSync(settingsFile, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
