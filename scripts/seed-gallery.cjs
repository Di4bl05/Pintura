const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const esTranslations = require('../src/translations/es.json');
const enTranslations = require('../src/translations/en.json');

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

const serviceSequence = ['interior', 'exterior', 'cabinet', 'commercial'];
const locationSequence = [
  'Orlando',
  'Winter Park',
  'Lake Nona',
  'Kissimmee',
  'Windermere',
  'Dr. Phillips',
  'Altamonte Springs',
  'Hunters Creek',
  'Maitland',
  'Oviedo',
  'Apopka',
  'Sanford',
  'Longwood',
  'Clermont',
  'Celebration',
  'Casselberry',
  'Baldwin Park',
  'College Park',
  'Lake Mary',
  'Pine Hills',
];

const serviceCopy = {
  es: {
    interior: 'Renovacion interior con acabados limpios y detalles finos.',
    exterior: 'Lavado, preparacion y pintura exterior para clima de Florida.',
    cabinet: 'Restauracion y lacado de gabinetes para acabado uniforme.',
    commercial: 'Pintura comercial coordinada para minimizar interrupciones.',
    deck: 'Restauracion y sellado de deck para mayor durabilidad.',
    pressure: 'Lavado a presion profesional para exteriores.',
  },
  en: {
    interior: 'Interior repaint with clean finishes and fine details.',
    exterior: 'Washing, prep, and exterior paint for Florida weather.',
    cabinet: 'Cabinet restoration and refinishing for a smooth finish.',
    commercial: 'Commercial painting planned to reduce downtime.',
    deck: 'Deck restoration and sealing for better durability.',
    pressure: 'Professional pressure washing for outdoor surfaces.',
  },
};

function getTranslation(table, id, fallbackTitle, fallbackDescription) {
  const row = table?.[String(id)] || {};
  return {
    title: row.title || fallbackTitle,
    description: row.description || fallbackDescription,
    location: row.location || locationSequence[id - 1] || 'Orlando',
    service: row.service || serviceSequence[(id - 1) % serviceSequence.length],
  };
}

function buildProjects() {
  const esProjects = esTranslations.gallery?.projects || {};
  const enProjects = enTranslations.gallery?.projects || {};

  return Array.from({ length: 20 }, (_, index) => {
    const id = index + 1;
    const service = serviceSequence[index % serviceSequence.length];

    const es = getTranslation(esProjects, id, `Proyecto ${id}`, serviceCopy.es[service]);
    const en = getTranslation(enProjects, id, `Project ${id}`, serviceCopy.en[service]);

    return {
      slug: `project-${id}`,
      service,
      location: es.location,
      title_es: es.title,
      title_en: en.title,
      description_es: es.description,
      description_en: en.description,
      intro_es: serviceCopy.es[service],
      intro_en: serviceCopy.en[service],
      is_active: true,
      display_order: id,
    };
  });
}

async function ensureBucket() {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  if (error) throw error;

  if (!buckets?.some((bucket) => bucket.name === 'gallery')) {
    const { error: createError } = await supabase.storage.createBucket('gallery', {
      public: true,
      allowedMimeTypes: ['image/webp', 'image/png', 'image/jpeg'],
      fileSizeLimit: '4194304',
    });

    if (createError) {
      throw createError;
    }
  }
}

async function uploadProjectImages(projectId) {
  const projectRoot = path.join(rootDir, 'public', 'images', 'gallery');
  const imageKinds = [
    ['before_desktop', 'antes', '1600'],
    ['before_mobile', 'antes', '600'],
    ['after_desktop', 'despues', '1600'],
    ['after_mobile', 'despues', '600'],
  ];

  for (const [kind, side, size] of imageKinds) {
    const filename = `${projectId}_${side}-${size}.webp`;
    const sourcePath = path.join(projectRoot, filename);

    if (!fs.existsSync(sourcePath)) {
      console.warn(`Missing file: ${sourcePath}`);
      continue;
    }

    const storagePath = `projects/${projectId}/${kind}.webp`;
    const fileBuffer = fs.readFileSync(sourcePath);

    const { error: uploadError } = await supabase.storage.from('gallery').upload(storagePath, fileBuffer, {
      upsert: true,
      contentType: 'image/webp',
      cacheControl: '3600',
    });

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage.from('gallery').getPublicUrl(storagePath);

    const altBase = kind.startsWith('before') ? 'Antes' : 'Después';
    const captionBase = kind.startsWith('before') ? 'Antes' : 'Después';

    const { error: rowError } = await supabase.from('gallery_images').upsert(
      {
        project_id: projectId,
        kind,
        path: storagePath,
        public_url: publicData.publicUrl,
        alt_es: `${altBase} ${projectId}`,
        alt_en: `${kind.startsWith('before') ? 'Before' : 'After'} ${projectId}`,
        caption_es: `${captionBase} ${projectId}`,
        caption_en: `${kind.startsWith('before') ? 'Before' : 'After'} ${projectId}`,
      },
      { onConflict: 'project_id,kind' }
    );

    if (rowError) throw rowError;
  }
}

async function seed() {
  console.log('Ensuring bucket...');
  await ensureBucket();

  const projects = buildProjects();
  console.log(`Seeding ${projects.length} projects...`);

  for (const project of projects) {
    const { data, error } = await supabase
      .from('gallery_projects')
      .upsert(project, { onConflict: 'slug' })
      .select('id, slug')
      .single();

    if (error) throw error;

    console.log(`Seeded project ${data.id}: ${data.slug}`);
    await uploadProjectImages(data.id);
  }

  console.log('Gallery migration completed successfully.');
}

seed().catch((error) => {
  console.error('Gallery migration failed:');
  console.error(error);
  process.exit(1);
});
