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

  // Scroll hide behavior — direct DOM manipulation, no re-render
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (navRef.current) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
          navRef.current.classList.add('hidden')
        } else {
          navRef.current.classList.remove('hidden')
        }
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on outside click
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

  return (
    <>
      <style>{`
        .nav-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          padding: 36px 80px 16px;
          transition: opacity 0.5s cubic-bezier(0.34, 1.3, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.3, 0.64, 1);
        }
        .nav-wrapper.hidden {
          opacity: 0;
          transform: translateY(-28px);
          pointer-events: none;
        }
        @media (max-width: 767px) {
          .nav-wrapper { padding: 12px 16px 0 !important; }
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 768px) {
          .nav-hamburger { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>

      <div ref={(el) => { navRef.current = el; menuRef.current = el; }} className="nav-wrapper">
        {/* Pill */}
        <nav
          className="flex items-center justify-between px-6 py-3 w-full"
          style={{
            backgroundColor: '#FCFCFC',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: menuOpen ? '20px 20px 0 0' : '32px',
            transition: 'border-radius 0.2s',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            style={{
              fontSize: '20px',
              lineHeight: '28px',
              letterSpacing: '-0.02em',
              fontWeight: '500',
              color: 'black',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            Joann Zhang
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop-links flex items-center gap-6">
            <Link
              href="/"
              style={{ fontSize: '16px', lineHeight: '18px', color: isActive('/') ? 'black' : '#6b7280', textDecoration: 'none' }}
              className="hover:text-black"
            >
              Work
            </Link>
            <Link
              href="/about"
              style={{ fontSize: '16px', lineHeight: '18px', color: isActive('/about') ? 'black' : '#6b7280', textDecoration: 'none' }}
              className="hover:text-black"
            >
              About
            </Link>
            <a
              href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '16px', lineHeight: '18px', color: '#6b7280', textDecoration: 'none' }}
              className="hover:text-black"
            >
              Resume
            </a>
            <a
              href="mailto:joannzhang4@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '16px', lineHeight: '18px', color: '#6b7280', textDecoration: 'none' }}
              className="hover:text-black"
            >
              Contact
            </a>
          </div>

          {/* Hamburger / Close button */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile dropdown — always mounted, animated via max-height */}
        <div
          className="nav-mobile-menu"
          style={{
            overflow: 'hidden',
            maxHeight: menuOpen ? '600px' : '0px',
            opacity: menuOpen ? 1 : 0,
            transition: menuOpen
              ? 'max-height 0.35s ease, opacity 0.25s ease'
              : 'max-height 0.25s ease, opacity 0.15s ease',
            backgroundColor: '#FCFCFC',
            borderRadius: '0 0 20px 20px',
          }}
        >
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {/* Work with chevron */}
            <button
              onClick={() => setWorkOpen((v) => !v)}
              style={{
                background: 'none',
                border: 'none',
                padding: '10px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                fontSize: '16px',
                color: isActive('/') ? 'black' : '#374151',
                fontFamily: 'inherit',
              }}
            >
              Work
              <svg
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="#374151" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: workOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', flexShrink: 0 }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Work subtabs — animated */}
            <div style={{
              overflow: 'hidden',
              maxHeight: workOpen ? '400px' : '0px',
              opacity: workOpen ? 1 : 0,
              transition: workOpen
                ? 'max-height 0.3s ease, opacity 0.2s ease'
                : 'max-height 0.2s ease, opacity 0.1s ease',
              paddingLeft: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}>
              {projects.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  onClick={closeMenu}
                  style={{ fontSize: '14px', color: isActive(p.href) ? 'black' : '#6b7280', textDecoration: 'none', padding: '8px 8px', display: 'block' }}
                >
                  {p.label}
                </Link>
              ))}
            </div>

            <Link href="/about" onClick={closeMenu}
              style={{ fontSize: '16px', color: isActive('/about') ? 'black' : '#374151', textDecoration: 'none', padding: '10px 8px', display: 'block' }}>
              About
            </Link>

            <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing"
              target="_blank" rel="noopener noreferrer" onClick={closeMenu}
              style={{ fontSize: '16px', color: '#374151', textDecoration: 'none', padding: '10px 8px', display: 'block' }}>
              Resume
            </a>

            <a href="mailto:joannzhang4@gmail.com"
              target="_blank" rel="noopener noreferrer" onClick={closeMenu}
              style={{ fontSize: '16px', color: '#374151', textDecoration: 'none', padding: '10px 8px', display: 'block' }}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
