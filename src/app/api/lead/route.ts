import { NextRequest, NextResponse } from "next/server";

interface LeadPayload {
  zip: string;
  monthlyBill: number;
  email: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidZip(zip: string) {
  return /^\d{5}$/.test(zip);
}

export async function POST(req: NextRequest) {
  let body: Partial<LeadPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { zip, monthlyBill, email } = body;

  if (!zip || !isValidZip(zip)) {
    return NextResponse.json(
      { error: "Please enter a valid 5-digit ZIP code." },
      { status: 422 }
    );
  }
  if (!monthlyBill || isNaN(monthlyBill) || monthlyBill <= 0) {
    return NextResponse.json(
      { error: "Please enter a valid monthly bill amount." },
      { status: 422 }
    );
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  const lead = {
    zip,
    monthlyBill,
    email,
    source: "saveonrenewables",
    campaign: "solar_buyback_funnel",
    submittedAt: new Date().toISOString(),
  };

  // Log lead to console (Vercel functions log).
  // To forward leads to BestPwr CRM or an email list, uncomment and configure:
  //
  // await fetch(process.env.BESTPWR_WEBHOOK_URL!, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.BESTPWR_WEBHOOK_SECRET}`,
  //   },
  //   body: JSON.stringify(lead),
  // });
  //
  // For ConvertKit / Mailchimp / ActiveCampaign, replace the above with the
  // relevant API call using process.env.EMAIL_API_KEY.

  console.log("[solar-lead]", JSON.stringify(lead));

  return NextResponse.json({ success: true });
}
