import { Link } from 'react-router-dom'

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-48 flex items-center justify-center">
        <span className="text-white text-5xl">&#128218;</span>
      </div>
      <div className="p-6">
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {course.mode}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
        <p className="text-gray-600 text-sm mb-4">
          by <span className="font-medium text-gray-800">{course.instructor_name}</span>
        </p>
        <div className="space-y-2 text-sm text-gray-500 mb-5">
          <p>&#128197; {course.schedule}</p>
          <p>&#9202; {course.duration}</p>
          <p>&#128205; {course.location}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">{course.price}</span>
          <Link
            to={`/course/${course.id}`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
