import { jwtDecode } from "jwt-decode";

export const DecodeToken = () => {
  const token = localStorage.getItem("token");
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

export const getToken=()=>{
  return localStorage.getItem("token")
}