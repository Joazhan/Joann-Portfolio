'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRive } from '@rive-app/react-canvas'
function RiveIntro({ onComplete }) {
  const [slideUp, setSlideUp] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { RiveComponent, rive } = useRive({
    src: '/intro.riv',
    autoplay: true,
    onStop: () => {
      setSlideUp(true)
      setTimeout(() => setHidden(true), 500)
      setTimeout(() => onComplete(), 500)
    },
  })
  useEffect(() => {
    if (!rive) return
    try {
      if (typeof rive.setSpeed === 'function') rive.setSpeed(3)
      else if (typeof rive.playbackSpeed !== 'undefined') rive.playbackSpeed = 3
      else if (rive.animator?.animations?.length) {
        rive.animator.animations.forEach(a => { if (a.instance) a.instance.speed = 3 })
      }
    } catch (e) {}
  }, [rive])
  if (hidden) return null
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: '15%',
      transform: slideUp ? 'translateY(-100%)' : 'translateY(0)',
      transition: 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
    }}>
      <RiveComponent style={{ width: '90vw', height: '90vh' }} />
    </div>
  )
}
export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem('introPlayed') === 'true') {
      setIntroComplete(true)
    }
  }, [])
  const lastScrollY = useRef(0)
  const navRef = useRef(null)
  const heroRef = useRef(null)
  const nnImagesWrapRef = useRef(null)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Nav visibility — direct DOM, no re-render
      if (navRef.current) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
          navRef.current.classList.add('hidden')
        } else {
          navRef.current.classList.remove('hidden')
        }
      }
      lastScrollY.current = currentScrollY
      // Shape parallax
      if (heroRef.current) {
        heroRef.current.querySelectorAll('[data-parallax]').forEach(el => {
          const speed = parseFloat(el.dataset.parallax)
          el.style.transform = `translateY(${currentScrollY * speed}px)`
        })
      }
      // NN card parallax
      if (nnImagesWrapRef.current) {
        const rect = nnImagesWrapRef.current.getBoundingClientRect()
        const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2)
        const parallax = Math.max(-24, Math.min(24, centerOffset * 0.05))
        nnImagesWrapRef.current.style.transform = `translateY(${parallax}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
    {!introComplete && <RiveIntro onComplete={() => { sessionStorage.setItem('introPlayed', 'true'); setIntroComplete(true) }} />}
    <main className="min-h-screen bg-white portfolio-main" style={{ paddingLeft: '80px', paddingRight: '80px', cursor: 'none' }}>
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
          background: #fff !important;
          border-color: rgba(0,0,0,0.15) !important;
          width: 80px;
          height: 44px;
          transform: rotate(0deg);
          padding: 0 24px;
        }
        .group:hover .arrow-icon {
          transform: rotate(0deg);
          color: #000 !important;
        }
        .nav-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 24px 80px 0;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .nav-wrapper.hidden {
          opacity: 0;
          transform: translateY(-20px);
          pointer-events: none;
        }
        @media (max-width: 767px) {
          * { cursor: auto !important; }
          .nav-wrapper { padding: 12px 16px 0 !important; }
          .portfolio-main { padding-left: 16px !important; padding-right: 16px !important; }
          .hero-section { margin: 0 -16px !important; padding: 32px 16px 32px !important; }
          .hero-shape { display: none !important; }
          .hero-text-p { font-size: 20px !important; line-height: 28px !important; }
          .cards-section { margin-left: 0 !important; margin-right: 0 !important; gap: 16px !important; }
          .project-card { padding-left: 20px !important; padding-right: 20px !important; padding-top: 24px !important; border-radius: 20px !important; }
          .card-label-row { padding: 16px 0 !important; }
          .card-title { font-size: 20px !important; line-height: 26px !important; }
          .card-desc { font-size: 13px !important; line-height: 18px !important; }
          .card-icon { width: 44px !important; height: 44px !important; }
          .concepts-section { margin-left: -16px !important; margin-right: -16px !important; padding: 48px 16px !important; margin-top: 48px !important; }
          .concepts-title { font-size: 24px !important; line-height: 32px !important; }
          .concepts-desc { font-size: 15px !important; line-height: 22px !important; }
        }
      `}</style>
      {/* Navbar */}
      <div ref={navRef} className="nav-wrapper">
        <nav className="flex items-center justify-between px-6 py-3 w-full"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '32px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}>
          <Link href="/" style={{ fontSize: '24px', lineHeight: '32px', letterSpacing: '-0.02em', fontWeight: '500', color: 'black', textDecoration: 'none', whiteSpace: 'nowrap', cursor: 'pointer' }}>
            Joann Zhang
          </Link>
          <div className="flex items-center gap-6 flex-wrap justify-end">
            <Link href="/" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">Work</Link>
            <Link href="/about" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">About</Link>
            <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">Resume</a>
            <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black" target="_blank" rel="noopener noreferrer">Contact</a>
          </div>
        </nav>
      </div>
      {/* Spacer for fixed navbar */}
      <div style={{ height: '96px' }} />
      {/* Hero */}
      <section ref={heroRef} className="hero-section" style={{ position: 'relative', overflow: 'visible', margin: '0 -80px', padding: '64px 80px 60px' }}>
        {/* Floating shapes — all corners 10px radius, 60% iOS smooth bezier */}
        {/* Green right-pointing triangle — top left */}
        <svg data-parallax="0.28" className="hero-shape" style={{ position: 'absolute', top: '12%', left: '3.5%', pointerEvents: 'none' }} width="100" height="100" viewBox="0 0 100 100">
          <path d="M 0,15 C 0,6 5.37,2.69 13.41,6.71 L 86.59,43.29 C 94.63,47.31 94.63,52.69 86.59,56.71 L 13.41,93.29 C 5.37,97.31 0,94 0,85 Z" fill="#22c55e"/>
        </svg>
        {/* Orange star — top center */}
        <svg data-parallax="0.42" className="hero-shape" style={{ position: 'absolute', top: '-10px', left: '42%', pointerEvents: 'none' }} width="80" height="80" viewBox="0 0 100 100">
          <path d="M 39,35 L 42.50,23.85 C 47.00,9.54 53.00,9.54 57.50,23.85 L 61,35 L 72.56,34.79 C 87.56,34.65 89.41,40.35 77.19,49.04 L 68,57 L 71.44,66.75 C 76.20,80.97 71.36,84.51 59.33,75.55 L 50,70 L 40.69,75.55 C 28.65,84.49 23.75,80.94 28.58,66.75 L 32,57 L 22.83,49.04 C 10.59,40.35 12.45,34.61 27.45,34.80 Z" fill="#f97316"/>
        </svg>
        {/* Green circle — top right */}
        <div data-parallax="0.18" className="hero-shape" style={{ position: 'absolute', top: '5px', right: '13%', width: '68px', height: '68px', borderRadius: '50%', backgroundColor: '#22c55e', pointerEvents: 'none' }} />
        {/* Red circle — far right edge */}
        <div data-parallax="0.32" className="hero-shape" style={{ position: 'absolute', top: '30%', right: '-18px', width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#ef4444', pointerEvents: 'none' }} />
        {/* Purple right-pointing triangle — lower right */}
        <svg data-parallax="0.22" className="hero-shape" style={{ position: 'absolute', bottom: '8%', right: '5%', pointerEvents: 'none' }} width="88" height="88" viewBox="0 0 100 100">
          <path d="M 0,15 C 0,6 5.37,2.69 13.41,6.71 L 86.59,43.29 C 94.63,47.31 94.63,52.69 86.59,56.71 L 13.41,93.29 C 5.37,97.31 0,94 0,85 Z" fill="#818cf8"/>
        </svg>
        {/* Pink star — bottom left */}
        <svg data-parallax="0.36" className="hero-shape" style={{ position: 'absolute', bottom: '-5px', left: '6%', pointerEvents: 'none' }} width="92" height="92" viewBox="0 0 100 100">
          <path d="M 39,35 L 42.50,23.85 C 47.00,9.54 53.00,9.54 57.50,23.85 L 61,35 L 72.56,34.79 C 87.56,34.65 89.41,40.35 77.19,49.04 L 68,57 L 71.44,66.75 C 76.20,80.97 71.36,84.51 59.33,75.55 L 50,70 L 40.69,75.55 C 28.65,84.49 23.75,80.94 28.58,66.75 L 32,57 L 22.83,49.04 C 10.59,40.35 12.45,34.61 27.45,34.80 Z" fill="#f472b6"/>
        </svg>
        {/* Blue star — bottom center-right */}
        <svg data-parallax="0.38" className="hero-shape" style={{ position: 'absolute', bottom: '-5px', left: '57%', pointerEvents: 'none' }} width="64" height="64" viewBox="0 0 100 100">
          <path d="M 39,35 L 42.50,23.85 C 47.00,9.54 53.00,9.54 57.50,23.85 L 61,35 L 72.56,34.79 C 87.56,34.65 89.41,40.35 77.19,49.04 L 68,57 L 71.44,66.75 C 76.20,80.97 71.36,84.51 59.33,75.55 L 50,70 L 40.69,75.55 C 28.65,84.49 23.75,80.94 28.58,66.75 L 32,57 L 22.83,49.04 C 10.59,40.35 12.45,34.61 27.45,34.80 Z" fill="#3b82f6"/>
        </svg>
        {/* Hero text */}
        <div className="flex justify-center" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <p className="hero-text-p" style={{ fontSize: '28px', lineHeight: '36px', letterSpacing: '-0.03em', color: 'black', maxWidth: '1000px', width: '100%', textAlign: 'left' }}>
            SF-based product designer rooted in both visual design and product thinking,{" "}
            <span className="text-gray-400">focused on creating clear, high-quality experiences.</span>
          </p>
        </div>
      </section>
      {/* Project Cards */}
      <section className="flex flex-col cards-section" style={{ gap: '32px', marginLeft: '80px', marginRight: '80px' }}>
        {/* NutritionNest */}
        <Link href="/nn" className="group bg-gray-100 flex flex-col overflow-hidden cursor-pointer project-card"
          style={{ textDecoration: 'none', paddingTop: '32px', paddingBottom: '0px', paddingLeft: '48px', paddingRight: '48px', gap: '20px', borderRadius: '32px' }}>
          <div ref={nnImagesWrapRef} style={{ willChange: 'transform', overflow: 'visible' }}>
            <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-end' }}>
              <Image src="/Images/NN.png" alt="NutritionNest" width={900} height={600} className="object-contain rounded-xl" style={{ width: '75%', height: 'auto' }} />
              <div style={{ position: 'relative', flex: '1 1 0', marginLeft: '-4px', alignSelf: 'stretch' }}>
                <div style={{ position: 'absolute', top: '4%', left: '8.5%', right: '8.5%', bottom: '4.2%', borderRadius: '11%/5.5%', overflow: 'hidden', zIndex: 1 }}>
                  <video src="/Images/NN-video.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <Image src="/Images/NN-iphone-frame.png" alt="iPhone frame" fill
                  style={{ objectFit: 'fill', zIndex: 10, pointerEvents: 'none' }} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between card-label-row" style={{ padding: '20px 40px', marginBottom: '10px' }}>
            <div className="flex items-center gap-4">
              <Image src="/Icons/NN icon.png" alt="NutritionNest icon" width={64} height={64} className="card-icon" style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span className="card-title" style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>NutritionNest</span>
                <span className="card-desc" style={{ fontSize: '18px', lineHeight: '20px', color: '#6b7280' }}>Log nutritional intake and monitor daily calories</span>
              </div>
            </div>
            <div className="arrow-btn">
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </Link>
        {/* Duetti */}
        <Link href="/duetti" className="group flex flex-col overflow-hidden cursor-pointer project-card"
          style={{ textDecoration: 'none', backgroundColor: '#d9f99d', borderRadius: '32px', paddingTop: '32px', paddingBottom: '0px', paddingLeft: '48px', paddingRight: '48px', gap: '10px' }}>
          <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4"
            style={{ alignItems: 'flex-end', justifyContent: 'center', gap: '16px' }}>
            <div style={{ position: 'relative', width: '73%', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: '2.2%', left: '1.4%', right: '1.4%', bottom: '24.9%', overflow: 'hidden', zIndex: 1 }}>
                <video src="/Images/Duetti video.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <Image src="/Images/Apple Pro Display.png" alt="Apple Pro Display" width={1200} height={800} style={{ position: 'relative', width: '100%', height: 'auto', display: 'block', zIndex: 10 }} />
            </div>
            <Image src="/Images/Duetti iphone frame.png" alt="Duetti iPhone" width={400} height={600}
              style={{ width: '15%', height: 'auto', objectFit: 'contain', alignSelf: 'flex-end', position: 'relative', zIndex: 20 }} />
          </div>
          <div className="flex items-center justify-between card-label-row" style={{ padding: '20px 40px', marginBottom: '10px' }}>
            <div className="flex items-center gap-4">
              <Image src="/Icons/Duetti icon.png" alt="Duetti icon" width={64} height={64} className="card-icon" style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span className="card-title" style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>Duetti</span>
                <span className="card-desc" style={{ fontSize: '18px', lineHeight: '20px', color: '#4b5563' }}>Insight-driven report that simplifies music industry data for artists through visual storytelling</span>
              </div>
            </div>
            <div className="arrow-btn">
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </Link>
        {/* Lasertaz */}
        <Link href="/lasertaz" className="group flex flex-col overflow-hidden cursor-pointer project-card"
          style={{ textDecoration: 'none', backgroundColor: '#0a0a0a', borderRadius: '32px', paddingTop: '32px', paddingBottom: '0px', paddingLeft: '48px', paddingRight: '48px', gap: '10px' }}>
          <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <Image src="/Images/Lasertaz image.png" alt="Lasertaz" width={1200} height={800} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain', margin: '0 auto' }} />
          </div>
          <div className="flex items-center justify-between card-label-row" style={{ padding: '20px 40px', marginBottom: '10px' }}>
            <div className="flex items-center gap-4">
              <Image src="/Icons/Lasertaz icon.png" alt="Lasertaz icon" width={64} height={64} className="card-icon" style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span className="card-title" style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#ffffff' }}>Lasertaz</span>
                <span className="card-desc" style={{ fontSize: '18px', lineHeight: '20px', color: '#9ca3af' }}>Help independent landlords manage their rental properties</span>
              </div>
            </div>
            <div className="arrow-btn" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </Link>
        {/* Bookworm */}
        <Link href="/bookworm" className="group flex flex-col overflow-hidden cursor-pointer project-card"
          style={{ textDecoration: 'none', backgroundColor: '#184131', borderRadius: '32px', paddingTop: '32px', paddingBottom: '0px', paddingLeft: '48px', paddingRight: '48px', gap: '20px' }}>
          <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-end', minHeight: '144px' }}>
            <div style={{ flex: '0 0 75%', height: 0, paddingBottom: '48.09%', position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
              <Image src="/Images/bw_image.png" alt="Bookworm" width={1080} height={678}
                style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 'auto' }} />
            </div>
            <div style={{ position: 'relative', flex: '0 0 25%', alignSelf: 'flex-end', height: 0, paddingBottom: '48.09%' }}>
              <div style={{ position: 'absolute', inset: 0 }}>
                <div style={{ position: 'absolute', top: '2%', left: '4.7%', right: '4.7%', bottom: '2%', borderRadius: '10% 10% 6% 6% / 7% 7% 4% 4%', overflow: 'hidden', zIndex: 1 }}>
                  <video src="/Images/Bookworm.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <Image src="/Images/bw_iphone_frame.png" alt="iPhone frame"
                  width={678} height={1392}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none' }} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between card-label-row" style={{ padding: '20px 40px', marginBottom: '10px' }}>
            <div className="flex items-center gap-4">
              <Image src="/Icons/Bookworm icon.png" alt="Bookworm icon" width={64} height={64} className="card-icon" style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span className="card-title" style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#ffffff' }}>Bookworm</span>
                <span className="card-desc" style={{ fontSize: '18px', lineHeight: '20px', color: '#9ca3af' }}>E-Commerce platform for books and related content</span>
              </div>
            </div>
            <div className="arrow-btn" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </Link>
        {/* Raymond Hair Salon */}
        <Link href="/rhs" className="group flex flex-col overflow-hidden cursor-pointer project-card"
          style={{ textDecoration: 'none', backgroundColor: '#f1f5f9', borderRadius: '32px', paddingTop: '32px', paddingBottom: '0px', paddingLeft: '48px', paddingRight: '48px', gap: '10px' }}>
          <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-start', minHeight: '144px' }}>
            <Image src="/Images/rhs_image (3).png" alt="Raymond Hair Salon" width={955} height={617} className="object-contain rounded-xl" style={{ width: '76.06%', height: 'auto' }} />
            <div style={{ position: 'relative', flex: '1 1 0', alignSelf: 'flex-start', height: 0, paddingBottom: '48.4%', marginTop: '1.5%' }}>
              <div style={{ position: 'absolute', inset: 0 }}>
                <div style={{ position: 'absolute', top: '2%', left: '7%', right: '4%', bottom: '2%', borderRadius: '4% 4% 4% 4% / 7% 7% 4% 4%', overflow: 'hidden', zIndex: 1 }}>
                  <video src="/Images/rhs_mp4.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <Image src="/Images/rhs_iphone_frame.png" alt="iPhone frame"
                  width={750} height={1392}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none' }} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between card-label-row" style={{ padding: '20px 40px', marginBottom: '10px' }}>
            <div className="flex items-center gap-4">
              <Image src="/Icons/RHS icon.png" alt="RHS icon" width={64} height={64} className="card-icon" style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span className="card-title" style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>Raymond Hair Salon</span>
                <span className="card-desc" style={{ fontSize: '18px', lineHeight: '20px', color: '#6b7280' }}>Scheduling made effortless with online booking</span>
              </div>
            </div>
            <div className="arrow-btn">
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </Link>
      </section>
      {/* Concepts Section */}
      <div className="concepts-section" style={{ marginTop: '80px', marginLeft: '-80px', marginRight: '-80px', backgroundColor: '#f3f4f6', padding: '80px 80px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 className="concepts-title" style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.6px', fontWeight: '500', color: '#212121', marginBottom: '8px' }}>Concepts</h2>
          <p className="concepts-desc" style={{ fontSize: '20px', lineHeight: '28px', letterSpacing: '-0.6px', color: '#6b7280', marginBottom: '4px' }}>
            I designed these projects after noticing gaps in existing products and wanting to see what a better solution could feel like.
          </p>
          <p className="concepts-desc" style={{ fontSize: '20px', lineHeight: '28px', letterSpacing: '-0.6px', color: '#6b7280' }}>
            This led me to prototype ideas and explore them hands-on.
          </p>
        </div>
        <div className="flex flex-col" style={{ gap: '20px' }}>
          {/* Kalshi */}
          <Link href="/kalshi" className="group flex flex-col overflow-hidden cursor-pointer project-card"
            style={{ textDecoration: 'none', backgroundColor: '#ffffff', borderRadius: '32px', paddingTop: '32px', paddingBottom: '0px', paddingLeft: '48px', paddingRight: '48px', gap: '10px' }}>
            <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4"
              style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <Image src="/Images/kalshi_bento.png" alt="Kalshi" width={1200} height={800} className="object-contain" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div className="flex items-center justify-between card-label-row" style={{ padding: '20px 40px', marginBottom: '10px' }}>
              <div className="flex items-center gap-4">
                <div className="card-icon" style={{ width: '64px', height: '64px', borderRadius: '14px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '24px', fontWeight: '700', color: '#212121' }}>K</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="card-title" style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>Kalshi</span>
                  <span className="card-desc" style={{ fontSize: '18px', lineHeight: '20px', color: '#6b7280' }}>2025 | Desktop extension</span>
                </div>
              </div>
              <div className="arrow-btn">
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          </Link>
          {/* Phia */}
          <Link href="/phia" className="group flex flex-col overflow-hidden cursor-pointer project-card"
            style={{ textDecoration: 'none', backgroundColor: '#ffffff', borderRadius: '32px', paddingTop: '32px', paddingBottom: '0px', paddingLeft: '48px', paddingRight: '48px', gap: '10px' }}>
            <div className="w-full transition-all duration-500 group-hover:-translate-y-4"
              style={{ overflow: 'hidden', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)' }}>
              <Image
                src="/Images/Phia_cover.png"
                alt="Phia cover"
                width={1400}
                height={800}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div className="flex items-center justify-between card-label-row" style={{ padding: '20px 40px', marginBottom: '10px' }}>
              <div className="flex items-center gap-4">
                <div className="card-icon" style={{ width: '64px', height: '64px', borderRadius: '14px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '24px', fontWeight: '700', color: '#212121' }}>P</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="card-title" style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>Phia</span>
                  <span className="card-desc" style={{ fontSize: '18px', lineHeight: '20px', color: '#6b7280' }}>2025 | Desktop extension | Redesign</span>
                </div>
              </div>
              <div className="arrow-btn">
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* Footer */}
      <footer style={{ padding: '4px 0 40px', marginTop: '80px' }}>
        <p style={{ fontSize: '16px', fontWeight: '500', color: '#212121', marginBottom: '8px' }}>Get in touch!</p>
        <div className="flex gap-4" style={{ marginBottom: '24px' }}>
          <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '14px', color: '#6b7280' }} className="hover:text-black">Email ↗</a>
          <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#6b7280' }} className="hover:text-black">Resume ↗</a>
        </div>
        <p style={{ fontSize: '13px', color: '#9ca3af' }}>© Joann Zhang</p>
      </footer>
    </main>
    </>
  )
}
