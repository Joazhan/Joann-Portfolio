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
  const heroRef = useRef(null)
  const nnImagesWrapRef = useRef(null)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      lastScrollY.current = currentScrollY
      // Shape parallax + fade
      if (heroRef.current) {
        const opacity = Math.max(0, 1 - currentScrollY / 300)
        heroRef.current.querySelectorAll('[data-parallax]').forEach(el => {
          const speed = parseFloat(el.dataset.parallax)
          el.style.transform = `translateY(${currentScrollY * speed}px)`
          el.style.opacity = opacity
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
  useEffect(() => {
    const cards = document.querySelectorAll('.project-card')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('card-pre')
            entry.target.classList.add('card-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    cards.forEach(card => observer.observe(card))
    const onScroll = () => {
      cards.forEach(card => {
        if (card.classList.contains('card-pre')) {
          card.classList.remove('card-pre')
        }
      })
      observer.disconnect()
    }
    window.addEventListener('scroll', onScroll, { passive: true, once: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return (
    <>
    {!introComplete && <RiveIntro onComplete={() => { sessionStorage.setItem('introPlayed', 'true'); setIntroComplete(true) }} />}
    <main className="min-h-screen portfolio-main" style={{ paddingLeft: '80px', paddingRight: '80px', cursor: 'none', backgroundColor: '#fbfbfb' }}>
      <style>{`
        @keyframes sparkle-fade {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          45%, 55% { opacity: 1; transform: scale(1); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-pre { opacity: 0; transform: translateY(20px); }
        .hero-in { animation: heroFadeUp 3s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes cardFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-pre { opacity: 0; transform: translateY(30px); }
        .card-in { animation: cardFadeUp 3s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .arrow-btn {
          width: 44px;
          height: 56px;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.2);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: width 0.3s ease, height 0.3s ease, border-radius 0.3s ease, background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
          flex-shrink: 0;
          transform: rotate(45deg);
        }
        .arrow-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease, color 0.3s ease;
          transform: rotate(-45deg);
          color: #888;
        }
        .group:hover .arrow-btn {
          background: #000 !important;
          border-color: #000 !important;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          transform: rotate(0deg);
        }
        .group:hover .arrow-icon {
          transform: rotate(0deg);
          color: #fff !important;
        }
        @media (max-width: 767px) {
          * { cursor: auto !important; }
          .portfolio-main { padding-left: 20px !important; padding-right: 20px !important; }
          .hero-section { margin: 0 -20px !important; padding: 32px 20px 32px !important; }
          .hero-shape { transform: scale(0.5) !important; transform-origin: center center; }
          .hero-shape-green-tri { top: -8% !important; }
          .hero-shape-blue-star { bottom: -24px !important; left: 40% !important; }
          .hero-shape-red-circle { transform: scale(0.3) !important; }
          .hero-text-p { font-size: 20px !important; line-height: 28px !important; }
          .cards-section { margin-left: 0 !important; margin-right: 0 !important; gap: 40px !important; }
          .nn-desktop-img, .bw-desktop-img, .rhs-desktop-img { display: none !important; }
          .nn-phone, .bw-phone, .rhs-phone { flex: unset !important; margin: 0 auto !important; width: 34% !important; aspect-ratio: 9/19 !important; align-self: center !important; position: relative !important; }
          .bw-phone { width: 38% !important; aspect-ratio: 9/16 !important; }
          .bw-video { object-fit: contain !important; }
          .rhs-phone { width: 38% !important; aspect-ratio: 9/16 !important; }
          .rhs-video { object-fit: contain !important; }
          .project-card { position: relative !important; padding-left: 16px !important; padding-right: 16px !important; padding-top: 20px !important; padding-bottom: 20px !important; border-radius: 20px !important; }
          .card-bottom-container { margin: 0 -16px -20px -16px !important; padding: 20px 16px !important; }
          .card-label-row { padding: 16px 0 !important; }
          .arrow-btn { position: absolute !important; top: 16px !important; right: 16px !important; width: 32px !important; height: 48px !important; transform: rotate(45deg) !important; }
          .group:hover .arrow-btn, .group:active .arrow-btn { width: 40px !important; height: 40px !important; border-radius: 50% !important; transform: rotate(0deg) !important; }
          .group:hover .arrow-icon, .group:active .arrow-icon { transform: rotate(0deg) !important; color: #fff !important; }
          .card-title { font-size: 20px !important; line-height: 26px !important; }
          .card-desc { font-size: 16px !important; line-height: 24px !important; }
          .card-icon { width: 44px !important; height: 44px !important; border-radius: 10px !important; }
          .card-icon-wrap { align-items: flex-start !important; }
          .duetti-macbook { width: 100% !important; }
          .duetti-iphone { display: none !important; }
          .card-img-wrap { overflow: hidden !important; width: 100% !important; }
          .concepts-section { margin-left: -20px !important; margin-right: -20px !important; padding: 48px 20px !important; margin-top: 48px !important; }
          .concepts-title { font-size: 24px !important; line-height: 32px !important; }
          .concepts-desc { font-size: 15px !important; line-height: 22px !important; }
        }
      `}</style>
      {/* Spacer for fixed navbar */}
      <div style={{ height: '96px' }} />
      {/* Hero */}
      <section ref={heroRef} className="hero-section" style={{ position: 'relative', zIndex: 0, margin: '0 -80px', padding: '120px 80px 60px' }}>
        {/* Floating shapes */}
        <div className={introComplete ? 'hero-in' : 'hero-pre'} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', animationDelay: '0.4s', zIndex: 0 }}>
          {/* Green sharp triangle — top left */}
          <svg data-parallax="0.28" className="hero-shape hero-shape-green-tri" style={{ position: 'absolute', top: '12%', left: '3.5%', pointerEvents: 'none' }} width="100" height="100" viewBox="0 0 100 100">
            <path d="M 100 0 L 0 50 L 100 100 Z" fill="#22c55e"/>
          </svg>
          {/* Orange organic star — top center */}
          <svg data-parallax="0.42" className="hero-shape" style={{ position: 'absolute', top: '8px', left: '42%', pointerEvents: 'none' }} width="52" height="50" viewBox="0 0 189 181">
            <path d="M84.7774 53.7775C91.3204 41.5751 94.5919 35.4739 98.0802 34.1447C101.423 32.8708 105.192 33.48 107.964 35.7421C110.856 38.1025 112.039 44.9236 114.405 58.5659C115.025 62.1438 115.336 63.9327 116.116 65.3728C117.058 67.1133 118.496 68.535 120.248 69.4576C121.697 70.221 123.465 70.5068 127.003 71.0785L128.533 71.3258C140.708 73.2936 146.796 74.2775 149.046 76.439C152.37 79.6314 153.082 84.6821 150.77 88.6688C149.204 91.3682 143.626 93.9961 132.468 99.252C129.338 100.727 127.772 101.464 126.629 102.53C124.949 104.095 123.86 106.192 123.543 108.466C123.327 110.014 123.626 111.733 124.222 115.17C126.352 127.455 127.418 133.597 125.969 136.524C124.073 140.354 119.954 142.556 115.716 142.004C112.478 141.583 108.004 137.325 99.0565 128.809L97.2231 127.064C94.4168 124.393 93.0136 123.057 91.3756 122.35C89.8539 121.693 88.1928 121.424 86.5416 121.569C84.7642 121.724 83.0118 122.549 79.5069 124.2L77.2172 125.279C66.0424 130.543 60.455 133.175 57.2486 132.555C53.0533 131.743 49.8373 128.356 49.2447 124.124C48.7917 120.889 51.7376 115.396 57.6293 104.408C59.2781 101.333 60.1025 99.7953 60.3856 98.2585C60.8016 96.0001 60.4276 93.6674 59.3266 91.6522C58.5773 90.2808 57.3239 89.0879 54.8172 86.7021C45.8836 78.1991 41.4168 73.9476 40.7811 70.8924C39.8424 66.3803 42.1089 61.8109 46.2694 59.8282C49.0864 58.4857 55.1741 59.4696 67.3494 61.4374L68.8795 61.6847C72.4169 62.2564 74.1856 62.5422 75.8011 62.2742C77.7539 61.9502 79.5666 61.0539 81.0096 59.6989C82.2035 58.5779 83.0615 56.9778 84.7774 53.7775Z" fill="#f97316"/>
          </svg>
          {/* Green circle — top right */}
          <div data-parallax="0.18" className="hero-shape" style={{ position: 'absolute', top: '5px', right: '13%', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#22c55e', pointerEvents: 'none' }} />
          {/* Red circle — far right edge */}
          <div data-parallax="0.32" className="hero-shape hero-shape-red-circle" style={{ position: 'absolute', top: '30%', right: '0px', width: '88px', height: '88px', borderRadius: '50%', backgroundColor: '#ef4444', pointerEvents: 'none' }} />
          {/* Purple sharp triangle — lower right */}
          <svg data-parallax="0.22" className="hero-shape" style={{ position: 'absolute', bottom: '8%', right: '12%', pointerEvents: 'none' }} width="88" height="88" viewBox="0 0 100 100">
            <path d="M 0 0 L 100 50 L 0 100 Z" fill="#818cf8"/>
          </svg>
          {/* Pink organic star — bottom left */}
          <svg data-parallax="0.36" className="hero-shape" style={{ position: 'absolute', bottom: '0px', left: '6%', pointerEvents: 'none' }} width="96" height="92" viewBox="0 0 189 181">
            <path d="M84.7774 53.7775C91.3204 41.5751 94.5919 35.4739 98.0802 34.1447C101.423 32.8708 105.192 33.48 107.964 35.7421C110.856 38.1025 112.039 44.9236 114.405 58.5659C115.025 62.1438 115.336 63.9327 116.116 65.3728C117.058 67.1133 118.496 68.535 120.248 69.4576C121.697 70.221 123.465 70.5068 127.003 71.0785L128.533 71.3258C140.708 73.2936 146.796 74.2775 149.046 76.439C152.37 79.6314 153.082 84.6821 150.77 88.6688C149.204 91.3682 143.626 93.9961 132.468 99.252C129.338 100.727 127.772 101.464 126.629 102.53C124.949 104.095 123.86 106.192 123.543 108.466C123.327 110.014 123.626 111.733 124.222 115.17C126.352 127.455 127.418 133.597 125.969 136.524C124.073 140.354 119.954 142.556 115.716 142.004C112.478 141.583 108.004 137.325 99.0565 128.809L97.2231 127.064C94.4168 124.393 93.0136 123.057 91.3756 122.35C89.8539 121.693 88.1928 121.424 86.5416 121.569C84.7642 121.724 83.0118 122.549 79.5069 124.2L77.2172 125.279C66.0424 130.543 60.455 133.175 57.2486 132.555C53.0533 131.743 49.8373 128.356 49.2447 124.124C48.7917 120.889 51.7376 115.396 57.6293 104.408C59.2781 101.333 60.1025 99.7953 60.3856 98.2585C60.8016 96.0001 60.4276 93.6674 59.3266 91.6522C58.5773 90.2808 57.3239 89.0879 54.8172 86.7021C45.8836 78.1991 41.4168 73.9476 40.7811 70.8924C39.8424 66.3803 42.1089 61.8109 46.2694 59.8282C49.0864 58.4857 55.1741 59.4696 67.3494 61.4374L68.8795 61.6847C72.4169 62.2564 74.1856 62.5422 75.8011 62.2742C77.7539 61.9502 79.5666 61.0539 81.0096 59.6989C82.2035 58.5779 83.0615 56.9778 84.7774 53.7775Z" fill="#f472b6"/>
          </svg>
          {/* Blue organic star — bottom center-right */}
          <svg data-parallax="0.38" className="hero-shape hero-shape-blue-star" style={{ position: 'absolute', bottom: '0px', left: '57%', pointerEvents: 'none' }} width="110" height="105" viewBox="0 0 189 181">
            <path d="M84.7774 53.7775C91.3204 41.5751 94.5919 35.4739 98.0802 34.1447C101.423 32.8708 105.192 33.48 107.964 35.7421C110.856 38.1025 112.039 44.9236 114.405 58.5659C115.025 62.1438 115.336 63.9327 116.116 65.3728C117.058 67.1133 118.496 68.535 120.248 69.4576C121.697 70.221 123.465 70.5068 127.003 71.0785L128.533 71.3258C140.708 73.2936 146.796 74.2775 149.046 76.439C152.37 79.6314 153.082 84.6821 150.77 88.6688C149.204 91.3682 143.626 93.9961 132.468 99.252C129.338 100.727 127.772 101.464 126.629 102.53C124.949 104.095 123.86 106.192 123.543 108.466C123.327 110.014 123.626 111.733 124.222 115.17C126.352 127.455 127.418 133.597 125.969 136.524C124.073 140.354 119.954 142.556 115.716 142.004C112.478 141.583 108.004 137.325 99.0565 128.809L97.2231 127.064C94.4168 124.393 93.0136 123.057 91.3756 122.35C89.8539 121.693 88.1928 121.424 86.5416 121.569C84.7642 121.724 83.0118 122.549 79.5069 124.2L77.2172 125.279C66.0424 130.543 60.455 133.175 57.2486 132.555C53.0533 131.743 49.8373 128.356 49.2447 124.124C48.7917 120.889 51.7376 115.396 57.6293 104.408C59.2781 101.333 60.1025 99.7953 60.3856 98.2585C60.8016 96.0001 60.4276 93.6674 59.3266 91.6522C58.5773 90.2808 57.3239 89.0879 54.8172 86.7021C45.8836 78.1991 41.4168 73.9476 40.7811 70.8924C39.8424 66.3803 42.1089 61.8109 46.2694 59.8282C49.0864 58.4857 55.1741 59.4696 67.3494 61.4374L68.8795 61.6847C72.4169 62.2564 74.1856 62.5422 75.8011 62.2742C77.7539 61.9502 79.5666 61.0539 81.0096 59.6989C82.2035 58.5779 83.0615 56.9778 84.7774 53.7775Z" fill="#3b82f6"/>
          </svg>
        </div>
        {/* Hero text */}
        <div className={`flex justify-center ${introComplete ? 'hero-in' : 'hero-pre'}`} style={{ position: 'relative', zIndex: 1, paddingTop: '40px', paddingBottom: '40px' }}>
          <p className="hero-text-p" style={{ fontSize: '28px', lineHeight: '36px', letterSpacing: '-0.03em', color: 'black', maxWidth: '1000px', width: '100%', textAlign: 'left' }}>
            SF-based product designer rooted in both visual design and product thinking,{" "}
            <span className="text-gray-400">focused on creating clear, high-quality experiences.</span>
          </p>
        </div>
      </section>
      {/* Project Cards */}
      <section className="flex flex-col cards-section" style={{ position: 'relative', zIndex: 1, gap: '80px', marginLeft: '80px', marginRight: '80px' }}>
        {/* NutritionNest */}
        <Link href="/nn" className="group bg-gray-100 flex flex-col overflow-hidden cursor-pointer project-card card-pre"
          style={{ textDecoration: 'none', paddingTop: '80px', paddingBottom: '40px', paddingLeft: '48px', paddingRight: '48px', gap: '20px', borderRadius: '32px' }}>
          <div ref={nnImagesWrapRef} style={{ willChange: 'transform', overflow: 'visible' }}>
            <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <Image src="/Images/NN.png" alt="NutritionNest" width={900} height={600} className="object-contain rounded-xl nn-desktop-img" style={{ width: '75%', height: 'auto' }} />
              <div className="nn-phone" style={{ position: 'relative', flex: '1 1 0', marginLeft: '-4px', alignSelf: 'stretch' }}>
                <div style={{ position: 'absolute', top: '4%', left: '8.5%', right: '8.5%', bottom: '4.2%', borderRadius: '11%/5.5%', overflow: 'hidden', zIndex: 1 }}>
                  <video src="/Images/NN-video.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <Image src="/Images/NN-iphone-frame.png" alt="iPhone frame" fill
                  style={{ objectFit: 'fill', zIndex: 10, pointerEvents: 'none' }} />
              </div>
            </div>
          </div>
          <div className="card-bottom-container" style={{ margin: '0 -48px -40px -48px', padding: '40px 80px', backgroundColor: 'rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between card-label-row">
            <div className="flex items-center gap-4 card-icon-wrap">
              <Image src="/Icons/NN_icon.png" alt="NutritionNest icon" width={64} height={64} className="card-icon" style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span className="card-title" style={{ fontSize: '40px', lineHeight: '52px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>NutritionNest</span>
                <span className="card-desc" style={{ fontSize: '20px', lineHeight: '28px', color: '#6b7280' }}>Log nutritional intake and monitor daily calories</span>
              </div>
            </div>
            <div className="arrow-btn">
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
          </div>
        </Link>
        {/* Duetti */}
        <Link href="/duetti" className="group flex flex-col overflow-hidden cursor-pointer project-card card-pre"
          style={{ textDecoration: 'none', backgroundColor: '#d9f99d', borderRadius: '32px', paddingTop: '80px', paddingBottom: '40px', paddingLeft: '48px', paddingRight: '48px', gap: '10px' }}>
          <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4"
            style={{ alignItems: 'flex-end', justifyContent: 'center', gap: '16px' }}>
            <div className="duetti-macbook" style={{ position: 'relative', width: '73%', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: '2.2%', left: '1.4%', right: '1.4%', bottom: '24.9%', overflow: 'hidden', zIndex: 1 }}>
                <video src="/Images/Duetti video.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <Image src="/Images/Apple Pro Display.png" alt="Apple Pro Display" width={1200} height={800} style={{ position: 'relative', width: '100%', height: 'auto', display: 'block', zIndex: 10 }} />
            </div>
            <Image src="/Images/Duetti iphone frame.png" alt="Duetti iPhone" width={400} height={600}
              className="duetti-iphone"
              style={{ width: '15%', height: 'auto', objectFit: 'contain', alignSelf: 'flex-end', position: 'relative', zIndex: 20 }} />
          </div>
          <div className="card-bottom-container" style={{ margin: '0 -48px -40px -48px', padding: '40px 80px', backgroundColor: 'rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between card-label-row">
            <div className="flex items-center gap-4 card-icon-wrap">
              <Image src="/Icons/Duetti_icon.png" alt="Duetti icon" width={64} height={64} className="card-icon" style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span className="card-title" style={{ fontSize: '40px', lineHeight: '52px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>Duetti</span>
                <span className="card-desc" style={{ fontSize: '20px', lineHeight: '28px', color: '#4b5563' }}>Insight-driven report that simplifies music industry data for artists through visual storytelling</span>
              </div>
            </div>
            <div className="arrow-btn">
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
          </div>
        </Link>
        {/* Lasertaz */}
        <Link href="/lasertaz" className="group flex flex-col overflow-hidden cursor-pointer project-card card-pre"
          style={{ textDecoration: 'none', backgroundColor: '#0a0a0a', borderRadius: '32px', paddingTop: '80px', paddingBottom: '40px', paddingLeft: '48px', paddingRight: '48px', gap: '10px' }}>
          <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <Image src="/Images/Lasertaz image.png" alt="Lasertaz" width={1200} height={800} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain', margin: '0 auto' }} />
          </div>
          <div className="card-bottom-container" style={{ margin: '0 -48px -40px -48px', padding: '40px 80px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between card-label-row">
            <div className="flex items-center gap-4 card-icon-wrap">
              <Image src="/Icons/Lasertaz_icon.png" alt="Lasertaz icon" width={64} height={64} className="card-icon" style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span className="card-title" style={{ fontSize: '40px', lineHeight: '52px', letterSpacing: '-0.4px', fontWeight: '500', color: '#ffffff' }}>Lasertaz</span>
                <span className="card-desc" style={{ fontSize: '20px', lineHeight: '28px', color: '#9ca3af' }}>Help independent landlords manage their rental properties</span>
              </div>
            </div>
            <div className="arrow-btn" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
          </div>
        </Link>
        {/* Bookworm */}
        <Link href="/bookworm" className="group flex flex-col overflow-hidden cursor-pointer project-card card-pre"
          style={{ textDecoration: 'none', backgroundColor: '#184131', borderRadius: '32px', paddingTop: '80px', paddingBottom: '40px', paddingLeft: '48px', paddingRight: '48px', gap: '20px' }}>
          <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-start', minHeight: '144px' }}>
            <div className="bw-desktop-img" style={{ flex: '0 0 75%', overflow: 'hidden', borderRadius: '12px' }}>
              <Image src="/Images/bw_image.png" alt="Bookworm" width={1080} height={678} quality={100}
                style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div className="bw-phone" style={{ position: 'relative', flex: '0 0 25%', aspectRatio: '750 / 1420', alignSelf: 'flex-start', marginTop: '0%' }}>
              <div style={{ position: 'absolute', inset: 0 }}>
                <div style={{ position: 'absolute', top: '1.6%', left: '9%', right: '9%', bottom: '2%', borderRadius: '10% 10% 6% 6% / 7% 7% 4% 4%', overflow: 'hidden', zIndex: 1 }}>
                  <video src="/Images/Bookworm.mp4" autoPlay loop muted playsInline className="bw-video" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <Image src="/Images/bw_iphone_frame.png" alt="iPhone frame"
                  width={678} height={1390}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none' }} />
              </div>
            </div>
          </div>
          <div className="card-bottom-container" style={{ margin: '0 -48px -40px -48px', padding: '40px 80px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between card-label-row">
            <div className="flex items-center gap-4 card-icon-wrap">
              <Image src="/Icons/Bookworm_icon.png" alt="Bookworm icon" width={64} height={64} className="card-icon" style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span className="card-title" style={{ fontSize: '40px', lineHeight: '52px', letterSpacing: '-0.4px', fontWeight: '500', color: '#ffffff' }}>Bookworm</span>
                <span className="card-desc" style={{ fontSize: '20px', lineHeight: '28px', color: '#9ca3af' }}>E-Commerce platform for books and related content</span>
              </div>
            </div>
            <div className="arrow-btn" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
          </div>
        </Link>
        {/* Raymond Hair Salon */}
        <Link href="/rhs" className="group flex flex-col overflow-hidden cursor-pointer project-card card-pre"
          style={{ textDecoration: 'none', backgroundColor: '#f1f5f9', borderRadius: '32px', paddingTop: '80px', paddingBottom: '40px', paddingLeft: '48px', paddingRight: '48px', gap: '10px' }}>
          <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-start', minHeight: '144px' }}>
            <Image src="/Images/rhs_image (3).png" alt="Raymond Hair Salon" width={955} height={617} quality={100} className="object-contain rounded-xl rhs-desktop-img" style={{ width: '75%', height: 'auto' }} />
            <div className="rhs-phone" style={{ position: 'relative', flex: '0 0 25%', aspectRatio: '750 / 1430', alignSelf: 'flex-start', marginTop: '1.5%' }}>
              <div style={{ position: 'absolute', top: '2%', left: '9%', right: '9%', bottom: '2%', borderRadius: '6% / 4%', overflow: 'hidden', zIndex: 1, backgroundColor: '#ffffff' }}>
                <video src="/Images/rhs_video1.mp4" autoPlay loop muted playsInline className="rhs-video" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <Image src="/Images/rhs_iphone_frame.png" alt="iPhone frame"
                fill
                style={{ objectFit: 'contain', zIndex: 10, pointerEvents: 'none' }} />
            </div>
          </div>
          <div className="card-bottom-container" style={{ margin: '0 -48px -40px -48px', padding: '40px 80px', backgroundColor: 'rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between card-label-row">
            <div className="flex items-center gap-4 card-icon-wrap">
              <Image src="/Icons/RHS_icon.png" alt="RHS icon" width={64} height={64} className="card-icon" style={{ borderRadius: '14px' }} />
              <div className="flex flex-col gap-1">
                <span className="card-title" style={{ fontSize: '40px', lineHeight: '52px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>Raymond Hair Salon</span>
                <span className="card-desc" style={{ fontSize: '20px', lineHeight: '28px', color: '#6b7280' }}>Scheduling made effortless with online booking</span>
              </div>
            </div>
            <div className="arrow-btn">
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
          </div>
        </Link>
      </section>
      {/* Concepts Section */}
      <div className="concepts-section" style={{ marginTop: '80px', marginLeft: '-80px', marginRight: '-80px', backgroundColor: '#f3f4f6', padding: '80px 160px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 className="concepts-title" style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.6px', fontWeight: '500', color: '#212121', marginBottom: '8px' }}>Concepts</h2>
          <p className="concepts-desc" style={{ fontSize: '20px', lineHeight: '28px', letterSpacing: '-0.6px', color: '#6b7280', marginBottom: '4px' }}>
            I designed these projects after noticing gaps in existing products and wanting to see what a better solution could feel like.
          </p>
          <p className="concepts-desc" style={{ fontSize: '20px', lineHeight: '28px', letterSpacing: '-0.6px', color: '#6b7280' }}>
            This led me to prototype ideas and explore them hands-on.
          </p>
        </div>
        <div className="flex flex-col" style={{ gap: '80px' }}>
          {/* Kalshi */}
          <Link href="/kalshi" className="group flex flex-col overflow-hidden cursor-pointer project-card card-pre"
            style={{ textDecoration: 'none', backgroundColor: '#ffffff', borderRadius: '32px', paddingTop: '80px', paddingBottom: '40px', paddingLeft: '48px', paddingRight: '48px', gap: '10px', border: '1px solid rgba(0,0,0,0.1)' }}>
            <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4"
              style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <Image src="/Images/kalshi_bento.png" alt="Kalshi" width={1200} height={800} className="object-contain" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div className="card-bottom-container" style={{ margin: '0 -48px -40px -48px', padding: '40px 80px' }}>
          <div className="flex items-center justify-between card-label-row">
              <div className="flex items-center gap-4 card-icon-wrap">
                <Image src="/Icons/Kalshi_icon.png" alt="Kalshi icon" width={64} height={64} className="card-icon" style={{ borderRadius: '14px' }} />
                <div className="flex flex-col gap-1">
                  <span className="card-title" style={{ fontSize: '40px', lineHeight: '52px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>Kalshi</span>
                  <span className="card-desc" style={{ fontSize: '20px', lineHeight: '28px', color: '#6b7280' }}>2025 | Desktop extension</span>
                </div>
              </div>
              <div className="arrow-btn">
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
            </div>
          </Link>
          {/* Phia */}
          <Link href="/phia" className="group flex flex-col overflow-hidden cursor-pointer project-card card-pre"
            style={{ textDecoration: 'none', backgroundColor: '#ffffff', borderRadius: '32px', paddingTop: '80px', paddingBottom: '40px', paddingLeft: '48px', paddingRight: '48px', gap: '10px', border: '1px solid rgba(0,0,0,0.1)' }}>
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
            <div className="card-bottom-container" style={{ margin: '0 -48px -40px -48px', padding: '40px 80px' }}>
          <div className="flex items-center justify-between card-label-row">
              <div className="flex items-center gap-4 card-icon-wrap">
                <Image src="/Icons/Phia_icon.png" alt="Phia icon" width={64} height={64} className="card-icon" style={{ borderRadius: '14px' }} />
                <div className="flex flex-col gap-1">
                  <span className="card-title" style={{ fontSize: '40px', lineHeight: '52px', letterSpacing: '-0.4px', fontWeight: '500', color: '#212121' }}>Phia</span>
                  <span className="card-desc" style={{ fontSize: '20px', lineHeight: '28px', color: '#6b7280' }}>2025 | Desktop extension | Redesign</span>
                </div>
              </div>
              <div className="arrow-btn">
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
            </div>
          </Link>
        </div>
      </div>
    </main>

    </>
  )
}
