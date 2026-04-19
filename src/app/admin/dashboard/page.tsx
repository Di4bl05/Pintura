"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient, hasSupabaseClientConfig } from "@/lib/supabase/client";
import { adminFetch } from "@/lib/adminClientApi";
import { GalleryImageKind, GalleryProject, GalleryProjectPayload, GalleryService } from "@/types/gallery";

const serviceOptions: GalleryService[] = ["interior", "exterior", "cabinet", "commercial", "deck", "pressure"];
const imageKinds: GalleryImageKind[] = ["before_desktop", "before_mobile", "after_desktop", "after_mobile"];

const emptyPayload: GalleryProjectPayload = {
  slug: "",
  service: "interior",
  location: "Orlando",
  title_es: "",
  title_en: "",
  description_es: "",
  description_en: "",
  intro_es: "",
  intro_en: "",
  is_active: true,
  display_order: 1,
};

type UploadState = {
  file: File | null;
  alt_es: string;
  alt_en: string;
  caption_es: string;
  caption_en: string;
  busy: boolean;
};

function initialUploadState(): Record<GalleryImageKind, UploadState> {
  return {
    before_desktop: { file: null, alt_es: "", alt_en: "", caption_es: "", caption_en: "", busy: false },
    before_mobile: { file: null, alt_es: "", alt_en: "", caption_es: "", caption_en: "", busy: false },
    after_desktop: { file: null, alt_es: "", alt_en: "", caption_es: "", caption_en: "", busy: false },
    after_mobile: { file: null, alt_es: "", alt_en: "", caption_es: "", caption_en: "", busy: false },
  };
}

