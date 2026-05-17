'use client'
import { useState, useRef, useEffect, useMemo } from 'react'
import { flushSync } from 'react-dom'
import { usePathname } from 'next/navigation'

const COLORS = ['#4ade80','#fb923c','#60a5fa','#a78bfa','#f87171','#fbbf24','#f472b6','#2dd4bf','#3a3a3a']
const DARKER = {
  '#4ade80': '#22c55e',
  '#fb923c': '#f97316',
  '#60a5fa': '#3b82f6',
  '#a78bfa': '#8b5cf6',
  '#f87171': '#ef4444',
  '#fbbf24': '#f59e0b',
  '#f472b6': '#ec4899',
  '#2dd4bf': '#14b8a6',
}
const G = 28

const d = (id, col, row, c, s = 6) => ({
  id, x: Math.round(col * G - s / 2), y: Math.round(row * G - s / 2), w: s, h: s, color: COLORS[c % COLORS.length]
})
const ds = (id, cx, cy, dc, dr, c, s = 6) => ({
  id, x: Math.round(cx + dc * 14 - s / 2), y: Math.round(cy + dr * 14 - s / 2), w: s, h: s, color: COLORS[c % COLORS.length]
})

function getDir(id) {
  if (id <=  9) return 'up'
  if (id <= 24) return 'right'
  if (id <= 37) return 'up'
  if (id <= 46) return 'down'
  if (id <= 56) return 'left'
  if (id <= 73) return 'right'
  if (id <= 90) return 'down'
  const dirs = ['left', 'right', 'up', 'down']
  return dirs[id % 4]
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

  // ── Scattered fill dots ──
  d(91,  6, 21, 5), d(92,  7, 21, 1), d(93,  8, 21, 5),
  d(94, 17, 21, 0), d(95, 18, 21, 7),
  d(96, 26, 21, 3), d(97, 27, 21, 4),
  d(98, 35, 21, 6), d(99, 36, 21, 1),
  d(100,43, 21, 7), d(101,44, 21, 2), d(102,45, 21, 0),
  d(103,55, 21, 3), d(104,56, 21, 6),
  d(105,65, 21, 1), d(106,66, 21, 4),
  d(107, 5, 20, 7), d(108,16, 20, 4), d(109,25, 20, 6),
  d(110,37, 20, 0), d(111,47, 20, 5),

  d(112,  3, 16, 5), d(113,  9, 16, 2), d(114, 14, 16, 0),
  d(115, 19, 16, 7), d(116, 24, 16, 4), d(117, 28, 16, 1),
  d(118, 33, 16, 6), d(119, 38, 16, 3), d(120, 43, 16, 0),
  d(121, 48, 16, 5), d(122, 53, 16, 2), d(123, 58, 16, 7),
  d(124, 63, 16, 4), d(125, 67, 16, 1),

  d(126,  5, 15, 3), d(127, 12, 15, 6), d(128, 20, 15, 1),
  d(129, 30, 15, 4), d(130, 40, 15, 7), d(131, 50, 15, 0),
  d(132, 60, 15, 5), d(133, 66, 15, 2),

  d(134,  8, 14, 2), d(135, 22, 14, 5), d(136, 37, 14, 1),
  d(137, 52, 14, 6), d(138, 64, 14, 3),

  d(139, 15, 13, 7), d(140, 32, 13, 0), d(141, 47, 13, 4),
  d(142, 61, 13, 2),
]

