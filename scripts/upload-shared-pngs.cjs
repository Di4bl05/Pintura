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
const env = { ...parseEnvFile(path.join(rootDir, '.env.local')), ...process.env };
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

const sourceDir = path.join(rootDir, 'public', 'images', 'gallery');
const filesToUpload = ['Exterior.png', 'Gabinetes.png', 'Pressure.png', 'Superfice1.png', 'Nostros.png', 'exteriorCTA.png'];

async function upload() {
  for (const fileName of filesToUpload) {
    const sourcePath = path.join(sourceDir, fileName);
    if (!fs.existsSync(sourcePath)) {
      console.warn(`Skipping missing file: ${sourcePath}`);
      continue;
    }

    const storagePath = `shared/${fileName}`;
    const fileBuffer = fs.readFileSync(sourcePath);
    const contentType = fileName.toLowerCase().endsWith('.png') ? 'image/png' : 'application/octet-stream';

    console.log(`Uploading ${fileName} -> ${storagePath}`);

    const { error: uploadError } = await supabase.storage.from('gallery').upload(storagePath, fileBuffer, {
      upsert: true,
      contentType,
      cacheControl: '3600',
    });

    if (uploadError) {
      console.error('Upload error for', fileName, uploadError);
      continue;
    }

    const { data } = supabase.storage.from('gallery').getPublicUrl(storagePath);
    console.log(`${fileName} -> ${data.publicUrl}`);
  }
}

upload().catch((e) => {
  console.error(e);
  process.exit(1);
});
