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
import axios from "axios";

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
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      //! post request for jwt using user email
      if (currentUser?.email) {
        setUser(currentUser);

        // Get JWT token
        await axios.post(
          `https://assignment12-server-lyart.vercel.app/jwt`,
          {
            email: currentUser?.email,
          },
          { withCredentials: true }
        );
      } else {
        setUser(currentUser);
        await axios.get(`https://assignment12-server-lyart.vercel.app/logout`, {
          withCredentials: true,
        });
      }

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
