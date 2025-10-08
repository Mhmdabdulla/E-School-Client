import Auth from "@/pages/user/Auth";
import Home from "@/pages/user/Home";
import { Route } from "react-router-dom";

export const commonRoutes = (
  <>

    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Auth />} />




  </>
);

