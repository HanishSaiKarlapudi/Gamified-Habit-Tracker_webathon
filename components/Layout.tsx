import Header from './Header'
import Sidebar from './Sidebar'
import MobileNavigation from './MobileNavigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header className="sticky top-0 z-50" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
            {children}
          </main>
          <MobileNavigation />
        </div>
      </div>
    </div>
  )
}

