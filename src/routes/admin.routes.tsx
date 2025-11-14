import {  Route } from "react-router-dom";
import LoginPage from "@/pages/admin/Login";


export const adminRoutes = (
    <>
       <Route path="/admin/login" element={<LoginPage />} />
    </>
)