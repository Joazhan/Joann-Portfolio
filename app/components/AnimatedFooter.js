'use client'
import { useState, useRef, useEffect, useMemo } from 'react'
import { flushSync } from 'react-dom'
import { usePathname } from 'next/navigation'

// Monochrome shades for scattered dots
const COLORS = [
  '#1a1a1a','#2d2d2d','#404040','#1a1a1a',
  '#333333','#4a4a4a','#222222','#383838','#2a2a2a',
]
const G = 28

const d = (id, col, row, c, s = 4) => ({
  id, x: col * G - s / 2, y: row * G - s / 2, w: s, h: s, color: COLORS[c % COLORS.length]
})

const INITIAL_SHAPES = [
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

const DOT  = 4
const STEP = 8

const GROUP_SHAPES = [
  { g: 0, type: 'tri-up',    cx: 140,  cy: 440, dir: 'up',    dur: 2.0, delay:  0.0 },
  { g: 1, type: 'square',    cx: 420,  cy: 290, dir: 'right', dur: 2.4, delay: -0.8 },
  { g: 2, type: 'circle',    cx: 680,  cy: 510, dir: 'up',    dur: 1.8, delay: -0.4 },
  { g: 3, type: 'tri-down',  cx: 940,  cy: 360, dir: 'down',  dur: 2.6, delay: -1.2 },
  { g: 4, type: 'tri-right', cx: 1200, cy: 470, dir: 'left',  dur: 2.2, delay: -0.6 },
  { g: 5, type: 'circle',    cx: 1460, cy: 260, dir: 'right', dur: 2.0, delay: -1.0 },
  { g: 6, type: 'square',    cx: 1740, cy: 420, dir: 'down',  dur: 2.8, delay: -0.2 },
]

const PIXEL_MAPS = {
  circle: [
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
  ],
  square: [
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
  ],
  'tri-up': [
    [0,0,0,1,0,0,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
  ],
  'tri-down': [
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
    [0,0,1,1,1,0,0],
    [0,0,0,1,0,0,0],
  ],
  'tri-right': [
    [1,0,0,0,0,0,0],
    [1,1,0,0,0,0,0],
    [1,1,1,0,0,0,0],
    [1,1,1,1,0,0,0],
    [1,1,1,0,0,0,0],
    [1,1,0,0,0,0,0],
    [1,0,0,0,0,0,0],
  ],
}

const DURATIONS = [2.0, 2.4, 1.8, 2.6, 2.2, 1.6, 2.8, 2.1, 2.5, 1.9]
const getDuration = (id) => DURATIONS[id % DURATIONS.length]
const getDelay    = (id) => -((id * 0.37) % 2.6)
const getDir      = (id) => ['left', 'right', 'up', 'down'][id % 4]

export default function AnimatedFooter() {
  const pathname = usePathname()
  const dark = pathname === '/lasertaz'

  const bg         = dark ? '#121212' : '#fbfbfb'
  const dotBg      = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
  const shapeCol   = dark ? '#e8e8e8' : '#1a1a1a'
  const headingCol = dark ? '#ffffff'  : '#212121'
  const linkCol    = dark ? '#9ca3af'  : '#6b7280'
  const linkHover  = dark ? 'hover:text-white' : 'hover:text-black'
  const copyCol    = dark ? '#6b7280'  : '#9ca3af'
  const cursorCol  = dark ? '#d4d4d4'  : '#1a1a1a'

  const [clockTime,   setClockTime]   = useState('')
  const [revealed,    setRevealed]    = useState(false)
  const [fullyLoaded, setFullyLoaded] = useState(false)

  // Per-dot sequential index ordered bottom-to-top, left-to-right
  const dotIndices = useMemo(() =>
    GROUP_SHAPES.map(({ type }) => {
      const grid = PIXEL_MAPS[type]
      const rows = grid.length
      const cols = grid[0].length
      const lookup = grid.map(row => row.map(() => 0))
      let idx = 0
      for (let ri = rows - 1; ri >= 0; ri--) {
        for (let ci = 0; ci < cols; ci++) {
          if (grid[ri][ci]) lookup[ri][ci] = idx++
        }
      }
      return lookup
    })
  , [])

  useEffect(() => {
    const upd = () => setClockTime(new Date().toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short',
    }))
    upd()
    const id = setInterval(upd, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const el = document.querySelector('footer')
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setRevealed(true)
        // Max 7 rows × 150ms = 1050ms + 300ms duration + 150ms buffer
        setTimeout(() => setFullyLoaded(true), 1500)
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const [shapes, setShapes] = useState(() =>
    INITIAL_SHAPES.map((s, i) => ({ ...s, z: i + 1 }))
  )
  const [topZ, setTopZ] = useState(INITIAL_SHAPES.length + 1)
  const [groupPlayKeys, setGroupPlayKeys] = useState(Array(7).fill(0))
  const [groupPlaying,  setGroupPlaying]  = useState(Array(7).fill(false))
  const groupTimers = useRef(Array(7).fill(null))
  const footerRef   = useRef(null)
  const dragging    = useRef(null)
  const cursorRef   = useRef(null)

  useEffect(() => {
    const handleMove = (e) => {
      const drag = dragging.current
      if (!drag || !footerRef.current) return
      const rect = footerRef.current.getBoundingClientRect()
      setShapes(prev => prev.map(s => s.id === drag.id
        ? { ...s, x: e.clientX - rect.left - drag.offsetX, y: e.clientY - rect.top - drag.offsetY }
        : s
      ))
    }
    const handleUp = () => { dragging.current = null }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup',   handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup',   handleUp)
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
    }, 950)
  }

  const onMouseDown = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    if (!footerRef.current) return
    const rect  = footerRef.current.getBoundingClientRect()
    const shape = shapes.find(s => s.id === id)
    setTopZ(z => z + 1)
    setShapes(prev => prev.map(s => s.id === id ? { ...s, z: topZ } : s))
    dragging.current = {
      id,
      offsetX: e.clientX - rect.left - shape.x,
      offsetY: e.clientY - rect.top  - shape.y,
    }
  }

  return (
    <>
    <style>{`
      @keyframes pix-up    { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-14px)} }
      @keyframes pix-down  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(14px)}  }
      @keyframes pix-left  { 0%,100%{transform:translateX(0)}  50%{transform:translateX(-14px)} }
      @keyframes pix-right { 0%,100%{transform:translateX(0)}  50%{transform:translateX(14px)}  }
      @keyframes dot-pop {
        from { transform: scale(0); }
        to   { transform: scale(1); }
      }
      @keyframes water-rise {
        0%   { transform: translateY(0)     scale(1);    }
        28%  { transform: translateY(-13px) scale(1.18); }
        58%  { transform: translateY(4px)   scale(0.92); }
        78%  { transform: translateY(-2px)  scale(1.04); }
        100% { transform: translateY(0)     scale(1);    }
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0px); }
      }
      .footer-canvas, .footer-canvas * { cursor: none !important; }
      @media (max-width: 767px) {
        .footer-content { padding: 20px !important; flex-direction: column !important; gap: 16px !important; align-items: flex-start !important; }
      }
      @keyframes cursor-pulse {
        0%, 100% { transform: translate(-50%,-50%) scale(1);   opacity: 0.9; }
        50%       { transform: translate(-50%,-50%) scale(1.3); opacity: 1;   }
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
        const over = GROUP_SHAPES.some(({ cx, cy, type }) => {
          const grid = PIXEL_MAPS[type]
          const r = grid.length, c = grid[0].length
          const l = Math.round(cx - c*STEP/2), t = Math.round(cy - r*STEP/2)
          return fx >= l - 10 && fx <= l + c*STEP + 10
              && fy >= t - 10 && fy <= t + r*STEP + 10
        })
        el.style.display   = 'block'
        el.style.width     = over ? '14px' : '8px'
        el.style.height    = over ? '14px' : '8px'
        el.style.opacity   = over ? '1' : '0.5'
        el.style.animation = over ? 'cursor-pulse 1s ease-in-out infinite' : 'none'
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
        backgroundImage: `radial-gradient(circle, ${dotBg} 2px, transparent 2px)`,
        backgroundSize: '22px 22px',
        backgroundPosition: '-11px -11px',
      }}>

      {/* Gradient fade at top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '300px',
        background: `linear-gradient(to bottom, ${bg} 40%, transparent 100%)`,
        zIndex: topZ + 1,
        pointerEvents: 'none',
      }} />

      {/* Hitboxes */}
      {GROUP_SHAPES.map(({ g, cx, cy, type }) => {
        const grid = PIXEL_MAPS[type]
        const rows = grid.length, cols = grid[0].length
        return (
          <div key={`hitbox-${g}`}
            onMouseDown={e => { e.preventDefault(); triggerGroup(g) }}
            style={{
              position: 'absolute',
              left: Math.round(cx - cols*STEP/2) - 10, top: Math.round(cy - rows*STEP/2) - 10,
              width: cols*STEP + 20, height: rows*STEP + 20,
              zIndex: 10, cursor: 'none',
            }}
          />
        )
      })}

      {/* Pixel shape groups — SVG circles for pixel-perfect uniformity */}
      {GROUP_SHAPES.map(({ g, type, cx, cy, dir, dur, delay }) => {
        const grid    = PIXEL_MAPS[type]
        const rows    = grid.length
        const cols    = grid[0].length
        const playing = groupPlaying[g]
        const pixAnim = `pix-${dir} ${dur}s steps(5) ${delay}s infinite`
        const centerR = (rows - 1) / 2
        const centerC = (cols - 1) / 2
        const R = DOT / 2
        return (
          <svg
            key={`gs-${g}-${groupPlayKeys[g]}`}
            style={{
              position: 'absolute',
              left: Math.round(cx - cols*STEP/2),
              top:  Math.round(cy - rows*STEP/2),
              overflow: 'visible',
              animation: playing ? 'none' : pixAnim,
              pointerEvents: 'none',
              zIndex: 2,
            }}
            width={cols * STEP}
            height={rows * STEP}
          >
            {grid.flatMap((row, ri) =>
              row.map((cell, ci) => {
                if (!cell) return null
                const layer      = Math.round(Math.hypot(ri - centerR, ci - centerC))
                const entryDelay = (rows - 1 - ri) * 150
                return (
                  <circle
                    key={`${ri}-${ci}`}
                    cx={ci * STEP + R}
                    cy={ri * STEP + R}
                    r={R}
                    fill={shapeCol}
                    style={{
                      transformBox: 'fill-box',
                      transformOrigin: 'center',
                      opacity: revealed ? 1 : 0,
                      animation: playing
                        ? `water-rise 0.72s cubic-bezier(0.34, 1.1, 0.64, 1) ${layer * 65}ms both`
                        : (revealed && !fullyLoaded)
                          ? `dot-pop 300ms cubic-bezier(0.34, 1.56, 0.64, 1) ${entryDelay}ms both`
                          : 'none',
                    }}
                  />
                )
              })
            )}
          </svg>
        )
      })}

      {/* Scattered draggable dots */}
      {shapes.map(shape => {
        const r = shape.w / 2
        return (
          <svg
            key={shape.id}
            onMouseDown={e => onMouseDown(e, shape.id)}
            style={{
              position: 'absolute',
              left: shape.x, top: shape.y,
              overflow: 'visible',
              zIndex: shape.z,
              pointerEvents: 'all',
              userSelect: 'none',
              cursor: 'none',
              animation: dragging.current?.id !== shape.id
                ? `pix-${getDir(shape.id)} ${getDuration(shape.id)}s steps(5) ${getDelay(shape.id)}s infinite`
                : 'none',
            }}
            width={shape.w}
            height={shape.h}
          >
            <circle cx={r} cy={r} r={r} fill={shapeCol} />
          </svg>
        )
      })}

      {/* Footer content — pinned to top */}
      <div
        className="footer-content"
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          zIndex: topZ + 2,
          padding: '40px 64px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 0, pointerEvents: 'all',
          background: dark ? 'transparent' : 'rgba(252,252,252,0.75)',
          backdropFilter: dark ? 'none' : 'blur(16px)', WebkitBackdropFilter: dark ? 'none' : 'blur(16px)',
          padding: '0 24px 20px',
        }}>
          <p style={{ fontSize: '14px', lineHeight: '20px', fontWeight: '400', color: headingCol, margin: 0 }}>
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
            <a href="mailto:joannzhang4@gmail.com"
              style={{ fontSize: '14px', lineHeight: '20px', color: linkCol, textDecoration: 'none', opacity: 0, ...(revealed && { animation: 'fadeUp 500ms ease-out 400ms both' }) }}
              className={linkHover}>Email ↗</a>
            <a href="https://drive.google.com/file/d/10qr8SW-5Bl4sMWUW6xxBK6LH0Zkw3B1w/view?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '14px', lineHeight: '20px', color: linkCol, textDecoration: 'none', opacity: 0, ...(revealed && { animation: 'fadeUp 500ms ease-out 500ms both' }) }}
              className={linkHover}>Resume ↗</a>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, textAlign: 'right', pointerEvents: 'all', alignSelf: 'flex-start' }}>
          <p style={{ fontSize: '14px', lineHeight: '20px', color: headingCol, margin: 0, opacity: 0, ...(revealed && { animation: 'fadeUp 500ms ease-out 300ms both' }) }}>
            © Joann Zhang
          </p>
          <p style={{ fontSize: '14px', lineHeight: '20px', color: copyCol, margin: 0, opacity: 0, ...(revealed && { animation: 'fadeUp 500ms ease-out 400ms both' }) }}>
            {clockTime}
          </p>
        </div>
      </div>
    </footer>

    <div
      ref={cursorRef}
      style={{
        position: 'fixed', left: '-100px', top: '-100px',
        width: '8px', height: '8px',
        borderRadius: '50%',
        backgroundColor: cursorCol,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 99999,
        display: 'none',
        transition: 'width 0.15s ease, height 0.15s ease, opacity 0.15s ease',
      }}
    />
    </>
  )
}
