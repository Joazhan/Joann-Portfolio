'use client'
import { useState, useRef, useEffect } from 'react'

// Dots sit on the 28px background grid. x/y = top-left corner of dot (center - r).
// d(id, col, row, colorIndex, size) — col/row are grid coordinates
const COLORS = ['#86efac','#fdba74','#93c5fd','#c4b5fd','#fca5a5','#fde68a','#f9a8d4','#99f6e4']
const G = 28

const d = (id, col, row, c, s = 8) => ({
  id, x: col * G - s / 2, y: row * G - s / 2, w: s, h: s, color: COLORS[c % COLORS.length]
})
// Star helper: cx/cy = pixel center of the star, dc/dr = offset in 14px units
const ds = (id, cx, cy, dc, dr, c, s = 8) => ({
  id, x: cx + dc * 14 - s / 2, y: cy + dr * 14 - s / 2, w: s, h: s, color: COLORS[c % COLORS.length]
})

// Direction each shape cluster drifts when hovering
function getDir(id) {
  if (id <=  9) return 'up'      // green triangle
  if (id <= 24) return 'right'   // orange star
  if (id <= 37) return 'up'      // teal circle
  if (id <= 46) return 'down'    // red triangle
  if (id <= 56) return 'left'    // purple triangle
  if (id <= 73) return 'right'   // pink star
  if (id <= 90) return 'down'    // blue star
  const dirs = ['left', 'right', 'up', 'down']
  return dirs[id % 4]            // scattered + rows — alternating mix
}

