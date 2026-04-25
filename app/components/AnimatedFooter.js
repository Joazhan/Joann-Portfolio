'use client'
import { useState, useRef, useEffect } from 'react'
import { flushSync } from 'react-dom'

// Dots sit on the 28px background grid. x/y = top-left corner of dot (center - r).
// d(id, col, row, colorIndex, size) — col/row are grid coordinates
const COLORS = ['#4ade80','#fb923c','#60a5fa','#a78bfa','#f87171','#fbbf24','#f472b6','#2dd4bf','#EFEFEF']
const G = 28

const d = (id, col, row, c, s = 6) => ({
  id, x: col * G - s / 2, y: row * G - s / 2, w: s, h: s, color: COLORS[c % COLORS.length]
})
// Star helper: cx/cy = pixel center of the star, dc/dr = offset in 14px units
const ds = (id, cx, cy, dc, dr, c, s = 6) => ({
  id, x: cx + dc * 14 - s / 2, y: cy + dr * 14 - s / 2, w: s, h: s, color: COLORS[c % COLORS.length]
})

// Direction each shape cluster drifts automatically
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
  // ── Shape 1: GREEN triangle — center (140, 440) ──
  ds(1,  140, 440, -2, -2, 0), ds(2,  140, 440, -2, -1, 0), ds(3,  140, 440, -2, 0, 0), ds(4,  140, 440, -2, 1, 0), ds(5,  140, 440, -2, 2, 0),
  ds(6,  140, 440, -1, -1, 0), ds(7,  140, 440, -1,  0, 0), ds(8,  140, 440, -1, 1, 0),
  ds(9,  140, 440,  0,  0, 0),

  // ── Shape 2: ORANGE star — center (420, 290) ──
  ds(10, 420, 290,  0, -2, 1),
  ds(11, 420, 290, -1, -1, 1), ds(12, 420, 290, 0, -1, 1), ds(13, 420, 290, 1, -1, 1),
  ds(14, 420, 290, -2,  0, 1), ds(15, 420, 290, -1,  0, 1), ds(16, 420, 290, 0,  0, 1), ds(17, 420, 290, 1, 0, 1), ds(18, 420, 290, 2, 0, 1),
  ds(19, 420, 290, -1,  1, 1), ds(20, 420, 290,  0,  1, 1), ds(21, 420, 290, 1,  1, 1),
  ds(22, 420, 290, -2,  2, 1), ds(23, 420, 290,  0,  2, 1), ds(24, 420, 290, 2,  2, 1),

  // ── Shape 3: TEAL circle — center (680, 510) ──
  ds(25, 680, 510,  0, -2, 7),
  ds(26, 680, 510, -1, -1, 7), ds(27, 680, 510, 0, -1, 7), ds(28, 680, 510, 1, -1, 7),
  ds(29, 680, 510, -2,  0, 7), ds(30, 680, 510, -1,  0, 7), ds(31, 680, 510, 0,  0, 7), ds(32, 680, 510, 1, 0, 7), ds(33, 680, 510, 2, 0, 7),
  ds(34, 680, 510, -1,  1, 7), ds(35, 680, 510,  0,  1, 7), ds(36, 680, 510, 1,  1, 7),
  ds(37, 680, 510,  0,  2, 7),

  // ── Shape 4: RED triangle — center (940, 360) ──
  ds(38, 940, 360, -2, -2, 4), ds(39, 940, 360, -2, -1, 4), ds(40, 940, 360, -2, 0, 4), ds(41, 940, 360, -2, 1, 4), ds(42, 940, 360, -2, 2, 4),
  ds(43, 940, 360, -1, -1, 4), ds(44, 940, 360, -1,  0, 4), ds(45, 940, 360, -1, 1, 4),
  ds(46, 940, 360,  0,  0, 4),

  // ── Shape 5: PURPLE triangle — center (1200, 470) ──
  ds(50, 1200, 470, -2, -2, 3), ds(51, 1200, 470, -2, -1, 3), ds(52, 1200, 470, -2, 0, 3), ds(53, 1200, 470, -2, 1, 3), ds(54, 1200, 470, -2, 2, 3),
  ds(55, 1200, 470, -1, -1, 3), ds(56, 1200, 470, -1,  0, 3), ds(47, 1200, 470, -1, 1, 3),
  ds(48, 1200, 470,  0,  0, 3),

  // ── Shape 6: PINK star — center (1460, 260) ──
  ds(57, 1460, 260,  0, -2, 6),
  ds(58, 1460, 260, -1, -1, 6), ds(59, 1460, 260, 0, -1, 6), ds(60, 1460, 260, 1, -1, 6),
  ds(61, 1460, 260, -2,  0, 6), ds(62, 1460, 260, -1,  0, 6), ds(63, 1460, 260, 0,  0, 6), ds(64, 1460, 260, 1, 0, 6), ds(65, 1460, 260, 2, 0, 6),
  ds(66, 1460, 260, -1,  1, 6), ds(67, 1460, 260,  0,  1, 6), ds(68, 1460, 260, 1,  1, 6),
  ds(69, 1460, 260, -2,  2, 6), ds(70, 1460, 260, -1,  2, 6), ds(71, 1460, 260, 0,  2, 6), ds(72, 1460, 260, 1,  2, 6), ds(73, 1460, 260, 2,  2, 6),

  // ── Shape 7: BLUE 6-pointed star — center (1740, 420) ──
  ds(74, 1740, 420,  0, -3, 2),
  ds(75, 1740, 420,  0, -2, 2),
  ds(76, 1740, 420, -1, -1, 2), ds(77, 1740, 420, 0, -1, 2), ds(78, 1740, 420, 1, -1, 2),
  ds(79, 1740, 420, -3,  0, 2), ds(80, 1740, 420, -2,  0, 2), ds(81, 1740, 420, -1,  0, 2), ds(82, 1740, 420, 0, 0, 2), ds(83, 1740, 420, 1, 0, 2), ds(84, 1740, 420, 2, 0, 2), ds(85, 1740, 420, 3, 0, 2),
  ds(86, 1740, 420, -1,  1, 2), ds(87, 1740, 420,  0,  1, 2), ds(88, 1740, 420, 1,  1, 2),
  ds(89, 1740, 420,  0,  2, 2),
  ds(90, 1740, 420,  0,  3, 2),

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

  // ── Grey background: aligned to CSS background dot positions (11 + n×22) ──
  ...[...Array(27)].flatMap((_, r) => [...Array(86)].map((_, c) => ({
    id: 1000 + r * 86 + c,
    x: 11 + c * 22 - 2,
    y: 11 + r * 22 - 2,
    w: 4, h: 4,
    color: COLORS[8],
  }))),
]

