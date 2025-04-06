'use client'

import { useState, useEffect } from 'react'
import MiniCourseProgress from './MiniCourseProgress'

interface MiniCourseCardProps {
  title: string
  description: string
  lessons: string[]
  progress: boolean[]
}

export default function MiniCourseCard({ title, description, lessons, progress }: MiniCourseCardProps) {
  const [courseProgress, setCourseProgress] = useState(progress)

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem(title, JSON.stringify(courseProgress))
  }, [courseProgress, title])

  const handleToggle = (index: number) => {
    const newProgress = [...courseProgress]
    newProgress[index] = !newProgress[index]
    setCourseProgress(newProgress)
  }

  return (
    <div className="bg-gray-800 p-4 rounded shadow">
      <h3 className="text-white text-lg font-bold">{title}</h3>
      <p className="text-gray-300 mb-2">{description}</p>
      <MiniCourseProgress progress={courseProgress} onToggle={handleToggle} />
    </div>
  )
}
