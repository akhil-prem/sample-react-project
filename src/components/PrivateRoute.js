import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

const PrivateRoute = () => {
  const { profile } = useProfile();
  console.log("private", profile);

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
