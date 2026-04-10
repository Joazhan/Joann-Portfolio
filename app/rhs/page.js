'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Syne } from 'next/font/google'
import AnimatedFooter from '@/app/components/AnimatedFooter'

const syne = Syne({ subsets: ['latin'], weight: ['600'] })

export default function RHS() {
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
        .quote-card {
          background: white;
          border-radius: 12px;
          padding: 20px 24px;
          font-size: 15px;
          color: #374151;
          line-height: 1.6;
          border: 1px solid #e5e7eb;
        }
        .feature-card {
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
            <Link href="/" style={{ fontSize: '16px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">Work</Link>
            <Link href="/about" style={{ fontSize: '16px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">About</Link>
            <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', lineHeight: '18px' }} className="text-gray-500 hover:text-black">Resume</a>
            <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '16px', lineHeight: '18px' }} className="text-gray-500 hover:text-black" target="_blank" rel="noopener noreferrer">Contact</a>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <div className="page-hero" style={{ backgroundColor: '#f1f5f9', paddingTop: '120px', paddingBottom: '60px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingLeft: '48px', paddingRight: '48px' }}>
        <Image
          src="/Images/rhs_image (3).png"
          alt="Raymond Hair Salon app screens"
          width={955}
          height={617}
          style={{ width: '90%', maxWidth: '1100px', height: 'auto', objectFit: 'contain' }}
        />
      </div>

      {/* Title + Overview + Sidebar */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content-wide overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '80px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h1 style={{ fontSize: '56px', lineHeight: '64px', fontWeight: '600', letterSpacing: '-0.02em', color: '#212121', marginBottom: '16px' }}>
                Raymond Hair Salon
              </h1>
              <p style={{ fontSize: '20px', lineHeight: '28px', color: '#6b7280', maxWidth: '520px' }}>
                Scheduling made effortless with online booking
              </p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Overview</p>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
                The business stays afloat based on a loyal customer base and referrals through word-of-mouth. Apart from a few customer-taken images on Yelp, there is little online presence which can be perceived as unprofessional and illegitimate.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <p className={`section-label ${syne.className}`}>Team</p>
              <p style={{ fontSize: '18px', color: '#626262', lineHeight: '1.8' }}>Product Designer</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Project Timeline</p>
              <p style={{ fontSize: '18px', color: '#626262' }}>January – February 2023</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Role</p>
              <p style={{ fontSize: '18px', color: '#626262', lineHeight: '1.8' }}>User Research<br />Wireframing<br />User Testing</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Links</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <a href="#" style={{ fontSize: '18px', color: '#626262', textDecoration: 'none' }} className="hover:text-black">View prototype ↗</a>
                <a href="#" style={{ fontSize: '18px', color: '#626262', textDecoration: 'none' }} className="hover:text-black">View design file ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitor Pricing + User Journey Map */}
      <section style={{ padding: '80px 40px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '900px', width: '100%' }}>
          <Image src="/RHS/store_image.avif" alt="User journey map" width={0} height={0} sizes="50vw" style={{ width: '100%', height: 'auto', borderRadius: '0px', display: 'block' }} />
          <Image src="/RHS/pricing_image.avif" alt="Competitor pricing" width={0} height={0} sizes="50vw" style={{ width: '100%', height: 'auto', borderRadius: '0px', display: 'block' }} />
        </div>
      </section>

      {/* Solution */}
      <section style={{ backgroundColor: '#f9fafb', padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Solution</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            An app that automates scheduling and builds presence
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            My solution for this challenge is to build an application that allows Raymond to interact with his customers while automating scheduling while creating a platform for him to better serve his target audience.
          </p>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', margin: '0 -200px' }}>
            {[
              { title: 'Simple to Use', desc: 'Approachable design that any age group can pick up and use immediately.' },
              { title: 'Streamlined Booking', desc: 'Clear scheduling flow with minimal steps from selection to confirmation.' },
              { title: 'Direct Connection', desc: 'Easy access to contact info, location, and hours in one place.' },
            ].map(({ title, desc }) => (
              <div key={title} className="feature-card">
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#212121', marginBottom: '8px' }}>{title}</p>
                <p style={{ fontSize: '16px', lineHeight: '24px', color: '#6b7280' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Analysis */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Competitive Analysis</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Function over form — a gap in the market
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '24px' }}>
            I analyzed two direct and two indirect scheduling apps to evaluate their features. Their focus on functionality over design led to readability issues, missing information, and difficulty locating features.
          </p>
          <div style={{ margin: '0 -200px' }}>
            <Image src="/RHS/competitor_image (1).png" alt="Competitor analysis" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '0px', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* User Research */}
      <section style={{ backgroundColor: '#f9fafb', padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>User Research</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Understanding loyal and new customers
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            I ran in-person and virtual interviews with long-term and short-term customers, grouping them by age since it shapes how they use the app. Users consistently highlighted three reasons they return: affordable pricing, strong craftsmanship, and friendly service. I also identified several pain points that revealed clear opportunities for improvement. These findings showed the need to segment users by their needs, leading to two main groups: short-term visitors and long-term loyal clients.
          </p>
          <Image src="/RHS/customer_image.png" alt="Comparison of long-term and short-term customers" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '16px', display: 'block' }} />
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center' }}>
            Comparison of long-term loyal and short-term customers
          </p>
        </div>
      </section>

      {/* User Journey */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>User Journey</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Four sub-pages, focused on what matters most
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
            The homepage is built around four essential sub-pages designed to focus on the features users visit most frequently. The contact information page received the most interest, as users liked the streamlined experience to connect with the barber directly.
          </p>
        </div>
      </section>

      {/* Low Fidelity */}
      <section style={{ backgroundColor: '#f9fafb', padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Low Fidelity</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Designing for an older, less tech-savvy audience
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '24px' }}>
            Based on my client's concerns and preferences, we concluded that our biggest priority was to create an app that was easy to navigate with no technical bugs. His biggest concern was that his older audience is less inclined to use the app to book appointments because they're a lot less tech-savvy than younger customers.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            My objective was to allow users who are less hands-on with technology to easily pick up the app and begin using it. I conducted the Crazy 8's exercise, allowing me to brainstorm ideas and filter which designs suit the business. I concluded that the last frame was the most user-friendly, and provided 4 basic functionalities: Service, Location & Hours, Contact, and Book Appointment.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '0 -200px', marginBottom: '16px' }}>
            <Image src="/RHS/paper_wireframe_image (1).png" alt="Paper wireframe 1" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '0px', display: 'block' }} />
            <Image src="/RHS/paper_wireframe_2_image (1).png" alt="Paper wireframe 2" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '0px', display: 'block' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic', textAlign: 'center' }}>
            Screenshots of paper wireframe flow for the front page of the design
          </p>
        </div>
      </section>

      {/* First Iterations */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>First Iterations</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Balancing aesthetics with accessibility
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '24px' }}>
            After conducting five user tests, many users had difficulty understanding why disabled buttons didn't allow them to proceed to next steps. Users didn't utilize the schedule and contact features as expected, and the search bar added unnecessary complexity.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            My focus on prioritizing a modern and sleek visual design disregarded the basic needs of providing a good user experience for older customers. I found that a few designs were not WCAG-friendly and contained inconsistent design patterns — the search bar was ultimately removed for lower development cost and mobile optimization.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '0 -200px', marginBottom: '16px' }}>
            <Image src="/RHS/first_iteration_image_1.png" alt="First iteration screens" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
            <Image src="/RHS/first_iteration_iamge (1).png" alt="First iteration screens 2" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: '#6b7280', fontStyle: 'italic', textAlign: 'center' }}>
            Design features oversized buttons that disrupt font alignment, inconsistent frame sizes, insufficient color contrast for older users, and unclear disabled buttons that leave users uncertain.
          </p>
        </div>
      </section>

      {/* Final Prototype */}
      <section style={{ backgroundColor: '#f9fafb', padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Final Prototype</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '40px' }}>
            Clear flows, cohesive experience
          </h2>
          <div className="two-col-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
            <div className="feature-card">
              <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: '600', color: '#212121', marginBottom: '8px' }}>Appointment Selection</p>
              <p style={{ fontSize: '14px', lineHeight: '20px', color: '#6b7280' }}>Clear and straightforward view of available date and time.</p>
            </div>
            <div className="feature-card">
              <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: '600', color: '#212121', marginBottom: '8px' }}>Confirmation Flow</p>
              <p style={{ fontSize: '14px', lineHeight: '20px', color: '#6b7280' }}>Cohesive flow with easy personal information entry and options to add to calendar, cancel, or reschedule.</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', margin: '0 -200px' }}>
            <Image src="/RHS/final_design_1.png" alt="Final design 1" width={0} height={0} sizes="33vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
            <Image src="/RHS/final_design_2.png" alt="Final design 2" width={0} height={0} sizes="33vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
            <Image src="/RHS/final_design_3.png" alt="Final design 3" width={0} height={0} sizes="33vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* Final Design */}
      <section style={{ padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Final Design</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Intuitive, familiar, and hierarchy-driven
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '24px' }}>
            The final design showcases an enhanced scheduling process that's intuitive yet familiar for both existing and newly onboarded users. Establishing a hierarchical design format from most to least important information minimizes frustration associated with continuous searching and facilitates users in reaching their objectives expeditiously.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            The incorporation of Google's API features ensures a seamless means for users to receive timely reminders of upcoming appointments, thereby mitigating potential conflicts and miscommunications between the business owner and users.
          </p>
          <div style={{ margin: '0 -200px' }}>
            <Image src="/RHS/final_design_full_image.png" alt="Final design screens" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* Introspective */}
      <section style={{ backgroundColor: '#f9fafb', padding: '80px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Introspective</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Learnings
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '48px' }}>
            This project was special because I got to sit down and interview with my client's customers. These face-to-face interviews helped me understand their needs, allowing my client to focus on what he does best — cutting hair — while also reducing any frustrations his customers might have.
          </p>
          <h3 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '16px' }}>Next Steps</h3>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
            Moving forward, I would conduct more research on how I could provide better application accessibility for visually impaired individuals. I would like to partner with developers to bring this to life and brainstorm additional ways to boost customer retention.
          </p>
        </div>
      </section>

      <AnimatedFooter />

    </main>
  )
}
