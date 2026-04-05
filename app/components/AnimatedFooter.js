'use client'

const clusters = [
  { left: '4%',  top: '40px',  dur: '2.8s', delay: '0s',   dots: [[0,0],[28,0],[0,28],[28,28],[56,28]] },
  { left: '16%', top: '140px', dur: '3.4s', delay: '1.3s', dots: [[0,0],[28,0],[28,28]] },
  { left: '30%', top: '50px',  dur: '2.5s', delay: '2.7s', dots: [[0,0],[28,0],[0,28],[56,0]] },
  { left: '47%', top: '160px', dur: '3.8s', delay: '0.6s', dots: [[0,0],[28,28],[56,0],[28,0]] },
  { left: '62%', top: '30px',  dur: '2.9s', delay: '4.1s', dots: [[0,0],[28,0],[0,28]] },
  { left: '76%', top: '120px', dur: '3.2s', delay: '1.9s', dots: [[0,0],[28,0],[28,28],[56,28]] },
  { left: '88%', top: '60px',  dur: '2.6s', delay: '3.3s', dots: [[0,0],[0,28],[28,28]] },
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
        <div key={i} className="footer-sparkle" style={{ left: sp.left, top: sp.top, animationDuration: sp.dur, animationDelay: sp.delay }}>
          <div className="sparkle-cluster">
            {sp.dots.map(([x, y], j) => (
              <span key={j} style={{ left: x, top: y }} />
            ))}
          </div>
        </div>
      ))}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, padding: '32px 0' }}>
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
