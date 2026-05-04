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
    const formData = await req.formData();
    
    // 1. Campos de texto
    const name = formData.get("name") as string || "N/A";
    const email = formData.get("email") as string || "";
    const phone = formData.get("phone") as string || "N/A";
    const address = formData.get("address") as string || "N/A";
    const date = formData.get("date") as string || "N/A";
    const colors = formData.get("colors") as string || "N/A";
    const paint_type = formData.get("paint_type") as string || "N/A";
    const status = formData.get("status") as string || "N/A";
    const special = formData.get("special") as string || "N/A";
    const budget = formData.get("budget") as string || "N/A";
    const comments = formData.get("comments") as string || "N/A";
    const vip = formData.get("vip") === "true";

    // 2. Manejo de Arrays
    const service_type = JSON.parse(formData.get("service_type") as string || "[]");
    const specifics = JSON.parse(formData.get("specifics") as string || "[]");

    // 3. CORRECCIÓN CLAVE: Usar getAll("files") para capturar todas las fotos
    const files = formData.getAll("files") as File[]; 
    let attachments = [];

    if (files.length > 0) {
      for (const file of files) {
        if (file.size > 0) {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          attachments.push({
            filename: file.name,
            content: buffer,
          });
        }
      }
    }

    const phoneUrl = `tel:${phone.replace(/\s/g, "")}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

    const emailContent = `
=========================================
      NUEVA SOLICITUD DE PROYECTO
=========================================

DATOS DEL CLIENTE
-----------------------------------------
Nombre: ${name}
Email: ${email}
Dirección: ${address} (Mapa: ${mapsUrl})
Fecha deseada: ${date}
Teléfono: ${phone} (Llamar: ${phoneUrl})

DETALLES DEL TRABAJO
-----------------------------------------
Tipo de Servicio: ${service_type.join(", ")}
Áreas Específicas: ${specifics.join(", ") || "N/A"}
Colores: ${colors}
Tipo de Pintura: ${paint_type || "N/A"}

ANÁLISIS DE SUPERFICIE
-----------------------------------------
Estado actual: ${status}
Notas especiales: ${special || "N/A"}

PRESUPUESTO Y EXTRAS
-----------------------------------------
Rango estimado: ${budget}
Cliente VIP: ${vip ? "SÍ" : "NO"}
Comentarios adicionales: ${comments}

-----------------------------------------
FOTOS: ${attachments.length > 0 ? `${attachments.length} fotos adjuntas en este correo.` : "No se subieron fotos."}
`;

    const result = await resend.emails.send({
      from: "LuisBety Website <onboarding@resend.dev>",
      to: "perezcorralesismael@gmail.com", 
      ...(email && { replyTo: email }), 
      subject: `Solicitud: ${name} - ${service_type[0] || "Pintura"}`,
      text: emailContent,
      attachments: attachments,
    });

    if (result.error) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ ok: true, result });

  } catch (error) {
    console.error("Error en API Route:", error);
    return NextResponse.json(
      { ok: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}