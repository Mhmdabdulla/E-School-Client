import Auth from "@/pages/user/Auth";
import UserCoursesPage from "@/pages/user/CoursePage";
import Home from "@/pages/user/Home";
import { Route } from "react-router-dom";
import ProtectedRoute from "./protected.routes";
import { UserRole } from "@/lib/constants/role";

export const commonRoutes = (
  <>

    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Auth />} />
    <Route
      element={<ProtectedRoute role={[UserRole.USER, UserRole.INSTRUCTOR]} />}
    >
      <Route path="/courses" element={<UserCoursesPage />} />
      {/* <Route path="/courses/:courseId" element={<UserCourseDetailsPage />} />
      <Route path="/cart" element={<CartPage />} /> */}
      {/* <Route path="/wishlist" element={<WishlistPage />} /> */}
    </Route>




  </>
);

