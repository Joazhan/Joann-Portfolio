'use client'

import Image from 'next/image'
import { Syne } from 'next/font/google'


const syne = Syne({ subsets: ['latin'], weight: ['600'] })

export default function Kalshi() {
  return (
    <main className="min-h-screen bg-white" style={{ color: '#212121' }}>

      <style>{`
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
          section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 48px !important; padding-bottom: 48px !important; }
          footer { padding: 32px 20px !important; }
          .page-hero { padding-top: 88px !important; padding-left: 20px !important; padding-right: 20px !important; padding-bottom: 40px !important; }
          h1 { font-size: 36px !important; line-height: 44px !important; }
          h2, h3 { font-size: 26px !important; line-height: 34px !important; }
          p { font-size: 14px !important; line-height: 18px !important; }
        }
      `}</style>

      {/* Bento overview image */}
      <section style={{ paddingTop: '120px', paddingBottom: '40px', paddingLeft: '80px', paddingRight: '80px', backgroundImage: 'url(/Kalshi/background_image.png)', backgroundSize: 'cover', backgroundPosition: 'center', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <div className="content-wide" style={{ maxWidth: '1380px' }}>
          <Image
            src="/Images/kalshi_bento.png"
            alt="Kalshi browser extension overview"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '20px' }}
          />
        </div>
      </section>

      {/* Hero */}
      <section className="page-hero" style={{ paddingTop: '64px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '80px', backgroundColor: '#f8fafc' }}>
        <div className="content-wide" style={{ maxWidth: '1380px' }}>
          <h1 style={{ fontSize: '56px', lineHeight: '64px', fontWeight: '500', letterSpacing: '-0.02em', color: '#212121', marginBottom: '16px' }}>
            Kalshi Browser Extension
          </h1>
          <p style={{ fontSize: '20px', lineHeight: '32px', color: '#6b7280', maxWidth: '600px', marginBottom: '40px' }}>
            I explored how Kalshi could live directly in everyday browsing, letting users check market odds and place trades without leaving the page they&apos;re on.
          </p>
          <div className="flex flex-col gap-3">
            <a href="https://www.figma.com/proto/yL0s8tLcm2VuJn238XlJXw/Kalshi-Design?node-id=106-1982&t=CBHfNuU3QerPsGQt-0&scaling=scale-down&content-scaling=fixed&page-id=2%3A2&starting-point-node-id=106%3A1982" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: '600', color: '#212121', textDecoration: 'none', display: 'inline-block', width: 'fit-content', opacity: '0.7', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity='1'} onMouseLeave={e => e.currentTarget.style.opacity='0.7'}>
              View Figma Prototype ↗
            </a>
            <a href="https://www.figma.com/design/yL0s8tLcm2VuJn238XlJXw/Kalshi-Design?node-id=106-1982&t=IJKBuGVOfeqFv0v1-0" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: '600', color: '#212121', textDecoration: 'none', display: 'inline-block', width: 'fit-content', opacity: '0.7', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity='1'} onMouseLeave={e => e.currentTarget.style.opacity='0.7'}>
              View Design File ↗
            </a>
            <a href="https://github.com/Joazhan/kalshi-extension" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: '600', color: '#212121', textDecoration: 'none', display: 'inline-block', width: 'fit-content', opacity: '0.7', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity='1'} onMouseLeave={e => e.currentTarget.style.opacity='0.7'}>
              View GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* Desktop Extension Landing Screen */}
      <section style={{ backgroundColor: '#f9fafb', padding: '80px 40px 40px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Image src="/Kalshi/Browser Container 1.png" alt="Kalshi extension landing screen" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', marginBottom: '12px' }} />
          <div style={{ width: '100%' }}>
            <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: '500', fontStyle: 'italic', color: '#333333', textAlign: 'center', marginBottom: '4px' }}>
              Landing screen
            </p>
            <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center' }}>
              This widget surfaces live trade activity, making it easy for anyone to join with zero friction. This expands when users hover to show market details, and with one click, they can open a full panel to explore or join trades instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Extension Pop-up Flow */}
      <section style={{ padding: '80px 40px 40px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Image src="/Kalshi/Browser Container.png" alt="Kalshi extension popup 3-step flow" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', marginBottom: '12px' }} />
          <div style={{ width: '100%' }}>
            <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: '500', fontStyle: 'italic', color: '#333333', textAlign: 'center', marginBottom: '4px' }}>
              Extension pop-up — 3-step flow
            </p>
            <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center' }}>
              This extension brings Kalshi into everyday browsing, letting users check odds and place trades right where their interest starts.
            </p>
          </div>
        </div>
      </section>



    </main>
  )
}
