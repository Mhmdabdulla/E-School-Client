import { useState, useEffect, useCallback } from "react";
import { fetchEnrolledCourses } from "@/services/enrollmentServices";
import { type EnrolledCourse } from "@/types/enrollment";

interface UseEnrolledCoursesProps { 
  userId: string | undefined;
}

export function useEnrolledCourses({ userId }: UseEnrolledCoursesProps) {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const coursesPerPage = 12;

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); 

  const getEnrolledCourses = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetchEnrolledCourses({
        page: currentPage,
        limit: coursesPerPage,
        searchQuery,
        filter,
      });

      setEnrolledCourses(response.data); 
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch enrolled courses", error);
    } finally {
      setLoading(false);
    }
  },[currentPage, filter, searchQuery]);

  useEffect(() => {
    if (userId) {
      getEnrolledCourses();
    }
  }, [userId, currentPage, searchQuery, filter,getEnrolledCourses]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filter]);

  return {
    enrolledCourses,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
    refetch: getEnrolledCourses,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
  };
}