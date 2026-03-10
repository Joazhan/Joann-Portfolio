export default function Home() {
  return (
    <main className="min-h-screen bg-white" style={{ paddingLeft: '80px', paddingRight: '80px' }}>

      <style>{`
        .arrow-btn {
          width: 44px;
          height: 60px;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.2);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          flex-shrink: 0;
          transform: rotate(15deg);
        }
        .arrow-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.35s ease, color 0.35s ease;
          transform: rotate(-60deg);
          color: #888;
        }
        .group:hover .arrow-btn {
          background: #000;
          border-color: #000;
          width: 80px;
          height: 44px;
          transform: rotate(0deg);
          padding: 0 24px;
        }
        .group:hover .arrow-icon {
          transform: rotate(0deg);
          color: #fff;
        }
      `}</style>

      {/* Navbar — floating pill */}
      <div className="pt-6">
        <nav className="flex items-center justify-between px-6 py-3 w-full"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '32px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}>
          <a href="/" style={{ fontSize: '24px', lineHeight: '32px', letterSpacing: '-0.02em', fontWeight: '500', color: 'black', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Joann Zhang
          </a>
          <div className="flex items-center gap-6 flex-wrap justify-end">
            <a href="/work" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">Work</a>
            <a href="/about" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">About</a>
            <a href="#" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">Resume</a>
            <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">Contact</a>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <section className="flex justify-center pt-24 pb-16">
        <p style={{ fontSize: '28px', lineHeight: '36px', letterSpacing: '-0.03em', color: 'black', maxWidth: '1000px', width: '100%', textAlign: 'left' }}>
          SF-based product designer rooted in both visual design and product thinking,{" "}
          <span className="text-gray-400">focused on creating clear, high-quality experiences.</span>
        </p>
      </section>

      {/* Project Cards */}
      <section className="flex flex-col gap-4">

        {/* NutritionNest */}
        <div className="group bg-gray-100 flex flex-col overflow-hidden cursor-pointer"
          style={{ paddingTop: '60px', paddingBottom: '0px', paddingLeft: '20px', paddingRight: '20px', gap: '80px', borderRadius: '32px' }}>

          <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4"
            style={{ alignItems: 'flex-end' }}>
            <img src="/Images/NN.png" alt="NutritionNest" className="object-contain rounded-xl" style={{ width: '75%', height: 'auto' }} />
            <div style={{ position: 'relative', flex: '1 1 0', marginLeft: '-4px', alignSelf: 'stretch' }}>
              <div style={{ position: 'absolute', top: '4%', left: '8.5%', right: '8.5%', bottom: '4.2%', borderRadius: '11%/5.5%', overflow: 'hidden', zIndex: 1 }}>
                <video src="/Images/NN-video.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <img src="/Images/NN-iphone-frame.png" alt="iPhone frame"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none' }} />
            </div>
          </div>

          <div className="flex items-center justify-between" style={{ padding: '16px 20px', marginBottom: '20px' }}>
            <div className="flex items-center gap-4">
              <img src="/Icons/NN icon.png" alt="NutritionNest icon" style={{ width: '64px', height: '64px', borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>NutritionNest</span>
                <span style={{ fontSize: '18px', lineHeight: '20px', color: '#6b7280' }}>Log nutritional intake and monitor daily calories</span>
              </div>
            </div>
            <div className="arrow-btn">
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>

        </div>

        {/* Duetti */}
        <div className="group flex flex-col overflow-hidden cursor-pointer"
          style={{ backgroundColor: '#d9f99d', borderRadius: '32px', paddingTop: '60px', paddingBottom: '0px', paddingLeft: '20px', paddingRight: '20px', gap: '80px' }}>

          <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4"
            style={{ alignItems: 'flex-end' }}>
            <img src="/Images/Duetti iphone frame.png" alt="Duetti"
              style={{ width: 'auto', maxHeight: '500px', objectFit: 'contain', display: 'block' }} />
          </div>

          <div className="flex items-center justify-between" style={{ padding: '16px 20px', marginBottom: '20px' }}>
            <div className="flex items-center gap-4">
              <img src="/Icons/Duetti icon.png" alt="Duetti icon" style={{ width: '64px', height: '64px', borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>Duetti</span>
                <span style={{ fontSize: '18px', lineHeight: '20px', color: '#4b5563' }}>Insight-driven report that simplifies music industry data</span>
              </div>
            </div>
            <div className="arrow-btn">
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>

        </div>

      </section>

    </main>
  )
}