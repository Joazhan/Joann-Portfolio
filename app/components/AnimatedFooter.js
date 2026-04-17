'use client'
import { useState, useRef, useEffect } from 'react'

const STAR_PATH = "M84.7774 53.7775C91.3204 41.5751 94.5919 35.4739 98.0802 34.1447C101.423 32.8708 105.192 33.48 107.964 35.7421C110.856 38.1025 112.039 44.9236 114.405 58.5659C115.025 62.1438 115.336 63.9327 116.116 65.3728C117.058 67.1133 118.496 68.535 120.248 69.4576C121.697 70.221 123.465 70.5068 127.003 71.0785L128.533 71.3258C140.708 73.2936 146.796 74.2775 149.046 76.439C152.37 79.6314 153.082 84.6821 150.77 88.6688C149.204 91.3682 143.626 93.9961 132.468 99.252C129.338 100.727 127.772 101.464 126.629 102.53C124.949 104.095 123.86 106.192 123.543 108.466C123.327 110.014 123.626 111.733 124.222 115.17C126.352 127.455 127.418 133.597 125.969 136.524C124.073 140.354 119.954 142.556 115.716 142.004C112.478 141.583 108.004 137.325 99.0565 128.809L97.2231 127.064C94.4168 124.393 93.0136 123.057 91.3756 122.35C89.8539 121.693 88.1928 121.424 86.5416 121.569C84.7642 121.724 83.0118 122.549 79.5069 124.2L77.2172 125.279C66.0424 130.543 60.455 133.175 57.2486 132.555C53.0533 131.743 49.8373 128.356 49.2447 124.124C48.7917 120.889 51.7376 115.396 57.6293 104.408C59.2781 101.333 60.1025 99.7953 60.3856 98.2585C60.8016 96.0001 60.4276 93.6674 59.3266 91.6522C58.5773 90.2808 57.3239 89.0879 54.8172 86.7021C45.8836 78.1991 41.4168 73.9476 40.7811 70.8924C39.8424 66.3803 42.1089 61.8109 46.2694 59.8282C49.0864 58.4857 55.1741 59.4696 67.3494 61.4374L68.8795 61.6847C72.4169 62.2564 74.1856 62.5422 75.8011 62.2742C77.7539 61.9502 79.5666 61.0539 81.0096 59.6989C82.2035 58.5779 83.0615 56.9778 84.7774 53.7775Z"

// Fewer shapes, varied sizes (small 28-45px, medium 65-85px, large 110-140px), overlapping
const INITIAL_SHAPES = [
  // large
  { id: 1,  type: 'triangle', color: '#22c55e', w: 130, h: 130, x: 0,    y: 468, r: -12 },
  { id: 2,  type: 'star',     color: '#f97316', w: 120, h: 114, x: 90,   y: 455, r: 8   },
  { id: 3,  type: 'circle',   color: '#3b82f6', w: 110, h: 110, x: 290,  y: 480, r: 0   },
  { id: 4,  type: 'triangle', color: '#818cf8', w: 125, h: 125, x: 500,  y: 460, r: 20  },
  { id: 5,  type: 'star',     color: '#ef4444', w: 118, h: 112, x: 720,  y: 452, r: -10 },
  { id: 6,  type: 'circle',   color: '#22c55e', w: 115, h: 115, x: 940,  y: 472, r: 0   },
  { id: 7,  type: 'triangle', color: '#f472b6', w: 128, h: 128, x: 1140, y: 458, r: -18 },
  { id: 8,  type: 'star',     color: '#facc15', w: 120, h: 114, x: 1350, y: 462, r: 14  },
  { id: 9,  type: 'circle',   color: '#f97316', w: 112, h: 112, x: 1560, y: 475, r: 0   },
  { id: 10, type: 'triangle', color: '#2dd4bf', w: 124, h: 124, x: 1760, y: 460, r: 10  },

  // medium
  { id: 11, type: 'star',     color: '#818cf8', w: 80,  h: 76,  x: 50,   y: 510, r: -6  },
  { id: 12, type: 'circle',   color: '#ef4444', w: 72,  h: 72,  x: 220,  y: 495, r: 0   },
  { id: 13, type: 'triangle', color: '#facc15', w: 78,  h: 78,  x: 415,  y: 505, r: 25  },
  { id: 14, type: 'star',     color: '#3b82f6', w: 75,  h: 71,  x: 625,  y: 498, r: -14 },
  { id: 15, type: 'circle',   color: '#f472b6', w: 82,  h: 82,  x: 840,  y: 510, r: 0   },
  { id: 16, type: 'triangle', color: '#22c55e', w: 76,  h: 76,  x: 1055, y: 500, r: -8  },
  { id: 17, type: 'star',     color: '#2dd4bf', w: 78,  h: 74,  x: 1265, y: 506, r: 18  },
  { id: 18, type: 'circle',   color: '#818cf8', w: 74,  h: 74,  x: 1475, y: 496, r: 0   },
  { id: 19, type: 'triangle', color: '#f97316', w: 80,  h: 80,  x: 1680, y: 504, r: -22 },
  { id: 20, type: 'star',     color: '#ef4444', w: 76,  h: 72,  x: 1874, y: 498, r: 6   },

  // small
  { id: 21, type: 'circle',   color: '#facc15', w: 36,  h: 36,  x: 160,  y: 535, r: 0   },
  { id: 22, type: 'star',     color: '#22c55e', w: 42,  h: 40,  x: 355,  y: 528, r: 20  },
  { id: 23, type: 'circle',   color: '#f97316', w: 32,  h: 32,  x: 470,  y: 540, r: 0   },
  { id: 24, type: 'triangle', color: '#3b82f6', w: 40,  h: 40,  x: 578,  y: 530, r: -18 },
  { id: 25, type: 'circle',   color: '#f472b6', w: 38,  h: 38,  x: 790,  y: 542, r: 0   },
  { id: 26, type: 'star',     color: '#818cf8', w: 44,  h: 42,  x: 1010, y: 535, r: -5  },
  { id: 27, type: 'circle',   color: '#2dd4bf', w: 34,  h: 34,  x: 1210, y: 540, r: 0   },
  { id: 28, type: 'triangle', color: '#ef4444', w: 40,  h: 40,  x: 1425, y: 532, r: 15  },
  { id: 29, type: 'circle',   color: '#facc15', w: 36,  h: 36,  x: 1640, y: 540, r: 0   },
  { id: 30, type: 'star',     color: '#22c55e', w: 42,  h: 40,  x: 1840, y: 532, r: -10 },
]

