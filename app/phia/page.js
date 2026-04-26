'use client'

import Image from 'next/image'
import { Syne } from 'next/font/google'


const syne = Syne({ subsets: ['latin'], weight: ['600'] })

export default function Phia() {
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
          color: #9ca3af;
          font-size: 14px;
          font-style: italic;
          text-align: center;
          border: 1px solid #e5e7eb;
        }
        .three-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 767px) {
          section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 48px !important; padding-bottom: 48px !important; }
          footer { padding: 32px 20px !important; }
          .page-hero { padding-top: 88px !important; padding-left: 20px !important; padding-right: 20px !important; padding-bottom: 40px !important; }
          h1 { font-size: 36px !important; line-height: 44px !important; }
          h2, h3 { font-size: 26px !important; line-height: 34px !important; }
          .three-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Cover image */}
      <section style={{ paddingTop: '120px', paddingBottom: '40px', paddingLeft: '80px', paddingRight: '80px', backgroundColor: '#F2F2F2', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <div className="content-wide" style={{ maxWidth: '1380px' }}>
          <Image
            src="/Phia/Hero_image.png"
            alt="Phia hero"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }}
          />
        </div>
      </section>

      {/* Title block */}
      <section className="page-hero" style={{ paddingTop: '64px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '80px', backgroundColor: '#f8fafc' }}>
        <div className="content-wide">
          <h1 style={{ fontSize: '56px', lineHeight: '64px', fontWeight: '500', letterSpacing: '-0.02em', color: '#212121', marginBottom: '16px' }}>
            Phia Browser Extension
          </h1>
          <p style={{ fontSize: '20px', lineHeight: '32px', color: '#6b7280', maxWidth: '600px', marginBottom: '40px' }}>
            I redesigned this existing extension after finding it hard to scan prices and alternatives while shopping. The updated layout focuses on clarity, reducing drop-off rates, and higher purchase rates.
          </p>
          <div className="flex flex-col gap-3">
            <a href="https://www.figma.com/proto/vH2Yqx2XS9U90KCoaga1Lz/Phia-Extension-Redesign?node-id=2054-1861&t=AaDjhaBeozJ4YHBW-0&scaling=scale-down&content-scaling=fixed&page-id=22%3A7&starting-point-node-id=2054%3A1861" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: '600', color: '#212121', textDecoration: 'none', display: 'inline-block', width: 'fit-content' }} className="hover:opacity-60">
              View prototype ↗
            </a>
            <a href="https://www.figma.com/design/vH2Yqx2XS9U90KCoaga1Lz/Phia-Extension-Redesign?node-id=22-7&p=f&t=AaDjhaBeozJ4YHBW-0" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: '600', color: '#212121', textDecoration: 'none', display: 'inline-block', width: 'fit-content' }} className="hover:opacity-60">
              View design file ↗
            </a>
          </div>
        </div>
      </section>

      {/* Extension Tab */}
      <section style={{ backgroundColor: '#f9fafb', padding: '80px 40px' }}>
        <div className="content-wide" style={{ maxWidth: '1400px' }}>
          <p className={`section-label ${syne.className}`}>Extension Tab</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '48px' }}>
            A lower price, front and center
          </h2>

          <div style={{ marginBottom: '12px' }}>
            <Image
              src="/Phia/Extension_container.png"
              alt="Extension tab states"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }}
            />
          </div>
          <div style={{ width: '100%' }}>
            <p style={{ fontSize: '18px', fontWeight: '500', fontStyle: 'italic', color: '#212121', textAlign: 'center', marginBottom: '8px' }}>Extension tab</p>
            <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center' }}>
              &ldquo;Let us provide a lower price&rdquo; shows the lowest and sustainable item, which gives users a sense of value. This creates a small &lsquo;win&rsquo; moment that feels helpful and trustworthy. I would A/B test a few versions of the tag to see which phrasing feels the most natural and motivating.
            </p>
          </div>
        </div>
      </section>

      {/* Secondhand Price Extension */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content-wide" style={{ maxWidth: '1400px' }}>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '48px' }}>
            Secondhand Price Extension
          </h2>

          <div style={{ marginBottom: '32px', marginLeft: '8px', marginRight: '8px', borderRadius: '16px 16px 10px 10px', overflow: 'hidden' }}>
            <Image
              src="/Phia/Browser_container1.png"
              alt="Secondhand price extension"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div style={{ width: '100%' }}>
            <p style={{ fontSize: '18px', fontWeight: '500', fontStyle: 'italic', color: '#212121', textAlign: 'center', marginBottom: '8px' }}>Secondhand Price Extension</p>
            <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center' }}>
              Extension tab uses clearer hierarchy and trust cues to drive action, while users can recognize key savings without scanning through clutter. The verified seller badge builds confidence in lesser-known resellers.
            </p>
          </div>
        </div>
      </section>



    </main>
  )
}
