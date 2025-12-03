import type{ Course } from "./course";

export interface EnrolledCourse {
    _id:string
    userId: string;
    instructorId?: string;
    courseId: Course | string;
    enrolledAt: Date;
    progress: {
        totalLessons:number
      completedLessons: string[] ;
      lastVisited?: string 
      percentage: number;
    };
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface InstructorStats {
    coursesSold: number;
    studentCount: number;
  }


  export interface Enrollment {
  _id: string;
  course: {
    _id: string;
    title: string;
    subtitle: string;
    thumbnail: string;
    price: number;
    rating: number;
    isFree: boolean;
  };
  progress: {
    totalLessons: number;
    completedLessonsCount: number;
    percentage: number;
    lastVisited: string | null;
  };
  enrolledAt: string; // backend gives Date, frontend receives string
}
