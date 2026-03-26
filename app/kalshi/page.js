'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['600'] })

export default function Kalshi() {
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
    <main className="min-h-screen bg-white" style={{ color: '#212121' }}>

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
        .content-wide {
          max-width: 960px;
          margin: 0 auto;
        }
        .content {
          max-width: 720px;
          margin: 0 auto;
        }
        .section-label {
          font-size: 11px;
          letter-spacing: 0.1em;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .img-placeholder {
          width: 100%;
          background: #f3f4f6;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          color: #9ca3af;
          font-size: 14px;
          font-style: italic;
          text-align: center;
          border: 1px solid #e5e7eb;
        }
      `}</style>

      {/* Navbar */}
      <div className={`nav-wrapper${navVisible ? '' : ' hidden'}`}>
        <nav className="flex items-center justify-between px-6 py-3 w-full"
          style={{
            backgroundColor: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '32px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}>
          <Link href="/" style={{ fontSize: '24px', lineHeight: '32px', letterSpacing: '-0.02em', fontWeight: '500', color: '#212121', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Joann Zhang
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" style={{ fontSize: '14px', lineHeight: '18px', color: '#6b7280' }} className="hover:text-black">Work</Link>
            <Link href="/about" style={{ fontSize: '14px', lineHeight: '18px', color: '#6b7280' }} className="hover:text-black">About</Link>
            <a href="#" style={{ fontSize: '14px', lineHeight: '18px', color: '#6b7280' }} className="hover:text-black">Resume</a>
            <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '14px', lineHeight: '18px', color: '#6b7280' }} className="hover:text-black" target="_blank" rel="noopener noreferrer">Contact</a>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '80px', backgroundColor: '#f8fafc' }}>
        <div className="content-wide">
          <p className={`section-label ${syne.className}`} style={{ marginBottom: '16px' }}>Concept</p>
          <h1 style={{ fontSize: '56px', lineHeight: '64px', fontWeight: '600', letterSpacing: '-0.02em', color: '#212121', marginBottom: '16px' }}>
            Kalshi Browser Extension
          </h1>
          <p style={{ fontSize: '20px', lineHeight: '32px', color: '#6b7280', maxWidth: '600px', marginBottom: '40px' }}>
            I explored how Kalshi could live directly in everyday browsing, letting users check market odds and place trades without leaving the page they&apos;re on.
          </p>
          <div className="flex gap-6">
            <a href="#" style={{ fontSize: '15px', fontWeight: '600', color: '#212121', textDecoration: 'none', borderBottom: '1px solid #212121', paddingBottom: '2px' }} className="hover:opacity-60">
              Figma Prototype ↗
            </a>
            <a href="#" style={{ fontSize: '15px', fontWeight: '600', color: '#212121', textDecoration: 'none', borderBottom: '1px solid #212121', paddingBottom: '2px' }} className="hover:opacity-60">
              Design File ↗
            </a>
            <a href="#" style={{ fontSize: '15px', fontWeight: '600', color: '#212121', textDecoration: 'none', borderBottom: '1px solid #212121', paddingBottom: '2px' }} className="hover:opacity-60">
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* Bento overview image */}
      <section style={{ padding: '0px 80px 80px', backgroundColor: '#f8fafc' }}>
        <div className="content-wide">
          <Image
            src="/Images/kalshi_bento.png"
            alt="Kalshi browser extension overview"
            width={1200}
            height={800}
            style={{ width: '100%', height: 'auto', borderRadius: '20px' }}
          />
        </div>
      </section>

      {/* Overview */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content-wide" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '80px', alignItems: 'start' }}>
          <div>
            <p className={`section-label ${syne.className}`}>Overview</p>
            <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
              Bringing prediction markets to your browser
            </h2>
            <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262' }}>
              Kalshi is a regulated prediction market platform where users can trade on real-world outcomes. While the web app works well for focused sessions, I noticed an opportunity to meet users where they already are — reading news, watching sports, or checking market data.
            </p>
            <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262', marginTop: '16px' }}>
              This concept explores a lightweight Chrome extension that surfaces relevant Kalshi markets contextually, lets users check odds at a glance, and place trades quickly — all without leaving their current tab.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingTop: '40px' }}>
            <div>
              <p className={`section-label ${syne.className}`}>Type</p>
              <p style={{ fontSize: '15px', color: '#626262', lineHeight: '1.8' }}>Concept Project</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Year</p>
              <p style={{ fontSize: '15px', color: '#626262' }}>2025</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Platform</p>
              <p style={{ fontSize: '15px', color: '#626262' }}>Chrome Extension</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Role</p>
              <p style={{ fontSize: '15px', color: '#626262', lineHeight: '1.8' }}>Product Design<br />Prototyping<br />Front-end Development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Extension Landing Screen */}
      <section style={{ backgroundColor: '#f9fafb', padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Desktop Extension</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Landing screen
          </h2>
          <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262', marginBottom: '48px' }}>
            The extension landing screen gives users a clean entry point into their markets. It surfaces trending events, portfolio balance, and quick-access positions — all within a compact 400px panel designed to feel native to the browser chrome.
          </p>

          <div className="img-placeholder" style={{ minHeight: '360px', marginBottom: '16px' }}>
            [ Image: Desktop extension landing screen — market overview, trending events, portfolio summary ]
          </div>
          <p style={{ fontSize: '14px', lineHeight: '24px', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center' }}>
            The landing screen surfaces key market data and the user&apos;s portfolio at a glance without requiring a full context switch.
          </p>
        </div>
      </section>

      {/* Extension Pop-up Flow */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Interaction Design</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Extension pop-up — 3-step flow
          </h2>
          <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262', marginBottom: '48px' }}>
            The trading flow is condensed into three focused steps: browse a market, set your position and amount, then confirm. Each step lives in the same panel, keeping the experience fast and low-friction even for first-time traders.
          </p>

          <div className="img-placeholder" style={{ minHeight: '360px', marginBottom: '16px' }}>
            [ Image: 3-step extension pop-up flow — browse market → set position → confirm trade ]
          </div>
          <p style={{ fontSize: '14px', lineHeight: '24px', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center' }}>
            The 3-step flow reduces cognitive load by showing only what&apos;s needed at each stage, with a persistent summary bar before confirmation.
          </p>
        </div>
      </section>

      {/* How I built it */}
      <section style={{ backgroundColor: '#f9fafb', padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Development</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            How I built the extension
          </h2>
          <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262', marginBottom: '24px' }}>
            I built the extension prototype in React using the Chrome Extensions Manifest V3 architecture. The popup is a standard React app bundled with Vite, communicating with background service workers to fetch market data from Kalshi&apos;s public API.
          </p>
          <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262', marginBottom: '48px' }}>
            This hands-on build gave me real insight into the constraints of the extension environment — limited viewport, no persistent state, strict CSP rules — and directly shaped the design decisions around information density and interaction patterns.
          </p>

          <div className="img-placeholder" style={{ minHeight: '320px', marginBottom: '16px' }}>
            [ Image: Extension architecture diagram or code/component structure ]
          </div>
          <p style={{ fontSize: '14px', lineHeight: '24px', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center' }}>
            The extension uses Manifest V3 with a React + Vite popup, service worker for API calls, and content scripts for contextual market surfacing.
          </p>
        </div>
      </section>

      {/* Introspective */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Introspective</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Learnings
          </h2>
          <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262', marginBottom: '24px' }}>
            This project pushed me to think about design from both ends — as a designer crafting the visual system, and as a developer experiencing the constraints firsthand. Building what I designed revealed real edge cases that wouldn&apos;t have surfaced through mockups alone.
          </p>
          <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262', marginBottom: '32px' }}>
            Working within the browser extension format was an interesting constraint. Every pixel matters when your canvas is 400px wide, which forced me to prioritize ruthlessly and lean into progressive disclosure patterns rather than trying to surface everything at once.
          </p>
          <a href="#" target="_blank" rel="noopener noreferrer" style={{ fontSize: '17px', fontWeight: '600', color: '#212121', textDecoration: 'none', borderBottom: '1px solid #212121', paddingBottom: '2px' }} className="hover:opacity-60">
            View prototype ↗
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 40px', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1920px', margin: '0 auto' }}>
          <p style={{ fontSize: '16px', fontWeight: '500', color: '#212121', marginBottom: '8px' }}>Get in touch!</p>
          <div className="flex gap-4" style={{ marginBottom: '24px' }}>
            <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '14px', color: '#6b7280' }} className="hover:text-black">Email ↗</a>
            <a href="#" style={{ fontSize: '14px', color: '#6b7280' }} className="hover:text-black">Resume ↗</a>
          </div>
          <p style={{ fontSize: '13px', color: '#9ca3af' }}>© Joann Zhang</p>
        </div>
      </footer>

    </main>
  )
}
