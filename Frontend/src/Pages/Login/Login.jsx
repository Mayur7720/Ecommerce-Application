import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FormData from "../../Components/FormData";
import ErrorMsg from "../../Components/ErrorMsg";
import { DecodeToken } from "../../utils/DecodedToken";
import axiosApi from "../../Api/axiosApi";

function Login() {
  const [alert, setAlert] = useState({ show: false, message: "", color: "" });
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const handleLogin = async (submitData) => {
    try {
      const response = await axiosApi.post(
        "/user/login",
        JSON.stringify(submitData),
        config
      );
      const data = await response.data;
      console.log("data after login ", data);

      setAlert({
        show: true,
        message: data.message,
        color: "bg-green-200",
      });
      navigate("/");
      setUserData(data.token);
    } catch (error) {
      if (error.response) { // Check if response exists
        if (error.response.status === 404) {
          setAlert({
            show: true,
            message: "Error: user not found ",
            color: "bg-red-200",
          });
        } else if (error.response.status === 401) {
          setAlert({
            show: true,
            message: "Error: user or password is incorrect ",
            color: "bg-red-200",
          });
        } else {
          setAlert({
            show: true,
            message: "Error: server not responding ",
            color: "bg-red-200",
          });
        }
      } else {
        setAlert({
          show: true,
          message: "Error: unable to connect to the server",
          color: "bg-red-200",
        });
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert({ show: false, message: "", color: "" });
  };

  return (
    <>
      {alert.show && (
        <ErrorMsg
          message={alert.message}
          color={alert.color}
          onClose={handleCloseAlert}
        />
      )}

      <FormData label={"Login"} submitedData={handleLogin}>
        <p className="mt-2">
          don't have an{" "}
          <Link to={"/register"} className="text-blue-500">
            account?
          </Link>
        </p>
      </FormData>
    </>
  );
}

export default Login;
