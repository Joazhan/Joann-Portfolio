'use client'

const STAR_PATH = "M84.7774 53.7775C91.3204 41.5751 94.5919 35.4739 98.0802 34.1447C101.423 32.8708 105.192 33.48 107.964 35.7421C110.856 38.1025 112.039 44.9236 114.405 58.5659C115.025 62.1438 115.336 63.9327 116.116 65.3728C117.058 67.1133 118.496 68.535 120.248 69.4576C121.697 70.221 123.465 70.5068 127.003 71.0785L128.533 71.3258C140.708 73.2936 146.796 74.2775 149.046 76.439C152.37 79.6314 153.082 84.6821 150.77 88.6688C149.204 91.3682 143.626 93.9961 132.468 99.252C129.338 100.727 127.772 101.464 126.629 102.53C124.949 104.095 123.86 106.192 123.543 108.466C123.327 110.014 123.626 111.733 124.222 115.17C126.352 127.455 127.418 133.597 125.969 136.524C124.073 140.354 119.954 142.556 115.716 142.004C112.478 141.583 108.004 137.325 99.0565 128.809L97.2231 127.064C94.4168 124.393 93.0136 123.057 91.3756 122.35C89.8539 121.693 88.1928 121.424 86.5416 121.569C84.7642 121.724 83.0118 122.549 79.5069 124.2L77.2172 125.279C66.0424 130.543 60.455 133.175 57.2486 132.555C53.0533 131.743 49.8373 128.356 49.2447 124.124C48.7917 120.889 51.7376 115.396 57.6293 104.408C59.2781 101.333 60.1025 99.7953 60.3856 98.2585C60.8016 96.0001 60.4276 93.6674 59.3266 91.6522C58.5773 90.2808 57.3239 89.0879 54.8172 86.7021C45.8836 78.1991 41.4168 73.9476 40.7811 70.8924C39.8424 66.3803 42.1089 61.8109 46.2694 59.8282C49.0864 58.4857 55.1741 59.4696 67.3494 61.4374L68.8795 61.6847C72.4169 62.2564 74.1856 62.5422 75.8011 62.2742C77.7539 61.9502 79.5666 61.0539 81.0096 59.6989C82.2035 58.5779 83.0615 56.9778 84.7774 53.7775Z"

export default function AnimatedFooter() {
  return (
    <footer style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '600px',
      backgroundColor: '#FCFCFC',
      backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 2px, transparent 2px)',
      backgroundSize: '28px 28px',
      backgroundPosition: '-14px -14px',
    }}>

      {/* Gradient fade from page background into dotted pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '300px',
        background: 'linear-gradient(to bottom, #FCFCFC 40%, transparent 100%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Hero shapes scattered in the footer */}

      {/* Green triangle — left */}
      <svg style={{ position: 'absolute', top: '340px', left: '4%', pointerEvents: 'none' }} width="100" height="100" viewBox="0 0 100 100">
        <path d="M 0 0 L 100 50 L 0 100 Z" fill="#22c55e"/>
      </svg>

      {/* Orange organic star — left-center */}
      <svg style={{ position: 'absolute', top: '380px', left: '22%', pointerEvents: 'none' }} width="90" height="86" viewBox="0 0 189 181">
        <path d={STAR_PATH} fill="#f97316"/>
      </svg>

      {/* Green circle — center-left */}
      <div style={{ position: 'absolute', top: '320px', left: '42%', width: '68px', height: '68px', borderRadius: '50%', backgroundColor: '#22c55e', pointerEvents: 'none' }} />

      {/* Red circle — right */}
      <div style={{ position: 'absolute', top: '360px', right: '6%', width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#ef4444', pointerEvents: 'none' }} />

      {/* Purple triangle — bottom right */}
      <svg style={{ position: 'absolute', bottom: '80px', right: '18%', pointerEvents: 'none' }} width="88" height="88" viewBox="0 0 100 100">
        <path d="M 0 0 L 100 50 L 0 100 Z" fill="#818cf8"/>
      </svg>

      {/* Pink organic star — bottom left */}
      <svg style={{ position: 'absolute', bottom: '60px', left: '8%', pointerEvents: 'none' }} width="96" height="92" viewBox="0 0 189 181">
        <path d={STAR_PATH} fill="#f472b6"/>
      </svg>

      {/* Blue organic star — bottom center-right */}
      <svg style={{ position: 'absolute', bottom: '50px', left: '58%', pointerEvents: 'none' }} width="68" height="65" viewBox="0 0 189 181">
        <path d={STAR_PATH} fill="#3b82f6"/>
      </svg>

      {/* Footer content */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 3, padding: '72px 0 32px', paddingLeft: '80px' }}>
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
