'use client'

interface MiniCourseProgressProps {
  progress: boolean[]
  onToggle: (index: number) => void
}

export default function MiniCourseProgress({ progress, onToggle }: MiniCourseProgressProps) {
  return (
    <ul className="list-disc pl-5 text-gray-400 space-y-1 text-sm">
      {progress.map((completed, idx) => (
        <li key={idx} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggle(idx)}
            className="w-4 h-4 text-blue-400"
          />
          <span className={completed ? 'line-through text-gray-500' : ''}>
            Lesson {idx + 1}
          </span>
        </li>
      ))}
    </ul>
  )
}
