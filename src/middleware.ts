import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Proteger rutas de API de administración
  if (pathname.startsWith("/api/content") || 
      pathname.startsWith("/api/gallery") || 
      pathname.startsWith("/api/upload")) {
    
    // Verificar si hay una sesión válida (simplificado para desarrollo)
    const authHeader = request.headers.get("authorization");
    
    // Por ahora permitir todas las peticiones desde el mismo origen
    // En producción, implementar JWT o sesiones seguras
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin/dashboard/:path*"],
};
