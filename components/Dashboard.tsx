'use client'

import { useAtom } from 'jotai'
import { wishlistAtom, habitsAtom, settingsAtom } from '@/lib/atoms'
import DailyOverview from './DailyOverview'
import HabitStreak from './HabitStreak'
import CoinBalance from './CoinBalance'

import { useCoins } from '@/hooks/useCoins'

import Heatmap from './Heatmap'; // Import Heatmap component

export default function Dashboard() {
  // Get habits from the atom
  const [habitsData] = useAtom(habitsAtom);
  const habits = habitsData.habits;

  // Other necessary state or variables
  const [settings] = useAtom(settingsAtom);
  const { balance } = useCoins();
  const [wishlist] = useAtom(wishlistAtom);
  const wishlistItems = wishlist.items;

  // Get the current year (e.g., 2025)
  const currentYear = new Date().getFullYear();

  // Set the start and end date for the current year
  const startDate = new Date(currentYear, 0, 1);  // January 1st of current year
  const endDate = new Date(currentYear, 11, 31);  // December 31st of current year

  // Step 3: Format Data for the Heatmap (filter data to only include current year)
  const heatmapData = habits
    .filter(habit => {
      const habitDate = new Date(habit.completedDate); // Ensure your habits have a completedDate
      return habitDate >= startDate && habitDate <= endDate;
    })
    .map(habit => ({
      date: habit.completedDate,  // Use the actual date from your habit data (or completed streak)
      count: habit.completed ? 1 : 0  // You can set any logic for completion (1 if done, 0 if not)
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
  
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CoinBalance coinBalance={balance} />
        <HabitStreak habits={habits} />
        <DailyOverview
          wishlistItems={wishlistItems}
          habits={habits}
          coinBalance={balance}
        />
      </div>
  
      {/* Heatmap Section */}
      <div className="mt-6">
        {/* Pass the filtered heatmap data */}
        <Heatmap data={heatmapData} />
      </div>

      {/* Community Chat Section */}
      <div className="mt-6">
        {/* Add community chat or any other section */}
      </div>
    </div>
  );
}
