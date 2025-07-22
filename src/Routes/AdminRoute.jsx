import { Navigate } from "react-router";
import Loader from "../Pages/Loader/Loader";
import useRole from "../hooks/useRole";

const PrivateRoute = ({ children }) => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <Loader></Loader>;
  if (role === "admin") return children;
  return <Navigate to="/" />;
};

export default PrivateRoute;
