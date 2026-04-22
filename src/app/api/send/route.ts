import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const date = formData.get("date") as string;
    const colors = formData.get("colors") as string;
    const serviceTypeRaw = formData.get("service_type"); let service_type = [];
    const paint_type = formData.get("paint_type") as string;
    const status = formData.get("status") as string;
    const special = formData.get("special") as string;
    const budget = formData.get("budget") as string;
    const comments = formData.get("comments") as string;
    const vip = formData.get("vip") === "true";
    const specifics = JSON.parse(formData.get("specifics") as string || "[]");
       if (serviceTypeRaw) {
    try {
      service_type = JSON.parse(serviceTypeRaw as string);
        } catch (e) {
      service_type = [serviceTypeRaw as string];
        }
      }
    const files = formData.getAll("upload") as File[];
    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const emailContent = `
${vip ? "🚨 [MODO FAST-TRACK PRIORITARIO ACTIVADO] 🚨" : ""}

NUEVA SOLICITUD DE PROYECTO
-----------------------------------------------------

INFORMACIÓN DEL CLIENTE
----------------------------------------------
Nombre:    ${name}
Teléfono:  ${phone}
Dirección: ${address}
Fecha:     ${date}
Servicios: ${service_type.join(", ")}
Específicos: ${specifics.join(", ")}
Colores:   ${colors}
Pintura:   ${paint_type || "No especificado"}
Rango:     ${budget || "No definido"}
Estado:    ${status}
Especial:  ${special || "N/A"}
Comentario adicional: ${comments || "Sin comentarios adicionales"}
Evidencia Visual: ${files.length} fotos adjuntas.
`;

    const result = await resend.emails.send({
      from: "LuisBety Protocol <onboarding@resend.dev>",
      to: "perezcorralesismael@gmail.com",
      subject: `${vip ? "🔥 VIP -" : ""} Nuevo Proyecto: ${name}`,
      text: emailContent,
      attachments: attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}