"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LogOut, 
  Home, 
  Image, 
  FileText, 
  Settings,
  Languages,
  Save,
  Edit2,
  Trash2,
  Plus,
  Eye
} from "lucide-react";

interface ContentItem {
  id: string;
  key: string;
  es: string;
  en: string;
  type: "text" | "image";
}

interface GalleryProject {
  id: string;
  title: string;
  description: string;
  category: string;
  beforeImage: string;
  afterImage: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<"hero" | "services" | "gallery" | "whyChoose" | "contact">("hero");
  const [contentData, setContentData] = useState<ContentItem[]>([]);
  const [galleryProjects, setGalleryProjects] = useState<GalleryProject[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ es: string; en: string }>({ es: "", en: "" });
  const [saveMessage, setSaveMessage] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin");
    } else {
      loadContentData();
      setIsLoading(false);
    }
  }, [isAuthenticated, router, activeSection]);

  const loadContentData = async () => {
    try {
      // Cargar traducciones desde la API
      const resEs = await fetch("/api/content?lang=es");
      const resEn = await fetch("/api/content?lang=en");
      
      if (!resEs.ok || !resEn.ok) {
        throw new Error("Error al cargar contenido");
      }
      
      const dataEs = await resEs.json();
      const dataEn = await resEn.json();
      
      // Construir datos según la sección activa
      let items: ContentItem[] = [];
      
      if (activeSection === "hero") {
        items = [
          { id: "h1", key: "hero.title1", es: dataEs.data.hero.title1, en: dataEn.data.hero.title1, type: "text" },
          { id: "h2", key: "hero.description", es: dataEs.data.hero.description, en: dataEn.data.hero.description, type: "text" },
          { id: "h3", key: "hero.descriptionBold", es: dataEs.data.hero.descriptionBold, en: dataEn.data.hero.descriptionBold, type: "text" },
          { id: "h4", key: "hero.ctaFree", es: dataEs.data.hero.ctaFree, en: dataEn.data.hero.ctaFree, type: "text" },
          { id: "h5", key: "hero.carousel.0", es: dataEs.data.hero.carousel[0], en: dataEn.data.hero.carousel[0], type: "text" },
          { id: "h6", key: "hero.carousel.1", es: dataEs.data.hero.carousel[1], en: dataEn.data.hero.carousel[1], type: "text" },
          { id: "h7", key: "hero.carousel.2", es: dataEs.data.hero.carousel[2], en: dataEn.data.hero.carousel[2], type: "text" },
        ];
      } else if (activeSection === "services") {
        const servicesEs = Object.entries(dataEs.data.services.items);
        items = servicesEs.map(([key, value]: any, index) => ({
          id: `s${index}`,
          key: `services.items.${key}.title`,
          es: value.title,
          en: dataEn.data.services.items[key].title,
          type: "text" as const
        }));
      } else if (activeSection === "whyChoose") {
        const itemsEs = Object.entries(dataEs.data.whyChoose.items);
        items = itemsEs.map(([key, value]: any, index) => ({
          id: `w${index}`,
          key: `whyChoose.items.${key}.title`,
          es: value.title,
          en: dataEn.data.whyChoose.items[key].title,
          type: "text" as const
        }));
      } else if (activeSection === "contact") {
        items = [
          { id: "c1", key: "contact.title", es: dataEs.data.contact.title, en: dataEn.data.contact.title, type: "text" },
          { id: "c2", key: "contact.description", es: dataEs.data.contact.description, en: dataEn.data.contact.description, type: "text" },
        ];
      }
      
      setContentData(items);
      
      // Si es la sección de galería, cargar proyectos
      if (activeSection === "gallery") {
        const resProjects = await fetch("/api/gallery?lang=es");
        if (resProjects.ok) {
          const projectsData = await resProjects.json();
          setGalleryProjects(Object.entries(projectsData.data || {}).map(([id, data]: any) => ({
            id,
            ...data
          })));
        }
      }
    } catch (error) {
      console.error("Error al cargar contenido:", error);
      setSaveMessage("❌ Error al cargar contenido");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.id);
    setEditValues({ es: item.es, en: item.en });
  };

  const handleSave = async () => {
    if (!editingId) return;
    
    const updatedItem = contentData.find(item => item.id === editingId);
    if (!updatedItem) return;
    
    try {
      // Guardar en ambos idiomas
      const updates = [
        { lang: "es", path: updatedItem.key, value: editValues.es },
        { lang: "en", path: updatedItem.key, value: editValues.en }
      ];
      
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates })
      });
      
      if (!response.ok) {
        throw new Error("Error al guardar");
      }
      
      // Actualizar localmente
      setContentData(prev => prev.map(item => 
        item.id === editingId 
          ? { ...item, es: editValues.es, en: editValues.en }
          : item
      ));
      
      setEditingId(null);
      setSaveMessage("✅ Cambios guardados correctamente");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Error al guardar:", error);
      setSaveMessage("❌ Error al guardar cambios");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({ es: "", en: "" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-primary-600 border-t-transparent animate-spin"></div>
          <p className="text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-xs text-gray-500">Gestor de Contenido</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user?.email}
              </span>
              <a
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-primary-600"
              >
                <Eye className="w-4 h-4" />
                Ver Sitio
              </a>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Save Message */}
        {saveMessage && (
          <div className="px-4 py-3 mb-4 text-green-700 border border-green-200 rounded-lg bg-green-50">
            {saveMessage}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
              <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase">Secciones</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection("hero")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === "hero"
                      ? "bg-primary-50 text-primary-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Home className="w-5 h-5" />
                  Hero / Inicio
                </button>
                <button
                  onClick={() => setActiveSection("services")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === "services"
                      ? "bg-primary-50 text-primary-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  Servicios
                </button>
                <button
                  onClick={() => setActiveSection("gallery")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === "gallery"
                      ? "bg-primary-50 text-primary-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Image className="w-5 h-5" />
                  Galería
                </button>
                <button
                  onClick={() => setActiveSection("whyChoose")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === "whyChoose"
                      ? "bg-primary-50 text-primary-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  Por Qué Nosotros
                </button>
                <button
                  onClick={() => setActiveSection("contact")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === "contact"
                      ? "bg-primary-50 text-primary-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  Contacto
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
              {/* Section Header */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  Editar Sección: {activeSection === "hero" ? "Hero / Inicio" : 
                    activeSection === "services" ? "Servicios" :
                    activeSection === "gallery" ? "Galería" :
                    activeSection === "whyChoose" ? "Por Qué Nosotros" : "Contacto"}
                </h2>
                <p className="text-gray-600">Modifica los textos e imágenes de esta sección</p>
              </div>

              {/* Content Items */}
              <div className="p-6">
                {activeSection === "gallery" ? (
                  // Gallery Management
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Proyectos de Galería</h3>
                      <button className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-primary-600 rounded-lg hover:bg-primary-700">
                        <Plus className="w-4 h-4" />
                        Agregar Proyecto
                      </button>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      {galleryProjects.map((project) => (
                        <div key={project.id} className="overflow-hidden border border-gray-200 rounded-lg">
                          <div className="grid grid-cols-2 gap-2 p-2">
                            <img src={project.beforeImage} alt="Before" className="object-cover w-full h-32 rounded" />
                            <img src={project.afterImage} alt="After" className="object-cover w-full h-32 rounded" />
                          </div>
                          <div className="p-4">
                            <h4 className="mb-1 font-semibold text-gray-900">{project.title}</h4>
                            <p className="mb-2 text-sm text-gray-600">{project.description}</p>
                            <span className="inline-block px-2 py-1 text-xs font-medium rounded text-primary-700 bg-primary-50">
                              {project.category}
                            </span>
                            <div className="flex gap-2 mt-3">
                              <button className="flex items-center gap-1 px-3 py-1 text-sm text-blue-700 transition-colors border border-blue-300 rounded hover:bg-blue-50">
                                <Edit2 className="w-3 h-3" />
                                Editar
                              </button>
                              <button className="flex items-center gap-1 px-3 py-1 text-sm text-red-700 transition-colors border border-red-300 rounded hover:bg-red-50">
                                <Trash2 className="w-3 h-3" />
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {galleryProjects.length === 0 && (
                      <div className="py-12 text-center text-gray-500">
                        <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No hay proyectos todavía. Agrega el primero.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Text Content Management
                  <div className="space-y-4">
                    {contentData.map((item) => (
                      <div key={item.id} className="p-4 transition-colors border border-gray-200 rounded-lg hover:border-primary-300">
                        {editingId === item.id ? (
                          // Edit Mode
                          <div className="space-y-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-sm text-gray-500">{item.key}</span>
                              <Languages className="w-4 h-4 text-gray-400" />
                            </div>
                            
                            <div>
                              <label className="block mb-1 text-sm font-semibold text-gray-700">
                                🇪🇸 Español
                              </label>
                              <input
                                type="text"
                                value={editValues.es}
                                onChange={(e) => setEditValues(prev => ({ ...prev, es: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                              />
                            </div>
                            
                            <div>
                              <label className="block mb-1 text-sm font-semibold text-gray-700">
                                🇺🇸 English
                              </label>
                              <input
                                type="text"
                                value={editValues.en}
                                onChange={(e) => setEditValues(prev => ({ ...prev, en: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                              />
                            </div>
                            
                            <div className="flex gap-2 pt-2">
                              <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                              >
                                <Save className="w-4 h-4" />
                                Guardar
                              </button>
                              <button
                                onClick={handleCancel}
                                className="px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="mb-2 font-mono text-xs text-gray-500">{item.key}</div>
                              <div className="space-y-1">
                                <div className="text-sm">
                                  <span className="font-semibold text-gray-600">🇪🇸:</span> {item.es}
                                </div>
                                <div className="text-sm">
                                  <span className="font-semibold text-gray-600">🇺🇸:</span> {item.en}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-2 ml-4 transition-colors rounded-lg text-primary-600 hover:bg-primary-50"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Info Note */}
                <div className="p-4 mt-6 border border-green-200 rounded-lg bg-green-50">
                  <p className="text-sm text-green-800">
                    <strong>✅ Sistema Actualizado:</strong> Los cambios ahora se guardan permanentemente en los archivos de traducción. 
                    Los datos persisten entre sesiones y recargas del navegador.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
