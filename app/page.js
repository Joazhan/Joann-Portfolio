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
      setTimeout(() => setHidden(true), 800)
      setTimeout(() => onComplete(), 800)
    },
  })

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
      transform: slideUp ? 'translateY(-100%)' : 'translateY(0)',
      transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
    }}>
      <RiveComponent style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)
  const [navVisible, setNavVisible] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem('introPlayed') === 'true') {
      setIntroComplete(true)
    }
  }, [])
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setNavVisible(false)
      } else {
        setNavVisible(true)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
    {!introComplete && <RiveIntro onComplete={() => { sessionStorage.setItem('introPlayed', 'true'); setIntroComplete(true) }} />}
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
      `}</style>

      {/* Navbar */}
      <div className={`nav-wrapper${navVisible ? '' : ' hidden'}`}>
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
            <a href="#" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">Resume</a>
            <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black" target="_blank" rel="noopener noreferrer">Contact</a>
          </div>
        </nav>
      </div>

      {/* Spacer for fixed navbar */}
      <div style={{ height: '96px' }} />

      {/* Hero */}
      <section className="flex justify-center pt-16 pb-10">
        <p style={{ fontSize: '28px', lineHeight: '36px', letterSpacing: '-0.03em', color: 'black', maxWidth: '1000px', width: '100%', textAlign: 'left' }}>
          SF-based product designer rooted in both visual design and product thinking,{" "}
          <span className="text-gray-400">focused on creating clear, high-quality experiences.</span>
        </p>
      </section>

      {/* Project Cards */}
      <section className="flex flex-col" style={{ gap: '32px', marginLeft: '80px', marginRight: '80px' }}>

        {/* NutritionNest */}
        <Link href="/nn" className="group bg-gray-100 flex flex-col overflow-hidden cursor-pointer" style={{ textDecoration: 'none' }}
          style={{ paddingTop: '32px', paddingBottom: '0px', paddingLeft: '48px', paddingRight: '48px', gap: '20px', borderRadius: '32px' }}>
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
          <div className="flex items-center justify-between" style={{ padding: '12px 40px', marginBottom: '10px' }}>
            <div className="flex items-center gap-4">
              <Image src="/Icons/NN icon.png" alt="NutritionNest icon" width={64} height={64} style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>NutritionNest</span>
                <span style={{ fontSize: '18px', lineHeight: '20px', color: '#6b7280' }}>Log nutritional intake and monitor daily calories</span>
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
        <div className="group flex flex-col overflow-hidden cursor-pointer"
          style={{ backgroundColor: '#d9f99d', borderRadius: '32px', paddingTop: '32px', paddingBottom: '0px', paddingLeft: '48px', paddingRight: '48px', gap: '10px' }}>
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
          <div className="flex items-center justify-between" style={{ padding: '12px 40px', marginBottom: '10px' }}>
            <div className="flex items-center gap-4">
              <Image src="/Icons/Duetti icon.png" alt="Duetti icon" width={64} height={64} style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>Duetti</span>
                <span style={{ fontSize: '18px', lineHeight: '20px', color: '#4b5563' }}>Insight-driven report that simplifies music industry data for artists through visual storytelling</span>
              </div>
            </div>
            <div className="arrow-btn">
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Lasertaz */}
        <div className="group flex flex-col overflow-hidden cursor-pointer"
          style={{ backgroundColor: '#0a0a0a', borderRadius: '32px', paddingTop: '32px', paddingBottom: '0px', paddingLeft: '80px', paddingRight: '80px', gap: '10px' }}>
          <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <Image src="/Images/Lasertaz image.png" alt="Lasertaz" width={1200} height={800} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain', margin: '0 auto' }} />
          </div>
          <div className="flex items-center justify-between" style={{ padding: '12px 40px', marginBottom: '10px' }}>
            <div className="flex items-center gap-4">
              <Image src="/Icons/Lasertaz icon.png" alt="Lasertaz icon" width={64} height={64} style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#ffffff' }}>Lasertaz</span>
                <span style={{ fontSize: '18px', lineHeight: '20px', color: '#9ca3af' }}>Help independent landlords manage their rental properties</span>
              </div>
            </div>
            <div className="arrow-btn" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Bookworm */}
        <div className="group flex flex-col overflow-hidden cursor-pointer"
          style={{ backgroundColor: '#184131', borderRadius: '32px', paddingTop: '32px', paddingBottom: '0px', paddingLeft: '48px', paddingRight: '48px', gap: '20px' }}>
          <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-end', minHeight: '144px' }}>
            <Image src="/Images/bw_image.png" alt="Bookworm" width={1080} height={678} className="object-contain rounded-xl" style={{ width: '76.59%', height: 'auto' }} />
            <div style={{ position: 'relative', flex: '1 1 0', alignSelf: 'flex-end', height: 0, paddingBottom: '48.06%' }}>
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
          <div className="flex items-center justify-between" style={{ padding: '12px 40px', marginBottom: '10px' }}>
            <div className="flex items-center gap-4">
              <Image src="/Icons/Bookworm icon.png" alt="Bookworm icon" width={64} height={64} style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#ffffff' }}>Bookworm</span>
                <span style={{ fontSize: '18px', lineHeight: '20px', color: '#9ca3af' }}>E-Commerce platform for books and related content</span>
              </div>
            </div>
            <div className="arrow-btn" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Raymond Hair Salon */}
        <div className="group flex flex-col overflow-hidden cursor-pointer"
          style={{ backgroundColor: '#f1f5f9', borderRadius: '32px', paddingTop: '32px', paddingBottom: '0px', paddingLeft: '48px', paddingRight: '48px', gap: '10px' }}>
          <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-end', minHeight: '144px' }}>
            <Image src="/Images/rhs_image.png" alt="Raymond Hair Salon" width={955} height={617} className="object-contain rounded-xl" style={{ width: '76.06%', height: 'auto' }} />
            <div style={{ position: 'relative', flex: '1 1 0', alignSelf: 'flex-end', height: 0, paddingBottom: '49.14%' }}>
              <div style={{ position: 'absolute', inset: 0 }}>
                <div style={{ position: 'absolute', top: '2%', left: '4.7%', right: '4.7%', bottom: '2%', borderRadius: '10% 10% 6% 6% / 7% 7% 4% 4%', overflow: 'hidden', zIndex: 1 }}>
                  <video src="/Images/rhs_mp4.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <Image src="/Images/bw_iphone_frame.png" alt="iPhone frame"
                  width={678} height={1392}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none' }} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between" style={{ padding: '12px 40px', marginBottom: '10px' }}>
            <div className="flex items-center gap-4">
              <Image src="/Icons/RHS icon.png" alt="RHS icon" width={64} height={64} style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>Raymond Hair Salon</span>
                <span style={{ fontSize: '18px', lineHeight: '20px', color: '#6b7280' }}>Scheduling made effortless with online booking</span>
              </div>
            </div>
            <div className="arrow-btn">
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </div>

      </section>

      {/* Concepts Section */}
      <div style={{ marginTop: '80px', marginLeft: '-80px', marginRight: '-80px', backgroundColor: '#f3f4f6', padding: '80px 80px' }}>
        <div style={{ marginBottom: '40px', marginLeft: '80px', marginRight: '80px' }}>
          <h2 style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.6px', fontWeight: '500', color: '#212121', marginBottom: '8px' }}>Concepts</h2>
          <p style={{ fontSize: '20px', lineHeight: '28px', letterSpacing: '-0.6px', color: '#6b7280', marginBottom: '4px' }}>
            I designed these projects after noticing gaps in existing products and wanting to see what a better solution could feel like.
          </p>
          <p style={{ fontSize: '20px', lineHeight: '28px', letterSpacing: '-0.6px', color: '#6b7280' }}>
            This led me to prototype ideas and explore them hands-on.
          </p>
        </div>

        <div className="flex flex-col" style={{ gap: '20px', marginLeft: '80px', marginRight: '80px' }}>

          {/* Kalshi */}
          <div className="group flex flex-col overflow-hidden cursor-pointer"
            style={{ backgroundColor: '#ffffff', borderRadius: '32px', paddingTop: '32px', paddingBottom: '0px', paddingLeft: '48px', paddingRight: '48px', gap: '10px' }}>
            <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4"
              style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <Image src="/Images/kalshi_bento.png" alt="Kalshi" width={1200} height={800} className="object-contain" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div className="flex items-center justify-between" style={{ padding: '12px 40px', marginBottom: '10px' }}>
              <div className="flex items-center gap-4">
                <div style={{ width: '64px', height: '64px', borderRadius: '14px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '24px', fontWeight: '700', color: '#212121' }}>K</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>Kalshi</span>
                  <span style={{ fontSize: '18px', lineHeight: '20px', color: '#6b7280' }}>2025 | Desktop extension</span>
                </div>
              </div>
              <div className="arrow-btn">
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Phia */}
          <div className="group flex flex-col overflow-hidden cursor-pointer"
            style={{ backgroundColor: '#ffffff', borderRadius: '32px', paddingTop: '32px', paddingBottom: '0px', paddingLeft: '48px', paddingRight: '48px', gap: '10px' }}>
            <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4"
              style={{ alignItems: 'flex-end', justifyContent: 'center', minHeight: '200px' }}>
              <Image
                src="/Images/Phia_cover.png"
                alt="Phia cover"
                width={800}
                height={500}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
            <div className="flex items-center justify-between" style={{ padding: '12px 40px', marginBottom: '10px' }}>
              <div className="flex items-center gap-4">
                <div style={{ width: '64px', height: '64px', borderRadius: '14px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '24px', fontWeight: '700', color: '#212121' }}>P</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>Phia</span>
                  <span style={{ fontSize: '18px', lineHeight: '20px', color: '#6b7280' }}>2025 | Desktop extension | Redesign</span>
                </div>
              </div>
              <div className="arrow-btn">
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div style={{ height: '80px' }} />

    </main>
    </>
  )
}