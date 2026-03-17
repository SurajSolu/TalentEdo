import { useState, useEffect } from 'react'
import api from '../api'
import CourseCard from '../components/CourseCard'

function Home() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/api/courses/')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error('Failed to fetch courses:', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Learn Tech Skills, <span className="text-yellow-300">Offline.</span>
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Join our instructor-led classroom courses and fast-track your career in technology.
            Real mentors, real projects, real results.
          </p>
          <a
            href="#courses"
            className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Explore Courses
          </a>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Our Courses</h2>
        <p className="text-gray-600 text-center mb-12">Hands-on, instructor-led offline classes</p>

        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No courses available yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
