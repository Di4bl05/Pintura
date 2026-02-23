import { Home, Building2, Palette, Sparkles } from "lucide-react";

export default function Services() {
  return (
    <section className="py-32 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Offset */}
        <div className="max-w-2xl mb-20">
          <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 font-bold text-sm rounded-full mb-6">
            OUR SERVICES
          </div>
          <h2 className="text-6xl font-black text-gray-900 mb-6">
            What We Do
            <span className="text-primary-600">.</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            From residential makeovers to commercial transformations, we handle every project with precision and passion.
          </p>
        </div>
        
        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large Card 1 - Spans 2 columns */}
          <div className="md:col-span-2 group cursor-pointer">
            <div className="relative h-full bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-gray-900 mb-4">Residential</h3>
                  <p className="text-lg text-gray-600">Transform your home into a colorful sanctuary</p>
                </div>
                <div className="mt-8">
                  <span className="inline-flex items-center text-primary-600 font-bold group-hover:gap-3 gap-2 transition-all">
                    Learn More 
                    <span className="text-2xl">→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Medium Card 1 */}
          <div className="group cursor-pointer">
            <div className="relative h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                <div>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-3">Commercial</h3>
                  <p className="text-gray-600">Professional spaces that inspire success</p>
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center text-purple-600 font-bold group-hover:gap-3 gap-2 transition-all">
                    Explore
                    <span className="text-xl">→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Medium Card 2 */}
          <div className="group cursor-pointer">
            <div className="relative h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-orange-500 to-red-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                <div>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Palette className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-3">Interior Design</h3>
                  <p className="text-gray-600">Curated colors that match your style</p>
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center text-orange-600 font-bold group-hover:gap-3 gap-2 transition-all">
                    Discover
                    <span className="text-xl">→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Large Card 2 - Spans 2 columns */}
          <div className="md:col-span-2 group cursor-pointer">
            <div className="relative h-full bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-500 to-emerald-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-gray-900 mb-4">Premium Finish</h3>
                  <p className="text-lg text-gray-600">Flawless results with premium materials</p>
                </div>
                <div className="mt-8">
                  <span className="inline-flex items-center text-green-600 font-bold group-hover:gap-3 gap-2 transition-all">
                    View Details
                    <span className="text-2xl">→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
