const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const index = line.indexOf('=');
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    env[key] = value;
  }
  return env;
}

const rootDir = path.resolve(__dirname, '..');
const localEnv = parseEnvFile(path.join(rootDir, '.env.local'));
const env = { ...localEnv, ...process.env };

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Map de imágenes locales a proyectos y sus tipos. Usamos `slug` para resolver el id real
const imageMapping = [
  { file: 'Exterior.png', projectSlug: 'project-2', kind: 'after_desktop', description: 'Exterior - Escritorio' },
  { file: 'exteriorCTA.png', projectSlug: 'project-2', kind: 'after_mobile', description: 'Exterior - Móvil' },
  { file: 'Gabinetes.png', projectSlug: 'project-4', kind: 'after_desktop', description: 'Gabinetes - Escritorio' },
  { file: 'Nostros.png', projectSlug: 'project-1', kind: 'after_desktop', description: 'Nosotros - Escritorio' },
  { file: 'Pressure.png', projectSlug: 'project-6', kind: 'after_desktop', description: 'Presión - Escritorio' },
  { file: 'Superfice1.png', projectSlug: 'project-3', kind: 'after_desktop', description: 'Superficie - Escritorio' },
];

async function ensureBucket() {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  if (error) throw error;

  if (!buckets?.some((bucket) => bucket.name === 'gallery')) {
    const { error: createError } = await supabase.storage.createBucket('gallery', {
      public: true,
      allowedMimeTypes: ['image/webp', 'image/png', 'image/jpeg'],
      fileSizeLimit: '4194304',
    });
    if (createError) throw createError;
  }
}

async function uploadImage(imagePath, projectSlug, kind, description) {
  const fileName = path.basename(imagePath);
  const fileExtension = path.extname(fileName);
  const baseName = path.basename(fileName, fileExtension);
  
  // Resolver project id por slug
  const { data: projectRows, error: projectError } = await supabase
    .from('gallery_projects')
    .select('id')
    .eq('slug', projectSlug)
    .maybeSingle();

  if (projectError) {
    throw projectError;
  }

  if (!projectRows) {
    console.warn(`⚠️  No se encontró proyecto con slug ${projectSlug}. Se omite ${fileName}`);
    return null;
  }

  const projectId = projectRows.id;

  // Nombre del archivo en storage: projects/{id}/{kind}.{ext}
  const storagePath = `projects/${projectId}/${kind}${fileExtension}`;
  
  const fileBuffer = fs.readFileSync(imagePath);
  
  console.log(`Subiendo ${fileName} → ${storagePath}...`);
  
  const { error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(storagePath, fileBuffer, {
      upsert: true,
      contentType: `image/${fileExtension.slice(1).toLowerCase()}`,
      cacheControl: '3600',
    });

  if (uploadError) throw uploadError;

  const { data: publicData } = supabase.storage
    .from('gallery')
    .getPublicUrl(storagePath);

  console.log(`✓ Guardado en Supabase: ${publicData.publicUrl}`);

  // Crear o actualizar registro en BD
  const altText = `${kind.split('_')[0] === 'before' ? 'Before' : 'After'} ${projectId}`;
  const altTextEs = `${kind.split('_')[0] === 'before' ? 'Antes' : 'Después'} ${projectId}`;

  const { error: dbError } = await supabase
    .from('gallery_images')
    .upsert(
      {
        project_id: projectId,
        kind,
        path: storagePath,
        public_url: publicData.publicUrl,
        alt_es: altTextEs,
        alt_en: altText,
        caption_es: description,
        caption_en: description,
      },
      { onConflict: 'project_id,kind' }
    );

  if (dbError) throw dbError;
  console.log(`✓ Registro BD creado/actualizado para project_id ${projectId} - ${kind}\n`);
}

async function upload() {
  console.log('🔄 Asegurando bucket de galería...');
  await ensureBucket();

  const projectRoot = path.join(rootDir, 'public', 'images', 'gallery');

  console.log(`📤 Subiendo ${imageMapping.length} imágenes...\n`);

  for (const img of imageMapping) {
    const imagePath = path.join(projectRoot, img.file);
    if (!fs.existsSync(imagePath)) {
      console.warn(`⚠️  Archivo no encontrado: ${imagePath}`);
      continue;
    }
    const result = await uploadImage(imagePath, img.projectSlug, img.kind, img.description);
    if (result === null) continue;
  }

  console.log('✅ Galería actualizada exitosamente.');
}

upload().catch((error) => {
  console.error('❌ Error al subir galería:');
  console.error(error);
  process.exit(1);
});
