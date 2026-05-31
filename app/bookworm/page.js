'use client'

import Image from 'next/image'
import { Syne } from 'next/font/google'


const syne = Syne({ subsets: ['latin'], weight: ['600'] })

export default function Bookworm() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fbfbfb' }}>

      <style>{`
        .content-wide {
          max-width: 960px;
          margin: 0 auto;
        }
        .content {
          max-width: 880px;
          margin: 0 auto;
        }
        .section-label {
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.12em;
          font-weight: 600;
          color: rgba(10, 10, 10, 0.6);
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .quote-card {
          background: white;
          border-radius: 12px;
          padding: 20px 24px;
          font-size: 15px;
          color: #374151;
          line-height: 1.6;
          border: 1px solid #e5e7eb;
        }
        .principle-card {
          background: #f9fafb;
          border-radius: 8px;
          padding: 24px;
          border: 1px solid rgba(0,0,0,0.1);
        }
        .img-placeholder {
          width: 100%;
          background: #111;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          color: #555;
          font-size: 14px;
          font-style: italic;
          text-align: center;
        }
        p { font-size: 14px !important; line-height: 20px !important; margin-top: 0 !important; }
        .content p:not(.section-label), .content-wide p:not(.section-label) { color: rgba(10, 10, 10, 0.4) !important; }
        .content .principle-card p:first-child { color: rgb(33, 33, 33) !important; }
        .content div .review-quote { color: rgba(10, 10, 10, 0.6) !important; }
        a { font-size: 14px !important; line-height: 20px !important; color: rgba(10, 10, 10, 0.4) !important; transition: opacity 0.15s ease !important; }
        a:hover { color: rgb(33, 33, 33) !important; }
        h1 { font-size: 24px !important; line-height: 32px !important; margin-top: 0 !important; }
        h2, h3 { font-size: 20px !important; line-height: 28px !important; margin-top: 0 !important; margin-bottom: 0 !important; font-weight: 500 !important; }
        .section-label { font-size: 10px !important; line-height: 12px !important; letter-spacing: 0.12em !important; margin-bottom: 4px !important; color: rgba(10, 10, 10, 0.6) !important; font-weight: 600 !important; }
        .img-caption { font-size: 14px !important; line-height: 20px !important; max-width: 500px !important; margin-left: auto !important; margin-right: auto !important; }
        img { border-radius: 8px !important; }
        @media (max-width: 767px) {
          .min-h-screen { overflow-x: hidden !important; } .min-h-screen section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 48px !important; padding-bottom: 48px !important; }
          footer { padding: 32px 20px !important; }
          .page-hero { padding-top: 64px !important; padding-left: 20px !important; padding-right: 20px !important; padding-bottom: 40px !important; }
          .content-wide > div { gap: 4px !important; }
          .overview-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .features-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .two-col-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          h1 { font-size: 16px !important; line-height: 24px !important; font-weight: 500 !important; margin-bottom: 4px !important; }
          h2, h3 { font-size: 14px !important; line-height: 20px !important; margin-bottom: 4px !important; }
          p { font-size: 12px !important; line-height: 18px !important; }
          a { font-size: 12px !important; line-height: 18px !important; }
          .section-label { font-size: 10px !important; line-height: 12px !important; margin-bottom: 4px !important; }
          .img-caption { font-size: 10px !important; line-height: 12px !important; margin-top: 6px !important; padding-left: 0 !important; padding-right: 0 !important; }
          img { border-radius: 4px !important; }
          .img-wide { margin-left: 0 !important; margin-right: 0 !important; }
          .content { overflow: hidden !important; }
        }
      `}</style>

      {/* Hero */}
      <div className="page-hero" style={{ paddingTop: '80px', paddingBottom: '40px', backgroundColor: '#0C3D29', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden', paddingLeft: '24px', paddingRight: '24px' }}>
        <Image
          src="/Images/bw_image.png"
          alt="Bookworm app screens"
          width={1080}
          height={678}
          style={{ width: '100%', maxWidth: '1300px', height: 'auto', objectFit: 'contain', borderRadius: '12px' }}
        />
      </div>

      {/* Title + Overview + Sidebar */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content-wide overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '80px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h1 style={{ fontSize: '24px', lineHeight: '32px', fontWeight: '600', letterSpacing: '-0.02em', color: '#212121', marginBottom: '0' }}>
                Bookworm
              </h1>
              <p style={{ fontSize: '14px', lineHeight: '20px', color: '#6b7280', maxWidth: '520px' }}>
                Elevating Reader Engagement with Exclusive Content
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p className={`section-label ${syne.className}`}>Overview</p>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(10, 10, 10, 0.4)' }}>
                Bookworm is an e-commerce platform that offers users an efficient way to purchase books while enjoying book-related content. I created this project to put my Google UX Design Certificate skills to the test and get some hands-on practice before diving into real-world projects.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ padding: '4px' }}>
              <p className={`section-label ${syne.className}`}>Team</p>
              <p style={{ fontSize: '16px', color: 'rgba(10, 10, 10, 0.4)', lineHeight: '1.8' }}>Product Designer</p>
            </div>
            <div style={{ padding: '4px' }}>
              <p className={`section-label ${syne.className}`}>Project Timeline</p>
              <p style={{ fontSize: '16px', color: 'rgba(10, 10, 10, 0.4)' }}>November – December 2022</p>
            </div>
            <div style={{ padding: '4px' }}>
              <p className={`section-label ${syne.className}`}>Role</p>
              <p style={{ fontSize: '16px', color: 'rgba(10, 10, 10, 0.4)', lineHeight: '1.8' }}>User Research<br />Prototype<br />Visual Design</p>
            </div>
            <div style={{ padding: '4px' }}>
              <p className={`section-label ${syne.className}`}>KPIs</p>
              <p style={{ fontSize: '16px', color: 'rgba(10, 10, 10, 0.4)', lineHeight: '1.8' }}>+8% YoY Growth<br />12% conversion rate<br />~6% user retention</p>
            </div>
            <div style={{ padding: '4px' }}>
              <p className={`section-label ${syne.className}`}>Links</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <a href="https://www.figma.com/proto/LZBaZ24kza0HWJEOnYf225/Bookworm-Mobile-App?node-id=3384-10451&t=QAGHlZLogb2qChUb-0&scaling=scale-down&content-scaling=fixed&page-id=1304%3A8895&starting-point-node-id=3384%3A10451&show-proto-sidebar=1" target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', color: 'rgba(10, 10, 10, 0.4)', textDecoration: 'none' }} className="hover:text-black">View prototype ↗</a>
                <a href="https://www.figma.com/design/LZBaZ24kza0HWJEOnYf225/Bookworm-Mobile-App?node-id=1184-7672&p=f&t=QAGHlZLogb2qChUb-0" target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', color: 'rgba(10, 10, 10, 0.4)', textDecoration: 'none' }} className="hover:text-black">View final design file ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Research */}
      <section className="section-alt" style={{ padding: '80px 40px' }}>
        <div className="content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
            <p className={`section-label ${syne.className}`}>User Research</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '500', letterSpacing: '-0.02em', color: '#212121' }}>
                Exploring valuable user insights
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
                I conducted 10 interviews between the ages of 20 and 35 of 50% book readers and 50% non-book readers to understand current app usage and uncover gaps in user interest. Users find the entertainment value of current book apps lacking, making it challenging for both groups to stay engaged.
              </p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '8px', margin: '0 -80px 8px' }}>
            {[
              { quote: 'I like Amazon’s huge range of books, but it feels bland in terms of entertainment. Wish there’s a way to make reading interactive.', stars: 2, name: 'Phoenix B.', platform: 'Amazon' },
              { quote: 'Looks clean but I want options to buy physical books without switching through different websites.', stars: 1, name: 'Lana S.', platform: 'Apple Books' },
              { quote: 'Barnes & Noble closed their stores and prices are higher than what’s found online. Shipping is slow compared to other platforms.', stars: 1, name: 'Noah R.', platform: 'Barnes & Noble' },
            ].map(({ quote, stars, name, platform }) => (
              <div key={name} style={{ background: '#ffffff', borderRadius: '12px', padding: '20px 24px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p className="review-quote" style={{ fontSize: '14px', lineHeight: '20px', margin: 0 }}>&ldquo;{quote}&rdquo;</p>
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={i <= stars ? '#f59e0b' : '#d1d5db'}>
                        <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z"/>
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontSize: '12px', lineHeight: '16px', color: '#9ca3af', margin: 0 }}>{name} &bull; {platform}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="img-caption" style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '12px' }}>
            &ldquo;Users frustrated with current book apps due to lack of personalized features, and limited interactive elements.&rdquo;
          </p>
        </div>
      </section>

      {/* Competitive Analysis */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '48px' }}>
            <p className={`section-label ${syne.className}`}>Competitive Analysis</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '500', letterSpacing: '-0.02em', color: '#212121' }}>
                Is The Market Sleeping on Page-Turning Potentials?
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
                After reviewing a few online book sites, I found their visual design unappealing and overwhelming with the amount of information shown. This challenge detours users from returning back to the app as well as adapting to poor user design.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
                Platforms here focuses only on ebooks, paperbacks, and audiobooks, there's a many opportunity to tap into other types of book-related content.
              </p>
            </div>
          </div>
          <div className="img-wide" style={{ margin: '0 -200px' }}>
            <Image src="/Bookworm/competitor_image.png" alt="Competitive analysis" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      {/* Design Principle */}
      <section className="section-alt" style={{ padding: '80px 40px' }}>
        <div className="content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
            <p className={`section-label ${syne.className}`}>Design Principle</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '500', letterSpacing: '-0.02em', color: '#212121' }}>
                HMW help users discover more <em style={{ color: '#184131' }}>value</em> from Bookworm through author-driven <em style={{ color: '#184131' }}>engagement</em>?
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
                I decided to structure my design to emphasize three specific focal points, each tailored to address the distinct needs and preferences of my target audience, based on user research and competitive analysis insights.
              </p>
            </div>
          </div>
          <div className="features-grid img-wide" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { title: 'Unique Product Offering', desc: 'Attract new users with a product that redefines expectations' },
              { title: 'Simple Navigation', desc: 'Intuitive experience for effortless user discovery' },
              { title: 'Boost Author-User Interaction', desc: 'Strengthen connections through engaging content' },
            ].map(({ title, desc }) => (
              <div key={title} className="principle-card">
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#212121', marginBottom: '8px' }}>{title}</p>
                <p style={{ fontSize: '16px', lineHeight: '24px', color: '#6b7280' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* End-to-End Flow */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
            <p className={`section-label ${syne.className}`}>End-to-End Flow</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '500', letterSpacing: '-0.02em', color: '#212121' }}>
                Mapping a clear, friction-free journey
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
                I began outlining my skeleton for a high-level view of the key features to prioritize, such as home/discover, bookmarks, and book details. This approach helps pinpoint impactful areas for product placement and provides a clear reference to stay focused and targeted when making final decisions.
              </p>
            </div>
          </div>
          <div className="img-wide" style={{ margin: '0 -200px', marginBottom: '8px' }}>
            <Image src="/Bookworm/user_flow_1_image.png" alt="End-to-end user journey map" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center' }}>
            Holistic view of Bookworm's user journey map to pinpoint optimal areas for product placement.
          </p>
        </div>
      </section>

      {/* Task-Focused Flow */}
      <section className="section-alt" style={{ padding: '80px 40px' }}>
        <div className="content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
            <p className={`section-label ${syne.className}`}>Task-Focused Flow</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '500', letterSpacing: '-0.02em', color: '#212121' }}>
                Mapping a clear, friction-free journey
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
                I decided to hone in on the book details flow and created Bookworm+, a premium subscription service offering early access to pre-orders, exclusive author chats, pop-up events, interviews, and signed digital NFTs. This strategy will drive significant growth for authors and elevate Bookworm's revenue.
              </p>
            </div>
          </div>
          <div className="img-wide" style={{ margin: '0 -200px', marginBottom: '8px' }}>
            <Image src="/Bookworm/user_flow_image_2.png" alt="Task-focused book details flow" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center' }}>
            Focused book details flow from the newly integrated Bookworm+ subscription model with premium offerings.
          </p>
        </div>
      </section>

      {/* Exploration */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            <p className={`section-label ${syne.className}`}>Exploration</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '500', letterSpacing: '-0.02em', color: '#212121' }}>
                Generating ideas without limits
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
                I began brainstorming different design directions to get an overview of which areas I needed to prioritize such as high-traffic user touchpoints and optimal moments for upselling. This approach helped me generate a wide range of ideas without limiting myself to a specific design structure.
              </p>
            </div>
          </div>
          <a href="https://figma.com/design/LZBaZ24kza0HWJEOnYf225/Bookworm-Mobile-App?node-id=945-1701&p=f&t=QAGHlZLogb2qChUb-0" target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', color: '#626262', textDecoration: 'none', display: 'inline-block', marginBottom: '40px' }} className="hover:text-black">View design file ↗</a>
          <div className="img-wide" style={{ margin: '0 -200px', marginBottom: '8px' }}>
            <Image src="/Bookworm/exploration_image.png" alt="Early exploration concepts" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '0px', display: 'block' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center' }}>
            Quick look of early exploration process from discovering concept, ideas, and UI to guide the trajectory of Bookworm's app layout.
          </p>
        </div>
      </section>

      {/* Low Fidelity */}
      <section className="section-alt" style={{ padding: '80px 40px' }}>
        <div className="content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
            <p className={`section-label ${syne.className}`}>Low Fidelity</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '500', letterSpacing: '-0.02em', color: '#212121' }}>
                A solid wireframe foundation
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
                I landed on these low-fidelity screens cause it felt the most organized and compelling when presenting Bookworm+. This wireframe helped layout what the basic visual model will look like before implementing final touch-ups.
              </p>
            </div>
          </div>
          <div className="img-wide" style={{ margin: '0 -200px', marginBottom: '8px' }}>
            <Image src="/Bookworm/wireframe_image.png" alt="Low-fidelity wireframes" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block', border: 'none' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center' }}>
            Quick look of early exploration process from discovering concept, ideas, and UI to guide the trajectory of Bookworm's app layout.
          </p>
        </div>
      </section>

      {/* Design Handoff */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            <p className={`section-label ${syne.className}`}>Design Handoff</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '500', letterSpacing: '-0.02em', color: '#212121' }}>
                Final designs
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
                This handoff document includes organized final design, components, colors, typography, providing a well-organized resource for developers to reference.
              </p>
            </div>
          </div>
          <a href="https://www.figma.com/design/LZBaZ24kza0HWJEOnYf225/Bookworm-Mobile-App?node-id=1184-7672&p=f&t=QAGHlZLogb2qChUb-0" target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', color: '#626262', textDecoration: 'none', display: 'inline-block', marginBottom: '40px' }} className="hover:text-black">View final design file ↗</a>

          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '48px' }}>
            {[
              { title: 'Unique Product Offering', desc: 'Attract new users with a product that redefines expectations' },
              { title: 'Simple Navigation', desc: 'Intuitive experience for effortless user discovery' },
              { title: 'Boost Author-User Interaction', desc: 'Strengthen connections through engaging content' },
            ].map(({ title, desc }) => (
              <div key={title} className="principle-card">
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#212121', marginBottom: '8px' }}>{title}</p>
                <p style={{ fontSize: '16px', lineHeight: '24px', color: '#6b7280' }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="img-wide" style={{ margin: '0 -200px', marginBottom: '8px' }}>
            <Image src="/Bookworm/final_design_image.png" alt="Final design screens" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center', marginBottom: '80px' }}>
            Polished design highlights Bookworm's seamless flow, connecting authors and users through a compelling subscription offering.
          </p>

          <div className="img-wide" style={{ margin: '0 -200px', marginBottom: '8px' }}>
            <Image src="/Bookworm/Design System (3) 1.png" alt="Component library preview" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center', marginBottom: '80px' }}>
            Preview of the component library for quick and efficient design updates to simplify any design changes easier down the line.
          </p>

          <div className="two-col-stack img-wide" style={{ display: 'flex', flexDirection: 'column', gap: '160px', margin: '0 -200px' }}>
            <div>
              <Image src="/Bookworm/color_image.png" alt="Color palette" width={0} height={0} sizes="50vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '8px', display: 'block' }} />
              <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', textAlign: 'center', fontStyle: 'italic', maxWidth: '750px', margin: '0 auto' }}>
                Rich green primary evokes a cozy, inviting library atmosphere — deep and grounded without feeling heavy. A softer green secondary provides contrast for supporting UI surfaces. Yellow, blue, and orange tertiaries bring warmth and visual variety to graphics, illustrations, and NFT cards. Neutral grays from 90 down to 10 form the structural backbone, ensuring text, borders, and backgrounds stay readable and balanced across every screen.
              </p>
            </div>
            <div>
              <Image src="/Bookworm/typography_image.png" alt="Typography guide" width={0} height={0} sizes="50vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '8px', display: 'block' }} />
              <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', textAlign: 'center', fontStyle: 'italic', maxWidth: '750px', margin: '0 auto' }}>
                Georgia for headers and titles brings a classic, reader-friendly feel. Open Sans handles sub-texts and body copy, keeping everything clean and easy to read.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introspective */}
      <section className="section-alt" style={{ padding: '80px 40px' }}>
        <div className="content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
            <p className={`section-label ${syne.className}`}>Introspective</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '500', letterSpacing: '-0.02em', color: '#212121' }}>
                Learnings
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
                This project was super fun to design and I don't think this app would exist without finding gaps in the market and coming up with unique and compelling offerings to put in Bookworm. I learned a lot about how to sell new features, snappy marketing moments, and upsell products to increase user retention.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h3 style={{ fontSize: '20px', lineHeight: '28px', fontWeight: '500', letterSpacing: '-0.02em', color: '#212121' }}>Next Steps</h3>
            <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
              I would like to collaborate with developers to bring this app to life. After launch, I would like to focus on adding features to boost user retention, attract non-book readers, and explore additional subscription options to draw in more subscribers.
            </p>
          </div>
        </div>
      </section>



    </main>
  )
}

