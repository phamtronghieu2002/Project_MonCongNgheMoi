import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { logout as logoutUser } from "../../services/authService";
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

  const logout = async () => {
    try {
      await logoutUser();
      toast.success('đăng xuất thành công !!!');
      window.location.href = configs.paths.login;
    } catch (error) {
      console.log(error);
    }

  };
  const getUser = () => {
    return user;
  };

  const updateUser = (data) => {
    setUser({ auth: true, data });
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        getUser,
        login,
        setUser,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
