import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Loader from "../Pages/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(AuthContext);

  if (!loader) return <Loader></Loader>;
  if (user) return children;
  return <Navigate to="/login" />;
};

export default PrivateRoute;
