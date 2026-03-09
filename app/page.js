export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <a href="/" className="text-sm font-medium text-black">
          Joann Zhang
        </a>
        <div className="flex items-center gap-8">
          <a href="/work" className="text-sm text-gray-500 hover:text-black">Work</a>
          <a href="/about" className="text-sm text-gray-500 hover:text-black">About</a>
          <a href="#" className="text-sm text-gray-500 hover:text-black">Resume</a>
          <a href="mailto:joannzhang4@gmail.com" className="text-sm text-gray-500 hover:text-black">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 pt-12 pb-16 max-w-4xl">
        <p className="text-2xl text-black leading-snug">
          SF-based product designer rooted in both visual design and product thinking,{" "}
          <span className="text-blue-500">focused on creating clear, high-quality experiences.</span>
        </p>
      </section>

      {/* Project Cards */}
      <section className="px-8 flex flex-col gap-4">

        {/* NutritionNest */}
        <div className="group rounded-2xl bg-gray-100 p-8 flex flex-col gap-6 overflow-hidden cursor-pointer">

          {/* Media Row */}
          <div className="flex items-end w-full transition-all duration-500 group-hover:-translate-y-4">

            {/* Static Image */}
            <img
              src="/Images/NN.png"
              alt="NutritionNest"
              className="object-contain rounded-xl"
              style={{ height: '875px', width: 'auto' }}
            />

            {/* iPhone frame */}
            <div style={{
              position: 'relative',
              flexShrink: 0,
              height: '875px',
              aspectRatio: '806/1586',
              marginLeft: '-4px',
            }}>
              <div style={{
                position: 'absolute',
                top: '4%',
                left: '8.5%',
                right: '8.5%',
                bottom: '4.2%',
                borderRadius: '11%/5.5%',
                overflow: 'hidden',
                zIndex: 1,
              }}>
                <video
                  src="/Images/NN-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <img
                src="/Images/NN-iphone-frame.png"
                alt="iPhone frame"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                  zIndex: 10,
                  pointerEvents: 'none',
                }}
              />
            </div>

          </div>

          {/* Title & Description */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium text-black">NutritionNest</span>
            <span className="text-sm text-gray-500">Log nutritional intake and monitor daily calories</span>
          </div>

        </div>

        {/* Duetti */}
        <div className="rounded-2xl p-8 flex flex-col gap-8" style={{backgroundColor: '#d9f99d'}}>
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium">Duetti</span>
            <span className="text-sm text-gray-600">Insight-driven report that simplifies music industry data</span>
          </div>
        </div>

      </section>

    </main>
  )
}