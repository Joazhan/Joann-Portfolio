'use client'

import Image from 'next/image'

export default function About() {
  return (
    <main className="min-h-screen bg-white" style={{ paddingLeft: '80px', paddingRight: '80px' }}>

      <style>{`
        .shape {
          position: absolute;
          pointer-events: none;
        }
        .exp-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 16px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .exp-row:first-of-type {
          border-top: 1px solid #e5e7eb;
        }
      `}</style>

      {/* Spacer */}
      <div style={{ height: '96px' }} />

      {/* Main content */}
      <div className="flex flex-col items-center" style={{ paddingTop: '60px', paddingBottom: '120px' }}>

        {/* Circular photo with shapes overlaid on top portion */}
        <div style={{ position: 'relative', width: '300px', height: '300px', borderRadius: '50%', overflow: 'hidden', marginBottom: '32px' }}>
          <Image
            src="/Images/0ab9379a-605b-4366-9201-5c53c654f369.jpeg"
            alt="Joann Zhang"
            width={300}
            height={300}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%', transform: 'scale(1.2)' }}
          />
        </div>

        {/* Name + Bio */}
        <div style={{ maxWidth: '540px', width: '100%' }}>
          <h1 style={{ fontSize: '48px', lineHeight: '56px', fontWeight: '700', color: '#111', letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Joann Zhang
          </h1>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#6b7280', marginBottom: '16px' }}>
            As a self-taught Product Designer. I first fell in love with design my senior year of college, and it's been a steady part of my life ever since. It's something that inspires me, challenges me, and gives me a way to make a real impact. What motivates me most is the chance to create work that feels meaningful and sparks a bit of inspiration in others.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: '#6b7280', marginBottom: '48px' }}>
            During my personal time, you'll find me learning to code and playing around with ideas that make AI feel a little more human.
          </p>

          {/* Experience */}
          <p style={{ fontSize: '14px', letterSpacing: '0.08em', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            Experience
          </p>

          <div className="exp-row">
            <span style={{ fontSize: '18px', color: '#111' }}><strong>Iverson</strong> Product Design Intern</span>
            <span style={{ fontSize: '16px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '24px' }}>Nov 2024–May 2025</span>
          </div>
          <div className="exp-row">
            <span style={{ fontSize: '18px', color: '#111' }}><strong>NutritionNest</strong> Product Design Intern</span>
            <span style={{ fontSize: '16px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '24px' }}>Aug 2024–Oct 2024</span>
          </div>
          <div className="exp-row">
            <span style={{ fontSize: '18px', color: '#111' }}><strong>Bookworm</strong> Product Designer</span>
            <span style={{ fontSize: '16px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '24px' }}>May 2023–Jun 2023</span>
          </div>
          <div className="exp-row">
            <span style={{ fontSize: '18px', color: '#111' }}><strong>Raymond Hair Salon</strong> Product Designer</span>
            <span style={{ fontSize: '16px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '24px' }}>Jan 2023–Feb 2023</span>
          </div>
        </div>
      </div>

    </main>
  )
}
