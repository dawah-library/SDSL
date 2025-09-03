import { NextResponse } from "next/server";
import sections from "@/data/sections.json";
export async function GET() { return NextResponse.json({ data: sections }); }
