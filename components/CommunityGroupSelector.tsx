'use client'

import { useState } from 'react'

const groups = ['Fitness', 'Mental Well-being', 'Personality', 'Productivity', 'Learning & Skill-building']

export default function CommunityGroupSelector({ onSelect }: { onSelect: (group: string) => void }) {
  const [activeGroup, setActiveGroup] = useState(groups[0])

  return (
    <div className="flex gap-4 mb-4 overflow-x-auto">
      {groups.map((group) => (
        <button
          key={group}
          onClick={() => {
            setActiveGroup(group)
            onSelect(group)
          }}
          className={`px-4 py-2 rounded-full border ${
            group === activeGroup ? 'bg-primary text-white' : 'bg-muted'
          }`}
        >
          {group}
        </button>
      ))}
    </div>
  )
}
