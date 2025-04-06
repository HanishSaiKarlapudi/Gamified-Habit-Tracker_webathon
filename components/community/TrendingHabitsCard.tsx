export default function TrendingHabitsCard() {
  const habits = ['Daily Reading', 'Morning Run', 'Meditation', 'No Sugar', 'Coding 1hr/day']

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-white mb-2">🔥 Trending Habits</h2>
      <ul className="text-gray-300 text-sm space-y-1">
        {habits.map((habit, index) => (
          <li key={index}>✅ {habit}</li>
        ))}
      </ul>
    </div>
  )
}
