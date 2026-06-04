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
  console.error('Missing env supabase vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

async function list(ids) {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('id,project_id,kind,public_url,path')
    .in('project_id', ids)
    .order('project_id', { ascending: true });

  if (error) {
    console.error('Error querying gallery_images:', error);
    process.exit(1);
  }

  console.log(JSON.stringify(data, null, 2));
}

const ids = process.argv[2] ? process.argv[2].split(',').map(Number) : [21,22,23,24,26];
list(ids).catch((e)=>{ console.error(e); process.exit(1); });
