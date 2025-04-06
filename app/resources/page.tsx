// resources/ResourcesPage.tsx
import ResourceCard from '@/components/resources/ResourceCard'
import MiniCourseCard from '@/components/resources/MiniCourseCard'
import { habitResources, miniCourses } from '@/data/resources'

export default function ResourcesPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Habit Resources Section */}
      <div>
        <h1 className="text-3xl font-bold text-white">Habit Resources</h1>
        <p className="text-zinc-400">Explore curated videos, blogs, and podcasts.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {habitResources.length > 0 ? (
            habitResources.map((res, idx) => (
              <ResourceCard key={idx} {...res} />
            ))
          ) : (
            <p className="text-zinc-400">No resources available at the moment.</p>
          )}
        </div>
      </div>

      {/* Mini-Courses Section */}
      <div>
        <h2 className="text-2xl font-bold text-white">Mini-Courses</h2>
        <p className="text-zinc-400">Short guided courses to build powerful habits.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {miniCourses.length > 0 ? (
            miniCourses.map((course, idx) => (
              <MiniCourseCard key={idx} {...course} />
            ))
          ) : (
            <p className="text-zinc-400">No mini-courses available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  )
}
