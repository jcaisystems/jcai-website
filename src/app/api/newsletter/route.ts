import { NextResponse, NextRequest } from "next/server";

function getClientIp(req: NextRequest): string {
  let ip: string | null | undefined = req.headers.get('cf-connecting-ip');
  
  if (!ip) {
    ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim();
  }
  
  if (!ip) {
    ip = req.headers.get('x-real-ip');
  }
  
  return ip || 'unknown';
}

async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not set");
    return { success: false, error: "Server configuration error." };
  }
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });
    const data = await response.json();
    if (data.success && data.score >= 0.5) {
      return { success: true, score: data.score };
    } else {
      return { success: false, error: "reCAPTCHA verification failed.", details: data['error-codes'] };
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return { success: false, error: "Error verifying reCAPTCHA." };
  }
}

const allowedOrigins = [
  'https://jcai-consulting.com',
  'https://ui.jcaisystem.com'
];

export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req);
  const serverApiKey = process.env.API_SECRET_KEY;
  const clientApiKey = req.headers.get('x-internal-api-key');
  const origin = req.headers.get("origin") || "";

  try {
    if (!serverApiKey || !clientApiKey || serverApiKey !== clientApiKey) {
      console.log(`🚫 [Newsletter] Unauthorized API key attempt from: ${clientIp} | Origin: ${origin}`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (process.env.NODE_ENV === "production" && !allowedOrigins.includes(origin)) {
      console.log(`🚫 [Newsletter] Unauthorized origin: ${origin} from IP: ${clientIp}`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { email, recaptchaToken } = await req.json();

    if (!recaptchaToken) {
      console.log(`🚫 [Newsletter] Missing reCAPTCHA token from: ${clientIp}`);
      return NextResponse.json({ error: "Missing reCAPTCHA token." }, { status: 400 });
    }
    const recaptchaVerification = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaVerification.success) {
      console.warn(`🚫 [Newsletter] reCAPTCHA verification failed for ${clientIp}:`, recaptchaVerification.error);
      return NextResponse.json({ error: "reCAPTCHA failed. Please try again." }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const leadConnectorUrl = "https://services.leadconnectorhq.com/hooks/PEiBgZCgO3UwS99FigqO/webhook-trigger/a42d2ecc-4468-482b-934f-e5f848411dcc";
    const response = await fetch(leadConnectorUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: "Newsletter Signup" }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("LeadConnector newsletter error:", errorText);
        return NextResponse.json({ error: "Subscription failed." }, { status: 500 });
    }

    console.log(`✅ Newsletter subscription from: ${email} | IP: ${clientIp}`);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
