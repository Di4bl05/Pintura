import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const translationsPath = path.join(process.cwd(), "src", "translations");

// GET - Obtener todos los proyectos de galería
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "es";
    
    const filePath = path.join(translationsPath, `${lang}.json`);
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    
    return NextResponse.json({ 
      success: true, 
      data: content.gallery.projects 
    });
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener proyectos" },
      { status: 500 }
    );
  }
}

// POST - Agregar nuevo proyecto
export async function POST(request: NextRequest) {
  try {
    const { project } = await request.json();
    
    // Actualizar ambos idiomas
    for (const lang of ["es", "en"]) {
      const filePath = path.join(translationsPath, `${lang}.json`);
      const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      
      // Encontrar el siguiente ID disponible
      const projectIds = Object.keys(content.gallery.projects).map(k => parseInt(k));
      const nextId = Math.max(...projectIds) + 1;
      
      // Agregar el nuevo proyecto
      content.gallery.projects[nextId] = project[lang];
      
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Proyecto agregado correctamente" 
    });
  } catch (error) {
    console.error("Error al agregar proyecto:", error);
    return NextResponse.json(
      { success: false, error: "Error al agregar proyecto" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar proyecto
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("id");
    
    if (!projectId) {
      return NextResponse.json(
        { success: false, error: "ID de proyecto requerido" },
        { status: 400 }
      );
    }
    
    // Eliminar de ambos idiomas
    for (const lang of ["es", "en"]) {
      const filePath = path.join(translationsPath, `${lang}.json`);
      const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      
      delete content.gallery.projects[projectId];
      
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Proyecto eliminado correctamente" 
    });
  } catch (error) {
    console.error("Error al eliminar proyecto:", error);
    return NextResponse.json(
      { success: false, error: "Error al eliminar proyecto" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar proyecto existente
export async function PUT(request: NextRequest) {
  try {
    const { id, project } = await request.json();
    
    // Actualizar ambos idiomas
    for (const lang of ["es", "en"]) {
      const filePath = path.join(translationsPath, `${lang}.json`);
      const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      
      content.gallery.projects[id] = project[lang];
      
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Proyecto actualizado correctamente" 
    });
  } catch (error) {
    console.error("Error al actualizar proyecto:", error);
    return NextResponse.json(
      { success: false, error: "Error al actualizar proyecto" },
      { status: 500 }
    );
  }
}
