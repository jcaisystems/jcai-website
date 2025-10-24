import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  // --- Basic structure validation ---
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  // --- Email validation (simple regex) ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // --- Anti-spam heuristic rules ---
  const looksRandom = (str: string) => {
  const repeated = /(.)\1{3,}/.test(str); // now 3+ repeats
  const tooShort = str.trim().length < 5; // too short to be meaningful
  const mostlyConsonants = (str.replace(/[^a-zA-Z]/g, "").match(/[aeiou]/gi) || []).length < 2;
  const randomCaseMix = /[a-z]/.test(str) && /[A-Z]/.test(str);
  return (repeated || randomCaseMix) && mostlyConsonants && !tooShort;
};


  if (looksRandom(name) || looksRandom(message)) {
    return NextResponse.json({ error: "Looks like spam." }, { status: 400 });
  }

  // --- Forward to LeadConnector securely ---
  const res = await fetch("https://services.leadconnectorhq.com/hooks/PEiBgZCgO3UwS99FigqO/webhook-trigger/3e0ab0f7-520b-494b-a03c-47847adbb745", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}