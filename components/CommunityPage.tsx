'use client'

import { useEffect, useState } from 'react'
import GroupCard from '@/components/community/GroupCard'

const GROUPS = [
  { title: 'Fitness Warriors', emoji: '🏃' },
  { title: 'Mental Wellbeing', emoji: '🧠' },
  { title: 'Personality Builders', emoji: '🌟' },
  { title: 'Productivity Crew', emoji: '🛠' },
  { title: 'Skill Builders', emoji: '📚' },
  { title: 'Spiritual Growth', emoji: '🧘' },
]

// Demo messages
const DEMO_MESSAGES: Record<string, string[]> = {
  'Fitness Warriors': ['@Ash: Completed 5K run 💪', '@Mira: Starting my yoga now!'],
  'Mental Wellbeing': ['@Luna: Journaling helps me clear my mind ✍️'],
  'Personality Builders': ['@Jake: Practicing confidence speaking today!'],
  'Productivity Crew': ['@Tina: Finished my deep work session 📈'],
  'Skill Builders': ['@Ali: Just learned about React Hooks!'],
  'Spiritual Growth': ['@Zen: Morning meditation done 🧘‍♂️'],
}

const username = typeof window !== 'undefined' ? localStorage.getItem('username') || 'user' : 'user'

export default function CommunityPage() {
  const [chatMessages, setChatMessages] = useState<Record<string, string[]>>({})

  useEffect(() => {
    const stored = localStorage.getItem(`habitwise-chat-${username}`)
    if (stored) {
      setChatMessages(JSON.parse(stored))
    } else {
      // Set demo messages only if not already stored
      setChatMessages(DEMO_MESSAGES)
      localStorage.setItem(`habitwise-chat-${username}`, JSON.stringify(DEMO_MESSAGES))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(`habitwise-chat-${username}`, JSON.stringify(chatMessages))
  }, [chatMessages])

  const handleSendMessage = (group: string, message: string) => {
    setChatMessages(prev => ({
      ...prev,
      [group]: [...(prev[group] || []), `@${username}: ${message}`]
    }))
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Habitwise Community</h1>
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
