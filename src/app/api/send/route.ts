import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY is not configured" },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const data = await req.json();

    const safeArray = (v: any) => (Array.isArray(v) ? v : []);

    const emailContent = `
========================
NEW PAINTING PROJECT
========================

CLIENT INFO
------------------------
Name: ${data.name || ""}
Phone: ${data.phone || ""}
Address: ${data.address || ""}
Date: ${data.date || ""}

PROJECT INFO
------------------------
Colors: ${data.colors || ""}
Main Services: ${safeArray(data.main_services).join(", ")}
Specifics: ${safeArray(data.specifics).join(", ")}
Paint Type: ${data.paint_type || ""}

SURFACE ANALYSIS
------------------------
Surface Status: ${data.status || ""}
Visual Load (Carga visual): ${data.visual_load || "N/A"}
Special Notes: ${data.special || ""}

BUDGET
------------------------
Range: ${data.budget || ""}

ADDITIONAL INFO
------------------------
Comments: ${data.comments || ""}
VIP: ${data.vip ? "YES" : "NO"}

UPLOAD:
${data.upload ? "File received (check storage/handling needed)" : "No upload"}
`;

    const result = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "perezcorralesismael@gmail.com",
      subject: "New Painting Request",
      text: emailContent,
    });

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}