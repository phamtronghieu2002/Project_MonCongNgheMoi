import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "..//..//services/axios";
import configs from "..//..//configs";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({ auth: false, data:{} });
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/auth/profile")
      .then((response) => {
        const user = response;
        if (user) {
          console.log(user)
          const path = window.location.pathname;
          if (path === configs.paths.login) {
            login(user);
            return;
          }
          setUser({ auth: true, data:user});
          return;
        }
      })
      .catch((error) => {
      
        console.log(error);
      });
  }, []);


  const login = (data) => {
      setUser({ auth: true, data });
      navigate('/');
  };
  const logout = () => {
   window.location.href = configs.paths.login;
   
  
  };
  const getUser = () => {
    return user;
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        getUser,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
