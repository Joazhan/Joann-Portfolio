'use client'
import { useState, useRef, useEffect } from 'react'

// Dots sit on the 28px background grid. x/y = top-left corner of dot (center - r).
// d(id, col, row, colorIndex, size) — col/row are grid coordinates
const COLORS = ['#86efac','#fdba74','#93c5fd','#c4b5fd','#fca5a5','#fde68a','#f9a8d4','#99f6e4']
const G = 28

const d = (id, col, row, c, s = 8) => ({
  id, x: col * G - s / 2, y: row * G - s / 2, w: s, h: s, color: COLORS[c % COLORS.length]
})

const INITIAL_SHAPES = [
  // ── Shape 1: GREEN right-pointing triangle (col 2–4, rows 17–21) ──
  // base col
  d(1,  2, 17, 0), d(2,  2, 18, 0), d(3,  2, 19, 0), d(4,  2, 20, 0), d(5,  2, 21, 0),
  // middle col
  d(6,  3, 18, 0), d(7,  3, 19, 0), d(8,  3, 20, 0),
  // tip
  d(9,  4, 19, 0),

  // ── Shape 2: ORANGE organic star (center col 13, rows 17–21) ──
  d(10, 13, 17, 1),                                                        // top spike
  d(11, 12, 18, 1), d(12, 13, 18, 1), d(13, 14, 18, 1),                  // upper body
  d(14, 11, 19, 1), d(15, 12, 19, 1), d(16, 13, 19, 1),                  // wide middle
  d(17, 14, 19, 1), d(18, 15, 19, 1),                                     // wide middle right
  d(19, 12, 20, 1), d(20, 13, 20, 1), d(21, 14, 20, 1),                  // lower body
  d(22, 11, 21, 1), d(23, 13, 21, 1), d(24, 15, 21, 1),                  // bottom spikes

  // ── Shape 3: TEAL circle (center col 22, rows 17–21) ──
  d(25, 22, 17, 7),
  d(26, 21, 18, 7), d(27, 22, 18, 7), d(28, 23, 18, 7),
  d(29, 20, 19, 7), d(30, 21, 19, 7), d(31, 22, 19, 7), d(32, 23, 19, 7), d(33, 24, 19, 7),
  d(34, 21, 20, 7), d(35, 22, 20, 7), d(36, 23, 20, 7),
  d(37, 22, 21, 7),

  // ── Shape 4: RED right-pointing triangle (col 29–32, rows 17–21) ──
  // base col
  d(38, 29, 17, 4), d(39, 29, 18, 4), d(40, 29, 19, 4), d(41, 29, 20, 4), d(42, 29, 21, 4),
  // middle col
  d(43, 30, 18, 4), d(44, 30, 19, 4), d(45, 30, 20, 4),
  // tip
  d(46, 31, 19, 4),

  // ── Shape 5: PURPLE right-pointing triangle (col 39–41, rows 18–21, shifted down) ──
  d(50, 39, 18, 3), d(51, 39, 19, 3), d(52, 39, 20, 3), d(53, 39, 21, 3),
  d(54, 40, 19, 3), d(55, 40, 20, 3),
  d(56, 41, 19, 3),

  // ── Shape 6: PINK organic star (center col 51, rows 17–21) ──
  d(57, 51, 17, 6),                                                        // top spike
  d(58, 49, 18, 6), d(59, 50, 18, 6), d(60, 51, 18, 6),                  // upper
  d(61, 52, 18, 6), d(62, 53, 18, 6),                                     // upper right
  d(63, 50, 19, 6), d(64, 51, 19, 6), d(65, 52, 19, 6),                  // center
  d(66, 49, 20, 6), d(67, 50, 20, 6), d(68, 51, 20, 6),                  // lower
  d(69, 52, 20, 6), d(70, 53, 20, 6),                                     // lower right
  d(71, 50, 21, 6), d(72, 51, 21, 6), d(73, 52, 21, 6),                  // bottom

  // ── Shape 7: BLUE organic star (center col 62, rows 17–21) ──
  d(74, 62, 17, 2),                                                        // top spike
  d(75, 60, 18, 2), d(76, 61, 18, 2), d(77, 62, 18, 2),                  // upper
  d(78, 63, 18, 2), d(79, 64, 18, 2),                                     // upper right
  d(80, 61, 19, 2), d(81, 62, 19, 2), d(82, 63, 19, 2),                  // center
  d(83, 60, 20, 2), d(84, 61, 20, 2), d(85, 62, 20, 2),                  // lower
  d(86, 63, 20, 2), d(87, 64, 20, 2),                                     // lower right
  d(88, 61, 21, 2), d(89, 62, 21, 2), d(90, 63, 21, 2),                  // bottom

  // ── Scattered fill dots between shapes ──
  d(91,  6, 21, 5), d(92,  7, 21, 1), d(93,  8, 21, 5),
  d(94, 17, 21, 0), d(95, 18, 21, 7),
  d(96, 26, 21, 3), d(97, 27, 21, 4),
  d(98, 35, 21, 6), d(99, 36, 21, 1),
  d(100,43, 21, 7), d(101,44, 21, 2), d(102,45, 21, 0),
  d(103,55, 21, 3), d(104,56, 21, 6),
  d(105,65, 21, 1), d(106,66, 21, 4),
  d(107, 5, 20, 7), d(108,16, 20, 4), d(109,25, 20, 6),
  d(110,37, 20, 0), d(111,47, 20, 5),

  // ── Row 16 ──
  d(112,  3, 16, 5), d(113,  9, 16, 2), d(114, 14, 16, 0),
  d(115, 19, 16, 7), d(116, 24, 16, 4), d(117, 28, 16, 1),
  d(118, 33, 16, 6), d(119, 38, 16, 3), d(120, 43, 16, 0),
  d(121, 48, 16, 5), d(122, 53, 16, 2), d(123, 58, 16, 7),
  d(124, 63, 16, 4), d(125, 67, 16, 1),

  // ── Row 15 ──
  d(126,  5, 15, 3), d(127, 12, 15, 6), d(128, 20, 15, 1),
  d(129, 30, 15, 4), d(130, 40, 15, 7), d(131, 50, 15, 0),
  d(132, 60, 15, 5), d(133, 66, 15, 2),

  // ── Row 14 ──
  d(134,  8, 14, 2), d(135, 22, 14, 5), d(136, 37, 14, 1),
  d(137, 52, 14, 6), d(138, 64, 14, 3),

  // ── Row 13 ──
  d(139, 15, 13, 7), d(140, 32, 13, 0), d(141, 47, 13, 4),
  d(142, 61, 13, 2),
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

      {/* Dot shapes */}
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
            boxShadow: `0 0 5px 1px ${shape.color}66`,
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
