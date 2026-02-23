export default function Footer() {
  return (
    <footer id="contact" className="relative bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 text-white py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Big CTA */}
          <div>
            <h2 className="text-7xl md:text-9xl font-black leading-none mb-8">
              LET'S
              <br/>
              <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                TALK
              </span>
            </h2>
            <p className="text-2xl text-white/60 mb-12">
              Ready to transform your space?
            </p>
            <a 
              href="tel:+15555555555"
              className="inline-block bg-white text-gray-900 px-12 py-6 text-2xl font-bold hover:scale-105 transition-transform"
            >
              (555) 555-5555
            </a>
          </div>

          {/* Right - Info Grid */}
          <div className="space-y-12">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Email</div>
              <a href="mailto:hello@paint.com" className="text-2xl font-light hover:text-orange-400 transition-colors">
                hello@paint.com
              </a>
            </div>
            
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Location</div>
              <p className="text-2xl font-light">
                123 Design Street<br/>
                Your City, ST 12345
              </p>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Hours</div>
              <p className="text-2xl font-light">
                Mon - Fri: 8AM - 6PM<br/>
                Sat: 9AM - 4PM
              </p>
            </div>

            {/* Social */}
            <div className="flex gap-6 pt-8">
              <a href="#" className="w-12 h-12 border border-white/20 flex items-center justify-center hover:border-orange-400 hover:text-orange-400 transition-colors">
                IG
              </a>
              <a href="#" className="w-12 h-12 border border-white/20 flex items-center justify-center hover:border-orange-400 hover:text-orange-400 transition-colors">
                FB
              </a>
              <a href="#" className="w-12 h-12 border border-white/20 flex items-center justify-center hover:border-orange-400 hover:text-orange-400 transition-colors">
                LI
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2026 Paint Studio. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Careers</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
