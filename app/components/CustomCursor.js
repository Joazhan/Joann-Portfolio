'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const raf = useRef(null)

  useEffect(() => {
    // Hide native cursor on desktop
    const style = document.createElement('style')
    style.id = 'custom-cursor-none'
    style.textContent = 'html, body, *, *::before, *::after { cursor: none !important; }'
    document.head.appendChild(style)

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        const overShape = document.body.dataset.overFooterShape === 'true'
        cursorRef.current.style.opacity = overShape ? '0' : '1'
      }
    }
    window.addEventListener('mousemove', move)

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 12}px, ${pos.current.y - 12}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
      document.getElementById('custom-cursor-none')?.remove()
    }
  }, [])

  return (
    <>
      <style>{`@media (max-width: 767px) { .custom-cursor { display: none !important; } }`}</style>
      <div ref={cursorRef} className="custom-cursor" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'opacity 0.15s ease',
      }} />
    </>
  )
}
