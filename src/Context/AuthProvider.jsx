import React from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const a = "Hello workd";
  return <AuthContext.Provider value={a}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