const INITIAL_SHAPES = [
  // ── Shape 1: GREEN right-pointing triangle — center (84, 532), 14px spacing ──
  ds(1,  84, 532, -2, -2, 0), ds(2,  84, 532, -2, -1, 0), ds(3,  84, 532, -2, 0, 0), ds(4,  84, 532, -2, 1, 0), ds(5,  84, 532, -2, 2, 0),
  ds(6,  84, 532, -1, -1, 0), ds(7,  84, 532, -1,  0, 0), ds(8,  84, 532, -1, 1, 0),
  ds(9,  84, 532,  0,  0, 0),

  // ── Shape 2: ORANGE organic star — center (364, 532), 14px spacing ──
  ds(10, 364, 532,  0, -2, 1),                                            // top spike
  ds(11, 364, 532, -1, -1, 1), ds(12, 364, 532, 0, -1, 1), ds(13, 364, 532, 1, -1, 1),
  ds(14, 364, 532, -2,  0, 1), ds(15, 364, 532, -1,  0, 1), ds(16, 364, 532, 0,  0, 1), ds(17, 364, 532, 1, 0, 1), ds(18, 364, 532, 2, 0, 1),
  ds(19, 364, 532, -1,  1, 1), ds(20, 364, 532,  0,  1, 1), ds(21, 364, 532, 1,  1, 1),
  ds(22, 364, 532, -2,  2, 1), ds(23, 364, 532,  0,  2, 1), ds(24, 364, 532, 2,  2, 1),

  // ── Shape 3: TEAL circle — center (616, 532), 14px spacing ──
  ds(25, 616, 532,  0, -2, 7),
  ds(26, 616, 532, -1, -1, 7), ds(27, 616, 532, 0, -1, 7), ds(28, 616, 532, 1, -1, 7),
  ds(29, 616, 532, -2,  0, 7), ds(30, 616, 532, -1,  0, 7), ds(31, 616, 532, 0,  0, 7), ds(32, 616, 532, 1, 0, 7), ds(33, 616, 532, 2, 0, 7),
  ds(34, 616, 532, -1,  1, 7), ds(35, 616, 532,  0,  1, 7), ds(36, 616, 532, 1,  1, 7),
  ds(37, 616, 532,  0,  2, 7),

  // ── Shape 4: RED right-pointing triangle — center (840, 532), 14px spacing ──
  ds(38, 840, 532, -2, -2, 4), ds(39, 840, 532, -2, -1, 4), ds(40, 840, 532, -2, 0, 4), ds(41, 840, 532, -2, 1, 4), ds(42, 840, 532, -2, 2, 4),
  ds(43, 840, 532, -1, -1, 4), ds(44, 840, 532, -1,  0, 4), ds(45, 840, 532, -1, 1, 4),
  ds(46, 840, 532,  0,  0, 4),

  // ── Shape 5: PURPLE right-pointing triangle — center (1120, 546), 14px spacing ──
  ds(50, 1120, 546, -2, -2, 3), ds(51, 1120, 546, -2, -1, 3), ds(52, 1120, 546, -2, 0, 3), ds(53, 1120, 546, -2, 1, 3), ds(54, 1120, 546, -2, 2, 3),
  ds(55, 1120, 546, -1, -1, 3), ds(56, 1120, 546, -1,  0, 3), ds(47, 1120, 546, -1, 1, 3),
  ds(48, 1120, 546,  0,  0, 3),

  // ── Shape 6: PINK organic star — center (1428, 532), 14px spacing ──
  ds(57, 1428, 532,  0, -2, 6),
  ds(58, 1428, 532, -1, -1, 6), ds(59, 1428, 532, 0, -1, 6), ds(60, 1428, 532, 1, -1, 6),
  ds(61, 1428, 532, -2,  0, 6), ds(62, 1428, 532, -1,  0, 6), ds(63, 1428, 532, 0,  0, 6), ds(64, 1428, 532, 1, 0, 6), ds(65, 1428, 532, 2, 0, 6),
  ds(66, 1428, 532, -1,  1, 6), ds(67, 1428, 532,  0,  1, 6), ds(68, 1428, 532, 1,  1, 6),
  ds(69, 1428, 532, -2,  2, 6), ds(70, 1428, 532, -1,  2, 6), ds(71, 1428, 532, 0,  2, 6), ds(72, 1428, 532, 1,  2, 6), ds(73, 1428, 532, 2,  2, 6),

  // ── Shape 7: BLUE 6-pointed star — center (1736, 532), 14px spacing ──
  ds(74, 1736, 532,  0, -3, 2),                                           // top tip
  ds(75, 1736, 532,  0, -2, 2),                                           // top spike
  ds(76, 1736, 532, -1, -1, 2), ds(77, 1736, 532, 0, -1, 2), ds(78, 1736, 532, 1, -1, 2),
  ds(79, 1736, 532, -3,  0, 2), ds(80, 1736, 532, -2,  0, 2), ds(81, 1736, 532, -1,  0, 2), ds(82, 1736, 532, 0, 0, 2), ds(83, 1736, 532, 1, 0, 2), ds(84, 1736, 532, 2, 0, 2), ds(85, 1736, 532, 3, 0, 2),
  ds(86, 1736, 532, -1,  1, 2), ds(87, 1736, 532,  0,  1, 2), ds(88, 1736, 532, 1,  1, 2),
  ds(89, 1736, 532,  0,  2, 2),                                           // bottom spike
  ds(90, 1736, 532,  0,  3, 2),                                           // bottom tip

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
    INITIAL_SHAPES.map((s, i) => ({ ...s, z: i + 1, dir: getDir(s.id) }))
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

    const applyHoverOffsets = (e) => {
      if (!footerRef.current) return
      const rect = footerRef.current.getBoundingClientRect()
      const cx = (e.clientX - rect.left - rect.width  / 2) / rect.width   // –0.5 → +0.5
      const cy = (e.clientY - rect.top  - rect.height / 2) / rect.height
      const dist = Math.min(Math.sqrt(cx * cx + cy * cy) * 2.5, 1)
      const MAX = 26
      footerRef.current.querySelectorAll('[data-dir]').forEach(el => {
        if (dragging.current && el.dataset.sid === String(dragging.current.id)) return
        const dir = el.dataset.dir
        const tx = dir === 'right' ? dist * MAX : dir === 'left' ? -dist * MAX : 0
        const ty = dir === 'down'  ? dist * MAX : dir === 'up'   ? -dist * MAX : 0
        el.style.transform = `translate(${tx}px, ${ty}px)`
      })
    }

    const clearHoverOffsets = () => {
      if (!footerRef.current) return
      footerRef.current.querySelectorAll('[data-dir]').forEach(el => {
        el.style.transform = 'translate(0px, 0px)'
      })
    }

    const footer = footerRef.current
    footer?.addEventListener('mousemove', applyHoverOffsets)
    footer?.addEventListener('mouseleave', clearHoverOffsets)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
      footer?.removeEventListener('mousemove', applyHoverOffsets)
      footer?.removeEventListener('mouseleave', clearHoverOffsets)
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
          data-dir={shape.dir}
          data-sid={shape.id}
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
            transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
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