export default function AnimatedFooter() {
  const [shapes, setShapes] = useState(() =>
    INITIAL_SHAPES.map((s, i) => ({ ...s, z: i + 1, dir: getDir(s.id) }))
  )
  // Shape clusters: all dots in the same group share identical duration + delay
  // so they're always at the same animation phase and move as one unit.
  // Scattered dots (id > 90) keep individual timing.
  const DURATIONS = [2.0, 2.4, 1.8, 2.6, 2.2, 1.6, 2.8, 2.1, 2.5, 1.9]
  const getDuration = (id) => {
    if (id <=  9) return 2.0   // green triangle
    if (id <= 24) return 2.4   // orange star
    if (id <= 37) return 1.8   // teal circle
    if (id <= 46) return 2.6   // red triangle
    if (id <= 56) return 2.2   // purple triangle
    if (id <= 73) return 2.0   // pink star
    if (id <= 90) return 2.8   // blue star
    return DURATIONS[id % DURATIONS.length]
  }
  const getDelay = (id) => {
    if (id <=  9) return  0
    if (id <= 24) return -0.8
    if (id <= 37) return -0.4
    if (id <= 46) return -1.2
    if (id <= 56) return -0.6
    if (id <= 73) return -1.0
    if (id <= 90) return -0.2
    return -((id * 0.37) % 2.6)
  }
  const [topZ, setTopZ] = useState(INITIAL_SHAPES.length + 1)
  const [ripples, setRipples] = useState([])
  const rippleCounter = useRef(0)
  // Per-group piano state (7 shape groups)
  const [groupPlayKeys, setGroupPlayKeys] = useState(Array(7).fill(0))
  const [groupPlaying,  setGroupPlaying]  = useState(Array(7).fill(false))
  const groupTimers = useRef(Array(7).fill(null))
  const footerRef = useRef(null)
  const dragging = useRef(null)

  // Which of the 7 shape groups does this id belong to? (-1 = none)
  const shapeGroup = (id) => {
    if (id >=  1 && id <=  9) return 0  // green triangle
    if (id >= 10 && id <= 24) return 1  // orange star
    if (id >= 25 && id <= 37) return 2  // teal circle
    if (id >= 38 && id <= 46) return 3  // red triangle
    if (id >= 47 && id <= 56) return 4  // purple triangle
    if (id >= 57 && id <= 73) return 5  // pink star
    if (id >= 74 && id <= 90) return 6  // blue star
    return -1
  }

  // Distance-from-centroid layer (0 = middle, higher = further out)
  const getPianoLayer = (shape, groupDots) => {
    const cx = groupDots.reduce((s, d) => s + d.x + d.w / 2, 0) / groupDots.length
    const cy = groupDots.reduce((s, d) => s + d.y + d.h / 2, 0) / groupDots.length
    const dist = Math.hypot(shape.x + shape.w / 2 - cx, shape.y + shape.h / 2 - cy)
    if (dist <  8) return 0
    if (dist < 18) return 1
    if (dist < 28) return 2
    return 3
  }

  const triggerRipple = ({ cx, cy, color, startSize = 6 }) => {
    ;[0, 200, 400].forEach(delay => {
      const key = rippleCounter.current++
      setTimeout(() => {
        setRipples(prev => [...prev, { key, cx, cy, color, startSize }])
        setTimeout(() => setRipples(prev => prev.filter(r => r.key !== key)), 1000)
      }, delay)
    })
  }

  useEffect(() => {
    const handleMove = (e) => {
      const drag = dragging.current
      if (!drag || !footerRef.current) return
      const rect = footerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - drag.offsetX
      const y = e.clientY - rect.top - drag.offsetY
      setShapes(prev =>
        prev.map(s => s.id === drag.id ? { ...s, x, y } : s)
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

  const triggerGroup = (g) => {
    if (groupTimers.current[g]) clearTimeout(groupTimers.current[g])
    flushSync(() => {
      setGroupPlayKeys(prev => { const n = [...prev]; n[g]++; return n })
      setGroupPlaying(prev  => { const n = [...prev]; n[g] = true; return n })
    })
    groupTimers.current[g] = setTimeout(() => {
      setGroupPlaying(prev => { const n = [...prev]; n[g] = false; return n })
    }, 900)
  }

  const onMouseDown = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    if (!footerRef.current) return
    const rect = footerRef.current.getBoundingClientRect()
    const shape = shapes.find(s => s.id === id)
    const g = shapeGroup(id)
    if (g >= 0) triggerGroup(g)
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
    <>
    <style>{`
      @keyframes pix-up    { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-14px)} }
      @keyframes pix-down  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(14px)}  }
      @keyframes pix-left  { 0%,100%{transform:translateX(0)}  50%{transform:translateX(-14px)} }
      @keyframes pix-right { 0%,100%{transform:translateX(0)}  50%{transform:translateX(14px)}  }
      @keyframes water-drop {
        0%   { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
        100% { transform: translate(-50%,-50%) scale(5); opacity: 0;   }
      }
      @keyframes piano-bounce {
        0%   { transform: translateY(0);     box-shadow: 0 0 5px  1px var(--glow-dim);    }
        30%  { transform: translateY(-10px); box-shadow: 0 0 18px 7px var(--glow-bright); }
        60%  { transform: translateY(4px);   box-shadow: 0 0 10px 3px var(--glow-mid);    }
        80%  { transform: translateY(-2px);  box-shadow: 0 0 7px  2px var(--glow-dim);    }
        100% { transform: translateY(0);     box-shadow: 0 0 5px  1px var(--glow-dim);    }
      }
    `}</style>
    <footer ref={footerRef} style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '600px',
      backgroundColor: '#FCFCFC',
      backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 2px, transparent 2px)',
      backgroundSize: '22px 22px',
      backgroundPosition: '-11px -11px',
    }}>
      {/* Gradient fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '300px',
        background: 'linear-gradient(to bottom, #FCFCFC 40%, transparent 100%)',
        zIndex: topZ + 1,
        pointerEvents: 'none',
      }} />

      {/* Shape hitboxes — one transparent overlay per group, covers gaps */}
      {[...Array(7)].map((_, g) => {
        const gDots = shapes.filter(s => shapeGroup(s.id) === g)
        const left   = Math.min(...gDots.map(s => s.x)) - 6
        const top    = Math.min(...gDots.map(s => s.y)) - 6
        const right  = Math.max(...gDots.map(s => s.x + s.w)) + 6
        const bottom = Math.max(...gDots.map(s => s.y + s.h)) + 6
        return (
          <div key={`hitbox-${g}`}
            onMouseDown={e => { e.preventDefault(); triggerGroup(g) }}
            style={{ position: 'absolute', left, top, width: right - left, height: bottom - top, zIndex: 10, cursor: 'pointer' }}
          />
        )
      })}

      {/* Dot shapes */}
      {shapes.map(shape => {
        const g = shapeGroup(shape.id)
        const gDots = g >= 0 ? shapes.filter(s => shapeGroup(s.id) === g) : []
        const pianoAnim = g >= 0 && groupPlaying[g]
          ? `piano-bounce 0.6s cubic-bezier(0.34, 1.4, 0.64, 1) ${getPianoLayer(shape, gDots) * 120}ms forwards`
          : null
        const pixAnim = shape.id < 200 && dragging.current?.id !== shape.id
          ? `pix-${shape.dir} ${getDuration(shape.id)}s steps(5) ${getDelay(shape.id)}s infinite`
          : 'none'
        return (
          <div
            key={g >= 0 ? `${shape.id}-${groupPlayKeys[g]}` : shape.id}
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
              zIndex: shape.id >= 1000 ? 1 : shape.z,
              pointerEvents: 'all',
              userSelect: 'none',
              '--glow-dim':    `${shape.color}66`,
              '--glow-mid':    `${shape.color}99`,
              '--glow-bright': `${shape.color}cc`,
              boxShadow: shape.id >= 200 ? 'none' : `0 0 5px 1px ${shape.color}66`,
              animation: pianoAnim ?? pixAnim,
            }}
          />
        )
      })}

      {/* Water-drop ripples */}
      {ripples.map(r => (
        <div key={r.key} style={{
          position: 'absolute',
          left: r.cx,
          top: r.cy,
          width: r.startSize,
          height: r.startSize,
          borderRadius: '50%',
          border: `1.5px solid ${r.color}`,
          pointerEvents: 'none',
          zIndex: topZ + 3,
          animation: 'water-drop 0.9s ease-out forwards',
        }} />
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
    </>
  )
}
