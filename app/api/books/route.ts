import { NextResponse } from "next/server";
import books from "@/data/books.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const filtered = books.filter(b => b.title.includes(q) || b.author.includes(q));
  return NextResponse.json({ data: filtered });
}
