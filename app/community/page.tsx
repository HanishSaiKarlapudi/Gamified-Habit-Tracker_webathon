// app/community/page.tsx
'use client'

import { useState } from 'react'
import GroupCard from '@/components/community/GroupCard'

const GROUPS = [
  { title: 'Fitness Warriors', emoji: '🏃' },
  { title: 'Mental Wellbeing', emoji: '🧠' },
  { title: 'Personality Builders', emoji: '🌟' },
  { title: 'Productivity Crew', emoji: '🛠' },
  { title: 'Skill Builders', emoji: '📚' },
  { title: 'Spiritual Growth', emoji: '🧘' },
]

export default function CommunityPage() {
  const [chatMessages, setChatMessages] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(GROUPS.map(group => [group.title, []]))
  )

  const handleSendMessage = (group: string, message: string) => {
    setChatMessages(prev => ({
      ...prev,
      [group]: [...(prev[group] || []), `@You: ${message}`]
    }))
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white"> Community</h1>
      <p className="text-zinc-400">Chat with others based on your goals!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {GROUPS.map((group) => (
          <GroupCard
            key={group.title}
            title={group.title}
            emoji={group.emoji}
            messages={chatMessages[group.title] || []}
            onSendMessage={handleSendMessage}
          />
        ))}
      </div>
    </div>
  )
}
