'use client'

import Image from 'next/image'
import { Syne } from 'next/font/google'


const syne = Syne({ subsets: ['latin'], weight: ['600'] })

export default function Bookworm() {
  return (
    <main className="min-h-screen bg-white">

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
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.5px;
          font-weight: 600;
          color: #9ca3af;
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
          border-radius: 16px;
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
        @media (max-width: 767px) {
          section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 48px !important; padding-bottom: 48px !important; }
          footer { padding: 32px 20px !important; }
          .page-hero { padding-top: 88px !important; padding-left: 20px !important; padding-right: 20px !important; padding-bottom: 40px !important; }
          .overview-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .features-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .two-col-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          h1 { font-size: 36px !important; line-height: 44px !important; }
          h2, h3 { font-size: 26px !important; line-height: 34px !important; }
          .img-wide { margin-left: 0 !important; margin-right: 0 !important; }
          .img-caption { padding-left: 0 !important; padding-right: 0 !important; }
          .content { overflow: hidden !important; }
        }
      `}</style>

      {/* Hero */}
      <div className="page-hero" style={{ paddingTop: '120px', paddingBottom: '40px', backgroundColor: '#0C3D29', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden', paddingLeft: '24px', paddingRight: '24px' }}>
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
            <div>
              <h1 style={{ fontSize: '56px', lineHeight: '64px', fontWeight: '600', letterSpacing: '-0.02em', color: '#212121', marginBottom: '16px' }}>
                Bookworm
              </h1>
              <p style={{ fontSize: '20px', lineHeight: '28px', color: '#6b7280', maxWidth: '520px' }}>
                Elevating Reader Engagement with Exclusive Content
              </p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Overview</p>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
                Bookworm is an e-commerce platform that offers users an efficient way to purchase books while enjoying book-related content. I created this project to put my Google UX Design Certificate skills to the test and get some hands-on practice before diving into real-world projects.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <p className={`section-label ${syne.className}`}>Team</p>
              <p style={{ fontSize: '16px', color: '#626262', lineHeight: '1.8' }}>Product Designer</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Project Timeline</p>
              <p style={{ fontSize: '16px', color: '#626262' }}>November – December 2022</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Role</p>
              <p style={{ fontSize: '16px', color: '#626262', lineHeight: '1.8' }}>User Research<br />Prototype<br />Visual Design</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>KPIs</p>
              <p style={{ fontSize: '16px', color: '#626262', lineHeight: '1.8' }}>+8% YoY Growth<br />12% conversion rate<br />~6% user retention</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Links</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <a href="https://www.figma.com/proto/LZBaZ24kza0HWJEOnYf225/Bookworm-Mobile-App?node-id=3384-10451&t=QAGHlZLogb2qChUb-0&scaling=scale-down&content-scaling=fixed&page-id=1304%3A8895&starting-point-node-id=3384%3A10451&show-proto-sidebar=1" target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', color: '#626262', textDecoration: 'none' }} className="hover:text-black">View prototype ↗</a>
                <a href="https://www.figma.com/design/LZBaZ24kza0HWJEOnYf225/Bookworm-Mobile-App?node-id=1184-7672&p=f&t=QAGHlZLogb2qChUb-0" target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', color: '#626262', textDecoration: 'none' }} className="hover:text-black">View final design file ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Research */}
      <section className="section-alt" style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>User Research</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Exploring valuable user insights
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '32px' }}>
            I conducted 10 interviews between the ages of 20 and 35 of 50% book readers and 50% non-book readers to understand current app usage and uncover gaps in user interest. Users find the entertainment value of current book apps lacking, making it challenging for both groups to stay engaged.
          </p>
          <div className="img-wide" style={{ margin: '0 -200px', marginBottom: '24px' }}>
            <Image src="/Bookworm/user_research_image.avif" alt="User research" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
          </div>
          <div className="quote-card">
            "Users frustrated with current book apps due to lack of personalized features, and limited interactive elements."
          </div>
        </div>
      </section>

      {/* Competitive Analysis */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Competitive Analysis</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Is The Market Sleeping on Page-Turning Potentials?
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '20px' }}>
            After reviewing a few online book sites, I found their visual design unappealing and overwhelming with the amount of information shown. This challenge detours users from returning back to the app as well as adapting to poor user design.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '24px' }}>
            Platforms here focuses only on ebooks, paperbacks, and audiobooks, there's a many opportunity to tap into other types of book-related content.
          </p>
          <div className="img-wide" style={{ margin: '0 -200px' }}>
            <Image src="/Bookworm/competitor_image.png" alt="Competitive analysis" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      {/* Design Principle */}
      <section className="section-alt" style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Design Principle</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            HMW help users discover more <em style={{ color: '#184131' }}>value</em> from Bookworm through author-driven <em style={{ color: '#184131' }}>engagement</em>?
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            I decided to structure my design to emphasize three specific focal points, each tailored to address the distinct needs and preferences of my target audience, based on user research and competitive analysis insights.
          </p>
          <div className="features-grid img-wide" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', margin: '0 -200px' }}>
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
          <p className={`section-label ${syne.className}`}>End-to-End Flow</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Mapping a clear, friction-free journey
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            I began outlining my skeleton for a high-level view of the key features to prioritize, such as home/discover, bookmarks, and book details. This approach helps pinpoint impactful areas for product placement and provides a clear reference to stay focused and targeted when making final decisions.
          </p>
          <div className="img-wide" style={{ margin: '0 -200px', marginBottom: '16px' }}>
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
          <p className={`section-label ${syne.className}`}>Task-Focused Flow</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Mapping a clear, friction-free journey
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            I decided to hone in on the book details flow and created Bookworm+, a premium subscription service offering early access to pre-orders, exclusive author chats, pop-up events, interviews, and signed digital NFTs. This strategy will drive significant growth for authors and elevate Bookworm's revenue.
          </p>
          <div className="img-wide" style={{ margin: '0 -200px', marginBottom: '16px' }}>
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
          <p className={`section-label ${syne.className}`}>Exploration</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Generating ideas without limits
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '16px' }}>
            I began brainstorming different design directions to get an overview of which areas I needed to prioritize such as high-traffic user touchpoints and optimal moments for upselling. This approach helped me generate a wide range of ideas without limiting myself to a specific design structure.
          </p>
          <a href="https://figma.com/design/LZBaZ24kza0HWJEOnYf225/Bookworm-Mobile-App?node-id=945-1701&p=f&t=QAGHlZLogb2qChUb-0" target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', color: '#626262', textDecoration: 'none', display: 'inline-block', marginBottom: '40px' }} className="hover:text-black">View design file ↗</a>
          <div className="img-wide" style={{ margin: '0 -200px', marginBottom: '16px' }}>
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
          <p className={`section-label ${syne.className}`}>Low Fidelity</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            A solid wireframe foundation
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            I landed on these low-fidelity screens cause it felt the most organized and compelling when presenting Bookworm+. This wireframe helped layout what the basic visual model will look like before implementing final touch-ups.
          </p>
          <div className="img-wide" style={{ margin: '0 -200px', marginBottom: '16px' }}>
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
          <p className={`section-label ${syne.className}`}>Design Handoff</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Final designs
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '16px' }}>
            This handoff document includes organized final design, components, colors, typography, providing a well-organized resource for developers to reference.
          </p>
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

          <div className="img-wide" style={{ margin: '0 -200px', marginBottom: '16px' }}>
            <Image src="/Bookworm/final_design_image.png" alt="Final design screens" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center', marginBottom: '48px' }}>
            Polished design highlights Bookworm's seamless flow, connecting authors and users through a compelling subscription offering.
          </p>

          <div className="img-wide" style={{ margin: '0 -200px', marginBottom: '16px' }}>
            <Image src="/Bookworm/Design System (3) 1.png" alt="Component library preview" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center', marginBottom: '48px' }}>
            Preview of the component library for quick and efficient design updates to simplify any design changes easier down the line.
          </p>

          <div className="two-col-stack img-wide" style={{ display: 'stack', gridTemplateStack: '1fr 1fr', gap: '24px', margin: '0 -200px' }}>
            <div>
              <Image src="/Bookworm/color_image.png" alt="Color palette" width={0} height={0} sizes="50vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '16px', display: 'block' }} />
              <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', textAlign: 'center', fontStyle: 'italic' }}>
                I chose a rich green as the primary color to evoke a cozy library feel, with secondary as a softer green for contrast. Neutral shades of white, black, and gray to maintain consistency, and tertiary colors are used for graphics and NFT cards.
              </p>
            </div>
            <div>
              <Image src="/Bookworm/typography_image.png" alt="Typography guide" width={0} height={0} sizes="50vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '16px', display: 'block' }} />
              <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', textAlign: 'center', fontStyle: 'italic' }}>
                Georgia is selected for headers and titles to capture a classic book style that resonates with readers. Paired with Open Sans for sub-texts, body paragraphs, and product copy, offering a clean and easy-to-read experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introspective */}
      <section className="section-alt" style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Introspective</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Learnings
          </h2>
          <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262', marginBottom: '48px' }}>
            This project was super fun to design and I don't think this app would exist without finding gaps in the market and coming up with unique and compelling offerings to put in Bookworm. I learned a lot about how to sell new features, snappy marketing moments, and upsell products to increase user retention.
          </p>
          <h3 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '16px' }}>Next Steps</h3>
          <p style={{ fontSize: '17px', lineHeight: '28px', color: '#626262' }}>
            I would like to collaborate with developers to bring this app to life. After launch, I would like to focus on adding features to boost user retention, attract non-book readers, and explore additional subscription options to draw in more subscribers.
          </p>
        </div>
      </section>



    </main>
  )
}

