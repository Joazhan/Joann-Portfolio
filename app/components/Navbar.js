'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const projects = [
  { label: 'NutritionNest', href: '/nn' },
  { label: 'Duetti', href: '/duetti' },
  { label: 'Lasertaz', href: '/lasertaz' },
  { label: 'Bookworm', href: '/bookworm' },
  { label: 'Raymond Hair Salon', href: '/rhs' },
  { label: 'Kalshi', href: '/kalshi' },
  { label: 'Phia', href: '/phia' },
]

export default function Navbar() {
  const pathname = usePathname()
  const navRef = useRef(null)
  const lastScrollY = useRef(0)
  const menuRef = useRef(null)

  const [menuOpen, setMenuOpen] = useState(false)
  const [workOpen, setWorkOpen] = useState(false)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        if (navRef.current) {
          if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
            navRef.current.style.transition = 'opacity 0.25s ease, transform 0.25s ease'
            navRef.current.classList.add('nav-hidden')
          } else {
            navRef.current.style.transition = 'opacity 0.15s ease, transform 0.15s ease'
            navRef.current.classList.remove('nav-hidden')
          }
        }
        lastScrollY.current = currentScrollY
        ticking.current = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
        setWorkOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClick)
    }
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    setWorkOpen(false)
  }

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  const isDark = pathname === '/lasertaz'

  return (
    <>
      <style>{`
        .nav-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          display: flex;
          flex-direction: column;
          padding: 40px 64px 16px;
          transition: opacity 0.15s ease, transform 0.15s ease;
          border-radius: 0;
        }
        .nav-wrapper.nav-hidden {
          opacity: 0;
          transform: translateY(-28px);
          pointer-events: none;
        }
        .nav-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .nav-desktop-links a { transition: color 0.15s ease; }
        .nav-desktop-links a:hover { color: #212121 !important; }
        .nav-dark .nav-desktop-links a:hover { color: #ffffff !important; }
        @media (max-width: 767px) {
          .nav-wrapper {
            padding: 16px 20px !important;
            background: rgba(255, 255, 255, 0.7) !important;
          }
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-dark.nav-wrapper { background: #121212 !important; }
        }
        @media (min-width: 768px) {
          .nav-hamburger { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>

      <div
        ref={(el) => { navRef.current = el; menuRef.current = el; }}
        className={`nav-wrapper${isDark ? ' nav-dark' : ''}${menuOpen ? ' nav-menu-open' : ''}`}
        style={{
          background: isDark ? 'rgba(18,18,18,0.6)' : 'rgba(255,255,255,0.45)',
          borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
          backdropFilter: 'blur(80px)',
          WebkitBackdropFilter: 'blur(80px)',
        }}
      >
        {/* Header row — logo + desktop links + hamburger */}
        <div className="nav-header-row">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '500',
              color: isDark ? '#ffffff' : '#212121',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            Joann Zhang
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ fontSize: '14px', lineHeight: '20px', color: isActive('/') ? (isDark ? '#ffffff' : '#212121') : (isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)'), textDecoration: 'none' }}>
              Work
            </Link>
            <Link href="/about" style={{ fontSize: '14px', lineHeight: '20px', color: isActive('/about') ? (isDark ? '#ffffff' : '#212121') : (isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)'), textDecoration: 'none' }}>
              About
            </Link>
            <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '14px', lineHeight: '20px', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>
              Resume
            </a>
            <a href="mailto:joannzhang4@gmail.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '14px', lineHeight: '20px', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>
              Contact
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center' }}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#fff' : '#374151'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#fff' : '#374151'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown — inside the bar */}
        <div
          className="nav-mobile-menu"
          style={{
            overflow: 'hidden',
            width: '100%',
            maxHeight: menuOpen ? '600px' : '0px',
            opacity: menuOpen ? 1 : 0,
            transition: menuOpen
              ? 'max-height 0.35s ease, opacity 0.25s ease'
              : 'max-height 0.25s ease, opacity 0.15s ease',
          }}
        >
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button onClick={() => setWorkOpen((v) => !v)}
              style={{ background: 'none', border: 'none', padding: '12px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontSize: '16px', color: '#374151', fontFamily: 'inherit' }}>
              Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: workOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div style={{ overflow: 'hidden', maxHeight: workOpen ? '400px' : '0px', opacity: workOpen ? 1 : 0, transition: workOpen ? 'max-height 0.3s ease, opacity 0.2s ease' : 'max-height 0.2s ease, opacity 0.1s ease', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {projects.map((p) => (
                <Link key={p.href} href={p.href} onClick={closeMenu}
                  style={{ fontSize: '12px', lineHeight: '14px', color: isActive(p.href) ? '#212121' : 'rgba(0,0,0,0.4)', textDecoration: 'none', padding: '8px', display: 'block' }}>
                  {p.label}
                </Link>
              ))}
            </div>
            <Link href="/about" onClick={closeMenu} style={{ fontSize: '16px', color: '#374151', textDecoration: 'none', padding: '10px 8px', display: 'block' }}>About</Link>
            <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing" target="_blank" rel="noopener noreferrer" onClick={closeMenu}
              style={{ fontSize: '16px', color: '#374151', textDecoration: 'none', padding: '10px 8px', display: 'block' }}>Resume</a>
            <a href="mailto:joannzhang4@gmail.com" target="_blank" rel="noopener noreferrer" onClick={closeMenu}
              style={{ fontSize: '16px', color: '#374151', textDecoration: 'none', padding: '10px 8px', display: 'block' }}>Contact</a>
          </div>
        </div>
      </div>
    </>
  )
}
