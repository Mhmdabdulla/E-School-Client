import { Route } from "react-router-dom";
import ProtectedRoute from "./protected.routes";
import { UserRole } from "@/lib/constants/role";
import InstructorDashboardPage from "@/pages/instructor/DashboardPage";
import CreateCoursePage from "@/pages/instructor/createCoursePage";
import CoursesPage from "@/pages/instructor/CoursePage";
import SingleCoursePage from "@/pages/instructor/CourseDetails";
import EditCoursePage from "@/pages/instructor/EditCoursePage";
import EarningsPage from "@/components/instructor/earnings/earnings-page";



export const instructorRoutes = (
  <Route element={<ProtectedRoute role={[UserRole.INSTRUCTOR]} />}>
    <Route path="/instructor/dashboard" element={<InstructorDashboardPage />} />
    <Route path="/instructor/create-course" element={<CreateCoursePage />} />
    <Route path="/instructor/my-courses" element={<CoursesPage />} />
    <Route path="/instructor/my-courses/:courseId" element={<SingleCoursePage />} />
    <Route path="/instructor/my-courses/:courseId/edit" element={< EditCoursePage/>} />
    <Route path="/instructor/earnings" element={<EarningsPage/>}/>
  </Route>
);