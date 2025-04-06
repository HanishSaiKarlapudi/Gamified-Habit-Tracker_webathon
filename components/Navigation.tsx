'use client'

import Link from 'next/link'
import {
  Home,
  Calendar,
  Gift,
  Coins,
  Users, // 👈 used for Habitwise Community
  Book, // Add the Book icon here for Resources
} from 'lucide-react'
import { useAtom } from 'jotai'
import { browserSettingsAtom } from '@/lib/atoms'
import { useEffect, useState } from 'react'
import AboutModal from './AboutModal'
import { HabitIcon, TaskIcon } from '@/lib/constants'

type ViewPort = 'main' | 'mobile'

interface NavigationProps {
  className?: string
  viewPort: ViewPort
}

const navItems = (isTasksView: boolean) => [
  { icon: Home, label: 'Dashboard', href: '/', position: 'main' },
  {
    icon: isTasksView ? TaskIcon : HabitIcon,
    label: isTasksView ? 'Tasks' : 'Habits',
    href: '/habits',
    position: 'main',
  },
  { icon: Calendar, label: 'Calendar', href: '/calendar', position: 'main' },
  { icon: Gift, label: 'Wishlist', href: '/wishlist', position: 'main' },
  { icon: Coins, label: 'Coins', href: '/coins', position: 'main' },
  { icon: Book, label: 'Resources', href: '/resources', position: 'main' }, // Added Resources here
  {
    icon: Users,
    label: 'Community',
    href: '/community',
    position: 'main',
  },
]

export default function Navigation({ className, viewPort }: NavigationProps) {
  const [showAbout, setShowAbout] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [browserSettings] = useAtom(browserSettingsAtom)
  const isTasksView = browserSettings.viewType === 'tasks'

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (viewPort === 'mobile' && isMobileView) {
    return (
      <>
        <div className="pb-16" />
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg">
          <div className="grid grid-cols-5 w-full">
            {navItems(isTasksView).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
        <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      </>
    )
  }

  if (viewPort === 'main' && !isMobileView) {
    return (
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navItems(isTasksView).map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      </div>
    )
  }

  return null
}
