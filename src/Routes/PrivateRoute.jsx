// import { useContext } from "react";
// import { Navigate } from "react-router";
// import { AuthContext } from "../context/AuthContext";
// import Loader from "../Pages/Loader/Loader";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";
import Loader from "../Pages/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(AuthContext);
  if (!loader) {
    return <Loader></Loader>;
  }
  if (!user) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
