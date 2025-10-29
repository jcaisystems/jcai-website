import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // --- Origin Check (block requests not from your domain) ---
    const origin = req.headers.get("origin") || "";
    if (!origin.includes("jcai-consulting.com")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // --- Parse Request Body ---
    const { name, email, message, company } = await req.json();

    // --- Honeypot Field (hidden in frontend) ---
    if (company && company.trim() !== "") {
      // Bots usually fill hidden fields
      return NextResponse.json({ error: "Spam" }, { status: 400 });
    }

    // --- Basic Structure Validation ---
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    // --- Email Validation ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // --- Anti-spam Heuristic (optional, keep for extra protection) ---
    const looksRandom = (str: string) => {
      const repeated = /(.)\1{3,}/.test(str);
      const tooShort = str.trim().length < 5;
      const mostlyConsonants =
        (str.replace(/[^a-zA-Z]/g, "").match(/[aeiou]/gi) || []).length < 2;
      const randomCaseMix = /[a-z]/.test(str) && /[A-Z]/.test(str);
      return (repeated || randomCaseMix) && mostlyConsonants && !tooShort;
    };

    if (looksRandom(name) || looksRandom(message)) {
      return NextResponse.json({ error: "spam." }, { status: 400 });
    }

    // --- Forward to LeadConnector Securely ---
    const res = await fetch(
      "https://services.leadconnectorhq.com/hooks/PEiBgZCgO3UwS99FigqO/webhook-trigger/3e0ab0f7-520b-494b-a03c-47847adbb745",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to send." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