export default function AnimatedFooter() {
  const pathname = usePathname()
  const dark = pathname === '/lasertaz'

  const bg         = dark ? '#121212' : '#FCFCFC'
  const dotColor   = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
  const headingCol = dark ? '#ffffff' : '#212121'
  const linkCol    = dark ? '#9ca3af' : '#6b7280'
  const linkHover  = dark ? 'hover:text-white' : 'hover:text-black'
  const copyCol    = dark ? '#6b7280' : '#9ca3af'

  const [shapes, setShapes] = useState(() =>
    INITIAL_SHAPES.map((s, i) => ({ ...s, z: i + 1, dir: getDir(s.id) }))
  )

  const DURATIONS = [0.5, 0.6, 0.45, 0.65, 0.55, 0.4, 0.7, 0.52, 0.62, 0.48]
  const getDuration = (id) => {
    if (id <=  9) return 0.5
    if (id <= 24) return 0.6
    if (id <= 37) return 0.45
    if (id <= 46) return 0.65
    if (id <= 56) return 0.55
    if (id <= 73) return 0.5
    if (id <= 90) return 0.7
    return DURATIONS[id % DURATIONS.length]
  }
  const getDelay = (id) => {
    if (id <=  9) return  0
    if (id <= 24) return -0.2
    if (id <= 37) return -0.1
    if (id <= 46) return -0.3
    if (id <= 56) return -0.15
    if (id <= 73) return -0.25
    if (id <= 90) return -0.05
    return -((id * 0.09) % 0.5)
  }

  const [topZ, setTopZ] = useState(INITIAL_SHAPES.length + 1)
  const [clockTime, setClockTime] = useState('')
  const [groupPlayKeys, setGroupPlayKeys] = useState(Array(7).fill(0))
  const [groupPlaying,  setGroupPlaying]  = useState(Array(7).fill(false))
  const groupTimers = useRef(Array(7).fill(null))
  const footerRef = useRef(null)
  const dragging = useRef(null)
  const cursorRef = useRef(null)
  const xScaleRef = useRef(1)
  const [canvasWidth, setCanvasWidth] = useState(1900)
  const [revealed, setRevealed] = useState(false)

  const shapeGroup = (id) => {
    if (id >=  1 && id <=  9) return 0
    if (id >= 10 && id <= 24) return 1
    if (id >= 25 && id <= 37) return 2
    if (id >= 38 && id <= 46) return 3
    if (id >= 47 && id <= 56) return 4
    if (id >= 57 && id <= 73) return 5
    if (id >= 74 && id <= 90) return 6
    return -1
  }

  // Unscaled group center x/y — used to preserve internal dot spacing on mobile
  const groupCenters = useMemo(() =>
    Array.from({ length: 7 }, (_, g) => {
      const gDots = shapes.filter(s => shapeGroup(s.id) === g)
      if (!gDots.length) return 0
      return gDots.reduce((sum, s) => sum + s.x, 0) / gDots.length
    })
  , [shapes])

  const groupCentersY = useMemo(() =>
    Array.from({ length: 7 }, (_, g) => {
      const gDots = shapes.filter(s => shapeGroup(s.id) === g)
      if (!gDots.length) return 0
      return gDots.reduce((sum, s) => sum + s.y, 0) / gDots.length
    })
  , [shapes])

  const groupBounds = useMemo(() => {
    const sc = canvasWidth / 1900
    const isMobile = canvasWidth < 768
    const internalScale = isMobile ? 6 / 14 : 1
    return Array.from({ length: 7 }, (_, g) => {
      if (isMobile && (g === 3 || g === 6)) return null
      const gDots = shapes.filter(s => shapeGroup(s.id) === g)
      if (!gDots.length) return null
      const gcx = groupCenters[g]
      const gcy = groupCentersY[g]
      return {
        left:   gcx * sc + (Math.min(...gDots.map(s => s.x)) - gcx) * internalScale - 10,
        top:    gcy + (Math.min(...gDots.map(s => s.y)) - gcy) * internalScale - 10,
        right:  gcx * sc + (Math.max(...gDots.map(s => s.x + s.w)) - gcx) * internalScale + 10,
        bottom: gcy + (Math.max(...gDots.map(s => s.y + s.h)) - gcy) * internalScale + 10,
        color:  gDots[0].color,
      }
    })
  }, [shapes, canvasWidth, groupCenters, groupCentersY])

  // Row index by vertical distance from group centroid — each row is 14px apart
  const getPianoLayer = (shape, groupDots) => {
    const cy = groupDots.reduce((s, d) => s + d.y + d.h / 2, 0) / groupDots.length
    const vDist = Math.abs(shape.y + shape.h / 2 - cy)
    return Math.round(vDist / 14)
  }

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true,
      })
      const tzAbbr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles', timeZoneName: 'short',
      }).formatToParts(now).find(p => p.type === 'timeZoneName')?.value || 'PT'
      setClockTime(`${timeStr} ${tzAbbr}`)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMove = (e) => {
      const drag = dragging.current
      if (!drag || !footerRef.current) return
      const rect = footerRef.current.getBoundingClientRect()
      const sc = xScaleRef.current
      setShapes(prev => prev.map(s => s.id === drag.id
        ? { ...s, x: (e.clientX - rect.left - drag.offsetX) / sc, y: e.clientY - rect.top - drag.offsetY }
        : s
      ))
    }
    const handleUp = () => { dragging.current = null }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [])

  // Track footer width for responsive x-scaling
  useEffect(() => {
    const update = () => {
      if (!footerRef.current) return
      const w = footerRef.current.offsetWidth
      setCanvasWidth(w)
      xScaleRef.current = w / 1900
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
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

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true)
        obs.disconnect()
      }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])


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
      offsetX: e.clientX - rect.left - shape.x * xScaleRef.current,
      offsetY: e.clientY - rect.top - shape.y,
    }
  }

  return (
    <>
    <style>{`
      @keyframes pix-up    { from{transform:translateY(0)}  to{transform:translateY(-16px)} }
      @keyframes pix-down  { from{transform:translateY(0)}  to{transform:translateY(16px)}  }
      @keyframes pix-left  { from{transform:translateX(0)}  to{transform:translateX(-16px)} }
      @keyframes pix-right { from{transform:translateX(0)}  to{transform:translateX(16px)}  }
      .footer-canvas, .footer-canvas * { cursor: none !important; }
      .footer-link:hover { color: rgb(0,0,0) !important; }
      @media (max-width: 767px) {
        .footer-canvas { min-height: 420px !important; }
        .footer-content { padding: 20px !important; }
        .footer-content p,
        .footer-content p span,
        .footer-content .footer-link {
          font-size: 14px !important;
          line-height: 20px !important;
        }
      }
      @keyframes cursor-glow {
        0%, 100% { box-shadow: 0 0 8px 3px var(--cursor-color); }
        50%       { box-shadow: 0 0 18px 7px var(--cursor-color); }
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes piano-bounce {
        0%   { transform: translateY(0);     box-shadow: 0 0 4px 1px var(--glow-dim);    }
        30%  { transform: translateY(-18px); box-shadow: 0 0 20px 8px var(--glow-bright); }
        65%  { transform: translateY(5px);   box-shadow: 0 0 8px  3px var(--glow-mid);    }
        85%  { transform: translateY(-2px);  box-shadow: 0 0 5px  1px var(--glow-dim);    }
        100% { transform: translateY(0);     box-shadow: 0 0 4px  1px var(--glow-dim);    }
      }
    `}</style>
    <footer
      ref={footerRef}
      className="footer-canvas"
      onMouseMove={e => {
        const el = cursorRef.current
        if (!el || !footerRef.current) return
        el.style.left = e.clientX + 'px'
        el.style.top  = e.clientY + 'px'
        const rect = footerRef.current.getBoundingClientRect()
        const fx = e.clientX - rect.left
        const fy = e.clientY - rect.top
        const hit = groupBounds.find(b => b && fx >= b.left && fx <= b.right && fy >= b.top && fy <= b.bottom)
        if (hit) {
          const cc = DARKER[hit.color] || hit.color
          el.style.display = 'block'
          el.style.backgroundColor = cc
          el.style.boxShadow = `0 0 10px 4px ${cc}88`
          el.style.setProperty('--cursor-color', `${cc}bb`)
          el.style.animation = 'cursor-glow 1s ease-in-out infinite'
        } else {
          el.style.display = 'none'
        }
      }}
      onMouseLeave={() => {
        if (cursorRef.current) cursorRef.current.style.display = 'none'
      }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '600px',
        cursor: 'none',
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle, ${dotColor} 1.5px, transparent 1.5px)`,
        backgroundSize: '10px 10px',
        backgroundPosition: '0px 0px',
      }}>

      {/* Dots + hitboxes shifted up */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: 'translateY(-60px)', pointerEvents: 'none' }}>

      {/* Shape hitboxes */}
      {[...Array(7)].map((_, g) => {
        const isMobile = canvasWidth < 768
        if (isMobile && (g === 3 || g === 6)) return null
        const gDots = shapes.filter(s => shapeGroup(s.id) === g)
        const sc = canvasWidth / 1900
        const internalScale = isMobile ? 6 / 14 : 1
        const gcx = groupCenters[g]
        const gcy = groupCentersY[g]
        const left   = gcx * sc + (Math.min(...gDots.map(s => s.x)) - gcx) * internalScale - 6
        const top    = gcy + (Math.min(...gDots.map(s => s.y)) - gcy) * internalScale - 6
        const right  = gcx * sc + (Math.max(...gDots.map(s => s.x + s.w)) - gcx) * internalScale + 6
        const bottom = gcy + (Math.max(...gDots.map(s => s.y + s.h)) - gcy) * internalScale + 6
        return (
          <div key={`hitbox-${g}`}
            className="footer-shape-hitbox"
            onMouseDown={e => {
              e.preventDefault()
              triggerGroup(g)
            }}
            style={{ position: 'absolute', left, top, width: right - left, height: bottom - top, zIndex: 10, cursor: 'none', pointerEvents: 'all' }}
          />
        )
      })}

      {/* Dots */}
      {shapes.map(shape => {
        const g = shapeGroup(shape.id)
        const gDots = g >= 0 ? shapes.filter(s => shapeGroup(s.id) === g) : []
        const pianoAnim = g >= 0 && groupPlaying[g]
          ? `piano-bounce 0.55s ease-out ${getPianoLayer(shape, gDots) * 90}ms both`
          : null
        const pixAnim = shape.id < 200 && dragging.current?.id !== shape.id
          ? `pix-${shape.dir} ${getDuration(shape.id)}s steps(4, end) ${getDelay(shape.id)}s infinite alternate`
          : 'none'
        const sc = canvasWidth / 1900
        const isMobile = canvasWidth < 768
        // Remove red triangle (g=3) and blue star (g=6) on mobile
        if (isMobile && (g === 3 || g === 6)) return null
        const dotSc = isMobile ? 0.6 : 1
        const dw = Math.round(shape.w * dotSc)
        const dh = Math.round(shape.h * dotSc)
        const revealDelay = g >= 0 ? g * 80 : Math.round((shape.x / 1900) * 400)
        // On mobile: scale group center but tighten internal spacing to ~2px gap between dots
        const internalScale = isMobile ? 6 / 14 : 1
        const scaledX = g >= 0
          ? groupCenters[g] * sc + (shape.x - groupCenters[g]) * internalScale
          : shape.x * sc
        const scaledY = g >= 0
          ? groupCentersY[g] + (shape.y - groupCentersY[g]) * internalScale
          : shape.y

        return (
          <div
            key={shape.id}
            style={{
              position: 'absolute',
              left: scaledX,
              top: scaledY,
              width: dw,
              height: dh,
              opacity: 0,
              ...(revealed && { animation: `fadeUp 500ms ease-out ${revealDelay}ms both` }),
              zIndex: shape.id >= 1000 ? 1 : shape.z,
              pointerEvents: 'none',
            }}
          >
            <div
              key={g >= 0 ? `p-${shape.id}-${groupPlayKeys[g]}` : `p-${shape.id}`}
              data-sid={shape.id}
              onMouseDown={e => onMouseDown(e, shape.id)}
              style={{
                width: dw,
                height: dh,
                borderRadius: '50%',
                backgroundColor: shape.color,
                pointerEvents: 'all',
                userSelect: 'none',
                '--glow-dim':    `${shape.color}66`,
                '--glow-mid':    `${shape.color}99`,
                '--glow-bright': `${shape.color}cc`,
                willChange: 'transform',
                boxShadow: `0 0 3px 0px ${shape.color}cc`,
                animation: pianoAnim ?? pixAnim,
              }}
            />
          </div>
        )
      })}

      </div>{/* end shifted dots wrapper */}

      {/* Footer content */}
      <div className='footer-content' style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        zIndex: topZ + 2,
        padding: '72px 64px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '4px',
          background: 'transparent',
          pointerEvents: 'all',
        }}>
          <p style={{ fontSize: '16px', lineHeight: '24px', fontWeight: '400', color: headingCol, margin: 0 }}>
            {['Get', 'in', 'touch!'].map((word, i) => (
              <span key={word} style={{
                display: 'inline-block',
                marginRight: i < 2 ? '0.28em' : 0,
                opacity: 0,
                ...(revealed && { animation: `fadeUp 500ms ease-out ${i * 100}ms both` }),
              }}>{word}</span>
            ))}
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href='mailto:joannzhang4@gmail.com'
              style={{ fontSize: '16px', lineHeight: '24px', color: linkCol, textDecoration: 'none', opacity: 0, ...(revealed && { animation: 'fadeUp 500ms ease-out 400ms both' }) }}
              className={`footer-link ${linkHover}`}>Email ↗</a>
            <a href='https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing' target='_blank' rel='noopener noreferrer'
              style={{ fontSize: '16px', lineHeight: '24px', color: '#6b7280', textDecoration: 'none', opacity: 0, ...(revealed && { animation: 'fadeUp 500ms ease-out 500ms both' }) }}
              className={`footer-link ${linkHover}`}>Resume ↗</a>
          </div>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'right',
          background: 'transparent',
          pointerEvents: 'all',
        }}>
          <p style={{ fontSize: '16px', lineHeight: '24px', color: 'rgb(33, 33, 33)', margin: 0, opacity: 0, ...(revealed && { animation: 'fadeUp 500ms ease-out 300ms both' }) }}>© Joann Zhang</p>
          <p style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '16px', lineHeight: '24px', color: copyCol, margin: 0, opacity: 0, ...(revealed && { animation: 'fadeUp 500ms ease-out 400ms both' }) }}>{clockTime}</p>
        </div>
      </div>
    </footer>

    {/* Custom glowing cursor */}
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        left: '-100px', top: '-100px',
        width: '12px', height: '12px',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 99999,
        display: 'none',
      }}
    />
    </>
  )
}
