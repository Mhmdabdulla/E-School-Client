import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserRole } from "@/lib/constants/role";
import { useAppSelector } from "@/redux/store";
    
interface ProtectedRouteProps {
  role: UserRole[]
}

const ProtectedRoute = ({role}:ProtectedRouteProps) => {
  const user = useAppSelector((state) => state.auth.user);  
  const isAdmin = localStorage.getItem("adminLoggedIn")
  const location = useLocation()
  const isAdminPath = location.pathname.startsWith("/admin");


  if(!user){
    return <Navigate to={isAdminPath ? "/admin/login" : "/login"} replace />
  }

  const userRole = user.role as UserRole;

  const isActive = user.status === 'active';

    const hasAccess =
    role.includes(userRole) &&
    (userRole === UserRole.ADMIN ? isAdmin : !isAdmin) &&
    isActive;

  if (!hasAccess) {
    return userRole === UserRole.ADMIN
      ? <Navigate to="/admin/login" replace />
      : <Navigate to="/login" replace />;
  }

  return <Outlet />;

};

export default ProtectedRoute;