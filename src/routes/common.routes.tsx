import Auth from "@/pages/user/Auth";
import UserCoursesPage from "@/pages/user/CoursePage";
import Home from "@/pages/user/Home";
import { Route } from "react-router-dom";
import ProtectedRoute from "./protected.routes";
import { UserRole } from "@/lib/constants/role";
import UserCourseDetailsPage from "@/pages/user/CourseDetails";
import CartPage from "@/pages/user/CartPage";
import PaymentSuccess from "@/components/common/PaymentSuccess";
import PaymentFailed from "@/components/common/PaymentFailed";

export const commonRoutes = (
  <>

    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Auth />} />
    <Route path="/payment-success" element={<PaymentSuccess />} />
    <Route path="/payment-cancel" element={<PaymentFailed />} />
    <Route
      element={<ProtectedRoute role={[UserRole.USER, UserRole.INSTRUCTOR]} />}
    >
      <Route path="/courses" element={<UserCoursesPage />} />
      <Route path="/courses/:courseId" element={<UserCourseDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      {/* <Route path="/wishlist" element={<WishlistPage />} /> */}
    </Route>




  </>
);

