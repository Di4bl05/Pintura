import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const translationsPath = path.join(process.cwd(), "src", "translations");

// GET - Obtener contenido
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "es";
    
    const filePath = path.join(translationsPath, `${lang}.json`);
    const content = fs.readFileSync(filePath, "utf-8");
    
    return NextResponse.json({ 
      success: true, 
      data: JSON.parse(content) 
    });
  } catch (error) {
    console.error("Error al obtener contenido:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener contenido" },
      { status: 500 }
    );
  }
}

// POST - Guardar contenido
export async function POST(request: NextRequest) {
  try {
    const { lang, path: contentPath, value } = await request.json();
    
    const filePath = path.join(translationsPath, `${lang}.json`);
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    
    // Actualizar el valor en la ruta especificada
    const keys = contentPath.split(".");
    let current = content;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    
    // Guardar el archivo actualizado
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
    
    return NextResponse.json({ 
      success: true, 
      message: "Contenido actualizado correctamente" 
    });
  } catch (error) {
    console.error("Error al guardar contenido:", error);
    return NextResponse.json(
      { success: false, error: "Error al guardar contenido" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar múltiples valores
export async function PUT(request: NextRequest) {
  try {
    const { updates } = await request.json();
    
    // updates = [{ lang: "es", path: "hero.title", value: "Nuevo título" }, ...]
    for (const update of updates) {
      const { lang, path: contentPath, value } = update;
      
      const filePath = path.join(translationsPath, `${lang}.json`);
      const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      
      const keys = contentPath.split(".");
      let current = content;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Contenido actualizado correctamente" 
    });
  } catch (error) {
    console.error("Error al actualizar contenido:", error);
    return NextResponse.json(
      { success: false, error: "Error al actualizar contenido" },
      { status: 500 }
    );
  }
}
