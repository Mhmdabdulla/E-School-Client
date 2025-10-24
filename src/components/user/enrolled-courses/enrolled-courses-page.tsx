import { useEnrolledCourses } from "@/hooks/use-enrolled-course";
import CoursesFilters from "./enrolled-courses-filter";
import CoursesGrid from "./enrolled-courses-grid";
import { GenericPagination } from "@/components/common/pagination";
import { useAppSelector } from "@/redux/store";

export default function CoursesPage() {
  const userId = useAppSelector((state) => state.auth?.user?._id);
  const { enrolledCourses, setSearchQuery, filter, setFilter, currentPage, totalPages,setCurrentPage } = useEnrolledCourses({ userId });
  return (
    <div className="p-6">
      <CoursesFilters filter={filter} setFilter={setFilter} setSearchQuery={setSearchQuery}/>
      <CoursesGrid enrolledCourses={enrolledCourses} />
      <GenericPagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={totalPages} />
    </div>
  );
}