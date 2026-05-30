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
  const shapesContainerRef = useRef(null)
  const nnImagesWrapRef = useRef(null)
  const shapesCache = useRef(null)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      lastScrollY.current = currentScrollY
      // Shape parallax + fade — move the whole container so shapes never overlap
      if (shapesContainerRef.current) {
        const offset = currentScrollY * 0.6
        const opacity = Math.max(0, 1 - Math.max(0, currentScrollY - 120) / 250)
        shapesContainerRef.current.style.transform = `translateY(${offset}px)`
        shapesContainerRef.current.style.opacity = opacity
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
    const hero = heroRef.current
    if (!hero) return
    const repelShapes = Array.from(hero.querySelectorAll('[data-parallax]'))

    // Per-shape lerp state — no velocity, no bounce
    const state = repelShapes.map(() => ({ x: 0, y: 0 }))
    let mouseX = -9999
    let mouseY = -9999
    let rafId = null

    const tick = () => {
      const rects = repelShapes.map(s => s.getBoundingClientRect())

      repelShapes.forEach((shape, i) => {
        const s = state[i]
        const rect = rects[i]
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2

        // Distance from cursor to shape's current screen position
        const dx = mouseX - cx
        const dy = mouseY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const threshold = 260

        // Target offset: push shape away from cursor
        let targetX = 0
        let targetY = 0
        if (dist < threshold && dist > 0) {
          const t = Math.pow((threshold - dist) / threshold, 1.2)
          const push = t * 200
          targetX = -(dx / dist) * push
          targetY = -(dy / dist) * push
        }

        // Lerp smoothly toward target — slow factor = floaty, no bounce possible
        s.x += (targetX - s.x) * 0.035
        s.y += (targetY - s.y) * 0.035

        shape.style.transition = 'none'
        shape.style.transform = `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px)`
      })

      rafId = requestAnimationFrame(tick)
    }

    const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }
    const onLeave = () => { mouseX = -9999; mouseY = -9999 }

    rafId = requestAnimationFrame(tick)
    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(rafId)
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
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
    <main className="min-h-screen portfolio-main" style={{ paddingLeft: '64px', paddingRight: '64px', cursor: 'none', backgroundColor: '#fbfbfb' }}>
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
        @keyframes heroPop {
          0%   { opacity: 0; transform: scale(0.3); }
          100% { opacity: 1; transform: scale(1); }
        }
        .shape-pre { opacity: 0; }
        .shape-in { animation: heroPop 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        @keyframes orbitCW {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(4px, -4px); }
          50%  { transform: translate(0px, -8px); }
          75%  { transform: translate(-4px, -4px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes orbitCCW {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(-4px, -4px); }
          50%  { transform: translate(0px, -8px); }
          75%  { transform: translate(4px, -4px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes orbitSm {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(3px, -3px); }
          50%  { transform: translate(0px, -6px); }
          75%  { transform: translate(-3px, -3px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes glisten {
          0%, 100% { opacity: 0.45; }
          50%      { opacity: 1; }
        }
        @keyframes cardFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-shapes-mobile { display: none; }
        .card-pre { opacity: 0; transform: translateY(30px); }
        .card-in { animation: cardFadeUp 3s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .project-card { padding-top: 48px !important; padding-bottom: 32px !important; padding-left: 32px !important; padding-right: 32px !important; border-radius: 8px !important; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08) !important; }
        .main-card { padding-top: 56px !important; padding-bottom: 56px !important; min-height: 550px; height: 100%; justify-content: center; }
        .nn-card { justify-content: center !important; padding: 36px !important; }
        .card-squircle-wrap { flex: 1; display: flex; flex-direction: column; }
        .concept-card { height: auto !important; min-height: unset !important; }
        .concept-card.main-card { justify-content: center !important; padding: 24px 36px !important; min-height: unset !important; height: auto !important; }
        .concepts-cards-col .card-squircle-wrap { flex: none; }
        .card-bottom-container { margin: 0 -32px -32px -32px !important; padding: 24px 32px !important; }
        .card-title { font-size: 14px !important; line-height: 20px !important; letter-spacing: -0.03em !important; font-weight: 400 !important; color: #212121 !important; }
        .card-desc { font-size: 14px !important; line-height: 20px !important; color: rgba(10,10,10,0.4) !important; font-weight: 400 !important; }
        .card-icon { width: 48px !important; height: 48px !important; border-radius: 10px !important; }
        @media (max-width: 767px) {
          * { cursor: auto !important; }
          .portfolio-main { padding-left: 20px !important; padding-right: 20px !important; }
          .hero-section { margin: 0 -20px !important; padding: 32px 20px 32px !important; overflow: hidden !important; }
          .hero-shapes-wrap { display: none !important; }
          .hero-shapes-mobile { display: block !important; }
          .hero-text-p { font-size: 14px !important; line-height: 20px !important; letter-spacing: -0.03em !important; width: 100% !important; max-width: 100% !important; }
          .cards-section { margin-left: 0 !important; margin-right: 0 !important; gap: 16px !important; grid-template-columns: 1fr !important; }
          .nn-desktop-img, .bw-desktop-img, .rhs-desktop-img { display: none !important; }
          .nn-phone, .bw-phone, .rhs-phone { flex: unset !important; margin: 0 auto !important; width: 40% !important; aspect-ratio: 9/19 !important; align-self: center !important; position: relative !important; }
          .nn-phone { overflow: hidden !important; border-radius: 14% / 7% !important; }
          .bw-phone { width: 44% !important; aspect-ratio: 9/16 !important; }
          .bw-video { object-fit: contain !important; }
          .rhs-phone { width: 44% !important; height: auto !important; margin: 0 auto !important; align-self: center !important; aspect-ratio: 750/1430 !important; }
          .rhs-video { object-fit: cover !important; }
          .main-card { height: 460px !important; min-height: unset !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; }
          .project-card { position: relative !important; padding-left: 16px !important; padding-right: 16px !important; padding-top: 20px !important; padding-bottom: 20px !important; border-radius: 20px !important; }
          .card-bottom-container { margin: 0 -16px -20px -16px !important; padding: 20px 16px !important; }
          .card-label-row { padding: 8px 0 !important; }
          .card-title { font-size: 12px !important; line-height: 14px !important; letter-spacing: -0.03em !important; }
          .card-desc { font-size: 12px !important; line-height: 14px !important; color: rgba(10,10,10,0.4) !important; }
          .card-icon { width: 32px !important; height: 32px !important; border-radius: 10px !important; }
          .card-icon-wrap { align-items: flex-start !important; }
          .duetti-macbook { width: 100% !important; }
          .duetti-iphone { display: none !important; }
          .card-img-wrap { overflow: hidden !important; width: 100% !important; }
          .rhs-img-container { height: auto !important; min-height: unset !important; width: 100% !important; display: flex !important; align-items: center !important; justify-content: center !important; }
          .nn-img-wrap { display: flex !important; justify-content: center !important; align-items: center !important; width: 100% !important; }
          .card-img-row { justify-content: center !important; align-items: center !important; width: 100% !important; }
          .concept-card { height: auto !important; min-height: unset !important; }
          .concepts-section { margin-left: -20px !important; margin-right: -20px !important; padding: 48px 20px !important; margin-top: 48px !important; }
          .concepts-sticky-left { position: static !important; width: 100% !important; margin-bottom: 32px !important; }
          .concepts-inner { flex-direction: column !important; }
          .concepts-cards-col { flex: unset !important; width: 100% !important; }
          .concepts-title { font-size: 14px !important; line-height: 20px !important; }
          .concepts-desc { font-size: 12px !important; line-height: 14px !important; }
          .card-year-label { font-size: 12px !important; line-height: 14px !important; }
        }
      `}</style>
      {/* Spacer for fixed navbar */}
      <div style={{ height: '96px' }} />
      {/* Hero */}
      <section ref={heroRef} className="hero-section" style={{ position: 'relative', zIndex: 0, margin: '0 -64px', padding: '96px 68px 48px', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Floating shapes */}
        <div ref={shapesContainerRef} className="hero-shapes-wrap" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, willChange: 'transform' }}>
          {/* ── LARGE SHAPES (7) ── */}
          {/* 1. Large blue circle — center left */}
          <div data-parallax="0.28" style={{ position: 'absolute', top: '22%', left: '10%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape hero-shape-blue-circle ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '0.55s' }}>
            <div data-tilt style={{ display: 'inline-block', transformStyle: 'preserve-3d', pointerEvents: 'all' }}>
            <svg width="160" height="160" viewBox="0 0 160 160" overflow="visible" style={{ animation: 'orbitSm 5s ease-in-out infinite' }}>
              <defs>
                <linearGradient id="gls-bc" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="white" stopOpacity="0.85" />
                  <stop offset="55%" stopColor="white" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle cx="80" cy="80" r="79" fill="#2DA3F8"/>
              <circle cx="80" cy="80" r="79" fill="none" stroke="url(#gls-bc)" strokeWidth="2" style={{ animation: 'glisten 3.5s ease-in-out 1.2s infinite' }}/>
            </svg>
            </div>
          </div>
          </div>
          {/* 3. Large green right-pointing triangle — top right */}
          <div data-parallax="0.22" style={{ position: 'absolute', top: '4%', right: '10%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape hero-shape-green-tri ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '0.7s' }}>
            <div data-tilt style={{ display: 'inline-block', transformStyle: 'preserve-3d', pointerEvents: 'all' }}>
            <svg width="130" height="130" viewBox="0 0 100 100" overflow="visible" style={{ animation: 'orbitCW 6s ease-in-out infinite' }}>
              <defs>
                <linearGradient id="gls-gt" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="white" stopOpacity="0.85" />
                  <stop offset="55%" stopColor="white" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 7.69 Q 0 0 6.88 3.44 L 93.12 46.56 Q 100 50 93.12 53.44 L 6.88 96.56 Q 0 100 0 92.31 Z" fill="#0C840C"/>
              <path d="M 0 7.69 Q 0 0 6.88 3.44 L 93.12 46.56 Q 100 50 93.12 53.44 L 6.88 96.56 Q 0 100 0 92.31 Z" fill="none" stroke="url(#gls-gt)" strokeWidth="2" style={{ animation: 'glisten 4s ease-in-out 0s infinite' }}/>
            </svg>
            </div>
          </div>
          </div>
          {/* 2. Large orange organic star — bottom left */}
          <div data-parallax="0.36" style={{ position: 'absolute', bottom: '-50px', left: '0%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape hero-shape-orange-star ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.2s' }}>
            <div data-tilt style={{ display: 'inline-block', transformStyle: 'preserve-3d', pointerEvents: 'all' }}>
            <svg width="190" height="187" viewBox="0 0 189 181" overflow="visible" style={{ animation: 'orbitCCW 8s ease-in-out infinite' }}>
              <defs>
                <linearGradient id="gls-os" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="white" stopOpacity="0.85" />
                  <stop offset="55%" stopColor="white" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M84.7774 53.7775C91.3204 41.5751 94.5919 35.4739 98.0802 34.1447C101.423 32.8708 105.192 33.48 107.964 35.7421C110.856 38.1025 112.039 44.9236 114.405 58.5659C115.025 62.1438 115.336 63.9327 116.116 65.3728C117.058 67.1133 118.496 68.535 120.248 69.4576C121.697 70.221 123.465 70.5068 127.003 71.0785L128.533 71.3258C140.708 73.2936 146.796 74.2775 149.046 76.439C152.37 79.6314 153.082 84.6821 150.77 88.6688C149.204 91.3682 143.626 93.9961 132.468 99.252C129.338 100.727 127.772 101.464 126.629 102.53C124.949 104.095 123.86 106.192 123.543 108.466C123.327 110.014 123.626 111.733 124.222 115.17C126.352 127.455 127.418 133.597 125.969 136.524C124.073 140.354 119.954 142.556 115.716 142.004C112.478 141.583 108.004 137.325 99.0565 128.809L97.2231 127.064C94.4168 124.393 93.0136 123.057 91.3756 122.35C89.8539 121.693 88.1928 121.424 86.5416 121.569C84.7642 121.724 83.0118 122.549 79.5069 124.2L77.2172 125.279C66.0424 130.543 60.455 133.175 57.2486 132.555C53.0533 131.743 49.8373 128.356 49.2447 124.124C48.7917 120.889 51.7376 115.396 57.6293 104.408C59.2781 101.333 60.1025 99.7953 60.3856 98.2585C60.8016 96.0001 60.4276 93.6674 59.3266 91.6522C58.5773 90.2808 57.3239 89.0879 54.8172 86.7021C45.8836 78.1991 41.4168 73.9476 40.7811 70.8924C39.8424 66.3803 42.1089 61.8109 46.2694 59.8282C49.0864 58.4857 55.1741 59.4696 67.3494 61.4374L68.8795 61.6847C72.4169 62.2564 74.1856 62.5422 75.8011 62.2742C77.7539 61.9502 79.5666 61.0539 81.0096 59.6989C82.2035 58.5779 83.0615 56.9778 84.7774 53.7775Z" fill="#f97316"/>
              <path d="M84.7774 53.7775C91.3204 41.5751 94.5919 35.4739 98.0802 34.1447C101.423 32.8708 105.192 33.48 107.964 35.7421C110.856 38.1025 112.039 44.9236 114.405 58.5659C115.025 62.1438 115.336 63.9327 116.116 65.3728C117.058 67.1133 118.496 68.535 120.248 69.4576C121.697 70.221 123.465 70.5068 127.003 71.0785L128.533 71.3258C140.708 73.2936 146.796 74.2775 149.046 76.439C152.37 79.6314 153.082 84.6821 150.77 88.6688C149.204 91.3682 143.626 93.9961 132.468 99.252C129.338 100.727 127.772 101.464 126.629 102.53C124.949 104.095 123.86 106.192 123.543 108.466C123.327 110.014 123.626 111.733 124.222 115.17C126.352 127.455 127.418 133.597 125.969 136.524C124.073 140.354 119.954 142.556 115.716 142.004C112.478 141.583 108.004 137.325 99.0565 128.809L97.2231 127.064C94.4168 124.393 93.0136 123.057 91.3756 122.35C89.8539 121.693 88.1928 121.424 86.5416 121.569C84.7642 121.724 83.0118 122.549 79.5069 124.2L77.2172 125.279C66.0424 130.543 60.455 133.175 57.2486 132.555C53.0533 131.743 49.8373 128.356 49.2447 124.124C48.7917 120.889 51.7376 115.396 57.6293 104.408C59.2781 101.333 60.1025 99.7953 60.3856 98.2585C60.8016 96.0001 60.4276 93.6674 59.3266 91.6522C58.5773 90.2808 57.3239 89.0879 54.8172 86.7021C45.8836 78.1991 41.4168 73.9476 40.7811 70.8924C39.8424 66.3803 42.1089 61.8109 46.2694 59.8282C49.0864 58.4857 55.1741 59.4696 67.3494 61.4374L68.8795 61.6847C72.4169 62.2564 74.1856 62.5422 75.8011 62.2742C77.7539 61.9502 79.5666 61.0539 81.0096 59.6989C82.2035 58.5779 83.0615 56.9778 84.7774 53.7775Z" fill="none" stroke="url(#gls-os)" strokeWidth="2" style={{ animation: 'glisten 4.5s ease-in-out 0.6s infinite' }}/>
            </svg>
            </div>
          </div>
          </div>
          {/* 4. Large orange rounded square — right, below green triangle */}
          <div data-parallax="0.42" style={{ position: 'absolute', top: '14%', right: '2%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape hero-shape-orange-sq ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '0.75s' }}>
            <div data-tilt style={{ display: 'inline-block', transformStyle: 'preserve-3d', pointerEvents: 'all' }}>
            <div style={{ transform: 'rotate(-24.02deg)' }}>
            <svg width="78" height="78" viewBox="0 0 78 78" overflow="visible" style={{ animation: 'orbitCCW 7s ease-in-out infinite' }}>
              <defs>
                <linearGradient id="gls-osq" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="white" stopOpacity="0.85" />
                  <stop offset="55%" stopColor="white" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect x="1" y="1" width="76" height="76" rx="12" fill="#f97316"/>
              <rect x="1" y="1" width="76" height="76" rx="12" fill="none" stroke="url(#gls-osq)" strokeWidth="2" style={{ animation: 'glisten 4.5s ease-in-out 0.6s infinite' }}/>
            </svg>
            </div>
            </div>
          </div>
          </div>
          {/* 5. Large red rounded square */}
          <div data-parallax="0.26" style={{ position: 'absolute', top: '26%', right: '24%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape hero-shape-red-sq ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '0.95s' }}>
            <div data-tilt style={{ display: 'inline-block', transformStyle: 'preserve-3d', pointerEvents: 'all' }}>
            <div style={{ transform: 'rotate(-20.26deg)' }}>
            <svg width="70" height="70" viewBox="0 0 70 70" overflow="visible" style={{ animation: 'orbitCW 6s ease-in-out infinite' }}>
              <defs>
                <linearGradient id="gls-rsq" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="white" stopOpacity="0.85" />
                  <stop offset="55%" stopColor="white" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect x="1" y="1" width="68" height="68" rx="10" fill="#E52C2C"/>
              <rect x="1" y="1" width="68" height="68" rx="10" fill="none" stroke="url(#gls-rsq)" strokeWidth="2" style={{ animation: 'glisten 4s ease-in-out 1.1s infinite' }}/>
            </svg>
            </div>
            </div>
          </div>
          </div>
          {/* 6. Purple organic star */}
          <div data-parallax="0.30" style={{ position: 'absolute', top: '43%', right: '14%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape hero-shape-purple-star ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '0.85s' }}>
            <div data-tilt style={{ display: 'inline-block', transformStyle: 'preserve-3d', pointerEvents: 'all' }}>
            <svg width="131" height="124" viewBox="0 0 189 181" overflow="visible" style={{ animation: 'orbitCCW 7s ease-in-out infinite', borderRadius: '7px' }}>
              <defs>
                <linearGradient id="gls-ps" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="white" stopOpacity="0.85" />
                  <stop offset="55%" stopColor="white" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M84.7774 53.7775C91.3204 41.5751 94.5919 35.4739 98.0802 34.1447C101.423 32.8708 105.192 33.48 107.964 35.7421C110.856 38.1025 112.039 44.9236 114.405 58.5659C115.025 62.1438 115.336 63.9327 116.116 65.3728C117.058 67.1133 118.496 68.535 120.248 69.4576C121.697 70.221 123.465 70.5068 127.003 71.0785L128.533 71.3258C140.708 73.2936 146.796 74.2775 149.046 76.439C152.37 79.6314 153.082 84.6821 150.77 88.6688C149.204 91.3682 143.626 93.9961 132.468 99.252C129.338 100.727 127.772 101.464 126.629 102.53C124.949 104.095 123.86 106.192 123.543 108.466C123.327 110.014 123.626 111.733 124.222 115.17C126.352 127.455 127.418 133.597 125.969 136.524C124.073 140.354 119.954 142.556 115.716 142.004C112.478 141.583 108.004 137.325 99.0565 128.809L97.2231 127.064C94.4168 124.393 93.0136 123.057 91.3756 122.35C89.8539 121.693 88.1928 121.424 86.5416 121.569C84.7642 121.724 83.0118 122.549 79.5069 124.2L77.2172 125.279C66.0424 130.543 60.455 133.175 57.2486 132.555C53.0533 131.743 49.8373 128.356 49.2447 124.124C48.7917 120.889 51.7376 115.396 57.6293 104.408C59.2781 101.333 60.1025 99.7953 60.3856 98.2585C60.8016 96.0001 60.4276 93.6674 59.3266 91.6522C58.5773 90.2808 57.3239 89.0879 54.8172 86.7021C45.8836 78.1991 41.4168 73.9476 40.7811 70.8924C39.8424 66.3803 42.1089 61.8109 46.2694 59.8282C49.0864 58.4857 55.1741 59.4696 67.3494 61.4374L68.8795 61.6847C72.4169 62.2564 74.1856 62.5422 75.8011 62.2742C77.7539 61.9502 79.5666 61.0539 81.0096 59.6989C82.2035 58.5779 83.0615 56.9778 84.7774 53.7775Z" fill="#C8CFFC"/>
              <path d="M84.7774 53.7775C91.3204 41.5751 94.5919 35.4739 98.0802 34.1447C101.423 32.8708 105.192 33.48 107.964 35.7421C110.856 38.1025 112.039 44.9236 114.405 58.5659C115.025 62.1438 115.336 63.9327 116.116 65.3728C117.058 67.1133 118.496 68.535 120.248 69.4576C121.697 70.221 123.465 70.5068 127.003 71.0785L128.533 71.3258C140.708 73.2936 146.796 74.2775 149.046 76.439C152.37 79.6314 153.082 84.6821 150.77 88.6688C149.204 91.3682 143.626 93.9961 132.468 99.252C129.338 100.727 127.772 101.464 126.629 102.53C124.949 104.095 123.86 106.192 123.543 108.466C123.327 110.014 123.626 111.733 124.222 115.17C126.352 127.455 127.418 133.597 125.969 136.524C124.073 140.354 119.954 142.556 115.716 142.004C112.478 141.583 108.004 137.325 99.0565 128.809L97.2231 127.064C94.4168 124.393 93.0136 123.057 91.3756 122.35C89.8539 121.693 88.1928 121.424 86.5416 121.569C84.7642 121.724 83.0118 122.549 79.5069 124.2L77.2172 125.279C66.0424 130.543 60.455 133.175 57.2486 132.555C53.0533 131.743 49.8373 128.356 49.2447 124.124C48.7917 120.889 51.7376 115.396 57.6293 104.408C59.2781 101.333 60.1025 99.7953 60.3856 98.2585C60.8016 96.0001 60.4276 93.6674 59.3266 91.6522C58.5773 90.2808 57.3239 89.0879 54.8172 86.7021C45.8836 78.1991 41.4168 73.9476 40.7811 70.8924C39.8424 66.3803 42.1089 61.8109 46.2694 59.8282C49.0864 58.4857 55.1741 59.4696 67.3494 61.4374L68.8795 61.6847C72.4169 62.2564 74.1856 62.5422 75.8011 62.2742C77.7539 61.9502 79.5666 61.0539 81.0096 59.6989C82.2035 58.5779 83.0615 56.9778 84.7774 53.7775Z" fill="none" stroke="url(#gls-ps)" strokeWidth="2" style={{ animation: 'glisten 4.5s ease-in-out 0.5s infinite' }}/>
            </svg>
            </div>
          </div>
          </div>
          {/* 7. Red circle — below orange square */}
          <div data-parallax="0.32" style={{ position: 'absolute', top: '44%', right: '2%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape hero-shape-red-circle ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.0s' }}>
            <div data-tilt style={{ display: 'inline-block', transformStyle: 'preserve-3d', pointerEvents: 'all' }}>
            <svg width="120" height="120" viewBox="0 0 120 120" overflow="visible" style={{ animation: 'orbitCW 4s ease-in-out infinite' }}>
              <defs>
                <linearGradient id="gls-rc" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="white" stopOpacity="0.85" />
                  <stop offset="55%" stopColor="white" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="59" fill="#ef4444"/>
              <circle cx="60" cy="60" r="59" fill="none" stroke="url(#gls-rc)" strokeWidth="2" style={{ animation: 'glisten 5s ease-in-out 0.3s infinite' }}/>
            </svg>
            </div>
          </div>
          </div>
          {/* ── SMALL DECORATIVE SHAPES ── */}
          {/* 8. Blue right-pointing triangle — top left */}
          <div data-parallax="0.15" style={{ position: 'absolute', top: '0%', left: '2%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '0.8s' }}>
            <svg width="123" height="123" viewBox="0 0 100 100" overflow="visible" style={{ animation: 'orbitCCW 5s ease-in-out infinite' }}><path d="M 0 8.13 Q 0 0 7.27 3.64 L 92.73 46.36 Q 100 50 92.73 53.64 L 7.27 96.36 Q 0 100 0 91.87 Z" fill="#677AF4"/></svg>
          </div>
          </div>
          {/* 9. Small green dash — top left, rotated -20° */}
          <div data-parallax="0.20" style={{ position: 'absolute', top: '7%', left: '11%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '0.9s' }}>
            <div style={{ animation: 'orbitSm 3.8s ease-in-out 0.4s infinite' }}>
              <svg width="30" height="8" viewBox="0 0 30 8" style={{ transform: 'rotate(-20deg)', display: 'block' }}><rect x="0" y="0" width="30" height="8" rx="6" fill="#22c55e"/></svg>
            </div>
          </div>
          </div>
          {/* 10. Lavender downward triangle */}
          <div data-parallax="0.12" style={{ position: 'absolute', top: '7%', left: '15%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.0s' }}>
            <div style={{ transform: 'rotate(98.2deg)', animation: 'orbitCW 4.2s ease-in-out 0.7s infinite' }}>
              <svg width="51" height="51" viewBox="0 0 100 100" overflow="visible">
                <path d="M 11.77 0 L 88.24 0 Q 100 0 94.74 10.52 L 55.26 89.48 Q 50 100 44.74 89.48 L 5.26 10.52 Q 0 0 11.77 0 Z" fill="#C8CFFC"/>
              </svg>
            </div>
          </div>
          </div>
          {/* 11. Small red dash — left mid, rotated 15° */}
          <div data-parallax="0.18" style={{ position: 'absolute', top: '62%', left: '5%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.1s' }}>
            <div style={{ animation: 'orbitSm 3.5s ease-in-out 0.2s infinite' }}>
              <svg width="30" height="8" viewBox="0 0 30 8" style={{ transform: 'rotate(15deg)', display: 'block' }}><rect x="0" y="0" width="30" height="8" rx="6" fill="#F87171"/></svg>
            </div>
          </div>
          </div>
          {/* 12. Small light blue circle — left mid */}
          <div data-parallax="0.10" style={{ position: 'absolute', top: '43%', left: '21%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.2s' }}>
            <svg width="57" height="57" viewBox="0 0 57 57" style={{ animation: 'orbitCW 4s ease-in-out 0.9s infinite' }}><circle cx="28.5" cy="28.5" r="27.5" fill="#94CFF9"/></svg>
          </div>
          </div>
          {/* 22. Green rounded triangle — left mid-lower */}
          <div data-parallax="0.13" style={{ position: 'absolute', top: '62%', left: '19%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.05s' }}>
            <svg width="42" height="42" viewBox="0 0 100 100" overflow="visible" style={{ animation: 'orbitCW 4.6s ease-in-out 0.8s infinite' }}>
              <path d="M 0 9.52 Q 0 0 8.52 4.26 L 91.48 45.74 Q 100 50 91.48 54.26 L 8.52 95.74 Q 0 100 0 90.48 Z" fill="#A5DBA5"/>
            </svg>
          </div>
          </div>
          {/* 13. Small light green upward triangle — left lower */}
          <div data-parallax="0.14" style={{ position: 'absolute', top: '72%', left: '23%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.3s' }}>
            <svg width="15" height="13" viewBox="0 0 100 87" style={{ animation: 'orbitCCW 4.8s ease-in-out 1.3s infinite' }}><path d="M 50 0 L 100 87 L 0 87 Z" fill="#86EFAC"/></svg>
          </div>
          </div>
          {/* 14. Small light purple 4-star — left lower */}
          <div data-parallax="0.16" style={{ position: 'absolute', top: '71%', left: '12%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.4s' }}>
            <svg width="18" height="18" viewBox="0 0 100 100" style={{ animation: 'orbitSm 5s ease-in-out 0.6s infinite' }}><path d="M 49.34 1.89 Q 50 0 50.66 1.89 L 62.34 35.11 Q 63 37 64.89 37.66 L 98.11 49.34 Q 100 50 98.11 50.66 L 64.89 62.34 Q 63 63 62.34 64.89 L 50.66 98.11 Q 50 100 49.34 98.11 L 37.66 64.89 Q 37 63 35.11 62.34 L 1.89 50.66 Q 0 50 1.89 49.34 L 35.11 37.66 Q 37 37 37.66 35.11 Z" fill="#D8B4FE"/></svg>
          </div>
          </div>
          {/* 15. Small peach rounded square — above blue circle, to the right */}
          <div data-parallax="0.20" style={{ position: 'absolute', top: '16%', left: '22%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '0.9s' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ animation: 'orbitCW 3.6s ease-in-out 1.5s infinite' }}><rect x="0" y="0" width="18" height="18" rx="4" fill="#FED7AA"/></svg>
          </div>
          </div>
          {/* 24. Light blue 4-corner star — left side */}
          <div data-parallax="0.14" style={{ position: 'absolute', top: '34%', left: '2.5%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.1s' }}>
            <div style={{ transform: 'rotate(77.07deg)', animation: 'orbitSm 4.8s ease-in-out 0.9s infinite' }}>
              <svg width="37" height="35" viewBox="0 0 100 100" overflow="visible">
                <path d="M 54.02 13.83 L 62.04 35.41 Q 62.73 37.27 64.59 37.96 L 86.17 45.98 Q 97 50 86.17 54.02 L 64.59 62.04 Q 62.73 62.73 62.04 64.59 L 54.02 86.17 Q 50 97 45.98 86.17 L 37.96 64.59 Q 37.27 62.73 35.40 62.04 L 13.83 54.02 Q 3 50 13.83 45.98 L 35.41 37.96 Q 37.27 37.27 37.96 35.41 L 45.98 13.83 Q 50 3 54.02 13.83 Z" fill="#B0EBF8"/>
              </svg>
            </div>
          </div>
          </div>
          {/* 23. Light blue ellipse — center right */}
          <div data-parallax="0.14" style={{ position: 'absolute', top: '65%', left: '77%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.1s' }}>
            <svg width="40" height="40" viewBox="0 0 40 40" style={{ animation: 'orbitSm 4.8s ease-in-out 0.9s infinite' }}>
              <circle cx="20" cy="20" r="19" fill="#DD9FE6"/>
            </svg>
          </div>
          </div>
          {/* 16. Small teal dash — top right, rotated -25° */}
          <div data-parallax="0.13" style={{ position: 'absolute', top: '4%', right: '23%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.0s' }}>
            <div style={{ animation: 'orbitCCW 4.3s ease-in-out 0.3s infinite' }}>
              <svg width="30" height="8" viewBox="0 0 30 8" style={{ transform: 'rotate(-25deg)', display: 'block' }}><rect x="0" y="0" width="30" height="8" rx="6" fill="#2DA3F8"/></svg>
            </div>
          </div>
          </div>
          {/* 17. Small blue dash — between red square and purple star */}
          <div data-parallax="0.17" style={{ position: 'absolute', top: '35%', right: '19%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.15s' }}>
            <div style={{ animation: 'orbitSm 3.9s ease-in-out 0.8s infinite' }}>
              <svg width="30" height="8" viewBox="0 0 30 8" style={{ transform: 'rotate(10deg)', display: 'block' }}><rect x="0" y="0" width="30" height="8" rx="6" fill="#93C5FD"/></svg>
            </div>
          </div>
          </div>
          {/* 18. Small green triangle — upper-left area of red circle */}
          <div data-parallax="0.11" style={{ position: 'absolute', top: '44%', right: '10%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.25s' }}>
            <svg width="14" height="12" viewBox="0 0 100 87" style={{ animation: 'orbitCW 4.1s ease-in-out 1.0s infinite' }}><path d="M 50 0 L 100 87 L 0 87 Z" fill="#4FBC4F"/></svg>
          </div>
          </div>
          {/* 21. Salmon confetti — below purple star */}
          <div data-parallax="0.14" style={{ position: 'absolute', top: '85%', right: '8%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.1s' }}>
            <div style={{ animation: 'orbitSm 4.2s ease-in-out 0.7s infinite' }}>
              <svg width="30" height="8" viewBox="0 0 30 8" style={{ transform: 'rotate(-15deg)', display: 'block' }}><rect x="0" y="0" width="30" height="8" rx="6" fill="#F87171"/></svg>
            </div>
          </div>
          </div>
          {/* 20. Light blue 4-corner star */}
          <div data-parallax="0.18" style={{ position: 'absolute', top: '62%', right: '9%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.05s' }}>
            <div style={{ animation: 'orbitSm 4.4s ease-in-out 0.5s infinite' }}>
              <svg width="80" height="80" viewBox="0 0 100 100" overflow="visible" style={{ transform: 'rotate(79.87deg)', display: 'block' }}>
                <path d="M 54.02 13.83 L 62.04 35.41 Q 62.73 37.27 64.59 37.96 L 86.17 45.98 Q 97 50 86.17 54.02 L 64.59 62.04 Q 62.73 62.73 62.04 64.59 L 54.02 86.17 Q 50 97 45.98 86.17 L 37.96 64.59 Q 37.27 62.73 35.40 62.04 L 13.83 54.02 Q 3 50 13.83 45.98 L 35.41 37.96 Q 37.27 37.27 37.96 35.41 L 45.98 13.83 Q 50 3 54.02 13.83 Z" fill="#B0EBF8"/>
              </svg>
            </div>
          </div>
          </div>
          {/* 19. Small light blue 4-star — bottom right */}
          <div data-parallax="0.15" style={{ position: 'absolute', bottom: '2%', right: '14%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.35s' }}>
            <svg width="18" height="18" viewBox="0 0 100 100" style={{ animation: 'orbitCCW 4.7s ease-in-out 1.4s infinite' }}><path d="M 49.34 1.89 Q 50 0 50.66 1.89 L 62.34 35.11 Q 63 37 64.89 37.66 L 98.11 49.34 Q 100 50 98.11 50.66 L 64.89 62.34 Q 63 63 62.34 64.89 L 50.66 98.11 Q 50 100 49.34 98.11 L 37.66 64.89 Q 37 63 35.11 62.34 L 1.89 50.66 Q 0 50 1.89 49.34 L 35.11 37.66 Q 37 37 37.66 35.11 Z" fill="#93C5FD"/></svg>
          </div>
          </div>
          {/* 20. Small confetti downward triangle — pastel */}
          <div data-parallax="0.19" style={{ position: 'absolute', top: '36%', right: '12%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.45s' }}>
            <div style={{ transform: 'rotate(134.27deg)' }}>
            <svg width="32" height="32" viewBox="0 0 100 100" style={{ animation: 'orbitCW 3.7s ease-in-out 1.2s infinite' }}><path d="M 54.47 14.68 L 61.8 33.8 L 82.22 34.86 Q 94.7 35.5 84.97 43.34 L 69.0 56.2 L 74.34 75.93 Q 77.6 88.0 67.12 81.17 L 50 70 L 32.88 81.17 Q 22.4 88.0 25.66 75.93 L 31.0 56.2 L 15.04 43.34 Q 5.3 35.5 17.79 34.86 L 38.2 33.8 L 45.53 14.68 Q 50 3 54.47 14.68 Z" fill="#F09393"/></svg>
            </div>
          </div>
          </div>

          {/* ── EXTRA LEFT SHAPES ── */}
          {/* L1. Yellow 4-star — top left */}
          <div data-parallax="0.17" style={{ position: 'absolute', top: '3%', left: '20%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '0.75s' }}>
            <svg width="22" height="22" viewBox="0 0 100 100" style={{ animation: 'orbitSm 4.6s ease-in-out 0.5s infinite' }}><path d="M 49.34 1.89 Q 50 0 50.66 1.89 L 62.34 35.11 Q 63 37 64.89 37.66 L 98.11 49.34 Q 100 50 98.11 50.66 L 64.89 62.34 Q 63 63 62.34 64.89 L 50.66 98.11 Q 50 100 49.34 98.11 L 37.66 64.89 Q 37 63 35.11 62.34 L 1.89 50.66 Q 0 50 1.89 49.34 L 35.11 37.66 Q 37 37 37.66 35.11 Z" fill="#FDE68A"/></svg>
          </div>
          </div>
          {/* L2. Teal circle — mid left */}
          <div data-parallax="0.13" style={{ position: 'absolute', top: '52%', left: '4%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.05s' }}>
            <svg width="44" height="44" viewBox="0 0 44 44" style={{ animation: 'orbitCCW 5.2s ease-in-out 0.7s infinite' }}><circle cx="22" cy="22" r="21" fill="#5EEAD4"/></svg>
          </div>
          </div>
          {/* L3. Pink rounded square — lower left */}
          <div data-parallax="0.16" style={{ position: 'absolute', top: '78%', left: '7%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.2s' }}>
            <div style={{ transform: 'rotate(18deg)', animation: 'orbitCW 4.1s ease-in-out 1.0s infinite' }}>
              <svg width="20" height="20" viewBox="0 0 20 20"><rect x="0" y="0" width="20" height="20" rx="5" fill="#F9A8D4"/></svg>
            </div>
          </div>
          </div>

          {/* ── EXTRA RIGHT SHAPES ── */}
          {/* R1. Lavender rounded square — upper right */}
          <div data-parallax="0.21" style={{ position: 'absolute', top: '30%', right: '5%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '0.8s' }}>
            <div style={{ transform: 'rotate(-14deg)', animation: 'orbitCCW 4.4s ease-in-out 0.6s infinite' }}>
              <svg width="24" height="24" viewBox="0 0 24 24"><rect x="0" y="0" width="24" height="24" rx="6" fill="#C4B5FD"/></svg>
            </div>
          </div>
          </div>
          {/* R2. Green circle — mid right */}
          <div data-parallax="0.15" style={{ position: 'absolute', top: '64%', right: '5%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.1s' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" style={{ animation: 'orbitCW 4.8s ease-in-out 0.9s infinite' }}><circle cx="18" cy="18" r="17" fill="#86EFAC"/></svg>
          </div>
          </div>
          {/* R3. Gold dash — lower right */}
          <div data-parallax="0.12" style={{ position: 'absolute', top: '75%', right: '3%', pointerEvents: 'none', willChange: 'transform' }}>
          <div className={`hero-shape ${introComplete ? 'shape-in' : 'shape-pre'}`} style={{ animationDelay: '1.3s' }}>
            <div style={{ animation: 'orbitSm 3.6s ease-in-out 1.1s infinite' }}>
              <svg width="30" height="8" viewBox="0 0 30 8" style={{ transform: 'rotate(12deg)', display: 'block' }}><rect x="0" y="0" width="30" height="8" rx="6" fill="#FCD34D"/></svg>
            </div>
          </div>
          </div>
        </div>
        {/* Mobile-only shapes */}
        <div className="hero-shapes-mobile" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {/* Top-left: blue triangle */}
          <div className={introComplete ? 'shape-in' : 'shape-pre'} style={{ position: 'absolute', top: '2%', left: '2%', animationDelay: '0.5s' }}>
            <svg width="58" height="58" viewBox="0 0 100 100" overflow="visible" style={{ animation: 'orbitCCW 5s ease-in-out infinite' }}>
              <path d="M 0 8.13 Q 0 0 7.27 3.64 L 92.73 46.36 Q 100 50 92.73 53.64 L 7.27 96.36 Q 0 100 0 91.87 Z" fill="#677AF4"/>
            </svg>
          </div>
          {/* Top-right: orange organic star */}
          <div className={introComplete ? 'shape-in' : 'shape-pre'} style={{ position: 'absolute', top: '1%', right: '2%', animationDelay: '0.7s' }}>
            <svg width="68" height="68" viewBox="0 0 189 181" overflow="visible" style={{ animation: 'orbitCW 7s ease-in-out infinite' }}>
              <path d="M84.7774 53.7775C91.3204 41.5751 94.5919 35.4739 98.0802 34.1447C101.423 32.8708 105.192 33.48 107.964 35.7421C110.856 38.1025 112.039 44.9236 114.405 58.5659C115.025 62.1438 115.336 63.9327 116.116 65.3728C117.058 67.1133 118.496 68.535 120.248 69.4576C121.697 70.221 123.465 70.5068 127.003 71.0785L128.533 71.3258C140.708 73.2936 146.796 74.2775 149.046 76.439C152.37 79.6314 153.082 84.6821 150.77 88.6688C149.204 91.3682 143.626 93.9961 132.468 99.252C129.338 100.727 127.772 101.464 126.629 102.53C124.949 104.095 123.86 106.192 123.543 108.466C123.327 110.014 123.626 111.733 124.222 115.17C126.352 127.455 127.418 133.597 125.969 136.524C124.073 140.354 119.954 142.556 115.716 142.004C112.478 141.583 108.004 137.325 99.0565 128.809L97.2231 127.064C94.4168 124.393 93.0136 123.057 91.3756 122.35C89.8539 121.693 88.1928 121.424 86.5416 121.569C84.7642 121.724 83.0118 122.549 79.5069 124.2L77.2172 125.279C66.0424 130.543 60.455 133.175 57.2486 132.555C53.0533 131.743 49.8373 128.356 49.2447 124.124C48.7917 120.889 51.7376 115.396 57.6293 104.408C59.2781 101.333 60.1025 99.7953 60.3856 98.2585C60.8016 96.0001 60.4276 93.6674 59.3266 91.6522C58.5773 90.2808 57.3239 89.0879 54.8172 86.7021C45.8836 78.1991 41.4168 73.9476 40.7811 70.8924C39.8424 66.3803 42.1089 61.8109 46.2694 59.8282C49.0864 58.4857 55.1741 59.4696 67.3494 61.4374L68.8795 61.6847C72.4169 62.2564 74.1856 62.5422 75.8011 62.2742C77.7539 61.9502 79.5666 61.0539 81.0096 59.6989C82.2035 58.5779 83.0615 56.9778 84.7774 53.7775Z" fill="#f97316"/>
            </svg>
          </div>
          {/* Top-center-left: green dash */}
          <div className={introComplete ? 'shape-in' : 'shape-pre'} style={{ position: 'absolute', top: '8%', left: '16%', animationDelay: '0.9s' }}>
            <div style={{ animation: 'orbitSm 3.8s ease-in-out 0.4s infinite' }}>
              <svg width="32" height="9" viewBox="0 0 30 8" style={{ transform: 'rotate(-20deg)', display: 'block' }}><rect x="0" y="0" width="30" height="8" rx="6" fill="#22c55e"/></svg>
            </div>
          </div>
          {/* Top-right area: teal dash */}
          <div className={introComplete ? 'shape-in' : 'shape-pre'} style={{ position: 'absolute', top: '9%', right: '14%', animationDelay: '1.0s' }}>
            <div style={{ animation: 'orbitCCW 4.3s ease-in-out 0.3s infinite' }}>
              <svg width="32" height="9" viewBox="0 0 30 8" style={{ transform: 'rotate(-25deg)', display: 'block' }}><rect x="0" y="0" width="30" height="8" rx="6" fill="#2DA3F8"/></svg>
            </div>
          </div>
          {/* Top-center: lavender star */}
          <div className={introComplete ? 'shape-in' : 'shape-pre'} style={{ position: 'absolute', top: '2%', left: '43%', animationDelay: '0.6s' }}>
            <div style={{ animation: 'orbitSm 4.4s ease-in-out 0.5s infinite' }}>
              <svg width="30" height="30" viewBox="0 0 100 100" overflow="visible" style={{ transform: 'rotate(20deg)' }}>
                <path d="M 54.02 13.83 L 62.04 35.41 Q 62.73 37.27 64.59 37.96 L 86.17 45.98 Q 97 50 86.17 54.02 L 64.59 62.04 Q 62.73 62.73 62.04 64.59 L 54.02 86.17 Q 50 97 45.98 86.17 L 37.96 64.59 Q 37.27 62.73 35.40 62.04 L 13.83 54.02 Q 3 50 13.83 45.98 L 35.41 37.96 Q 37.27 37.27 37.96 35.41 L 45.98 13.83 Q 50 3 54.02 13.83 Z" fill="#C8CFFC"/>
              </svg>
            </div>
          </div>
          {/* Bottom-left: green triangle */}
          <div className={introComplete ? 'shape-in' : 'shape-pre'} style={{ position: 'absolute', bottom: '4%', left: '3%', animationDelay: '1.1s' }}>
            <svg width="52" height="46" viewBox="0 0 100 87" style={{ animation: 'orbitCW 4.5s ease-in-out 0.8s infinite' }}>
              <path d="M 50 0 L 100 87 L 0 87 Z" fill="#0C840C"/>
            </svg>
          </div>
          {/* Bottom-right: purple organic star */}
          <div className={introComplete ? 'shape-in' : 'shape-pre'} style={{ position: 'absolute', bottom: '3%', right: '3%', animationDelay: '0.85s' }}>
            <svg width="62" height="60" viewBox="0 0 189 181" overflow="visible" style={{ animation: 'orbitCCW 7s ease-in-out infinite' }}>
              <path d="M84.7774 53.7775C91.3204 41.5751 94.5919 35.4739 98.0802 34.1447C101.423 32.8708 105.192 33.48 107.964 35.7421C110.856 38.1025 112.039 44.9236 114.405 58.5659C115.025 62.1438 115.336 63.9327 116.116 65.3728C117.058 67.1133 118.496 68.535 120.248 69.4576C121.697 70.221 123.465 70.5068 127.003 71.0785L128.533 71.3258C140.708 73.2936 146.796 74.2775 149.046 76.439C152.37 79.6314 153.082 84.6821 150.77 88.6688C149.204 91.3682 143.626 93.9961 132.468 99.252C129.338 100.727 127.772 101.464 126.629 102.53C124.949 104.095 123.86 106.192 123.543 108.466C123.327 110.014 123.626 111.733 124.222 115.17C126.352 127.455 127.418 133.597 125.969 136.524C124.073 140.354 119.954 142.556 115.716 142.004C112.478 141.583 108.004 137.325 99.0565 128.809L97.2231 127.064C94.4168 124.393 93.0136 123.057 91.3756 122.35C89.8539 121.693 88.1928 121.424 86.5416 121.569C84.7642 121.724 83.0118 122.549 79.5069 124.2L77.2172 125.279C66.0424 130.543 60.455 133.175 57.2486 132.555C53.0533 131.743 49.8373 128.356 49.2447 124.124C48.7917 120.889 51.7376 115.396 57.6293 104.408C59.2781 101.333 60.1025 99.7953 60.3856 98.2585C60.8016 96.0001 60.4276 93.6674 59.3266 91.6522C58.5773 90.2808 57.3239 89.0879 54.8172 86.7021C45.8836 78.1991 41.4168 73.9476 40.7811 70.8924C39.8424 66.3803 42.1089 61.8109 46.2694 59.8282C49.0864 58.4857 55.1741 59.4696 67.3494 61.4374L68.8795 61.6847C72.4169 62.2564 74.1856 62.5422 75.8011 62.2742C77.7539 61.9502 79.5666 61.0539 81.0096 59.6989C82.2035 58.5779 83.0615 56.9778 84.7774 53.7775Z" fill="#C8CFFC"/>
            </svg>
          </div>
          {/* Bottom-left-center: red circle */}
          <div className={introComplete ? 'shape-in' : 'shape-pre'} style={{ position: 'absolute', bottom: '7%', left: '20%', animationDelay: '1.0s' }}>
            <svg width="42" height="42" viewBox="0 0 120 120" overflow="visible" style={{ animation: 'orbitCW 4s ease-in-out infinite' }}>
              <circle cx="60" cy="60" r="59" fill="#ef4444"/>
            </svg>
          </div>
          {/* Bottom-right-center: blue 4-star */}
          <div className={introComplete ? 'shape-in' : 'shape-pre'} style={{ position: 'absolute', bottom: '9%', right: '16%', animationDelay: '1.2s' }}>
            <div style={{ animation: 'orbitSm 4.4s ease-in-out 0.5s infinite' }}>
              <svg width="34" height="34" viewBox="0 0 100 100" overflow="visible" style={{ transform: 'rotate(45deg)' }}>
                <path d="M 54.02 13.83 L 62.04 35.41 Q 62.73 37.27 64.59 37.96 L 86.17 45.98 Q 97 50 86.17 54.02 L 64.59 62.04 Q 62.73 62.73 62.04 64.59 L 54.02 86.17 Q 50 97 45.98 86.17 L 37.96 64.59 Q 37.27 62.73 35.40 62.04 L 13.83 54.02 Q 3 50 13.83 45.98 L 35.41 37.96 Q 37.27 37.27 37.96 35.41 L 45.98 13.83 Q 50 3 54.02 13.83 Z" fill="#B0EBF8"/>
              </svg>
            </div>
          </div>
          {/* Bottom-center: salmon dash */}
          <div className={introComplete ? 'shape-in' : 'shape-pre'} style={{ position: 'absolute', bottom: '4%', left: '41%', animationDelay: '1.3s' }}>
            <div style={{ animation: 'orbitSm 4.2s ease-in-out 0.7s infinite' }}>
              <svg width="32" height="9" viewBox="0 0 30 8" style={{ transform: 'rotate(-15deg)', display: 'block' }}><rect x="0" y="0" width="30" height="8" rx="6" fill="#F87171"/></svg>
            </div>
          </div>
        </div>

        {/* Hero text */}
        <div className={`flex justify-center ${introComplete ? 'hero-in' : 'hero-pre'}`} style={{ position: 'relative', zIndex: 1, paddingTop: '32px', paddingBottom: '56px' }}>
          <p className="hero-text-p" style={{ fontSize: '20px', lineHeight: '28px', letterSpacing: '-0.03em', fontWeight: '400', color: 'rgb(33, 33, 33)', width: '475px', textAlign: 'center', margin: '0 auto', paddingLeft: '32px', paddingRight: '32px' }}>
            SF-based product designer grounded in visual design and product thinking,{" "}
            with a hands-on approach to coding polished digital experiences.
          </p>
        </div>
      </section>
      {/* Project Cards */}
      <section className="cards-section" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '24px', rowGap: '80px' }}>
        {/* NutritionNest */}
        <div className="group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-squircle-wrap" style={{ position: 'relative' }}>
            <Link href="/nn" className="flex flex-col overflow-hidden cursor-pointer project-card main-card nn-card card-pre"
              style={{ textDecoration: 'none', backgroundColor: '#fbfbfb' }}>
              <div ref={nnImagesWrapRef} className="nn-img-wrap" style={{ willChange: 'transform', overflow: 'visible' }}>
                <div className="card-img-row flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                  <div className="nn-desktop-img" style={{ flex: '0 0 44%', overflow: 'hidden', borderRadius: '12px' }}>
                    <Image src="/Images/NN2.png" alt="NutritionNest" width={2730} height={2764} quality={100} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                  <div className="nn-phone" style={{ position: 'relative', flex: '0 0 23%', marginLeft: '-4px', alignSelf: 'flex-start', aspectRatio: '806 / 1586', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '3.7%', left: '2.5%', right: '2.5%', bottom: '4%', borderRadius: '14% / 7%', overflow: 'hidden', zIndex: 1, backgroundColor: '#fff' }}>
                      <video src="/Images/NN-video.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <Image src="/Images/NN-iphone-frame.png" alt="iPhone frame" fill style={{ objectFit: 'fill', zIndex: 10, pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-between card-label-row" style={{ padding: '8px 0 0' }}>
            <div className="flex items-center gap-2 card-icon-wrap">
              <div className="flex flex-col gap-0">
                <span className="card-title" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.03em', fontWeight: '400', color: '#212121' }}>NutritionNest</span>
                <span className="card-desc" style={{ fontSize: '14px', lineHeight: '20px', color: 'rgba(10,10,10,0.4)', fontWeight: '400' }}>Log nutritional intake and monitor daily calories</span>
              </div>
            </div>
          </div>
        </div>
        {/* Duetti */}
        <div className="group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-squircle-wrap" style={{ position: 'relative' }}>
            <Link href="/duetti" className="flex flex-col overflow-hidden cursor-pointer project-card main-card card-pre"
              style={{ textDecoration: 'none', backgroundColor: '#fbfbfb', paddingTop: '80px', paddingLeft: '48px', paddingRight: '48px' }}>
              <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-end', justifyContent: 'center', gap: '16px' }}>
                <div className="duetti-macbook" style={{ position: 'relative', width: '52%', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', top: '2.2%', left: '1.4%', right: '1.4%', bottom: '24.9%', overflow: 'hidden', zIndex: 1 }}>
                    <video src="/Images/Duetti video.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <Image src="/Images/Apple Pro Display.png" alt="Apple Pro Display" width={1200} height={800} style={{ position: 'relative', width: '100%', height: 'auto', display: 'block', zIndex: 10 }} />
                </div>
                <Image src="/Images/Duetti iphone frame.png" alt="Duetti iPhone" width={400} height={600} className="duetti-iphone" style={{ width: '15%', height: 'auto', objectFit: 'contain', alignSelf: 'flex-end', position: 'relative', zIndex: 20 }} />
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-between card-label-row" style={{ padding: '8px 0 0' }}>
            <div className="flex items-center gap-2 card-icon-wrap">
              <div className="flex flex-col gap-0">
                <span className="card-title" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.03em', fontWeight: '400', color: '#212121' }}>Duetti</span>
                <span className="card-desc" style={{ fontSize: '14px', lineHeight: '20px', color: 'rgba(10,10,10,0.4)', fontWeight: '400' }}>Turning complex music industry data into clear, visual stories.</span>
              </div>
            </div>
          </div>
        </div>
        {/* Lasertaz */}
        <div className="group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-squircle-wrap" style={{ position: 'relative' }}>
            <Link href="/lasertaz" className="flex flex-col overflow-hidden cursor-pointer project-card main-card card-pre"
              style={{ textDecoration: 'none', backgroundColor: '#fbfbfb', paddingTop: '80px', paddingLeft: '48px', paddingRight: '48px' }}>
              <div className="card-img-row flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <Image src="/Images/Lasertaz image.png" alt="Lasertaz" width={1200} height={800} style={{ width: '75%', height: 'auto', display: 'block', objectFit: 'contain', margin: '0 auto' }} />
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-between card-label-row" style={{ padding: '8px 0 0' }}>
            <div className="flex items-center gap-2 card-icon-wrap">
              <div className="flex flex-col gap-0">
                <span className="card-title" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.03em', fontWeight: '400', color: '#212121' }}>Lasertaz</span>
                <span className="card-desc" style={{ fontSize: '14px', lineHeight: '20px', color: 'rgba(10,10,10,0.4)', fontWeight: '400' }}>Help independent landlords manage their rental properties</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bookworm */}
        <div className="group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-squircle-wrap" style={{ position: 'relative' }}>
            <Link href="/bookworm" className="flex flex-col overflow-hidden cursor-pointer project-card main-card card-pre"
              style={{ textDecoration: 'none', backgroundColor: '#fbfbfb', paddingTop: '80px', paddingLeft: '48px', paddingRight: '48px' }}>
              <div className="flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-start', minHeight: '144px', justifyContent: 'center' }}>
                <div className="bw-desktop-img" style={{ flex: '0 0 44%', overflow: 'hidden', borderRadius: '12px' }}>
                  <Image src="/Images/bw_cover1.png" alt="Bookworm" width={678} height={1390} quality={100} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
                <div className="bw-phone" style={{ position: 'relative', flex: '0 0 22%', aspectRatio: '750 / 1420', alignSelf: 'flex-start', marginTop: '0%' }}>
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <div style={{ position: 'absolute', top: '1.6%', left: '9%', right: '9%', bottom: '2%', borderRadius: '10% 10% 6% 6% / 7% 7% 4% 4%', overflow: 'hidden', zIndex: 1 }}>
                      <video src="/Images/Bookworm.mp4" autoPlay loop muted playsInline className="bw-video" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <Image src="/Images/bw_iphone_frame.png" alt="iPhone frame" width={678} height={1390} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-between card-label-row" style={{ padding: '8px 0 0' }}>
            <div className="flex items-center gap-2 card-icon-wrap">
              <div className="flex flex-col gap-0">
                <span className="card-title" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.03em', fontWeight: '400', color: '#212121' }}>Bookworm</span>
                <span className="card-desc" style={{ fontSize: '14px', lineHeight: '20px', color: 'rgba(10,10,10,0.4)', fontWeight: '400' }}>E-Commerce platform for books and related content</span>
              </div>
            </div>
          </div>
        </div>
        {/* Raymond Hair Salon */}
        <div className="group" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-squircle-wrap" style={{ position: 'relative' }}>
            <Link href="/rhs" className="flex flex-col overflow-hidden cursor-pointer project-card main-card card-pre"
              style={{ textDecoration: 'none', backgroundColor: '#fbfbfb', paddingTop: '80px', paddingLeft: '48px', paddingRight: '48px' }}>
              <div className="rhs-img-container flex w-full transition-all duration-500 group-hover:-translate-y-4" style={{ alignItems: 'flex-end', justifyContent: 'center', gap: '0px', height: '400px' }}>

                <Image src="/Images/rhs_image1.png" alt="Raymond Hair Salon" width={3564} height={3620} quality={100} unoptimized className="object-contain rounded-xl rhs-desktop-img" style={{ height: '340px', width: 'auto', alignSelf: 'flex-end', marginBottom: '38px', marginRight: '-4px' }} />
                <div className="rhs-phone" style={{ position: 'relative', height: '310px', aspectRatio: '750 / 1430', alignSelf: 'flex-end', marginBottom: '59px' }}>
                  <div style={{ position: 'absolute', top: '2%', left: '9%', right: '9%', bottom: '2%', borderRadius: '6% / 4%', overflow: 'hidden', zIndex: 1, backgroundColor: '#ffffff' }}>
                    <video src="/Images/rhs_video1.mp4" autoPlay loop muted playsInline className="rhs-video" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <Image src="/Images/rhs_iphone_frame.png" alt="iPhone frame" fill style={{ objectFit: 'contain', zIndex: 10, pointerEvents: 'none' }} />
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-between card-label-row" style={{ padding: '8px 0 0' }}>
            <div className="flex items-center gap-2 card-icon-wrap">
              <div className="flex flex-col gap-0">
                <span className="card-title" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.03em', fontWeight: '400', color: '#212121' }}>Raymond Hair Salon</span>
                <span className="card-desc" style={{ fontSize: '14px', lineHeight: '20px', color: 'rgba(10,10,10,0.4)', fontWeight: '400' }}>Scheduling made effortless with online booking</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Concepts Section */}
      <div className="concepts-section" style={{ marginTop: '80px', paddingBottom: '64px' }}>
        {/* Label block — background only wraps this */}
        <div style={{ backgroundColor: '#f3f4f6', paddingTop: '32px', paddingBottom: '32px', paddingLeft: '64px', paddingRight: '64px', marginLeft: '-64px', marginRight: '-64px', marginBottom: '64px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px' }}>
            <h2 className="concepts-title" style={{ fontSize: '20px', lineHeight: '28px', letterSpacing: '-0.03em', fontWeight: '500', color: '#212121' }}>Concepts</h2>
            <p className="concepts-desc" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.2px', color: 'rgba(10, 10, 10, 0.4)' }}>
              I designed these projects after noticing gaps in existing products.<br />Wanting to see what a better solution could feel like.
            </p>
          </div>
        </div>
        <div className="concepts-inner" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        {/* Stacked cards on the right */}
        <div className="concepts-cards-col" style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
          {/* Kalshi */}
          <div className="group" style={{ display: 'flex', flexDirection: 'column' }}>
            <Link href="/kalshi" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', cursor: 'pointer', width: '34%', margin: '0 auto' }}>
              <Image src="/Images/kalshi_bento.png" alt="Kalshi" width={1200} height={800} className="object-contain" style={{ width: '100%', height: 'auto', display: 'block', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', borderRadius: '8px' }} />
              <div className="flex items-center justify-between card-label-row" style={{ padding: '8px 0 0' }}>
                <div className="flex flex-col gap-0">
                  <span className="card-year-label" style={{ fontSize: '14px', lineHeight: '20px', color: 'rgba(10,10,10,0.4)', fontWeight: '400' }}>2025 | Desktop extension</span>
                  <span className="card-title" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.03em', fontWeight: '400', color: '#212121' }}>Kalshi</span>
                </div>
              </div>
            </Link>
          </div>
          {/* Divider */}
          <hr style={{ width: '34%', margin: '0 auto', border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)' }} />
          {/* Phia */}
          <div className="group" style={{ display: 'flex', flexDirection: 'column' }}>
            <Link href="/phia" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', cursor: 'pointer', width: '34%', margin: '0 auto' }}>
              <Image src="/Images/Phia_cover.png" alt="Phia cover" width={1400} height={800} className="object-contain" style={{ width: '100%', height: 'auto', display: 'block', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', borderRadius: '8px' }} />
              <div className="flex items-center justify-between card-label-row" style={{ padding: '8px 0 0' }}>
                <div className="flex flex-col gap-0">
                  <span className="card-year-label" style={{ fontSize: '14px', lineHeight: '20px', color: 'rgba(10,10,10,0.4)', fontWeight: '400' }}>2025 | Desktop extension</span>
                  <span className="card-title" style={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.03em', fontWeight: '400', color: '#212121' }}>Phia</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </main>

    </>
  )
}
