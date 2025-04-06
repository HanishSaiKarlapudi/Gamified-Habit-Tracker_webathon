import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { endOfYear, startOfYear } from 'date-fns'

export default function Heatmap() {
  const currentYear = new Date().getFullYear()
  const startDate = startOfYear(new Date(currentYear, 0, 1))
  const endDate = endOfYear(new Date(currentYear, 0, 1))

  // Predefined mock data for development (replace this with actual dynamic data in production)
  const data = [
    { date: '2025-01-01', count: 1 }, // Habit completed on January 1, 2025
    { date: '2025-02-14', count: 2 }, // Habit completed on February 14, 2025
    { date: '2025-03-10', count: 1 }, // Habit completed on March 10, 2025
    { date: '2025-04-20', count: 4 }, // Habit completed on April 20, 2025
    { date: '2025-05-05', count: 3 }, // Habit completed on May 5, 2025
    { date: '2025-06-15', count: 5 }, // Habit completed on June 15, 2025
    { date: '2025-01-02', count: 2 }, // Habit completed on January 2, 2025
    { date: '2025-01-05', count: 1 }, // Habit completed on January 5, 2025
    { date: '2025-01-07', count: 3 }, // Habit completed on January 7, 2025
    { date: '2025-01-10', count: 1 }, // Habit completed on January 10, 2025
    { date: '2025-01-12', count: 4 }, // Habit completed on January 12, 2025
    { date: '2025-01-15', count: 2 }, // Habit completed on January 15, 2025
    { date: '2025-01-18', count: 3 }, // Habit completed on January 18, 2025
    { date: '2025-02-01', count: 1 }, // Habit completed on February 1, 2025
    { date: '2025-02-03', count: 2 }, // Habit completed on February 3, 2025
    { date: '2025-02-07', count: 4 }, // Habit completed on February 7, 2025
    { date: '2025-02-10', count: 1 }, // Habit completed on February 10, 2025
    { date: '2025-02-13', count: 5 }, // Habit completed on February 13, 2025
    { date: '2025-03-01', count: 2 }, // Habit completed on March 1, 2025
    { date: '2025-03-03', count: 1 }, // Habit completed on March 3, 2025
    { date: '2025-03-05', count: 3 }, // Habit completed on March 5, 2025
    { date: '2025-03-07', count: 2 }, // Habit completed on March 7, 2025
    { date: '2025-03-15', count: 4 }, // Habit completed on March 15, 2025
    { date: '2025-04-05', count: 1 }, // Habit completed on April 5, 2025
    { date: '2025-04-10', count: 2 }, // Habit completed on April 10, 2025
    { date: '2025-04-13', count: 3 }, // Habit completed on April 13, 2025
    { date: '2025-04-17', count: 4 }, // Habit completed on April 17, 2025
    { date: '2025-04-25', count: 1 }, // Habit completed on April 25, 2025
    { date: '2025-05-01', count: 2 }, // Habit completed on May 1, 2025
    { date: '2025-05-10', count: 3 }, // Habit completed on May 10, 2025
    { date: '2025-05-15', count: 1 }, // Habit completed on May 15, 2025
    { date: '2025-05-20', count: 4 }, // Habit completed on May 20, 2025
    { date: '2025-06-01', count: 2 }, // Habit completed on June 1, 2025
    { date: '2025-06-05', count: 1 }, // Habit completed on June 5, 2025
    { date: '2025-06-12', count: 3 }, // Habit completed on June 12, 2025
    { date: '2025-06-18', count: 4 }, // Habit completed on June 18, 2025
    { date: '2025-06-22', count: 5 }  // Habit completed on June 22, 2025
    // Add more mock data as needed
  ]

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Your Habit Tracker Heatmap</h2>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={data}
        classForValue={(value) => {
          if (!value || value.count === 0) return 'color-empty'
          if (value.count < 2) return 'color-scale-1'
          if (value.count < 4) return 'color-scale-2'
          if (value.count < 6) return 'color-scale-3'
          return 'color-scale-4'
        }}
        showWeekdayLabels = {false}
      />
    </div>
  )
}
