import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string || "gallery";
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No se proporcionó ningún archivo" },
        { status: 400 }
      );
    }
    
    // Validar tipo de archivo
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Tipo de archivo no válido. Solo se permiten imágenes JPG, PNG o WebP" },
        { status: 400 }
      );
    }
    
    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: "El archivo es demasiado grande. Máximo 5MB" },
        { status: 400 }
      );
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generar nombre de archivo único
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${timestamp}-${originalName}`;
    
    // Crear directorio si no existe
    const uploadDir = path.join(process.cwd(), "public", "images", folder);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    // Guardar archivo
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    
    // Retornar URL pública
    const publicUrl = `/images/${folder}/${fileName}`;
    
    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName
    });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    return NextResponse.json(
      { success: false, error: "Error al subir archivo" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar imagen
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get("url");
    
    if (!fileUrl) {
      return NextResponse.json(
        { success: false, error: "URL de archivo requerida" },
        { status: 400 }
      );
    }
    
    // Convertir URL pública a ruta del sistema de archivos
    const filePath = path.join(process.cwd(), "public", fileUrl);
    
    // Verificar que el archivo existe
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { success: false, error: "Archivo no encontrado" },
        { status: 404 }
      );
    }
    
    // Eliminar archivo
    const fs = require("fs").promises;
    await fs.unlink(filePath);
    
    return NextResponse.json({
      success: true,
      message: "Archivo eliminado correctamente"
    });
  } catch (error) {
    console.error("Error al eliminar archivo:", error);
    return NextResponse.json(
      { success: false, error: "Error al eliminar archivo" },
      { status: 500 }
    );
  }
}
