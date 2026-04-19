const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};

  const content = fs.readFileSync(filePath, "utf8");
  const env = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    env[key] = value;
  }

  return env;
}

async function ensureBucket(supabase) {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  if (error) throw error;

  if (!buckets?.some((bucket) => bucket.name === "gallery")) {
    const { error: createError } = await supabase.storage.createBucket("gallery", {
      public: true,
      allowedMimeTypes: ["image/webp", "image/png", "image/jpeg"],
      fileSizeLimit: "4194304",
    });

    if (createError) throw createError;
  }
}

async function uploadSharedAssets() {
  const rootDir = path.resolve(__dirname, "..");
  const envFromFile = parseEnvFile(path.join(rootDir, ".env.local"));
  const env = { ...envFromFile, ...process.env };

  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  await ensureBucket(supabase);

  const sourceDir = path.join(rootDir, "public", "images", "gallery");
  const files = [
    "exterior-antes.webp",
    "exterior-despues.webp",
    "exterior2-despues.webp",
    "lavado-presion-pro.webp",
    "luis-y-bety.webp",
  ];

  for (const fileName of files) {
    const sourcePath = path.join(sourceDir, fileName);
    if (!fs.existsSync(sourcePath)) {
      console.warn(`Skipping missing file: ${sourcePath}`);
      continue;
    }

    const storagePath = `shared/${fileName}`;
    const fileBuffer = fs.readFileSync(sourcePath);

    const { error: uploadError } = await supabase.storage.from("gallery").upload(storagePath, fileBuffer, {
      upsert: true,
      contentType: "image/webp",
      cacheControl: "3600",
    });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("gallery").getPublicUrl(storagePath);
    console.log(`${fileName} -> ${data.publicUrl}`);
  }
}

uploadSharedAssets().catch((error) => {
  console.error("Failed to upload shared gallery assets:");
  console.error(error);
  process.exit(1);
});
