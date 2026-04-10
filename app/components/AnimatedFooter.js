'use client'

// All positions are multiples of 28px to align exactly with the background dot grid
// background dots land at x=0,28,56,84... y=0,28,56,84...
const clusters = [
  { left: '56px',   top: '196px', dots: [[0,0],[28,0],[0,28]] },
  { left: '280px',  top: '140px', dots: [[28,0],[0,28],[28,28],[56,28]] },
  { left: '560px',  top: '224px', dots: [[0,0],[28,0],[0,28]] },
  { left: '784px',  top: '168px', dots: [[28,0],[0,28],[28,28],[56,28]] },
  { left: '1064px', top: '252px', dots: [[0,0],[28,0],[0,28]] },
]

export default function AnimatedFooter() {
  return (
    <footer style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '420px',
      backgroundColor: '#FCFCFC',
      backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 2px, transparent 2px)',
      backgroundSize: '28px 28px',
      backgroundPosition: '-14px -14px',
    }}>
      {clusters.map((sp, i) => (
        <div key={i} className="footer-sparkle" style={{ left: sp.left, top: sp.top }}>
          <div className="sparkle-cluster">
            {sp.dots.map(([x, y], j) => (
              <span key={j} style={{ left: x, top: y }} />
            ))}
          </div>
        </div>
      ))}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, padding: '32px 0', paddingLeft: '80px' }}>
        <p style={{ fontSize: '18px', fontWeight: '500', color: '#212121', marginBottom: '8px' }}>Get in touch!</p>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
          <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '16px', color: '#6b7280', textDecoration: 'none' }} className="hover:text-black">Email ↗</a>
          <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#6b7280', textDecoration: 'none' }} className="hover:text-black">Resume ↗</a>
        </div>
        <p style={{ fontSize: '16px', color: '#9ca3af' }}>© Joann Zhang</p>
      </div>
    </footer>
  )
}
