export default function ChatFeedCard() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-white mb-2">💬 Live Chat Feed</h2>
      <div className="h-48 overflow-y-auto text-gray-200 text-sm space-y-1">
        <p><b>@Ash</b>: Just completed 3 habits 💪</p>
        <p><b>@Luna</b>: Who else is journaling today?</p>
        <p><b>@Max</b>: Starting cold showers today 🥶</p>
        <p><b>@Sara</b>: 7-day streak on Duolingo!</p>
      </div>
    </div>
  )
}
