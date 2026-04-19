$env:NEXT_PUBLIC_SUPABASE_URL = (Select-String -Path .env.local -Pattern '^NEXT_PUBLIC_SUPABASE_URL=').Line.Split('=')[1]
$env:NEXT_PUBLIC_SUPABASE_ANON_KEY = (Select-String -Path .env.local -Pattern '^NEXT_PUBLIC_SUPABASE_ANON_KEY=').Line.Split('=')[1]
$env:SUPABASE_SERVICE_ROLE_KEY = (Select-String -Path .env.local -Pattern '^SUPABASE_SERVICE_ROLE_KEY=').Line.Split('=')[1]
node .\scripts\seed-gallery.cjs
