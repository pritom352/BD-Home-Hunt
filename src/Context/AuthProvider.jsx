import React, { useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext.jsx";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const provider = new GoogleAuthProvider();
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (updateItem) => {
    setLoader(false);
    return updateProfile(auth.currentUser, updateItem);
  };
  const googleLogin = () => {
    setLoader(false);
    return signInWithPopup(auth, provider);
  };
  const login = (email, password) => {
    setLoader(false);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    setLoader(false);
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(true);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  //! theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  const authData = {
    register,
    updateUser,
    googleLogin,
    login,
    logout,
    user,
    setUser,
    theme,
    setTheme,
    loader,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
