'use client'

interface ResourceCardProps {
  title: string
  type: string
  url: string
  description: string
}

export default function ResourceCard({ title, type, url, description }: ResourceCardProps) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="text-white text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-400">{type}</p>
      <p className="text-gray-300">{description}</p>
      <a href={url} target="_blank" rel="noreferrer" className="text-blue-400 underline text-sm mt-2 inline-block">
        View {type}
      </a>
    </div>
  )
}
    