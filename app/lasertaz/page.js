'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['600'] })

export default function Lasertaz() {
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
    <main className="min-h-screen" style={{ backgroundColor: '#121212', color: '#ffffff' }}>

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
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.1em;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .img-placeholder {
          width: 100%;
          background: #1e1e1e;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          color: #444;
          font-size: 14px;
          font-style: italic;
          text-align: center;
          border: 1px solid #2a2a2a;
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
            backgroundColor: 'rgba(0,0,0,0.8)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '32px',
            backdropFilter: 'blur(12.55px)',
            WebkitBackdropFilter: 'blur(12.55px)',
          }}>
          <Link href="/" style={{ fontSize: '24px', lineHeight: '32px', letterSpacing: '-0.02em', fontWeight: '500', color: 'white', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Joann Zhang
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" style={{ fontSize: '16px', lineHeight: '18px', color: '#9ca3af' }} className="hover:text-white">Work</Link>
            <Link href="/about" style={{ fontSize: '16px', lineHeight: '18px', color: '#9ca3af' }} className="hover:text-white">About</Link>
            <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', lineHeight: '18px', color: '#9ca3af' }} className="hover:text-white">Resume</a>
            <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '16px', lineHeight: '18px', color: '#9ca3af' }} className="hover:text-white" target="_blank" rel="noopener noreferrer">Contact</a>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <div className="page-hero" style={{ paddingTop: '120px', paddingBottom: '40px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden', paddingLeft: '80px', paddingRight: '80px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Image
          src="/Images/Lasertaz image.png"
          alt="Lasertaz app screens"
          width={1200}
          height={700}
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </div>

      {/* Title + Overview + Sidebar */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content-wide overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '80px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h1 style={{ fontSize: '56px', lineHeight: '64px', fontWeight: '600', letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '16px' }}>
                Lasertaz
              </h1>
              <p style={{ fontSize: '20px', lineHeight: '28px', color: 'rgba(255,255,255,0.8)', maxWidth: '520px' }}>
                Help independent landlords manage their rental properties
              </p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Overview</p>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(255,255,255,0.8)' }}>
                Lasertaz is a platform that helps tenants manage rent payments and stay connected with their landlords. With an existing product already in place, the team brought us in to lead the redesign of their app. I joined the design team to help establish a design system that improved visual consistency and workflow for our product designers.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <p className={`section-label ${syne.className}`}>Team</p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>Product Designer</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Project Timeline</p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>November – December 2022</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Role</p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>User Research<br />Prototype<br />Visual Design</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>KPIs</p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>+8% YoY Growth<br />12% conversion rate<br />~6% user retention</p>
            </div>
          </div>
        </div>
      </section>

      {/* My Role */}
      <section style={{ backgroundColor: '#1a1a1a', padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>My Role</p>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
            I helped audit and organize the existing design file and reviewed each frame to understand which repeated components to design, and reorganized each user flow so that the rest of the product designers can focus on redesigning the app.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(255,255,255,0.8)' }}>
            I organized the files from their previous app design to establish a clear and consistent foundation for our design system. This helped streamline collaboration, reduce back-and-forth communication, and ensure the entire team had easy access to reference materials before beginning the redesign process.
          </p>
        </div>
      </section>

      {/* Design Handoff */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Design Handoff</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '24px' }}>
            Building a scalable UI component library
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(255,255,255,0.8)', marginBottom: '48px' }}>
            With a clear foundation in place, I began creating our new UI components for our redesigned app so they're aligned with our updated visual direction. I aligned with my PD Lead to identify our foundational elements like colors, typography, and spacing. From there, I built out key patterns such as buttons, input fields, and modals that were cohesive and scalable across the app.
          </p>

          <div style={{ margin: '0 -120px', marginBottom: '16px' }}>
            <Image src="/Lasertaz/system_overview_image.png" alt="Design system overview" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block', border: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '20px', color: '#6b7280', fontStyle: 'italic', textAlign: 'center', marginBottom: '48px' }}>
            An overview of the design system I helped create, organizing core UI components like buttons, inputs, modals, and icons for consistency and scalability. I collaborated with my PD lead to define component standards, while the custom illustrations on the right were created by our visual designers to align with the app's concept and branding.
          </p>

          <div style={{ margin: '0 -120px', marginBottom: '16px' }}>
            <Image src="/Lasertaz/buttons_image.png" alt="Button components" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '20px', color: '#6b7280', fontStyle: 'italic', textAlign: 'center', marginBottom: '48px' }}>
            A closer look at the button components I defined as part of our design system. I designed different states (default, disabled, focused) and variants to support diverse use cases across the app. This helped us stay consistent early on and align on spacing, styles, and interaction patterns.
          </p>

          <div style={{ margin: '0 -120px', marginBottom: '16px' }}>
            <Image src="/Lasertaz/input_fields_image.png" alt="Input fields" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '20px', color: '#6b7280', fontStyle: 'italic', textAlign: 'center', marginBottom: '48px' }}>
            I laid out different input fields to make sure everything felt intuitive and consistent across the app. We spent time making sure the spacing, text hierarchy, and contrast all worked well together, especially for things like validation and accessibility. It also helped the team stay aligned since we had all the edge cases visualized and documented early on.
          </p>

          <div style={{ margin: '0 -120px', marginBottom: '16px' }}>
            <Image src="/Lasertaz/components_image.png" alt="List-based components" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '20px', color: '#6b7280', fontStyle: 'italic', textAlign: 'center' }}>
            List-based components supported key user flows like selecting payment methods, choosing contacts, and making quick decisions using checkboxes or radio buttons. The goal was to make each action feel simple and intuitive, while still being functional and accessible across different screens.
          </p>
        </div>
      </section>

      {/* Introspective */}
      <section style={{ backgroundColor: '#1a1a1a', padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Introspective</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '24px' }}>
            Learnings
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
            This project was a great experience to apply my design system skills in a real, collaborative environment. By designing out a consistent system early on, we were able to reduce back-and-forth communication and eliminate many of the inconsistencies across the app.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
            The team leaned on this system throughout the redesign process, which helped cut down on design decisions and minimized about 80% cross-team friction and cut down unnecessary iteration loops. The file now serves as the foundation for both current and future design work.
          </p>
          <a href="https://lasertaz.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '17px', fontWeight: '600', color: '#ffffff', textDecoration: 'none' }} className="hover:underline">
            See it live at lasertaz.com ↗
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 40px' }}>
        <div style={{ maxWidth: '1920px', margin: '0 auto' }}>
          <p style={{ fontSize: '16px', fontWeight: '500', color: '#ffffff', marginBottom: '8px' }}>Get in touch!</p>
          <div className="flex gap-4" style={{ marginBottom: '8px' }}>
            <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '16px', color: '#9ca3af' }} className="hover:text-white">Email ↗</a>
            <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#9ca3af' }} className="hover:text-white">Resume ↗</a>
          </div>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>© Joann Zhang</p>
        </div>
      </footer>

    </main>
  )
}
