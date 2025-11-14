import {  Route } from "react-router-dom";
import LoginPage from "@/pages/admin/Login";
import ProtectedRoute from "./protected.routes";
import { UserRole } from "@/lib/constants/role";
import DashboardLayout from "@/components/admin/layout/DashboardLayout";


export const adminRoutes = (
    <>
       <Route path="/admin/login" element={<LoginPage />} />
       <Route element={<ProtectedRoute role={[UserRole.ADMIN]} />}>
       <Route path="/admin" element={<DashboardLayout />}></Route>
       </Route>
    </>
)