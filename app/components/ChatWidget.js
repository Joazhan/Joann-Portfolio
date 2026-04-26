'use client'

import { useState, useRef, useEffect } from 'react'

const SUGGESTED = [
  "Tell me about NutritionNest",
  "Ask about Joann's favorite part about design",
  "Tell me about Joann's design process",
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm JoannLLM. Ask me anything about Joann's work, skills, or background." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const toggle = () => setOpen(o => !o)
    window.addEventListener('toggle-joannllm', toggle)
    return () => window.removeEventListener('toggle-joannllm', toggle)
  }, [])

  useEffect(() => {
    const page = document.getElementById('joannllm-page')
    if (page) page.style.transform = open ? 'translateX(-380px)' : 'translateX(0)'
  }, [open])

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  async function sendMessage(text) {
    const msg = (text ?? input).trim()
    if (!msg || loading) return

    const newMessages = [...messages, { role: 'user', content: msg }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const apiMessages = newMessages
        .filter(m => !(m.role === 'assistant' && m.content.startsWith("Hi! I'm JoannLLM")))
        .map(m => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!res.ok) throw new Error('Failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        const current = accumulated
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: current }
          return updated
        })
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: "Sorry, I couldn't connect. Please try again." }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const showSuggested = messages.length <= 1

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
        .joannllm-drawer {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 380px;
          background: white;
          border-left: 1px solid rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          z-index: 300;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: -8px 0 40px rgba(0,0,0,0.08);
        }
        @media (max-width: 767px) {
          .joannllm-drawer { width: 100vw; }
        }
      `}</style>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 299, background: 'transparent' }}
        />
      )}

      {/* Drawer */}
      <div
        className="joannllm-drawer"
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px', color: '#212121' }}>✦</span>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#212121' }}>JoannLLM</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#9ca3af', display: 'flex' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '85%',
                padding: msg.role === 'user' ? '10px 14px' : '0',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '0',
                backgroundColor: msg.role === 'user' ? '#212121' : 'transparent',
                color: msg.role === 'user' ? 'white' : '#212121',
                fontSize: '14px',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
              }}>
                {msg.content}
                {loading && i === messages.length - 1 && msg.role === 'assistant' && msg.content === '' && (
                  <span style={{ display: 'inline-flex', gap: '3px', alignItems: 'center' }}>
                    {[0,1,2].map(j => (
                      <span key={j} style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        backgroundColor: '#9ca3af',
                        display: 'inline-block',
                        animation: `bounce 1.2s ease-in-out ${j * 0.2}s infinite`,
                      }}/>
                    ))}
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{ padding: '12px 20px 20px', flexShrink: 0, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', marginBottom: showSuggested ? '12px' : '0' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Joann..."
              rows={1}
              style={{
                flex: 1,
                resize: 'none',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '10px 14px',
                fontSize: '14px',
                fontFamily: 'inherit',
                color: '#212121',
                backgroundColor: '#fafafa',
                outline: 'none',
                lineHeight: '1.5',
                maxHeight: '96px',
                overflowY: 'auto',
              }}
              onFocus={e => { e.target.style.borderColor = '#212121' }}
              onBlur={e => { e.target.style.borderColor = '#e5e7eb' }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: input.trim() && !loading ? '#212121' : '#e5e7eb',
                border: 'none',
                cursor: input.trim() && !loading ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background-color 0.15s ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L13 7L7 13M1 7H13" stroke={input.trim() && !loading ? 'white' : '#9ca3af'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Suggested chips */}
          {showSuggested && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {SUGGESTED.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(0,0,0,0.15)',
                    borderRadius: '999px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    color: '#374151',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#212121'; e.currentTarget.style.color = '#212121' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; e.currentTarget.style.color = '#374151' }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
