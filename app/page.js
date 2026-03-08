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

    </main>
  )
}