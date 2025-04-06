export default function CommunityCard() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-white mb-2">🫂 Habitwise Groups</h2>
      <ul className="text-gray-300 text-sm space-y-2">
        <li>🏃 Fitness Warriors</li>
        <li>🧠 Mental Wellbeing</li>
        <li>🛠 Productivity Crew</li>
        <li>📚 Skill Builders</li>
        <li>🎨 Creativity & Hobbies</li> {/* ✅ New category added */}
      </ul>
    </div>
  )
}
