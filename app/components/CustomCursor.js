'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const raf = useRef(null)

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      // Hide only when over a clickable shape in the footer
      if (cursorRef.current) {
        const overShape = !!e.target.closest?.('.footer-shape-hitbox')
        cursorRef.current.style.opacity = overShape ? '0' : '1'
      }
    }
    window.addEventListener('mousemove', move)
    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 8}px, ${pos.current.y - 8}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div ref={cursorRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: '#ffffff',
      mixBlendMode: 'difference',
      pointerEvents: 'none',
      zIndex: 99999,
    }} />
  )
}
