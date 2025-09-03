import { NextResponse } from "next/server";
import authors from "@/data/authors.json";
export async function GET() { return NextResponse.json({ data: authors }); }
