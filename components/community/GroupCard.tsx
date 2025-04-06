// components/community/GroupCard.tsx
'use client'

import { useState } from 'react'

interface GroupCardProps {
  title: string
  emoji: string
  messages: string[]
  onSendMessage: (group: string, message: string) => void
}

export default function GroupCard({ title, emoji, messages, onSendMessage }: GroupCardProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(title, input.trim())
      setInput('')
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold text-white mb-2">{emoji} {title}</h2>
      <div className="h-32 overflow-y-auto bg-gray-700 rounded p-2 mb-2 text-sm text-gray-100 space-y-1">
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-gray-700 text-white p-2 rounded text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="bg-blue-600 px-3 py-1 rounded text-white text-sm">
          Send
        </button>
      </div>
    </div>
  )
}
