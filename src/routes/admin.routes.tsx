import {  Navigate, Route } from "react-router-dom";
import LoginPage from "@/pages/admin/Login";
import ProtectedRoute from "./protected.routes";
import { UserRole } from "@/lib/constants/role";
import DashboardLayout from "@/components/admin/layout/DashboardLayout";
import Dashboard from "@/pages/admin/Dashboard";
import UsersPage from "@/pages/admin/UserPage";


export const adminRoutes = (
    <>
       <Route path="/admin/login" element={<LoginPage />} />
       <Route element={<ProtectedRoute role={[UserRole.ADMIN]} />}>
       <Route path="/admin" element={<DashboardLayout />}>
       <Route index element={<Navigate to="/admin/dashboard" replace />} />
       <Route path="dashboard" element={<Dashboard />} />
       <Route path="users" element={<UsersPage />} />
       </Route>
       </Route>
    </>
)