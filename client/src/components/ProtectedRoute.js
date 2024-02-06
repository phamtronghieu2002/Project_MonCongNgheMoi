import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/Auth/AuthProvider";
export default function ProtectedRoute({children }) {
  const { getUser} = useContext(AuthContext);


  return !getUser().auth ?  <></>: children;

}
