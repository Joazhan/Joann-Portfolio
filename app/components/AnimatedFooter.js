'use client'

// shape: 'triangle' | 'star'
const clusters = [
  { left: '3%',  top: '230px', dur: '3.2s', delay: '0s',   shape: 'triangle' },
  { left: '9%',  top: '148px', dur: '2.8s', delay: '1.4s', shape: 'star' },
  { left: '18%', top: '226px', dur: '3.6s', delay: '0.7s', shape: 'triangle' },
  { left: '42%', top: '182px', dur: '2.7s', delay: '3.2s', shape: 'star' },
  { left: '61%', top: '230px', dur: '3.1s', delay: '2.6s', shape: 'triangle' },
]

const triangleDots = [[14,0],[0,24],[28,24]]
const starDots = [[14,0],[28,10],[22,28],[6,28],[0,10],[14,14]]

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
      {clusters.map((sp, i) => {
        const dots = sp.shape === 'star' ? starDots : triangleDots
        return (
          <div key={i} className="footer-sparkle" style={{ left: sp.left, top: sp.top, animationDuration: sp.dur, animationDelay: sp.delay }}>
            <div className="sparkle-cluster">
              {dots.map(([x, y], j) => (
                <span key={j} style={{ left: x, top: y, background: '#000000' }} />
              ))}
            </div>
          </div>
        )
      })}
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