function kindLabel(kind: GalleryImageKind) {
  const labels: Record<GalleryImageKind, string> = {
    before_desktop: "Antes Desktop",
    before_mobile: "Antes Mobile",
    after_desktop: "Despues Desktop",
    after_mobile: "Despues Mobile",
  };
  return labels[kind];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<GalleryProjectPayload>(emptyPayload);
  const [uploads, setUploads] = useState<Record<GalleryImageKind, UploadState>>(initialUploadState);

  const selectedProject = useMemo(() => projects.find((project) => project.id === selectedId) ?? null, [projects, selectedId]);

  const hydrateUploadsFromProject = (project: GalleryProject | null) => {
    if (!project) {
      setUploads(initialUploadState());
      return;
    }

    const next = initialUploadState();
    for (const kind of imageKinds) {
      const image = project.images.find((entry) => entry.kind === kind);
      if (image) {
        next[kind].alt_es = image.alt_es;
        next[kind].alt_en = image.alt_en;
        next[kind].caption_es = image.caption_es;
        next[kind].caption_en = image.caption_en;
      }
    }
    setUploads(next);
  };

  const loadProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = await adminFetch("/api/admin/projects");
      const list = (payload.projects ?? []) as GalleryProject[];
      setProjects(list);

      if (list.length > 0) {
        const target = selectedId ? list.find((item) => item.id === selectedId) : list[0];
        if (target) {
          setSelectedId(target.id);
          setForm({
            slug: target.slug,
            service: target.service,
            location: target.location,
            title_es: target.title_es,
            title_en: target.title_en,
            description_es: target.description_es,
            description_en: target.description_en,
            intro_es: target.intro_es,
            intro_en: target.intro_en,
            is_active: target.is_active,
            display_order: target.display_order,
          });
          hydrateUploadsFromProject(target);
        }
      } else {
        setSelectedId(null);
        setForm(emptyPayload);
        hydrateUploadsFromProject(null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudieron cargar datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasSupabaseClientConfig) {
      setLoading(false);
      setError("Falta configurar Supabase en variables de entorno.");
      return;
    }

    const run = async () => {
      const supabase = createSupabaseBrowserClient();
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/admin/login");
        return;
      }
      await loadProjects();
    };

    run();
  }, []);

  const selectProject = (project: GalleryProject) => {
    setSelectedId(project.id);
    setMessage(null);
    setError(null);
    setForm({
      slug: project.slug,
      service: project.service,
      location: project.location,
      title_es: project.title_es,
      title_en: project.title_en,
      description_es: project.description_es,
      description_en: project.description_en,
      intro_es: project.intro_es,
      intro_en: project.intro_en,
      is_active: project.is_active,
      display_order: project.display_order,
    });
    hydrateUploadsFromProject(project);
  };

  const handleInput = <K extends keyof GalleryProjectPayload>(key: K, value: GalleryProjectPayload[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const createProject = async () => {
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const payload = await adminFetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const created = payload.project as GalleryProject;
      setMessage("Proyecto creado. Ahora puedes subir las 4 imagenes y sus traducciones.");
      setSelectedId(created.id);
      await loadProjects();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo crear");
    } finally {
      setSaving(false);
    }
  };

  const saveProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedId) {
      await createProject();
      return;
    }

    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      await adminFetch(`/api/admin/projects/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setMessage("Proyecto actualizado correctamente.");
      await loadProjects();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo actualizar");
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async () => {
    if (!selectedId) return;

    const ok = window.confirm("Esta accion eliminara proyecto e imagenes. Continuar?");
    if (!ok) return;

    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      await adminFetch(`/api/admin/projects/${selectedId}`, { method: "DELETE" });
      setMessage("Proyecto eliminado.");
      setSelectedId(null);
      setForm(emptyPayload);
      setUploads(initialUploadState());
      await loadProjects();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo eliminar");
    } finally {
      setSaving(false);
    }
  };

  const updateUploadField = (kind: GalleryImageKind, key: keyof UploadState, value: string | File | null | boolean) => {
    setUploads((prev) => ({
      ...prev,
      [kind]: {
        ...prev[kind],
        [key]: value,
      },
    }));
  };

  const uploadImage = async (kind: GalleryImageKind) => {
    if (!selectedId) {
      setError("Primero crea el proyecto y guardalo para subir imagenes.");
      return;
    }

    const data = uploads[kind];
    if (!data.file) {
      setError(`Selecciona un archivo para ${kindLabel(kind)}.`);
      return;
    }

    updateUploadField(kind, "busy", true);
    setError(null);
    setMessage(null);

    try {
      const body = new FormData();
      body.append("kind", kind);
      body.append("alt_es", data.alt_es);
      body.append("alt_en", data.alt_en);
      body.append("caption_es", data.caption_es);
      body.append("caption_en", data.caption_en);
      body.append("file", data.file);

      await adminFetch(`/api/admin/projects/${selectedId}/images`, {
        method: "POST",
        body,
      });

      setMessage(`${kindLabel(kind)} actualizada.`);
      await loadProjects();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo subir imagen");
    } finally {
      updateUploadField(kind, "busy", false);
    }
  };

  const logout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <header className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin de Galeria</h1>
              <p className="text-sm text-slate-600">Gestion intuitiva: proyectos, intro del dueno, descripciones e imagenes ES/EN.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedId(null);
                  setForm({ ...emptyPayload, display_order: projects.length + 1 });
                  setUploads(initialUploadState());
                  setMessage("Nuevo proyecto listo para completar.");
                  setError(null);
                }}
                className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
              >
                Nuevo proyecto
              </button>
              <button
                onClick={logout}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cerrar sesion
              </button>
            </div>
          </div>
        </header>

        {message && <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</div>}
        {error && <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
            <h2 className="mb-3 px-2 text-sm font-semibold text-slate-800">Proyectos ({projects.length})</h2>
            <div className="max-h-[70vh] space-y-2 overflow-auto pr-1">
              {loading && <p className="px-2 py-2 text-sm text-slate-500">Cargando...</p>}
              {!loading && projects.length === 0 && <p className="px-2 py-2 text-sm text-slate-500">No hay proyectos aun.</p>}

              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => selectProject(project)}
                  className={`w-full rounded-2xl border px-3 py-2 text-left transition ${
                    selectedId === project.id
                      ? "border-primary-300 bg-primary-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <p className="truncate text-sm font-semibold text-slate-900">{project.title_es}</p>
                  <p className="text-xs text-slate-500">#{project.id} · {project.service} · {project.location}</p>
                  <p className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${project.is_active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                    {project.is_active ? "Activo" : "Inactivo"}
                  </p>
                </button>
              ))}
            </div>
          </aside>

          <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <form onSubmit={saveProject} className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Slug</span>
                  <input value={form.slug} onChange={(e) => handleInput("slug", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Servicio</span>
                  <select value={form.service} onChange={(e) => handleInput("service", e.target.value as GalleryService)} className="w-full rounded-xl border border-slate-300 px-3 py-2">
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Ubicacion</span>
                  <input value={form.location} onChange={(e) => handleInput("location", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Orden</span>
                  <input
                    type="number"
                    min={0}
                    value={form.display_order}
                    onChange={(e) => handleInput("display_order", Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Titulo ES</span>
                  <input value={form.title_es} onChange={(e) => handleInput("title_es", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Titulo EN</span>
                  <input value={form.title_en} onChange={(e) => handleInput("title_en", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Descripcion ES</span>
                  <textarea value={form.description_es} onChange={(e) => handleInput("description_es", e.target.value)} className="h-28 w-full rounded-xl border border-slate-300 px-3 py-2" required />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Descripcion EN</span>
                  <textarea value={form.description_en} onChange={(e) => handleInput("description_en", e.target.value)} className="h-28 w-full rounded-xl border border-slate-300 px-3 py-2" required />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Introduccion del dueno ES</span>
                  <textarea value={form.intro_es} onChange={(e) => handleInput("intro_es", e.target.value)} className="h-28 w-full rounded-xl border border-slate-300 px-3 py-2" required />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Owner introduction EN</span>
                  <textarea value={form.intro_en} onChange={(e) => handleInput("intro_en", e.target.value)} className="h-28 w-full rounded-xl border border-slate-300 px-3 py-2" required />
                </label>
              </div>

              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={form.is_active} onChange={(e) => handleInput("is_active", e.target.checked)} />
                <span className="text-sm font-medium text-slate-700">Proyecto activo en web publica</span>
              </label>

              <div className="flex flex-wrap gap-2">
                <button type="submit" disabled={saving} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
                  {saving ? "Guardando..." : selectedId ? "Guardar cambios" : "Crear proyecto"}
                </button>
                {selectedId && (
                  <button type="button" onClick={deleteProject} className="rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
                    Eliminar proyecto
                  </button>
                )}
              </div>
            </form>

            <div className="mt-8 space-y-4 border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-900">Imagenes con doble traduccion</h3>
              <p className="text-sm text-slate-600">Cada imagen requiere Alt ES/EN y Caption ES/EN para SEO y usabilidad.</p>

              {imageKinds.map((kind) => {
                const state = uploads[kind];
                const currentImage = selectedProject?.images.find((image) => image.kind === kind);

                return (
                  <div key={kind} className="rounded-2xl border border-slate-200 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-slate-800">{kindLabel(kind)}</h4>
                      {currentImage?.url && (
                        <a href={currentImage.url} target="_blank" rel="noreferrer" className="text-xs font-medium text-primary-700 hover:underline">
                          Ver actual
                        </a>
                      )}
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="block md:col-span-2">
                        <span className="mb-1 block text-xs font-medium text-slate-600">Archivo</span>
                        <input
                          type="file"
                          accept="image/webp,image/png,image/jpeg"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateUploadField(kind, "file", e.target.files?.[0] ?? null)}
                          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-1 block text-xs font-medium text-slate-600">Alt ES</span>
                        <input value={state.alt_es} onChange={(e) => updateUploadField(kind, "alt_es", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                      </label>

                      <label className="block">
                        <span className="mb-1 block text-xs font-medium text-slate-600">Alt EN</span>
                        <input value={state.alt_en} onChange={(e) => updateUploadField(kind, "alt_en", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                      </label>

                      <label className="block">
                        <span className="mb-1 block text-xs font-medium text-slate-600">Caption ES</span>
                        <input value={state.caption_es} onChange={(e) => updateUploadField(kind, "caption_es", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                      </label>

                      <label className="block">
                        <span className="mb-1 block text-xs font-medium text-slate-600">Caption EN</span>
                        <input value={state.caption_en} onChange={(e) => updateUploadField(kind, "caption_en", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                      </label>
                    </div>

                    <div className="mt-3">
                      <button
                        type="button"
                        disabled={state.busy || !selectedId}
                        onClick={() => uploadImage(kind)}
                        className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
                      >
                        {state.busy ? "Subiendo..." : `Subir ${kindLabel(kind)}`}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
