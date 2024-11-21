import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

//this is for if we use localstorage for storing jwt token old auth system

export const DecodeToken = () => {
  const token = Cookies.get("token");
  if (!token) {
    return null;
  }
  try {
    const decoded = jwtDecode(token);
    return decoded.userId;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
export const getToken = () => {
  return localStorage.getItem("token");
};
