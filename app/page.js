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

    </main>
  )
}