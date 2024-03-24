import { useState, useEffect } from "react";

import React from "react";
import axios from "..//..//services/axios";
import configs from "..//..//configs";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({ auth: false, data: {} });

  useEffect(() => {
    axios
      .get("/auth/profile")
      .then((response) => {
        const user = response;
        if (user) {
          const path = window.location.pathname;
          if (path === configs.paths.login) {
            login();
            return;
          }
          setUser({ auth: true, data: user });
          return;
        }
      })
      .catch((error) => {

        console.log(error);
      });
  }, []);


  const login = () => {
    window.location.href = configs.paths.messenger;
  }

  const logout = () => {
    window.location.href = configs.paths.login;
  };
  const getUser = () => {
    return user;
  };
  return (
    <AuthContext.Provider
      value={{
        logout,
        getUser,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
