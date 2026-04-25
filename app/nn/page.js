'use client'

import Image from 'next/image'
import { Syne } from 'next/font/google'


const syne = Syne({ subsets: ['latin'], weight: ['600'] })

export default function NutritionNest() {
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
        .content-img {
          max-width: 1100px;
          margin: 0 auto;
          padding-top: 120px;
          padding-bottom: 120px;
        }
        .section-label {
          font-size: 14px;
          line-height: 20px;
          font-weight: 600;
          letter-spacing: 0.4px;
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
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 999px;
          padding: 8px 16px;
          font-size: 14px;
          color: #374151;
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
        }
      `}</style>

      {/* Hero — phone mockups */}
      <div className="page-hero" style={{ backgroundColor: '#f2f4f6', paddingTop: '80px', paddingBottom: '0px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
        <Image
          src="/Images/NN.png"
          alt="NutritionNest app screens"
          width={1200}
          height={700}
          style={{ width: '85%', maxWidth: '1200px', height: 'auto', objectFit: 'contain', paddingBottom: '20px' }}
        />
      </div>

      {/* Title + Overview + sidebar — all in one grid */}
      <section style={{ padding: '120px 40px' }}>
        <div className="content-wide overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '80px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h1 style={{ fontSize: '56px', lineHeight: '64px', fontWeight: '600', letterSpacing: '-0.02em', color: '#212121', marginBottom: '16px' }}>
                NutritionNest
              </h1>
              <p style={{ fontSize: '20px', lineHeight: '28px', color: '#6b7280', maxWidth: '520px' }}>
                AI-powered tracking to log meals, monitor calories, and find healthy recipes
              </p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Overview</p>
              <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
                Serendipitous Dream Inc. (SDI) is a nonprofit organization dedicated to promoting health through scientific research, education, and charity work. We aim to serve the Irvine community first by building an app called NutritionNest, which focuses on helping people achieve their nutrition goals through a meal-logging app powered by AI. As a lead designer of this project, I collaborated closely with the founder, engineer, and social media lead to make their visions come to life.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <p className={`section-label ${syne.className}`}>Team</p>
              <p style={{ fontSize: '16px', color: '#626262', lineHeight: '1.8' }}>Founder<br />Product Designer (Me)<br />Software Engineer<br />Social Media Lead</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Project Timeline</p>
              <p style={{ fontSize: '16px', color: '#626262' }}>4 months</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Outcomes</p>
              <p style={{ fontSize: '16px', color: '#626262', lineHeight: '1.8' }}>8% daily active users<br />~6% goals achieved<br />~10% NPS</p>
            </div>
            <div>
              <p className={`section-label ${syne.className}`}>Links</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <a href="https://figma.com/proto/X7n6zDv38NCC1RPuXzmc7A/NutritionNest-App--v3-?node-id=7267-49023&p=f&t=HunrmP0wBwIdWoYc-0&scaling=scale-down&content-scaling=fixed&page-id=5802%3A73243&starting-point-node-id=7267%3A49023&show-proto-sidebar=1" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#626262', textDecoration: 'none' }} className="hover:text-black">View prototype ↗</a>
                <a href="https://www.figma.com/design/X7n6zDv38NCC1RPuXzmc7A/NutritionNest-App--v3-?node-id=262-218&p=f&t=HunrmP0wBwIdWoYc-0" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#626262', textDecoration: 'none' }} className="hover:text-black">View design file ↗</a>
                <a href="https://figma.com/board/4X9oG3D4vhHr7mBYZd7M5y/NutritionNest-competitive-analaysis?t=pfoHjXtM4MEpUhAp-1" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#626262', textDecoration: 'none' }} className="hover:text-black">View affinity map ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '80px 40px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Image
            src="/Images/Container.png"
            alt="NutritionNest stats"
            width={1200}
            height={250}
            style={{ width: '100%', height: 'auto', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', marginBottom: '16px' }}
          />
          <p style={{ fontSize: '16px', lineHeight: '24px', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center', paddingLeft: '100px', paddingRight: '100px' }}>
            Our team's target outcomes for daily active user rate, increased goal achievement with NED's support, and NPS driven by user referrals highlight the positive impact on engagement and motivation.
          </p>
        </div>
      </section>

      {/* Challenge */}
      <section style={{ backgroundColor: 'rgb(242, 244, 246)', padding: '120px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Challenge</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            How can we make healthy living feel achievable?
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
            I met with the founder to discuss initial concepts of creating a nutrition and fitness app. Our goal was to create an app that supported users in jump-starting their health journey. We ultimately decided to prioritize nutrition to avoid overwhelming users since it serves as the foundation of a successful health journey.
          </p>
        </div>
      </section>

      {/* User Research — includes stats grid (moved from Competitive Analysis) */}
      <section style={{ padding: '0 40px' }}>
        <div className="content-img">
          <p className={`section-label ${syne.className}`}>User Research</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            30+ users reveal struggles with today's apps
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            I first ran online surveys on platforms like Subreddits, Facebook groups, Slack forums, and my professional network, focusing on users' health challenges and obstacles. From 30+ responses, I found that users often struggle to stay motivated, which led to inconsistent use and setbacks in their health goals.
          </p>
          {/* Stats grid — moved here, more horizontal */}
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '80px', marginBottom: '48px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '48px', fontWeight: '700', color: '#212121', letterSpacing: '-0.02em', marginBottom: '8px' }}>70%</p>
              <p style={{ fontSize: '16px', lineHeight: '24px', color: '#6b7280' }}>Prefers MyFitnessPal</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '48px', fontWeight: '700', color: '#212121', letterSpacing: '-0.02em', marginBottom: '8px' }}>90%</p>
              <p style={{ fontSize: '16px', lineHeight: '24px', color: '#6b7280' }}>Unmotivated to log meals</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '48px', fontWeight: '700', color: '#212121', letterSpacing: '-0.02em', marginBottom: '8px' }}>85%</p>
              <p style={{ fontSize: '16px', lineHeight: '24px', color: '#6b7280' }}>Lack of personalization</p>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgb(242, 244, 246)', borderRadius: '16px', padding: '24px' }}>
            <p style={{ fontSize: '12px', letterSpacing: '0.08em', color: '#9ca3af', marginBottom: '16px', fontWeight: '600', textTransform: 'uppercase' }}>30+ responses</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="quote-card">"I need more accountability to keep my workout schedule going."</div>
              <div className="quote-card">"I want something that can help when I feel unmotivated."</div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Analysis — stats grid removed, paragraph becomes caption */}
      <section style={{ backgroundColor: 'rgb(242, 244, 246)', padding: '0 40px' }}>
        <div className="content-img">
          <p className={`section-label ${syne.className}`}>Competitive Analysis</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Everyone's tracking, but no one's commiting
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '12px' }}>
            I began looking into most commonly used nutrition apps to understand similar and different product offerings. Each app offers meal logging, journal, and recipes as commonly used features. User profiles use broad averages from their own data, which can make the guidance feel generic or inaccurate.
          </p>
          <a href="#" style={{ fontSize: '15px', fontWeight: '600', color: '#626262', textDecoration: 'none', display: 'inline-block', marginBottom: '48px' }} className="hover:text-black">View affinity map ↗</a>

          <div style={{ margin: '0 -80px' }}>
            <Image src="/NN/affinity_map_image.avif" alt="User research affinity map" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block', marginBottom: '16px', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center', paddingLeft: '100px', paddingRight: '100px', marginBottom: '40px' }}>
            Affinity map synthesizing 30+ user survey responses to identify shared pain points, motivations, and behavioral patterns across nutrition tracking apps.
          </p>
          <div style={{ margin: '0 -80px' }}>
            <Image src="/NN/competitive_icon_image.avif" alt="Competitive analysis" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block', marginBottom: '16px', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center', paddingLeft: '100px', paddingRight: '100px' }}>
            Competitive analysis of 4 direct competitors lacking in assistance and unique approach which helped guide our app's concept and vision. I found that there's a lack of assistance when users search for nutritional themed questions. These apps may seem like helpful tools, but they aren't helping much with motivation, where consistency is a battle for most people.
          </p>
        </div>
      </section>

      {/* Goal */}
      <section style={{ padding: '0 40px' }}>
        <div className="content-img">
          <p className={`section-label ${syne.className}`}>Goal</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            I proposed 3 main features for our MVP
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '48px' }}>
            Based on our feedback from users, we learned that users struggled to stay motivated with meal logs due to the lack of personalization. Our proposed solution is to focus on features that consisted of customization, engagement, and AI personalization.
          </p>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            {[
              { title: 'Customizable', desc: 'Personalized experiences tailored to individual goals and preferences.' },
              { title: 'Engaging', desc: 'Drive motivation and consistency through meaningful interaction.' },
              { title: 'AI Personalized', desc: 'Deliver guidance powered by AI insights.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ backgroundColor: 'rgb(242, 244, 246)', borderRadius: '16px', padding: '32px', border: '1px solid rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#212121', marginBottom: '8px' }}>{title}</p>
                <p style={{ fontSize: '18px', lineHeight: '28px', color: '#6b7280' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exploration — new section */}
      <section style={{ backgroundColor: 'rgb(242, 244, 246)', padding: '0 40px' }}>
        <div className="content-img">
          <p className={`section-label ${syne.className}`}>Exploration</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Testing different visual approaches
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '40px' }}>
            I explored different design options to guide my vision to test out different visual approaches, allowing me outline the skeleton when structuring my visual hierarchy.
          </p>
          <div style={{ margin: '0 -120px' }}>
            <Image src="/NN/exploration_image (1).png" alt="Exploration" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '0', display: 'block', marginBottom: '16px' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center', paddingLeft: '100px', paddingRight: '100px' }}>
            I explored different design approaches to understand how varying styles, structures, concepts, and constraints can shape the design trajectory.
          </p>
        </div>
      </section>

      {/* Ideation — exploration image removed, second_iteration_image + caption added */}
      <section style={{ padding: '0 40px' }}>
        <div className="content-img">
          <p className={`section-label ${syne.className}`}>Ideation</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Mapping a clear, friction-free journey
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '32px' }}>
            After aligning our goals, I mapped out a user flow to identify bottlenecks and key screens, such as an AI chatbot for personalized support, restaurant listings for healthier dining, a recipes for meal planning, and a user journal for tracking progress.
          </p>
          <div style={{ margin: '0 -80px' }}>
            <Image src="/NN/user_flow_image.png" alt="User flow diagram" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '16px', display: 'block', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center', paddingLeft: '100px', paddingRight: '100px' }}>
            Leveraged user flow to identify potential bottlenecks and prioritize features for the app's overall structure.
          </p>
        </div>
      </section>

      {/* Low Fidelity — updated caption text, centered */}
      <section style={{ backgroundColor: 'rgb(242, 244, 246)', padding: '0 40px' }}>
        <div className="content-img">
          <p className={`section-label ${syne.className}`}>Low Fidelity</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Good start that helped our redirection
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '32px' }}>
            I shared early low-fidelity designs with the team, and while they liked the overall flow, they pointed out a couple of important issues. The floating action button made the interface feel cluttered, and AI wasn't being used to its full potential — it was just a basic chatbot. Because of that, the app came across as just another meal-logging tool.
          </p>
          <div style={{ margin: '0 -200px' }}>
            <Image src="/NN/second_iteration_image.png" alt="Low fidelity wireframes" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '16px', display: 'block', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center', paddingLeft: '100px', paddingRight: '100px' }}>
            First stages of breaking down each tab's features with annotated labels to highlight key design elements and functionality, making them easier to digest.
          </p>
        </div>
      </section>

      {/* Iterations — NED_image moved to Solution, second_iteration moved to Ideation, final_iteration_image1 added */}
      <section style={{ padding: '0 40px' }}>
        <div className="content-img">
          <p className={`section-label ${syne.className}`}>Iterations</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Introducing AI assistant, NED
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '32px' }}>
            We made the chatbot feel more human by renaming it to 'NED,' adding NED cards throughout the app for better support, and giving NED its own tab for easier access. The design was a hit and got the green light to move forward!
          </p>
          <div style={{ margin: '0 -200px' }}>
            <Image src="/NN/final_iteration_image1.webp" alt="Final iteration detail" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '16px', display: 'block', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center', paddingLeft: '100px', paddingRight: '100px' }}>
            Refined flow from journal, recipes, restaurants with NED fully integrated to provide personalized, nutritionist-like guidance. A dedicated NED tab delivers news, challenges, and real-time updates to stay informed and engaged.
          </p>
        </div>
      </section>

      {/* Solution — NN.png removed, NED_image added, final_iteration_image removed, design system stacked */}
      <section style={{ backgroundColor: 'rgb(242, 244, 246)', padding: '0 40px' }}>
        <div className="content-img">
          <p className={`section-label ${syne.className}`}>Solution</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '24px' }}>
            Final designs
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '32px' }}>
            The final design circles back to its core mission providing a customizable and engaging design approach. From onboarding to finding recipes and restaurants, everything adapts to their preferences. NED cards keep users engaged with quick, AI-powered tips and calorie adjustments that fit their daily needs.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '48px' }}>
            <a href="https://figma.com/proto/X7n6zDv38NCC1RPuXzmc7A/NutritionNest-App--v3-?node-id=7267-49023&p=f&t=HunrmP0wBwIdWoYc-0&scaling=scale-down&content-scaling=fixed&page-id=5802%3A73243&starting-point-node-id=7267%3A49023&show-proto-sidebar=1" target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', color: '#626262', textDecoration: 'none' }} className="hover:text-black">View design file ↗</a>
            <a href="https://figma.com/proto/X7n6zDv38NCC1RPuXzmc7A/NutritionNest-App--v3-?node-id=7267-49023&p=f&t=HunrmP0wBwIdWoYc-0&scaling=scale-down&content-scaling=fixed&page-id=5802%3A73243&starting-point-node-id=7267%3A49023&show-proto-sidebar=1" target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', color: '#626262', textDecoration: 'none' }} className="hover:text-black">View prototype ↗</a>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '48px' }}>
            {[
              { title: 'Customizable', desc: 'Personalized experiences tailored to individual goals and preferences.' },
              { title: 'Engaging', desc: 'Drive motivation and consistency through meaningful interaction.' },
              { title: 'AI Personalized', desc: 'Deliver guidance powered by AI insights.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ backgroundColor: '#f2f4f6', borderRadius: '16px', padding: '32px', border: '1px solid rgba(0,0,0,0.08)' }}>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#212121', marginBottom: '8px' }}>{title}</p>
                <p style={{ fontSize: '14px', lineHeight: '22px', color: '#6b7280' }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* NED_image moved here from Iterations */}
          <div style={{ margin: '0 -80px' }}>
            <Image src="/NN/NED_image.avif" alt="NED AI assistant" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', marginBottom: '24px', display: 'block', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '0 -80px 24px -80px' }}>
            <Image src="/NN/onboarding_image.png" alt="Onboarding screens" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block', border: '1px solid rgba(0,0,0,0.1)' }} />
            <Image src="/NN/tab_image.png" alt="Tab navigation" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>

          {/* Design system — stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '0 -80px' }}>
            <Image src="/NN/color_image (1).png" alt="Color system" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block', border: '1px solid rgba(0,0,0,0.1)' }} />
            <Image src="/NN/typography_iamge.png" alt="Typography" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block', border: '1px solid rgba(0,0,0,0.1)' }} />
            <Image src="/NN/component_library_image.png" alt="Component library" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      {/* Introspective */}
      <section style={{ padding: '120px 40px' }}>
        <div className="content">
          <p className={`section-label ${syne.className}`}>Introspective</p>
          <h2 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '32px' }}>
            Learnings
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262', marginBottom: '48px' }}>
            This process was challenging but I learned so much. I gained valuable insights into what makes this app unique and learned the importance of clarifying business goals before diving into design. Understanding user pain points helped me re-evaluate critical design decisions, such as whether NED should remain in a chat room or be integrated throughout the app, ensuring that we address the right problems effectively.
          </p>
          <h3 style={{ fontSize: '40px', lineHeight: '48px', fontWeight: '400', letterSpacing: '-0.02em', color: '#212121', marginBottom: '16px' }}>Next Steps</h3>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#626262' }}>
            If I had more time, I would track which NED touchpoints are most effective in engaging users and helping them achieve their goals. I would also brainstorm strategies to help users reach their nutrition goals faster. Additionally, I would identify underused features, evaluate their potential impact, and focus on enhancing the most valuable ones.
          </p>
        </div>
      </section>



    </main>
  )
}
