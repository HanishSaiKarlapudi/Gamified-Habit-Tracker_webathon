// components/community/CategoryCard.tsx
import React from 'react'

interface Props {
  title: string
  icon: string
  onClick: () => void
}

export default function CategoryCard({ title, icon, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-6 cursor-pointer shadow-md transition"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  )
}
