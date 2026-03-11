# Panel de Administración - LUISBETY INC

## Acceso al Panel

**URL:** `https://pintura-five.vercel.app/admin` (o en desarrollo: `http://localhost:3000/admin`)

### Credenciales de Acceso

- **Usuario:** `admin`
- **Contraseña:** `12345678`

## Características

### 🔐 Sistema de Autenticación
- Login seguro con validación de credenciales
- Sesión persistente con localStorage
- Redirección automática al dashboard tras login exitoso
- Protección de rutas administrativas

### 📝 Editor de Contenido
El panel permite editar contenido de las siguientes secciones:

1. **Hero / Inicio**
   - Títulos principales
   - Descripciones
   - Textos de botones CTA
   - Textos del carrusel

2. **Servicios** (próximamente)
   - Títulos de servicios
   - Descripciones
   - Precios
   - Características

3. **Galería** (próximamente)
   - Títulos de proyectos
   - Descripciones
   - Ubicaciones
   - URLs de imágenes

4. **Por Qué Nosotros** (próximamente)
   - Lista de beneficios
   - Descripción de la sección

5. **Contacto** (próximamente)
   - Información de contacto
   - Textos del formulario

### 🌐 Soporte Multiidioma
- Edición simultánea de contenido en Español (🇪🇸) e Inglés (🇺🇸)
- Los cambios se reflejan en ambos idiomas del sitio

### 💾 Almacenamiento
- Los cambios se guardan localmente en localStorage
- Para persistencia completa, se requiere implementar un backend con base de datos

## Uso del Panel

1. **Acceder al panel:**
   - Navega a `/admin`
   - Ingresa las credenciales
   - Serás redirigido al dashboard

2. **Editar contenido:**
   - Selecciona una sección en el menú lateral
   - Haz clic en el botón "Editar" (icono de lápiz) del elemento que deseas modificar
   - Actualiza los textos en español e inglés
   - Haz clic en "Guardar"

3. **Ver el sitio:**
   - Clic en "Ver Sitio" en el header para abrir el sitio web en nueva pestaña

4. **Cerrar sesión:**
   - Clic en "Cerrar Sesión" en el header

## Estructura de Archivos

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx              # Página de login
│   │   └── dashboard/
│   │       └── page.tsx          # Panel principal de administración
│   └── layout.tsx                # Layout principal con AuthProvider
├── contexts/
│   └── AuthContext.tsx           # Contexto de autenticación
└── translations/
    ├── es.json                   # Traducciones en español
    └── en.json                   # Traducciones en inglés
```

## Próximas Mejoras

- [ ] Backend con API REST para persistencia de datos
- [ ] Base de datos para almacenamiento permanente
- [ ] Editor visual de imágenes
- [ ] Gestor de galería con upload de imágenes
- [ ] Historial de cambios (versionado)
- [ ] Múltiples usuarios administradores
- [ ] Roles y permisos
- [ ] Preview en tiempo real
- [ ] Editor WYSIWYG para textos largos

## Seguridad

⚠️ **IMPORTANTE:** 
- Las credenciales actuales son de desarrollo
- En producción, implementar:
  - Autenticación con backend seguro
  - Hash de contraseñas
  - Tokens JWT
  - HTTPS obligatorio
  - Rate limiting en login
  - Two-factor authentication (2FA)

## Soporte

Para cualquier consulta o problema con el panel de administración, contacta al equipo de desarrollo.
