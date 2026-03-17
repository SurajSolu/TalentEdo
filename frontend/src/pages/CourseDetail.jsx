import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'
import LeadForm from '../components/LeadForm'

function CourseDetail() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get(`/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error('Failed to fetch course:', err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="text-center text-gray-500 py-20">Loading course details...</div>
  }

  if (!course) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg mb-4">Course not found.</p>
        <Link to="/" className="text-indigo-600 hover:underline">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="text-indigo-600 hover:underline text-sm mb-6 inline-block">
        &larr; Back to all courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Course Info */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl h-56 flex items-center justify-center mb-8">
            <span className="text-white text-7xl">&#128218;</span>
          </div>

          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {course.mode}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{course.name}</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">{course.description}</p>

          {/* Course Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Instructor</p>
              <p className="font-semibold text-gray-900">{course.instructor_name}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold text-gray-900">{course.duration}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Schedule</p>
              <p className="font-semibold text-gray-900">{course.schedule}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-semibold text-gray-900">{course.start_date}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-gray-900">{course.location}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-semibold text-indigo-600 text-lg">{course.price}</p>
            </div>
          </div>

          {/* Instructor Bio */}
          {course.instructor_bio && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">About the Instructor</h3>
              <p className="text-gray-600">{course.instructor_bio}</p>
            </div>
          )}
        </div>

        {/* Lead Form Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <LeadForm courseId={course.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
