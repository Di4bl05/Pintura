# Guia Completa: Supabase + Panel Admin de Galeria

Esta guia cubre todo el flujo para operar la galeria con backend real, traduccion doble por imagen y edicion intuitiva por el dueno.

## 1. Que se implemento en el proyecto

Se implemento todo dentro de la misma app Next.js (App Router):

- Panel admin en `src/app/admin`.
- API publica de galeria en `src/app/api/gallery/route.ts`.
- APIs admin protegidas:
  - `src/app/api/admin/projects/route.ts`
  - `src/app/api/admin/projects/[id]/route.ts`
  - `src/app/api/admin/projects/[id]/images/route.ts`
- Integracion Supabase:
  - `src/lib/supabase/client.ts`
  - `src/lib/supabase/admin.ts`
  - `src/lib/supabase/auth.ts`
- Galeria publica conectada a backend:
  - `src/components/BeforeAfterGallery.tsx`
- Esquema SQL listo:
  - `supabase/schema.sql`

## 2. Requisito clave pedido: doble traduccion por imagen

Cada imagen tiene campos bilingues editables por el dueno desde el panel:

- `alt_es`
- `alt_en`
- `caption_es`
- `caption_en`

Adicionalmente, cada proyecto tiene introduccion bilingue del dueno:

- `intro_es`
- `intro_en`

## 3. Estructura de datos (DB)

Tablas:

- `gallery_projects`
  - metadata del proyecto + textos bilingues + estado + orden
- `gallery_images`
  - 4 variantes por proyecto (`before/after`, `desktop/mobile`) + textos bilingues por imagen
- `admin_profiles`
  - define quien es admin

Tipos enum:

- `gallery_service`
- `gallery_image_kind`

Todo esto ya viene en `supabase/schema.sql`.

## 4. Configuracion Supabase (paso a paso)

1. Crear proyecto en Supabase.
2. En `Storage`, crear bucket: `gallery`.
3. En `SQL Editor`, ejecutar completo `supabase/schema.sql`.
4. Crear usuario del dueno en `Authentication > Users`.
5. Asignarlo como admin en SQL:

```sql
insert into public.admin_profiles (id, role)
values ('UUID_DEL_USUARIO', 'admin')
on conflict (id) do nothing;
```

## 5. Variables de entorno

Crear `.env.local` en la raiz:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY
```

Reglas:

- `SUPABASE_SERVICE_ROLE_KEY` solo servidor.
- Nunca exponer service role en cliente.

## 6. Instalar dependencias

Ya se agrego en `package.json`:

- `@supabase/supabase-js`

Instalar:

```bash
pnpm install
```

## 7. Correr en local

```bash
pnpm dev
```

Accesos:

- Sitio publico: `http://localhost:3000`
- Panel admin: `http://localhost:3000/admin/login`

## 8. Flujo de uso del dueno (intuitivo)

1. Entrar a `/admin/login` con su email/password de Supabase.
2. Ir a `Nuevo proyecto`.
3. Completar:
   - slug
   - servicio
   - ubicacion
   - titulo ES/EN
   - descripcion ES/EN
   - introduccion del dueno ES/EN
   - estado activo
   - orden
4. Guardar proyecto.
5. Subir 4 imagenes por proyecto:
   - Antes Desktop
   - Antes Mobile
   - Despues Desktop
   - Despues Mobile
6. En cada imagen llenar obligatoriamente:
   - Alt ES
   - Alt EN
   - Caption ES
   - Caption EN
7. Verificar cambios en la web publica.

## 9. Reglas de archivos para imagenes

En upload admin se validan:

- tipos: `image/webp`, `image/png`, `image/jpeg`
- limite: 4MB

Rutas internas en bucket:

- `projects/{project_id}/before-desktop.ext`
- `projects/{project_id}/before-mobile.ext`
- `projects/{project_id}/after-desktop.ext`
- `projects/{project_id}/after-mobile.ext`

## 10. Seguridad implementada

- APIs admin requieren token de sesion valido.
- Se valida perfil admin en `admin_profiles`.
- RLS activo en tablas.
- Storage con policy de escritura solo admin.
- Lectura publica solo de proyectos activos.

## 11. Comportamiento de fallback

Si Supabase no esta configurado o falla temporalmente:

- `/api/gallery` devuelve fallback local.
- La galeria publica sigue funcionando con imagenes de `public/images/gallery`.

Esto permite migracion gradual sin romper el sitio.

## 12. QA recomendado antes de produccion

Checklist:

- Login admin funciona.
- Crear/editar/eliminar proyecto funciona.
- Activar/desactivar proyecto se refleja en web.
- Reordenar por `display_order` funciona.
- Upload de las 4 imagenes funciona.
- Alt/caption bilingue por imagen se guarda.
- Intro bilingue del dueno se muestra.
- Filtros en galeria siguen operativos.

## 13. Despliegue en Vercel

1. Agregar env vars en Vercel.
2. Deploy en `dev` para probar.
3. Validar QA.
4. Merge a `main`.

## 14. Notas finales

- El panel admin esta dentro de la misma app en `src/app/admin`, como recomendaste.
- Es la forma mas simple de mantener una sola codebase.
- `robots.ts` ya bloquea `/admin` de indexacion.
