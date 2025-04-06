'use client'

import { useState } from 'react'

interface GroupChatProps {
  group: string
}

export default function GroupChat({ group }: GroupChatProps) {
  const [messages, setMessages] = useState<{ type: 'text' | 'media', content: string }[]>([])
  const [input, setInput] = useState('')
  const [media, setMedia] = useState<File | null>(null)

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'text', content: input }])
      setInput('')
    }
    if (media) {
      const mediaURL = URL.createObjectURL(media)
      setMessages([...messages, { type: 'media', content: mediaURL }])
      setMedia(null)
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow bg-white dark:bg-zinc-800">
      <h2 className="text-xl font-semibold mb-2">{group}</h2>

      <div className="h-40 overflow-y-auto border p-2 mb-4 rounded bg-zinc-100 dark:bg-zinc-700">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            {msg.type === 'text' ? (
              <p className="text-sm">{msg.content}</p>
            ) : (
              <img src={msg.content} alt="uploaded" className="max-w-full h-32 rounded object-cover" />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setMedia(e.target.files?.[0] || null)}
          className="text-sm"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Send</button>
      </div>
    </div>
  )
}
