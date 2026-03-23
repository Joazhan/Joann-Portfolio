'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  const [navVisible, setNavVisible] = useState(true)
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
    <main className="min-h-screen bg-white" style={{ paddingLeft: '80px', paddingRight: '80px' }}>

      <style>{`
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
        .shape {
          position: absolute;
          pointer-events: none;
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
            <Link href="/about" style={{ fontSize: '14px', lineHeight: '18px', color: 'black' }}>About</Link>
            <a href="#" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">Resume</a>
            <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black" target="_blank" rel="noopener noreferrer">Contact</a>
          </div>
        </nav>
      </div>

      {/* Spacer */}
      <div style={{ height: '96px' }} />

      {/* Main content */}
      <div className="flex flex-col items-center" style={{ paddingTop: '60px', paddingBottom: '120px' }}>

        {/* Circular photo with shapes overlaid on top portion */}
        <div style={{ position: 'relative', width: '240px', height: '240px', borderRadius: '50%', overflow: 'hidden', marginBottom: '32px' }}>
          <Image
            src="/Images/profile_image.png"
            alt="Joann Zhang"
            width={240}
            height={240}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Name + Bio */}
        <div style={{ maxWidth: '540px', width: '100%' }}>
          <h1 style={{ fontSize: '48px', lineHeight: '56px', fontWeight: '700', color: '#111', letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Joann Zhang
          </h1>
          <p style={{ fontSize: '16px', lineHeight: '26px', color: '#6b7280', marginBottom: '16px' }}>
            As a self-taught Product Designer. I first fell in love with design my senior year of college, and it's been a steady part of my life ever since. It's something that inspires me, challenges me, and gives me a way to make a real impact. What motivates me most is the chance to create work that feels meaningful and sparks a bit of inspiration in others.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '26px', color: '#6b7280', marginBottom: '48px' }}>
            During my personal time, you'll find me learning to code and playing around with ideas that make AI feel a little more human.
          </p>

          {/* Experience */}
          <p style={{ fontSize: '12px', letterSpacing: '0.08em', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0px' }}>
            Experience
          </p>

          <div className="exp-row">
            <span style={{ fontSize: '15px', color: '#111' }}><strong>Iverson</strong> Product Design Intern</span>
            <span style={{ fontSize: '14px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '24px' }}>Nov 2024–May 2025</span>
          </div>
          <div className="exp-row">
            <span style={{ fontSize: '15px', color: '#111' }}><strong>NutritionNest</strong> Product Design Intern</span>
            <span style={{ fontSize: '14px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '24px' }}>Aug 2024–Oct 2024</span>
          </div>
          <div className="exp-row">
            <span style={{ fontSize: '15px', color: '#111' }}><strong>Bookworm</strong> Product Designer</span>
            <span style={{ fontSize: '14px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '24px' }}>May 2023–Jun 2023</span>
          </div>
          <div className="exp-row">
            <span style={{ fontSize: '15px', color: '#111' }}><strong>Raymond Hair Salon</strong> Product Designer</span>
            <span style={{ fontSize: '14px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '24px' }}>Jan 2023–Feb 2023</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '32px', paddingBottom: '40px' }}>
        <p style={{ fontSize: '16px', fontWeight: '500', color: '#111', marginBottom: '8px' }}>Get in touch!</p>
        <div className="flex gap-4" style={{ marginBottom: '24px' }}>
          <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '14px', color: '#6b7280' }} className="hover:text-black">Email ↗</a>
          <a href="#" style={{ fontSize: '14px', color: '#6b7280' }} className="hover:text-black">Resume ↗</a>
        </div>
        <p style={{ fontSize: '13px', color: '#9ca3af' }}>© Joann Zhang</p>
      </div>

    </main>
  )
}
