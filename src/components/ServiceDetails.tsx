"use client";

import React, { useEffect } from 'react';
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Trophy, 
  Target, 
  Info,
  Layers,
  Search
} from 'lucide-react';

interface ServiceDetailProps {
  isOpen: boolean;
  onClose: () => void;
  serviceData: any; 
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ isOpen, onClose, serviceData }) => {
  
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !serviceData) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto antialiased">
      
      {/* NAVEGACIÓN MINIMALISTA */}
      <nav className="sticky top-0 z-[130] bg-white/90 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-black uppercase tracking-tighter text-slate-900 text-sm">Luisbety Impecables</span>
          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase tracking-widest">Service Protocol</span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400">
          <X className="w-5 h-5" />
        </button>
      </nav>

      {/* HERO: TÍTULOS MÁS PEQUEÑOS Y REFINADOS */}
      <section className="relative w-full h-[40vh] md:h-[50vh] flex items-center bg-slate-900 overflow-hidden">
        <img 
          src={serviceData.img} 
          className="absolute inset-0 w-full h-full object-cover opacity-50" 
          alt={serviceData.title} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black uppercase italic leading-none tracking-tighter text-white mb-4">
              {serviceData.title}
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
              Análisis técnico y ejecución especializada para propiedades residenciales y comerciales en Florida Central. Nuestro enfoque se centra en la durabilidad estructural y la precisión estética.
            </p>
          </div>
        </div>
      </section>

      {/* BLOQUE DE TEXTO INFORMATIVO (MENOS PROMO, MÁS INFO) */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <Info className="w-4 h-4" />
              <span className="font-bold uppercase tracking-widest text-[10px]">Especificaciones Técnicas</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-slate-900 mb-6">
              Compromiso con la Integridad de la Superficie
            </h2>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                La aplicación de pintura en entornos de alta humedad como Orlando requiere un conocimiento profundo de la química de los polímeros y la porosidad de los sustratos. No nos limitamos a cubrir imperfecciones; realizamos un diagnóstico previo para identificar problemas de capilaridad, eflorescencia o degradación por rayos UV que puedan comprometer la adherencia del material.
              </p>
              <p>
                Utilizamos sistemas de recubrimiento elastomérico y acrílicos de resina pura que permiten la transpiración de la pared mientras bloquean la entrada de agua líquida. Este equilibrio es fundamental para evitar el abombamiento y la descamación prematura, garantizando un ciclo de vida útil un 40% superior al de las aplicaciones estándar.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="font-black uppercase text-[11px] tracking-[0.2em] text-slate-400 mb-4">Estándares Aplicados</h4>
              <ul className="space-y-3">
                {[
                  { t: "ASTM D16", d: "Terminología estándar para pinturas." },
                  { t: "SSPC-SP 1", d: "Limpieza profunda con solventes y presión." },
                  { t: "PDCA P1", d: "Estándar de acabado y evaluación visual." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5" />
                    <p className="text-[11px] text-slate-600"><strong className="text-slate-900">{item.t}:</strong> {item.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO: BURBUJAS PEQUEÑAS Y MÁS HACIA LOS BORDES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
            {[
              {
                id: '01',
                title: 'Descontaminación Sustitutiva',
                desc: 'Iniciamos con una limpieza profunda para eliminar microorganismos y depósitos salinos. Este paso es vital para abrir el poro del material y permitir una penetración molecular óptima de la imprimación primaria.',
                img: '/images/services/ext-1.webp'
              },
              {
                id: '02',
                title: 'Corrección de Patologías',
                desc: 'Tratamos grietas de asentamiento y fisuras por estrés térmico. Usamos compuestos con memoria elástica que absorben los movimientos de la estructura sin quebrarse.',
                img: '/images/services/ext-2.webp'
              },
              {
                id: '03',
                title: 'Estratificación de Capas',
                desc: 'Aplicación controlada de múltiples capas con tiempos de curado específicos. Monitoreamos la temperatura del sustrato para evitar el secado rápido que produce pérdida de brillo.',
                img: '/images/services/ext-3.webp'
              },
              {
                id: '04',
                title: 'Control de Calidad Final',
                desc: 'Auditoría detallada de espesores y uniformidad. Verificamos que cada ángulo cumpla con el estándar de reflexión y protección antes de la entrega formal.',
                img: '/images/services/ext-4.webp'
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="flex items-start gap-6 group"
              >
                {/* BURBUJA PEQUEÑA */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img src={step.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt="" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-xs italic border-2 border-white shadow-md">
                    {step.id}
                  </div>
                </div>
                
                <div className="space-y-2">
                   <h4 className="text-lg font-black uppercase italic tracking-tight text-slate-900">{step.title}</h4>
                   <p className="text-slate-500 text-[13px] leading-relaxed font-medium">
                     {step.desc}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN TÉCNICA: LO QUE INCLUYE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="border-t border-slate-100 pt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Layers className="w-5 h-5 text-blue-600 mb-4" />
              <h5 className="font-black uppercase text-xs tracking-widest mb-2">Materiales</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">Solo utilizamos revestimientos de grado industrial con alto contenido de sólidos para máxima cobertura.</p>
            </div>
            <div>
              <Search className="w-5 h-5 text-blue-600 mb-4" />
              <h5 className="font-black uppercase text-xs tracking-widest mb-2">Inspección</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">Revisión exhaustiva de 360 grados en todas las superficies bajo luz natural y artificial.</p>
            </div>
            <div>
              <ShieldCheck className="w-5 h-5 text-blue-600 mb-4" />
              <h5 className="font-black uppercase text-xs tracking-widest mb-2">Protección</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">Blindaje completo de zonas no tratadas mediante enmascarado de alta precisión.</p>
            </div>
            <div>
              <Clock className="w-5 h-5 text-blue-600 mb-4" />
              <h5 className="font-black uppercase text-xs tracking-widest mb-2">Logística</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">Gestión optimizada del tiempo para minimizar el impacto en la rutina diaria del cliente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA MINIMALISTA */}
      <footer className="py-20 bg-slate-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-8 space-y-8">
          <Trophy className="w-10 h-10 mx-auto text-blue-500 opacity-50" />
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
            Excelencia Técnica Garantizada
          </h2>
          <button className="bg-blue-600 hover:bg-white hover:text-slate-950 text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all">
            Solicitar Evaluación de Propiedad
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ServiceDetail;