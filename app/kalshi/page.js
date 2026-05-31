'use client'

import Image from 'next/image'
import { Syne } from 'next/font/google'


const syne = Syne({ subsets: ['latin'], weight: ['600'] })

export default function Kalshi() {
  return (
    <main className="min-h-screen" style={{ color: '#212121', backgroundColor: '#fbfbfb' }}>

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
          letter-spacing: 0.12em;
          font-weight: 600;
          color: rgba(10, 10, 10, 0.6);
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
        p { font-size: 14px !important; line-height: 20px !important; }
        .content p:not(.section-label) { color: rgba(10, 10, 10, 0.4) !important; }
        a { font-size: 14px !important; line-height: 20px !important; color: rgba(10, 10, 10, 0.4) !important; transition: opacity 0.15s ease !important; }
        a:hover { color: rgb(33, 33, 33) !important; }
        h1 { font-size: 24px !important; line-height: 32px !important; margin-top: 0 !important; }
        h2, h3 { font-size: 20px !important; line-height: 28px !important; margin-top: 0 !important; font-weight: 500 !important; }
        .section-label { font-size: 10px !important; line-height: 12px !important; letter-spacing: 0.12em !important; margin-bottom: 4px !important; color: rgba(10, 10, 10, 0.6) !important; font-weight: 600 !important; }
        .img-caption { font-size: 14px !important; line-height: 20px !important; max-width: 500px !important; margin-left: auto !important; margin-right: auto !important; }
        img { border-radius: 8px !important; }
        @media (max-width: 767px) {
          .min-h-screen { overflow-x: hidden !important; } .min-h-screen section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 48px !important; padding-bottom: 48px !important; }
          footer { padding: 32px 20px !important; }
          .page-hero { padding-top: 64px !important; padding-left: 20px !important; padding-right: 20px !important; padding-bottom: 40px !important; }
          .cover-hero { padding-top: 64px !important; padding-left: 20px !important; padding-right: 20px !important; }
          h1 { font-size: 16px !important; line-height: 24px !important; font-weight: 500 !important; margin-bottom: 4px !important; }
          h2, h3 { font-size: 14px !important; line-height: 20px !important; margin-bottom: 4px !important; }
          p { font-size: 12px !important; line-height: 18px !important; }
          a { font-size: 12px !important; line-height: 18px !important; }
          .section-label { font-size: 10px !important; line-height: 12px !important; margin-bottom: 4px !important; }
          .img-caption { font-size: 10px !important; line-height: 12px !important; margin-top: 6px !important; padding-left: 0 !important; padding-right: 0 !important; }
          img { border-radius: 4px !important; }
        }
      `}</style>

      {/* Bento overview image */}
      <section className="cover-hero" style={{ paddingTop: '80px', paddingBottom: '40px', paddingLeft: '80px', paddingRight: '80px', backgroundImage: 'url(/Kalshi/background_image.png)', backgroundSize: 'cover', backgroundPosition: 'center', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <div className="content-wide" style={{ maxWidth: '1380px' }}>
          <Image
            src="/Images/kalshi_bento.png"
            alt="Kalshi browser extension overview"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </section>

      {/* Hero */}
      <section className="page-hero" style={{ paddingTop: '64px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '80px', backgroundColor: '#f8fafc' }}>
        <div className="content-wide" style={{ maxWidth: '1380px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '24px', lineHeight: '32px', fontWeight: '500', letterSpacing: '-0.02em', color: '#212121', marginBottom: '0' }}>
            Kalshi Browser Extension
          </h1>
          <p style={{ fontSize: '14px', lineHeight: '20px', color: 'rgba(10, 10, 10, 0.4)', maxWidth: '600px', marginBottom: '0' }}>
            I explored how Kalshi could live directly in everyday browsing, letting users check market odds and place trades without leaving the page they&apos;re on.
          </p>
          </div>
          <div className="flex flex-col gap-3" style={{ marginTop: '40px' }}>
            <a href="https://www.figma.com/proto/yL0s8tLcm2VuJn238XlJXw/Kalshi-Design?node-id=106-1982&t=CBHfNuU3QerPsGQt-0&scaling=scale-down&content-scaling=fixed&page-id=2%3A2&starting-point-node-id=106%3A1982" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: '600', color: 'rgba(10, 10, 10, 0.4)', textDecoration: 'none', display: 'inline-block', width: 'fit-content', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#212121'} onMouseLeave={e => e.currentTarget.style.color='rgba(10,10,10,0.4)'}>
              View Figma Prototype ↗
            </a>
            <a href="https://www.figma.com/design/yL0s8tLcm2VuJn238XlJXw/Kalshi-Design?node-id=106-1982&t=IJKBuGVOfeqFv0v1-0" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: '600', color: 'rgba(10, 10, 10, 0.4)', textDecoration: 'none', display: 'inline-block', width: 'fit-content', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#212121'} onMouseLeave={e => e.currentTarget.style.color='rgba(10,10,10,0.4)'}>
              View Design File ↗
            </a>
            <a href="https://github.com/Joazhan/kalshi-extension" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: '600', color: 'rgba(10, 10, 10, 0.4)', textDecoration: 'none', display: 'inline-block', width: 'fit-content', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#212121'} onMouseLeave={e => e.currentTarget.style.color='rgba(10,10,10,0.4)'}>
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
            <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center', maxWidth: '550px', margin: '0 auto' }}>
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
            <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center', maxWidth: '550px', margin: '0 auto' }}>
              This extension brings Kalshi into everyday browsing, letting users check odds and place trades right where their interest starts.
            </p>
          </div>
        </div>
      </section>



    </main>
  )
}
