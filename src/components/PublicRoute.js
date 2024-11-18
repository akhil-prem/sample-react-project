import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

const PublicRoute = () => {
  const { profile } = useProfile();
  console.log("public", profile);

  if (profile) {
    return <Navigate to="/users" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
