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

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<"hero" | "services" | "gallery" | "whyChoose" | "contact">("hero");
  const [contentData, setContentData] = useState<ContentItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ es: string; en: string }>({ es: "", en: "" });
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin");
    } else {
      loadContentData();
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  const loadContentData = () => {
    // Cargar datos de las traducciones
    const heroContent: ContentItem[] = [
      { id: "h1", key: "hero.title1", es: "ESTILO", en: "STYLE", type: "text" },
      { id: "h2", key: "hero.description", es: "Transformamos espacios en obras maestras.", en: "We transform spaces into masterpieces.", type: "text" },
      { id: "h3", key: "hero.descriptionBold", es: "Calidad superior, precios justos.", en: "Superior quality, fair prices.", type: "text" },
      { id: "h4", key: "hero.ctaFree", es: "CONSULTA GRATIS", en: "FREE QUOTE", type: "text" },
      { id: "h5", key: "hero.carousel.0", es: "Transforma tu hogar", en: "Transform your home", type: "text" },
      { id: "h6", key: "hero.carousel.1", es: "Pasión en cada detalle", en: "Passion in every detail", type: "text" },
      { id: "h7", key: "hero.carousel.2", es: "Acabados de excelencia", en: "Excellence in finishes", type: "text" },
    ];
    
    setContentData(heroContent);
  };

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.id);
    setEditValues({ es: item.es, en: item.en });
  };

  const handleSave = async () => {
    if (!editingId) return;
    
    // Actualizar el contenido localmente
    setContentData(prev => prev.map(item => 
      item.id === editingId 
        ? { ...item, es: editValues.es, en: editValues.en }
        : item
    ));
    
    // Aquí guardarías en el backend o localStorage
    // Por ahora solo simulamos el guardado
    const updatedItem = contentData.find(item => item.id === editingId);
    if (updatedItem) {
      localStorage.setItem(`content_${updatedItem.key}`, JSON.stringify(editValues));
    }
    
    setEditingId(null);
    setSaveMessage("✅ Cambios guardados correctamente");
    setTimeout(() => setSaveMessage(""), 3000);
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

                {/* Info Note */}
                <div className="p-4 mt-6 border border-blue-200 rounded-lg bg-blue-50">
                  <p className="text-sm text-blue-800">
                    <strong>Nota:</strong> Los cambios se guardan localmente. Para persistir los cambios entre sesiones, 
                    se requiere implementar un backend con base de datos.
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
