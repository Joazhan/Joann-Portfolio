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
          <div className="flex gap-4 items-end transition-all duration-500 group-hover:-translate-y-4">

            {/* Static Image */}
            <img
              src="/Images/NN.png"
              alt="NutritionNest"
              className="w-2/3 object-contain rounded-xl transition-all duration-500 group-hover:scale-105"
            />

            {/* Video inside iPhone frame */}
            <div className="relative w-1/3 flex items-center justify-center">
              <video
                src="/Images/NN-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-[85%] rounded-[2rem] object-cover"
              />
              <img
                src="/Images/NN-iphone-frame.png"
                alt="iPhone frame"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
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