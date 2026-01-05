"use server";

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { text } = await request.json();
    // Simple moderation logic: flag text containing banned word
    return NextResponse.json({
        flagged: text.includes('banned_word'),
    });
}

export async function GET() {
    return NextResponse.json({ message: "Moderation endpoint is active." });
}
