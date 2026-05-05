'use client'

import { useState, useEffect, useRef } from 'react'

const SUGGESTED = [
  "Tell me about NutritionNest",
  "What's Joann's design process?",
  "Tell me about Joann's favorite part of design",
]

const GREETING = "Hi! I'm JoannLLM. Ask me anything about Joann's work, skills, or background."

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Listen for toggle event dispatched from Navbar
  useEffect(() => {
    const handler = () => setOpen(v => !v)
    window.addEventListener('toggle-joannllm', handler)
    return () => window.removeEventListener('toggle-joannllm', handler)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const content = text || input.trim()
    if (!content || loading) return
    setInput('')

    const userMsg = { role: 'user', content }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!res.ok) throw new Error('Request failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''

      // Add empty assistant message that we'll stream into
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        assistantText += decoder.decode(value, { stream: true })
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: assistantText }
          return updated
        })
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I couldn't connect right now. Make sure the API key is set up!",
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <style>{`
        .joannllm-drawer {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 380px;
          background: #FCFCFC;
          border-left: 1px solid rgba(0,0,0,0.08);
          z-index: 300;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -4px 0 24px rgba(0,0,0,0.08);
        }
        .joannllm-drawer.open {
          transform: translateX(0);
        }
        .joannllm-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .joannllm-messages::-webkit-scrollbar { width: 4px; }
        .joannllm-messages::-webkit-scrollbar-track { background: transparent; }
        .joannllm-messages::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 2px; }
        .joannllm-bubble-user {
          align-self: flex-end;
          background: #212121;
          color: #fff;
          padding: 10px 14px;
          border-radius: 18px 18px 4px 18px;
          font-size: 14px;
          line-height: 20px;
          max-width: 80%;
          word-break: break-word;
        }
        .joannllm-bubble-assistant {
          align-self: flex-start;
          background: #f3f4f6;
          color: #212121;
          padding: 10px 14px;
          border-radius: 18px 18px 18px 4px;
          font-size: 14px;
          line-height: 20px;
          max-width: 85%;
          word-break: break-word;
          white-space: pre-wrap;
        }
        .joannllm-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 0 20px 12px;
        }
        .joannllm-chip {
          font-size: 12px;
          line-height: 16px;
          color: rgba(0,0,0,0.5);
          background: none;
          border: 1px solid rgba(0,0,0,0.15);
          border-radius: 20px;
          padding: 6px 12px;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
          font-family: inherit;
        }
        .joannllm-chip:hover {
          border-color: rgba(0,0,0,0.4);
          color: #212121;
          background: rgba(0,0,0,0.03);
        }
        .joannllm-input-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
          padding: 12px 20px 20px;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .joannllm-input {
          flex: 1;
          font-size: 14px;
          line-height: 20px;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 12px;
          padding: 10px 14px;
          resize: none;
          outline: none;
          font-family: inherit;
          background: #fff;
          color: #212121;
          transition: border-color 0.15s;
          max-height: 100px;
          overflow-y: auto;
        }
        .joannllm-input:focus { border-color: rgba(0,0,0,0.3); }
        .joannllm-input::placeholder { color: rgba(0,0,0,0.3); }
        .joannllm-send {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #212121;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s, opacity 0.15s;
        }
        .joannllm-send:hover { background: #000; }
        .joannllm-send:disabled { opacity: 0.35; cursor: not-allowed; }
        .joannllm-dot-loader {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 10px 14px;
          background: #f3f4f6;
          border-radius: 18px 18px 18px 4px;
          align-self: flex-start;
        }
        .joannllm-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(0,0,0,0.25);
          animation: jllm-bounce 1.2s ease-in-out infinite;
        }
        .joannllm-dot:nth-child(2) { animation-delay: 0.2s; }
        .joannllm-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes jllm-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @media (max-width: 767px) {
          .joannllm-drawer { width: 100vw; border-left: none; }
        }
      `}</style>

      <div className={`joannllm-drawer${open ? ' open' : ''}`}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 20px 16px',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>✦</span>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#212121', letterSpacing: '0px' }}>JoannLLM</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(0,0,0,0.4)', borderRadius: '6px',
              transition: 'color 0.15s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="joannllm-messages">
          {/* Greeting */}
          <div className="joannllm-bubble-assistant">{GREETING}</div>

          {messages.map((msg, i) =>
            msg.role === 'user' ? (
              <div key={i} className="joannllm-bubble-user">{msg.content}</div>
            ) : (
              <div key={i} className="joannllm-bubble-assistant">
                {msg.content || <span style={{ opacity: 0.4 }}>…</span>}
              </div>
            )
          )}

          {/* Typing indicator */}
          {loading && messages[messages.length - 1]?.role !== 'assistant' && (
            <div className="joannllm-dot-loader">
              <div className="joannllm-dot" />
              <div className="joannllm-dot" />
              <div className="joannllm-dot" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested chips — only show if no messages yet */}
        {messages.length === 0 && (
          <div className="joannllm-chips">
            {SUGGESTED.map((s) => (
              <button key={s} className="joannllm-chip" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="joannllm-input-row">
          <textarea
            ref={inputRef}
            className="joannllm-input"
            rows={1}
            placeholder="Ask about Joann…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={e => {
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
            }}
          />
          <button
            className="joannllm-send"
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            aria-label="Send"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
