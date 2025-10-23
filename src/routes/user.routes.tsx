import { Navigate, Route } from "react-router-dom";
import ProtectedRoute from "./protected.routes";
import { UserRole } from "@/lib/constants/role";
import UserProfile from "@/pages/user/UserProfile";
import UserDashboard from "@/components/user/dashboard/dashboard-page"
import AccountSettings from "@/components/user/profile/account-settings";
import UserCourses from "@/components/user/enrolled-courses/enrolled-courses-page"
import { InstructorsPage } from "@/components/user/instructor/instructor-page";
import MessagingPage from "@/components/user/messages/messaging-page";

export const userRoutes = (
    <>
    <Route element={<ProtectedRoute role={[UserRole.USER]} />}>
    <Route path="/profile" element={<UserProfile />} />
    <Route path="/user" element={<UserProfile />}>
    <Route index element={<Navigate to="dashboard" />} />
    <Route path="dashboard" element={<UserDashboard />} />
    <Route path="settings" element={<AccountSettings />} />
    <Route path="courses" element={<UserCourses />} />
    <Route path="instructors" element={<InstructorsPage/>}/>
    <Route path="messages" element={<MessagingPage />} />
    <Route path="messages/:chatId" element={<MessagingPage />} />
    </Route>
    </Route>
    </>
)