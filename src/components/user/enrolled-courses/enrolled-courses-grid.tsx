import CourseCard from "./enrolled-courses-card"
import {  type Enrollment } from "@/types/enrollment"

interface CourseGridProps {
    enrolledCourses: Enrollment[]
}
export default function CoursesGrid({enrolledCourses}:CourseGridProps) {
  
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {enrolledCourses.map((course) => (
        <CourseCard key={course._id} enrolledCourse={course} />
      ))}
    </div>
  )
}