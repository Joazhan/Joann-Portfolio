'use client'
import { useState, useRef, useEffect } from 'react'

// Dots sit on the 28px background grid (centers at multiples of 28px).
// x/y here = center of dot. Rendered as left: x-r, top: y-r where r = size/2.
const COLORS = ['#86efac','#fdba74','#93c5fd','#c4b5fd','#fca5a5','#fde68a','#f9a8d4','#99f6e4']
const G = 28 // grid unit

// helper: grid dot at (col, row) with color index c and size s
const d = (id, col, row, c, s = 14) => ({
  id, x: col * G - s / 2, y: row * G - s / 2, w: s, h: s, color: COLORS[c % COLORS.length]
})

const INITIAL_SHAPES = [
  // row 21 (y=588) — very bottom, densest
  d(1,  1,  21, 0), d(2,  4,  21, 2), d(3,  7,  21, 5), d(4,  10, 21, 1),
  d(5,  13, 21, 6), d(6,  16, 21, 3), d(7,  19, 21, 4), d(8,  22, 21, 7),
  d(9,  25, 21, 0), d(10, 28, 21, 2), d(11, 31, 21, 5), d(12, 34, 21, 6),
  d(13, 37, 21, 1), d(14, 40, 21, 3), d(15, 43, 21, 4), d(16, 46, 21, 7),
  d(17, 49, 21, 0), d(18, 52, 21, 2), d(19, 55, 21, 5), d(20, 58, 21, 1),
  d(21, 61, 21, 6), d(22, 64, 21, 3), d(23, 67, 21, 4),

  // row 20 (y=560) — slightly sparser
  d(24, 2,  20, 3), d(25, 6,  20, 7), d(26, 11, 20, 0), d(27, 15, 20, 5),
  d(28, 20, 20, 2), d(29, 24, 20, 6), d(30, 29, 20, 1), d(31, 33, 20, 4),
  d(32, 38, 20, 7), d(33, 42, 20, 3), d(34, 47, 20, 0), d(35, 51, 20, 6),
  d(36, 56, 20, 2), d(37, 60, 20, 5), d(38, 65, 20, 1),

  // row 19 (y=532) — more spread
  d(39, 3,  19, 6, 12), d(40, 9,  19, 2, 12), d(41, 17, 19, 4, 12),
  d(42, 26, 19, 7, 12), d(43, 35, 19, 1, 12), d(44, 44, 19, 5, 12),
  d(45, 53, 19, 3, 12), d(46, 62, 19, 0, 12),

  // row 18 (y=504) — sparse
  d(47, 5,  18, 1, 10), d(48, 14, 18, 5, 10), d(49, 23, 18, 3, 10),
  d(50, 36, 18, 6, 10), d(51, 48, 18, 2, 10), d(52, 59, 18, 4, 10),

  // row 17 (y=476) — a few scattered
  d(53, 8,  17, 4,  9), d(54, 27, 17, 0,  9),
  d(55, 45, 17, 7,  9), d(56, 63, 17, 3,  9),
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

      {/* Colored dots on the grid */}
      {shapes.map(shape => (
        <div
          key={shape.id}
          onMouseDown={e => onMouseDown(e, shape.id)}
          style={{
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            width: shape.w,
            height: shape.h,
            borderRadius: '50%',
            backgroundColor: shape.color,
            zIndex: shape.z,
            pointerEvents: 'all',
            userSelect: 'none',
            boxShadow: `0 0 6px 2px ${shape.color}88`,
          }}
        />
      ))}

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
