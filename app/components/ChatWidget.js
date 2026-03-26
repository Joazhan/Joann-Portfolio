'use client'

import { useState, useRef, useEffect } from 'react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Joann's portfolio assistant. Ask me anything about her work, skills, or background.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    const newMessages = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    // Add empty assistant message to stream into
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const apiMessages = newMessages
        .filter(m => m.role !== 'assistant' || m.content !== "Hi! I'm Joann's portfolio assistant. Ask me anything about her work, skills, or background.")
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
        updated[updated.length - 1] = {
          role: 'assistant',
          content: "Sorry, I couldn't connect. Please try again.",
        }
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

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Chat with portfolio assistant"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: '#212121',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C5.58 2 2 5.13 2 9c0 1.77.68 3.38 1.8 4.63L3 17l3.5-1.1C7.6 16.6 8.77 17 10 17c4.42 0 8-3.13 8-7s-3.58-8-8-8z" fill="white"/>
          </svg>
        )}
      </button>

      {/* Chat panel */}
      <div
        style={{
          position: 'fixed',
          bottom: '92px',
          right: '28px',
          width: '340px',
          maxHeight: '500px',
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 199,
          border: '1px solid rgba(0,0,0,0.06)',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#212121',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C5.58 2 2 5.13 2 9c0 1.77.68 3.38 1.8 4.63L3 17l3.5-1.1C7.6 16.6 8.77 17 10 17c4.42 0 8-3.13 8-7s-3.58-8-8-8z" fill="white"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#212121', margin: 0 }}>Portfolio Assistant</p>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Ask about Joann&apos;s work</p>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}>
              <div style={{
                maxWidth: '82%',
                padding: '10px 14px',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                backgroundColor: msg.role === 'user' ? '#212121' : '#f5f5f5',
                color: msg.role === 'user' ? 'white' : '#212121',
                fontSize: '14px',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap',
              }}>
                {msg.content}
                {loading && i === messages.length - 1 && msg.role === 'assistant' && msg.content === '' && (
                  <span style={{ display: 'inline-flex', gap: '3px', alignItems: 'center' }}>
                    {[0,1,2].map(j => (
                      <span key={j} style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        backgroundColor: '#9ca3af',
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

        {/* Input */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-end',
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            rows={1}
            style={{
              flex: 1,
              resize: 'none',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '8px 12px',
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
            onClick={sendMessage}
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
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  )
}
