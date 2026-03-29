'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['600'] })

export default function Duetti() {
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
    <main className="min-h-screen bg-white">

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
          margin-bottom: 5px;
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
            backgroundColor: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '32px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}>
          <Link href="/" style={{ fontSize: '24px', lineHeight: '32px', letterSpacing: '-0.02em', fontWeight: '500', color: 'black', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Joann Zhang
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">Work</Link>
            <Link href="/about" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">About</Link>
            <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">Resume</a>
            <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '14px', lineHeight: '18px' }} className="text-gray-500 hover:text-black" target="_blank" rel="noopener noreferrer">Contact</a>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <div className="page-hero" style={{ position: 'relative', backgroundColor: '#d9f99d', height: '90vh', overflow: 'hidden' }}>
        <video src="/Images/Duetti video.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Title + Overview + Sidebar */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content-wide overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '80px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h1 style={{ fontSize: '56px', lineHeight: '64px', fontWeight: '600', letterSpacing: '-0.02em', color: '#212121', marginBottom: '16px' }}>
                Duetti
              </h1>
              <p style={{ fontSize: '20px', lineHeight: '28px', color: '#6b7280', maxWidth: '520px' }}>
                Helping artists get paid upfront for their music catalogs
              </p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Overview</p>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
                Duetti helps independent artists a new way to make money by selling their tracks upfront instead of relying on streaming royalties. The company promotes these tracks through playlists, YouTube, and marketing campaigns, giving artists more financial stability and control over their careers.
              </p>
              <a href="https://report.duetti.co/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: '600', color: '#626262', textDecoration: 'none', display: 'inline-block', marginTop: '20px' }} className="hover:text-black">View 2023 economic report ↗</a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <p className={`section-label ${syne.className}`}>Team</p>
              <p style={{ fontSize: '16px', color: '#626262', lineHeight: '1.8' }}>Product Designer (Me)<br />Lead Product Designer<br />General Manager<br />Engineer</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Project Timeline</p>
              <p style={{ fontSize: '16px', color: '#626262' }}>December 2024 – January 2025<br />(2 months)</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Outcomes</p>
              <p style={{ fontSize: '16px', color: '#626262', lineHeight: '1.8' }}>~7%+ artist traffic boost<br />~3% artist conversion rate</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Links</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <a href="https://report.duetti.co/#1" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#626262', textDecoration: 'underline' }} className="hover:text-black">Live now ↗</a>
                <a href="https://www.prnewswire.com/news-releases/duettis-2024-music-economics-report-finds-industry-wide-per-stream-rates-for-independent-artists-are-finally-stabilizing-following-years-of-decline-302358211.html" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#626262', textDecoration: 'underline' }} className="hover:text-black">PR Newswire article ↗</a>
                <a href="https://appleworld.today/2025/01/duetti-report-says-that-apple-music-payouts-for-artists-remain-strong/?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#626262', textDecoration: 'underline' }} className="hover:text-black">appleworld.today article ↗</a>
                <a href="https://www.instagram.com/duetti.co/p/DFK8w4_sVOY/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#626262', textDecoration: 'underline' }} className="hover:text-black">Duetti IG post ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Report Screenshots */}
      <section style={{ padding: '0 40px 80px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <Image src="/Duetti/previous_econ_report_image.avif" alt="Duetti 2023 economic report" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center', marginTop: '16px' }}>
            Duetti's 2023 economic report. We needed to change their data visualization and enhance the design polish while keeping their current design language.
          </p>
        </div>
      </section>

      {/* Goal */}
      <section style={{ backgroundColor: '#f9fafb', padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Goal</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Craft a visually rich, insight-driven report
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
            Our goal was to craft a visually rich, insight-driven economic report that simplifies the financial landscape for artists and clarifies catalog ownership. The report unpacks key streaming trends in the music industry, and my role was to design data visualizations for the desktop and web app, making these insights more tangible and accessible.
          </p>
        </div>
      </section>

      {/* Brand Style */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Brand Style</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Duetti-Inspired Visual Direction
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '24px' }}>
            I pulled inspiration from Duetti social media graphics to create a look that's vibrant, energetic, and modern that strikes a balance between professionalism and boldness. Here are a few sample covers that capture our design direction.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            The Duetti brand has a distinct and ownable look, using an incredibly punchy, almost neon green paired with a darker forest green in all of their designs. The typeface using Maax Unicase and Nunito Sans is also striking with quirky, heavy letterforms. Overall, the Duetti brand looks modern and trendy.
          </p>
          <Image src="/Duetti/inspo_image.avif" alt="Duetti social media branding covers" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '0px', marginBottom: '16px', display: 'block' }} />
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center' }}>
            Here are some sample covers from Duetti's past social media branding using bold, high-contrast style. The design brings in artist cover photos to connect with target audience, while combining other vibrant colors to make data feel dynamic and engaging. I extracted from their fonts, color styles, and overall design direction to shape the look of our report's data visualization.
          </p>
        </div>
      </section>

      {/* Wireframes */}
      <section style={{ backgroundColor: '#f9fafb', padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Wireframes</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Bringing content to life with colors and layout
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            Most of the content was already written, so my job is to present the copy and visualize the data to be visually arresting and highly consumable. I brought the content to life with colors, visuals, and layout. Since this will be a slideshow-style experience, we're focusing on clarity and readability for a smooth, scrollable transition.
          </p>
          <Image src="/Duetti/wireframe_image.avif" alt="Wireframes grid" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '16px', display: 'block' }} />
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center' }}>
            This is a map of our early wireframes with title case and body copy. We tested a few data visuals to get a good look with what our design should look like for web and desktop, but I was responsible for bringing our design to life.
          </p>
        </div>
      </section>

      {/* Mid-Fidelity */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Mid-Fidelity</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            First iteration with graphs and colors in place
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            I explored different approaches and landed on this in our mid-fidelity stage, but it still felt flat, missing the nuanced and robust feel we were aiming for. While the team refined the copy, I fine-tuned the data visuals for accuracy and established our font and color system to create a more cohesive and efficient workflow.
          </p>
          <Image src="/Duetti/first_iteration_image.avif" alt="Mid-fidelity overview grid" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '16px', display: 'block' }} />
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center', marginBottom: '48px' }}>
            Here's a look at our first iteration with graphs and colors in place. I set up the font and color system to keep things consistent across data visuals and screens. We also tweaked the mobile text to cut down on the need for the 'More' button, so key info is easier to catch at a glance. Along the way, we mocked up a new menu button to make navigation smoother. My lead Product Designer jumped in to bring screens to life with artist photos and illustrations.
          </p>
          <Image src="/Duetti/first_iteration_yellow_image.avif" alt="Mid-fi yellow genre chart" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '16px', display: 'block' }} />
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center', marginBottom: '48px' }}>
            This is a closer look at one of the graphs I designed to show how streaming preferences vary by genre. This version felt too cluttered and hard to read against the yellow background and green frame, making it tough to distinguish elements. We ended up cutting out this slide due to content changes, but it was something to keep in mind for future iterations.
          </p>
          <Image src="/Duetti/first_iteration_pink_image.avif" alt="Mid-fi pink slide" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '16px', display: 'block' }} />
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center' }}>
            This design was bold and attention-grabbing, but overall felt tight and the high-contrast pink and lime green colors were too distracting where it overpowered texts and data points. We also swapped out the pill-shaped dropdown since it didn't quite fit the aesthetic and needed a color adjustment to feel more in tune with the slide.
          </p>
        </div>
      </section>

      {/* Final Design */}
      <section style={{ backgroundColor: '#f9fafb', padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Final Design</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Adding polish to make this report sing
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            For the next review, we focused on the details and adding polish to make this report sing. We focused on adding texture through rich geometry and photography, and evoking a playful vibe with slightly off-kilter layouts. After refining the data visuals for clarity and accuracy, we got the green light and moved forward with the developer handoff.
          </p>
          <Image src="/Duetti/final_design_image.avif" alt="Final design grid" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '16px', display: 'block' }} />
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center', marginBottom: '48px' }}>
            We fine-tuned our fonts and colors to make the data visuals feel more balanced. Some colors weren't reading well, so we adjusted the color styles for better clarity. I suggested a wine red for slide four to improve contrast with the lime green — it was approved and helped the design feel more polished and cohesive. Our lead PD added new illustrations and photos that really brought everything to life.
          </p>
          <Image src="/Duetti/final_consumer_image.avif" alt="Spotify Discovery Mode chart" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '16px', display: 'block' }} />
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center', marginBottom: '48px' }}>
            This is a closer look at one of the charts I designed, using bold neon orange and pink to highlight the contrast between Spotify's rising consumer prices and declining artist payouts. Our lead designer created a geometric background that adds visual interest without overpowering the graph. I also replaced the pill-shaped dropdown with a green vibrant rectangular one for a more unified look. The result came out cleaner and more digestible without losing impact.
          </p>
          <Image src="/Duetti/final_discovery_image.avif" alt="Spotify consumer prices vs payout rates" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '16px', display: 'block' }} />
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center', marginBottom: '48px' }}>
            I designed this graph to highlight the rise in Discovery Mode adoption. The smooth curve and evenly spaced data points guide our eyes naturally, while gradients add slight depth without clutter. The bright yellow markers stand out against the dark green background, highlighting key data without distraction.
          </p>

          {/* Color + Typography */}
          <div className="two-col-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <Image src="/Duetti/color_image.avif" alt="Color library" width={0} height={0} sizes="50vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
            <Image src="/Duetti/typography_image.avif" alt="Typography guide" width={0} height={0} sizes="50vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center', marginTop: '16px' }}>
            I created a color library and font guide to simplify our workflow. Duetti's dark forest green (#003C18) and lime green (#CEE44A) form the foundation, with vibrant purple, yellow, pink, and red for data visualization. Fonts: Maax Unicase for headers, Nunito Sans for body text.
          </p>
        </div>
      </section>

      {/* Introspective */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Introspective</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Next Steps
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '48px' }}>
            Once the design was approved, we handed it off to our developer, who brought it to life with animations, motion, and interactivity. The report went live soon after everything was finalized.
          </p>
          <h3 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '16px' }}>Learnings</h3>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '24px' }}>
            Working in a fast-paced environment meant adapting quickly, understanding the business side, and over-communicating with the team. It was a challenge I had to figure out on the spot, but it was a crucial growth edge for how quickly and thoughtfully I can work as a product designer.
          </p>
          <a href="https://report.duetti.co/#1" target="_blank" rel="noopener noreferrer" style={{ fontSize: '17px', fontWeight: '600', color: '#212121', textDecoration: 'underline' }} className="hover:underline">
            View Duetti's economic report ↗
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 40px', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1920px', margin: '0 auto' }}>
          <p style={{ fontSize: '18px', fontWeight: '500', color: '#212121', marginBottom: '8px' }}>Get in touch!</p>
          <div className="flex gap-4" style={{ marginBottom: '8px' }}>
            <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '16px', color: '#6b7280' }} className="hover:text-black">Email ↗</a>
            <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ fontSize: '18px', color: '#6b7280' }} className="hover:text-black">Resume ↗</a>
          </div>
          <p style={{ fontSize: '18px', color: '#9ca3af' }}>© Joann Zhang</p>
        </div>
      </footer>

    </main>
  )
}
