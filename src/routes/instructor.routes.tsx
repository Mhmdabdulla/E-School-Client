import { Route } from "react-router-dom";
import ProtectedRoute from "./protected.routes";
import { UserRole } from "@/lib/constants/role";
import InstructorDashboardPage from "@/pages/instructor/DashboardPage";
import CreateCoursePage from "@/pages/instructor/createCoursePage";



export const instructorRoutes = (
  <Route element={<ProtectedRoute role={[UserRole.INSTRUCTOR]} />}>
    <Route path="/instructor/dashboard" element={<InstructorDashboardPage />} />
    <Route path="/instructor/create-course" element={<CreateCoursePage />} />
  </Route>
);