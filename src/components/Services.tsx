import { Home, Building2, Palette, Sparkles } from "lucide-react";

export default function Services() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - Columna estrecha */}
        <div className="grid lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <div className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6">Services</div>
              <h2 className="text-5xl font-light text-gray-900 mb-4">
                What We
                <br/>
                <span className="italic font-serif">Offer</span>
              </h2>
              <div className="w-12 h-[2px] bg-gray-900"></div>
            </div>
          </div>
          
          <div className="lg:col-span-9">
            {/* Stacked Cards con Overlapping */}
            <div className="space-y-16">
              {/* Card 1 - Residential */}
              <div className="group relative">
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-2 order-2 md:order-1">
                    <div className="space-y-4">
                      <div className="text-6xl">01</div>
                      <h3 className="text-4xl font-light text-gray-900">
                        Residential
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Transform your home into a personal sanctuary. We specialize in creating warm, inviting spaces that reflect your unique style and personality.
                      </p>
                      <button className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b-2 border-transparent hover:border-gray-900 transition-colors pb-1">
                        Explore →
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-3 order-1 md:order-2">
                    <div className="relative">
                      <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Home className="w-20 h-20 text-gray-300" />
                        </div>
                      </div>
                      {/* Overlapping element */}
                      <div className="absolute -bottom-4 -right-4 bg-white border-2 border-gray-900 p-4 shadow-lg">
                        <div className="text-2xl font-bold">500+</div>
                        <div className="text-xs uppercase tracking-wider text-gray-500">Homes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card 2 - Commercial */}
              <div className="group relative lg:ml-24">
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-3">
                    <div className="relative">
                      <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Building2 className="w-20 h-20 text-gray-300" />
                        </div>
                      </div>
                      <div className="absolute -top-4 -left-4 bg-white border-2 border-gray-900 p-4 shadow-lg">
                        <div className="text-xs uppercase tracking-wider text-gray-500">Premium</div>
                        <div className="text-2xl font-bold">Quality</div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="space-y-4">
                      <div className="text-6xl">02</div>
                      <h3 className="text-4xl font-light text-gray-900">
                        Commercial
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Elevate your business environment. Professional spaces that inspire productivity, creativity, and success for your team and clients.
                      </p>
                      <button className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b-2 border-transparent hover:border-gray-900 transition-colors pb-1">
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card 3 - Consultation */}
              <div className="group relative">
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-2 order-2 md:order-1">
                    <div className="space-y-4">
                      <div className="text-6xl">03</div>
                      <h3 className="text-4xl font-light text-gray-900">
                        Color Design
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Expert color consultation to match your vision. We help you choose the perfect palette that enhances your space and mood.
                      </p>
                      <button className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b-2 border-transparent hover:border-gray-900 transition-colors pb-1">
                        Discover →
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-3 order-1 md:order-2">
                    <div className="relative">
                      <div className="aspect-[4/3] bg-gradient-to-br from-orange-50 to-red-50 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Palette className="w-20 h-20 text-gray-300" />
                        </div>
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-gray-900 text-white p-4 shadow-lg">
                        <div className="text-xs uppercase tracking-wider opacity-70">Free</div>
                        <div className="text-2xl font-bold">Consult</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card 4 - Premium */}
              <div className="group relative lg:ml-24">
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-3">
                    <div className="relative">
                      <div className="aspect-[4/3] bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-20 h-20 text-gray-300" />
                        </div>
                      </div>
                      <div className="absolute -top-4 -left-4 bg-white border-2 border-gray-900 p-4 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                        <div className="text-2xl font-bold">★★★★★</div>
                        <div className="text-xs uppercase tracking-wider text-gray-500">Rated</div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="space-y-4">
                      <div className="text-6xl">04</div>
                      <h3 className="text-4xl font-light text-gray-900">
                        Premium Finish
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Flawless execution with premium materials. Every detail perfected, every surface smooth, every corner immaculate.
                      </p>
                      <button className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b-2 border-transparent hover:border-gray-900 transition-colors pb-1">
                        View Process →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
