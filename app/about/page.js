'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['600'] })

export default function About() {
  const photoWrapRef = useRef(null)

  useEffect(() => {
    const container = photoWrapRef.current
    if (!container) return
    const shapes = Array.from(container.querySelectorAll('[data-repel]'))
    const state = shapes.map(() => ({ x: 0, y: 0 }))
    let mouseX = -9999, mouseY = -9999
    let rafId = null

    const tick = () => {
      const rects = shapes.map(s => s.getBoundingClientRect())
      shapes.forEach((shape, i) => {
        const s = state[i]
        const rect = rects[i]
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = mouseX - cx
        const dy = mouseY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const threshold = 260
        let targetX = 0, targetY = 0
        if (dist < threshold && dist > 0) {
          const t = Math.pow((threshold - dist) / threshold, 1.2)
          const push = t * 120
          targetX = -(dx / dist) * push
          targetY = -(dy / dist) * push
        }
        s.x += (targetX - s.x) * 0.05
        s.y += (targetY - s.y) * 0.05
        shape.style.transition = 'none'
        shape.style.transform = `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px)`
      })
      rafId = requestAnimationFrame(tick)
    }

    const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }
    const onLeave = () => { mouseX = -9999; mouseY = -9999 }

    rafId = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <main className="about-main min-h-screen" style={{ paddingLeft: '80px', paddingRight: '80px', backgroundColor: '#fbfbfb' }}>

      <style>{`
        .shape {
          position: absolute;
          pointer-events: none;
          will-change: transform;
        }
        @keyframes aboutOrbitCW {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(3px, -3px); }
          50%  { transform: translate(0px, -6px); }
          75%  { transform: translate(-3px, -3px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes aboutOrbitCCW {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(-3px, -3px); }
          50%  { transform: translate(0px, -6px); }
          75%  { transform: translate(3px, -3px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes aboutOrbitSm {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(2px, -2px); }
          50%  { transform: translate(0px, -4px); }
          75%  { transform: translate(-2px, -2px); }
          100% { transform: translate(0px, 0px); }
        }
        .exp-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 16px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .exp-row:first-of-type {
          border-top: 1px solid #e5e7eb;
        }
        @media (max-width: 767px) {
          .about-main { padding-left: 20px !important; padding-right: 20px !important; overflow-x: hidden !important; }
          .about-main h1 { font-size: 16px !important; line-height: 24px !important; }
          .exp-label { font-size: 10px !important; line-height: 12px !important; }
          .exp-row span, .exp-row strong { font-size: 12px !important; line-height: 14px !important; }
          .about-bio { font-size: 12px !important; line-height: 15px !important; }
          .about-photo-wrap { width: min(280px, 80vw) !important; height: auto !important; aspect-ratio: 320/380 !important; }
          .about-photo-circle { width: min(220px, 65vw) !important; height: min(220px, 65vw) !important; }
          .about-main > div { padding-top: 32px !important; padding-bottom: 60px !important; }
        }
      `}</style>

      {/* Spacer */}
      <div style={{ height: '96px' }} />

      {/* Main content */}
      <div className="flex flex-col items-center" style={{ paddingTop: '60px', paddingBottom: '120px' }}>

        {/* Photo + floating shapes */}
        <div ref={photoWrapRef} className="about-photo-wrap" style={{ position: 'relative', width: '320px', height: '380px', marginBottom: '32px', flexShrink: 0, paddingBottom: '24px' }}>
          {/* Photo circle */}
          <div className="about-photo-circle" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '260px', height: '260px', borderRadius: '50%', overflow: 'hidden' }}>
            <Image
              src="/Images/0ab9379a-605b-4366-9201-5c53c654f369.jpeg"
              alt="Joann Zhang"
              width={260}
              height={260}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%', transform: 'scale(1.2)' }}
            />
          </div>

          {/* Teal circle — top left */}
          <div data-repel style={{ position: 'absolute', top: '55px', left: '28px', willChange: 'transform' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#2dd4bf', animation: 'aboutOrbitCW 5s ease-in-out infinite' }} />
          </div>

          {/* Blue square — upper center-left */}
          <div data-repel style={{ position: 'absolute', top: '15px', left: '118px', willChange: 'transform' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '4px', backgroundColor: '#3b82f6', animation: 'aboutOrbitCCW 7s ease-in-out infinite' }} />
          </div>

          {/* Blue circle — upper center-right */}
          <div data-repel style={{ position: 'absolute', top: '18px', left: '204px', willChange: 'transform' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#3b82f6', animation: 'aboutOrbitSm 6s ease-in-out infinite' }} />
          </div>

          {/* Green right-pointing triangle — top right */}
          <div data-repel style={{ position: 'absolute', top: '53px', left: '262px', willChange: 'transform' }}>
            <svg width="24" height="24" viewBox="0 0 100 100" style={{ animation: 'aboutOrbitCW 8s ease-in-out infinite', display: 'block' }}>
              <path d="M 0 0 L 100 50 L 0 100 Z" fill="#22c55e"/>
            </svg>
          </div>

          {/* Green organic star — center */}
          <div data-repel style={{ position: 'absolute', top: '65px', left: '132px', willChange: 'transform' }}>
            <svg width="24" height="24" viewBox="0 0 189 181" style={{ animation: 'aboutOrbitCCW 9s ease-in-out infinite', display: 'block' }}>
              <path d="M84.7774 53.7775C91.3204 41.5751 94.5919 35.4739 98.0802 34.1447C101.423 32.8708 105.192 33.48 107.964 35.7421C110.856 38.1025 112.039 44.9236 114.405 58.5659C115.025 62.1438 115.336 63.9327 116.116 65.3728C117.058 67.1133 118.496 68.535 120.248 69.4576C121.697 70.221 123.465 70.5068 127.003 71.0785L128.533 71.3258C140.708 73.2936 146.796 74.2775 149.046 76.439C152.37 79.6314 153.082 84.6821 150.77 88.6688C149.204 91.3682 143.626 93.9961 132.468 99.252C129.338 100.727 127.772 101.464 126.629 102.53C124.949 104.095 123.86 106.192 123.543 108.466C123.327 110.014 123.626 111.733 124.222 115.17C126.352 127.455 127.418 133.597 125.969 136.524C124.073 140.354 119.954 142.556 115.716 142.004C112.478 141.583 108.004 137.325 99.0565 128.809L97.2231 127.064C94.4168 124.393 93.0136 123.057 91.3756 122.35C89.8539 121.693 88.1928 121.424 86.5416 121.569C84.7642 121.724 83.0118 122.549 79.5069 124.2L77.2172 125.279C66.0424 130.543 60.455 133.175 57.2486 132.555C53.0533 131.743 49.8373 128.356 49.2447 124.124C48.7917 120.889 51.7376 115.396 57.6293 104.408C59.2781 101.333 60.1025 99.7953 60.3856 98.2585C60.8016 96.0001 60.4276 93.6674 59.3266 91.6522C58.5773 90.2808 57.3239 89.0879 54.8172 86.7021C45.8836 78.1991 41.4168 73.9476 40.7811 70.8924C39.8424 66.3803 42.1089 61.8109 46.2694 59.8282C49.0864 58.4857 55.1741 59.4696 67.3494 61.4374L68.8795 61.6847C72.4169 62.2564 74.1856 62.5422 75.8011 62.2742C77.7539 61.9502 79.5666 61.0539 81.0096 59.6989C82.2035 58.5779 83.0615 56.9778 84.7774 53.7775Z" fill="#22c55e"/>
            </svg>
          </div>

          {/* Purple right-pointing triangle — left of center */}
          <div data-repel style={{ position: 'absolute', top: '80px', left: '76px', willChange: 'transform' }}>
            <svg width="24" height="24" viewBox="0 0 100 100" style={{ animation: 'aboutOrbitSm 6.5s ease-in-out infinite', display: 'block' }}>
              <path d="M 0 0 L 100 50 L 0 100 Z" fill="#818cf8"/>
            </svg>
          </div>

          {/* Red dot — right of center */}
          <div data-repel style={{ position: 'absolute', top: '72px', left: '200px', willChange: 'transform' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ef4444', animation: 'aboutOrbitCW 7.5s ease-in-out infinite' }} />
          </div>

          {/* Pink organic star — right */}
          <div data-repel style={{ position: 'absolute', top: '90px', left: '250px', willChange: 'transform' }}>
            <svg width="24" height="24" viewBox="0 0 189 181" style={{ animation: 'aboutOrbitCCW 5.5s ease-in-out infinite', display: 'block' }}>
              <path d="M84.7774 53.7775C91.3204 41.5751 94.5919 35.4739 98.0802 34.1447C101.423 32.8708 105.192 33.48 107.964 35.7421C110.856 38.1025 112.039 44.9236 114.405 58.5659C115.025 62.1438 115.336 63.9327 116.116 65.3728C117.058 67.1133 118.496 68.535 120.248 69.4576C121.697 70.221 123.465 70.5068 127.003 71.0785L128.533 71.3258C140.708 73.2936 146.796 74.2775 149.046 76.439C152.37 79.6314 153.082 84.6821 150.77 88.6688C149.204 91.3682 143.626 93.9961 132.468 99.252C129.338 100.727 127.772 101.464 126.629 102.53C124.949 104.095 123.86 106.192 123.543 108.466C123.327 110.014 123.626 111.733 124.222 115.17C126.352 127.455 127.418 133.597 125.969 136.524C124.073 140.354 119.954 142.556 115.716 142.004C112.478 141.583 108.004 137.325 99.0565 128.809L97.2231 127.064C94.4168 124.393 93.0136 123.057 91.3756 122.35C89.8539 121.693 88.1928 121.424 86.5416 121.569C84.7642 121.724 83.0118 122.549 79.5069 124.2L77.2172 125.279C66.0424 130.543 60.455 133.175 57.2486 132.555C53.0533 131.743 49.8373 128.356 49.2447 124.124C48.7917 120.889 51.7376 115.396 57.6293 104.408C59.2781 101.333 60.1025 99.7953 60.3856 98.2585C60.8016 96.0001 60.4276 93.6674 59.3266 91.6522C58.5773 90.2808 57.3239 89.0879 54.8172 86.7021C45.8836 78.1991 41.4168 73.9476 40.7811 70.8924C39.8424 66.3803 42.1089 61.8109 46.2694 59.8282C49.0864 58.4857 55.1741 59.4696 67.3494 61.4374L68.8795 61.6847C72.4169 62.2564 74.1856 62.5422 75.8011 62.2742C77.7539 61.9502 79.5666 61.0539 81.0096 59.6989C82.2035 58.5779 83.0615 56.9778 84.7774 53.7775Z" fill="#f472b6"/>
            </svg>
          </div>

          {/* Orange organic star — lower left */}
          <div data-repel style={{ position: 'absolute', top: '110px', left: '16px', willChange: 'transform' }}>
            <svg width="24" height="24" viewBox="0 0 189 181" style={{ animation: 'aboutOrbitCW 6s ease-in-out infinite', display: 'block' }}>
              <path d="M84.7774 53.7775C91.3204 41.5751 94.5919 35.4739 98.0802 34.1447C101.423 32.8708 105.192 33.48 107.964 35.7421C110.856 38.1025 112.039 44.9236 114.405 58.5659C115.025 62.1438 115.336 63.9327 116.116 65.3728C117.058 67.1133 118.496 68.535 120.248 69.4576C121.697 70.221 123.465 70.5068 127.003 71.0785L128.533 71.3258C140.708 73.2936 146.796 74.2775 149.046 76.439C152.37 79.6314 153.082 84.6821 150.77 88.6688C149.204 91.3682 143.626 93.9961 132.468 99.252C129.338 100.727 127.772 101.464 126.629 102.53C124.949 104.095 123.86 106.192 123.543 108.466C123.327 110.014 123.626 111.733 124.222 115.17C126.352 127.455 127.418 133.597 125.969 136.524C124.073 140.354 119.954 142.556 115.716 142.004C112.478 141.583 108.004 137.325 99.0565 128.809L97.2231 127.064C94.4168 124.393 93.0136 123.057 91.3756 122.35C89.8539 121.693 88.1928 121.424 86.5416 121.569C84.7642 121.724 83.0118 122.549 79.5069 124.2L77.2172 125.279C66.0424 130.543 60.455 133.175 57.2486 132.555C53.0533 131.743 49.8373 128.356 49.2447 124.124C48.7917 120.889 51.7376 115.396 57.6293 104.408C59.2781 101.333 60.1025 99.7953 60.3856 98.2585C60.8016 96.0001 60.4276 93.6674 59.3266 91.6522C58.5773 90.2808 57.3239 89.0879 54.8172 86.7021C45.8836 78.1991 41.4168 73.9476 40.7811 70.8924C39.8424 66.3803 42.1089 61.8109 46.2694 59.8282C49.0864 58.4857 55.1741 59.4696 67.3494 61.4374L68.8795 61.6847C72.4169 62.2564 74.1856 62.5422 75.8011 62.2742C77.7539 61.9502 79.5666 61.0539 81.0096 59.6989C82.2035 58.5779 83.0615 56.9778 84.7774 53.7775Z" fill="#f97316"/>
            </svg>
          </div>
        </div>

        {/* Name + Bio */}
        <div style={{ maxWidth: '540px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '48px' }}>
            <h1 style={{ fontSize: '24px', lineHeight: '32px', fontWeight: '600', color: '#111', letterSpacing: '-0.03em', marginBottom: '0' }}>
              Joann Zhang
            </h1>
            <p className="about-bio" style={{ fontSize: '14px', lineHeight: '20px', color: '#6b7280', marginBottom: '0' }}>
              As a self-taught Product Designer. I first fell in love with design my senior year of college, and it's been a steady part of my life ever since. It's something that inspires me, challenges me, and gives me a way to make a real impact. What motivates me most is the chance to create work that feels meaningful and sparks a bit of inspiration in others.
            </p>
            <p className="about-bio" style={{ fontSize: '14px', lineHeight: '20px', color: '#6b7280', marginBottom: '0' }}>
              During my personal time, you'll find me learning to code and playing around with ideas that make AI feel a little more human.
            </p>
          </div>

          {/* Experience */}
          <p className={`exp-label ${syne.className}`} style={{ fontSize: '12px', lineHeight: '14px', letterSpacing: '0.12em', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            Experience
          </p>

          <div className="exp-row">
            <span style={{ fontSize: '14px', lineHeight: '20px', color: '#111' }}><strong style={{ fontSize: '14px', lineHeight: '20px' }}>Iverson</strong> Product Design Intern</span>
            <span style={{ fontSize: '14px', lineHeight: '20px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '24px' }}>Nov 2024–May 2025</span>
          </div>
          <div className="exp-row">
            <span style={{ fontSize: '14px', lineHeight: '20px', color: '#111' }}><strong style={{ fontSize: '14px', lineHeight: '20px' }}>NutritionNest</strong> Product Design Intern</span>
            <span style={{ fontSize: '14px', lineHeight: '20px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '24px' }}>Aug 2024–Oct 2024</span>
          </div>
          <div className="exp-row">
            <span style={{ fontSize: '14px', lineHeight: '20px', color: '#111' }}><strong style={{ fontSize: '14px', lineHeight: '20px' }}>Bookworm</strong> Product Designer</span>
            <span style={{ fontSize: '14px', lineHeight: '20px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '24px' }}>May 2023–Jun 2023</span>
          </div>
          <div className="exp-row">
            <span style={{ fontSize: '14px', lineHeight: '20px', color: '#111' }}><strong style={{ fontSize: '14px', lineHeight: '20px' }}>Raymond Hair Salon</strong> Product Designer</span>
            <span style={{ fontSize: '14px', lineHeight: '20px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '24px' }}>Jan 2023–Feb 2023</span>
          </div>
        </div>
      </div>

    </main>
  )
}
