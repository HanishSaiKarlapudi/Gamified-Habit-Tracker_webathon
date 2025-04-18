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
        <Heatmap />  {/* Just render the Heatmap component here */}
      </div>

      {/* Community Chat Section */}
      <div className="mt-6">
        {/* Add community chat or any other section */}
      </div>
    </div>
  );
}
