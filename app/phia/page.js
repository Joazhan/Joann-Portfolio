'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['600'] })

export default function Phia() {
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
        @media (max-width: 767px) {
          .nav-wrapper { padding: 12px 16px 0 !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 48px !important; padding-bottom: 48px !important; }
          footer { padding: 32px 20px !important; }
          .page-hero { padding-top: 88px !important; padding-left: 20px !important; padding-right: 20px !important; padding-bottom: 40px !important; }
          .overview-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .features-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .two-col-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          h1 { font-size: 36px !important; line-height: 44px !important; }
          h2, h3 { font-size: 26px !important; line-height: 34px !important; }
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
            <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', lineHeight: '18px', color: '#6b7280' }} className="hover:text-black">Resume</a>
            <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '14px', lineHeight: '18px', color: '#6b7280' }} className="hover:text-black" target="_blank" rel="noopener noreferrer">Contact</a>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <section className="page-hero" style={{ paddingTop: '120px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '80px', backgroundColor: '#f8fafc' }}>
        <div className="content-wide">
          <p className={`section-label ${syne.className}`} style={{ marginBottom: '16px' }}>Concept · Redesign</p>
          <h1 style={{ fontSize: '56px', lineHeight: '64px', fontWeight: '600', letterSpacing: '-0.02em', color: '#212121', marginBottom: '16px' }}>
            Phia Browser Extension
          </h1>
          <p style={{ fontSize: '20px', lineHeight: '32px', color: '#6b7280', maxWidth: '600px', marginBottom: '40px' }}>
            I redesigned this existing extension after finding it hard to scan prices and alternatives while shopping. The updated layout focuses on clarity, reducing drop-off rates, and higher purchase rates.
          </p>
          <div className="flex gap-6">
            <a href="#" style={{ fontSize: '15px', fontWeight: '600', color: '#212121', textDecoration: 'none', borderBottom: '1px solid #212121', paddingBottom: '2px' }} className="hover:opacity-60">
              View prototype ↗
            </a>
            <a href="#" style={{ fontSize: '15px', fontWeight: '600', color: '#212121', textDecoration: 'none', borderBottom: '1px solid #212121', paddingBottom: '2px' }} className="hover:opacity-60">
              View design file ↗
            </a>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section style={{ padding: '0px 80px 80px', backgroundColor: '#f8fafc' }}>
        <div className="content-wide">
          <Image
            src="/Images/Phia_cover.png"
            alt="Phia browser extension"
            width={1400}
            height={800}
            style={{ width: '100%', height: 'auto', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.06)' }}
          />
        </div>
      </section>

      {/* Overview */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content-wide overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '80px', alignItems: 'start' }}>
          <div>
            <p className={`section-label ${syne.className}`}>Overview</p>
            <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
              Shopping assistance, redesigned for clarity
            </h2>
            <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262' }}>
              Phia is a browser extension designed to help shoppers find better prices and sustainable alternatives while browsing. The original extension had a cluttered layout that made it difficult to quickly scan options and compare products.
            </p>
            <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262', marginTop: '16px' }}>
              This redesign strips back the noise — surfacing the most relevant pricing information upfront, reducing friction in the decision-making process, and making the value proposition immediately clear at the moment a user is ready to purchase.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingTop: '40px' }}>
            <div>
              <p className={`section-label ${syne.className}`}>Type</p>
              <p style={{ fontSize: '15px', color: '#626262', lineHeight: '1.8' }}>Concept · Redesign</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Year</p>
              <p style={{ fontSize: '15px', color: '#626262' }}>2025</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Platform</p>
              <p style={{ fontSize: '15px', color: '#626262' }}>Desktop Extension</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Role</p>
              <p style={{ fontSize: '15px', color: '#626262', lineHeight: '1.8' }}>Product Design<br />Interaction Design</p>
            </div>
          </div>
        </div>
      </section>

      {/* Extension Tab */}
      <section style={{ backgroundColor: '#f9fafb', padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Extension Tab</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            A lower price, front and center
          </h2>
          <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262', marginBottom: '48px' }}>
            &ldquo;Let us provide a lower price&rdquo; shows the lowest and sustainable item, which gives users a sense of value. This creates a small &ldquo;win&rdquo; moment that feels helpful and trustworthy. I would A/B test a few versions of the tag to see which phrasing feels the most natural and motivating.
          </p>

          <div className="img-placeholder" style={{ minHeight: '400px', marginBottom: '16px' }}>
            [ Image: Extension tab — redesigned layout showing lower price suggestion and alternatives ]
          </div>
          <p style={{ fontSize: '14px', lineHeight: '24px', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center' }}>
            The extension tab surfaces the best available price at the exact moment a user is considering a purchase.
          </p>
        </div>
      </section>

      {/* Design decisions */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Design Decisions</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Reducing friction at the point of decision
          </h2>
          <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262', marginBottom: '24px' }}>
            The original Phia extension required too many taps to get to a useful answer. Users who encountered friction at the moment of purchase intent were likely to close the extension and abandon their cart entirely.
          </p>
          <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262', marginBottom: '48px' }}>
            The redesign applies a clear visual hierarchy — leading with the best price comparison, followed by sustainable alternatives, with secondary details de-emphasized. This structure matches the mental model of a shopper who already has intent and just needs a quick confidence boost.
          </p>

          <div className="img-placeholder" style={{ minHeight: '360px', marginBottom: '16px' }}>
            [ Image: Before/after comparison or design decision breakdown ]
          </div>
          <p style={{ fontSize: '14px', lineHeight: '24px', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center' }}>
            Visual hierarchy improvements guide users to the key action in fewer steps.
          </p>
        </div>
      </section>

      {/* Introspective */}
      <section style={{ backgroundColor: '#f9fafb', padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Introspective</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Learnings
          </h2>
          <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262', marginBottom: '24px' }}>
            Redesigning an existing product is a different challenge from building from scratch — I had to understand what the original was trying to do, respect what was working, and make a case for what to change. The constraints of the extension format (limited real estate, passive discovery) shaped every layout decision.
          </p>
          <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262', marginBottom: '32px' }}>
            Testing copy variations would be a key next step. The language around price framing (&ldquo;lower price&rdquo; vs &ldquo;best deal&rdquo; vs &ldquo;save X%&rdquo;) has an outsized effect on conversion, and small wording changes can dramatically shift how trustworthy or pushy the experience feels.
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
          <div className="flex gap-4" style={{ marginBottom: '8px' }}>
            <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '14px', color: '#6b7280' }} className="hover:text-black">Email ↗</a>
            <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#6b7280' }} className="hover:text-black">Resume ↗</a>
          </div>
          <p style={{ fontSize: '13px', color: '#9ca3af' }}>© Joann Zhang</p>
        </div>
      </footer>

    </main>
  )
}