export default function AnimatedFooter() {
  const [shapes, setShapes] = useState(() =>
    INITIAL_SHAPES.map((s, i) => ({ ...s, z: i + 1 }))
  )
  const [topZ, setTopZ] = useState(INITIAL_SHAPES.length + 1)
  const footerRef = useRef(null)
  const dragging = useRef(null)

  useEffect(() => {
    const handleMove = (e) => {
      if (!dragging.current || !footerRef.current) return
      const rect = footerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - dragging.current.offsetX
      const y = e.clientY - rect.top - dragging.current.offsetY
      setShapes(prev =>
        prev.map(s => s.id === dragging.current.id ? { ...s, x, y } : s)
      )
    }
    const handleUp = () => { dragging.current = null }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [])

  const onMouseDown = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    if (!footerRef.current) return
    const rect = footerRef.current.getBoundingClientRect()
    const shape = shapes.find(s => s.id === id)
    const newZ = topZ
    setTopZ(z => z + 1)
    setShapes(prev => prev.map(s => s.id === id ? { ...s, z: newZ } : s))
    dragging.current = {
      id,
      offsetX: e.clientX - rect.left - shape.x,
      offsetY: e.clientY - rect.top - shape.y,
    }
  }

  const renderShape = (shape) => {
    const base = {
      position: 'absolute',
      left: shape.x,
      top: shape.y,
      width: shape.w,
      height: shape.h,
      transform: `rotate(${shape.r}deg)`,
      zIndex: shape.z,
      pointerEvents: 'all',
      userSelect: 'none',
      WebkitUserSelect: 'none',
    }
    if (shape.type === 'circle') {
      return (
        <div key={shape.id} onMouseDown={e => onMouseDown(e, shape.id)}
          style={{ ...base, borderRadius: '50%', backgroundColor: shape.color }} />
      )
    }
    if (shape.type === 'triangle') {
      return (
        <svg key={shape.id} onMouseDown={e => onMouseDown(e, shape.id)}
          style={base} viewBox="0 0 100 100">
          <path d="M 0 0 L 100 50 L 0 100 Z" fill={shape.color} />
        </svg>
      )
    }
    if (shape.type === 'star') {
      return (
        <svg key={shape.id} onMouseDown={e => onMouseDown(e, shape.id)}
          style={base} viewBox="0 0 189 181">
          <path d={STAR_PATH} fill={shape.color} />
        </svg>
      )
    }
  }

  return (
    <footer ref={footerRef} style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '600px',
      backgroundColor: '#FCFCFC',
      backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 2px, transparent 2px)',
      backgroundSize: '28px 28px',
      backgroundPosition: '-14px -14px',
    }}>
      {/* Gradient fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '300px',
        background: 'linear-gradient(to bottom, #FCFCFC 40%, transparent 100%)',
        zIndex: topZ + 1,
        pointerEvents: 'none',
      }} />

      {/* Draggable shapes */}
      {shapes.map(renderShape)}

      {/* Footer content */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: topZ + 2, padding: '72px 0 32px', paddingLeft: '80px', pointerEvents: 'none' }}>
        <p style={{ fontSize: '18px', fontWeight: '500', color: '#212121', marginBottom: '8px', pointerEvents: 'all' }}>Get in touch!</p>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '8px', pointerEvents: 'all' }}>
          <a href="mailto:joannzhang4@gmail.com" style={{ fontSize: '16px', color: '#6b7280', textDecoration: 'none' }} className="hover:text-black">Email ↗</a>
          <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#6b7280', textDecoration: 'none' }} className="hover:text-black">Resume ↗</a>
        </div>
        <p style={{ fontSize: '16px', color: '#9ca3af', pointerEvents: 'all' }}>© Joann Zhang</p>
      </div>
    </footer>
  )
}
