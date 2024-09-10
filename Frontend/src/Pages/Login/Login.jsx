import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FormData from "../../Components/FormData";
import ErrorMsg from "../../Components/ErrorMsg";

function Login() {
  const [alert, setAlert] = useState({ show: false, message: "", color: "" });
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const handleLogin = async (submitData) => {
    try {
      const response = await fetch(`${process.env.API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });
      const data = await response.json();

      localStorage.setItem("token", data.token);
      if (data.status === 200 || data.status <= 299) {
        setAlert({
          show: true,
          message: data.message,
          color: "bg-green-200",
        });
        navigate("/dashboard");
        setUserData(data.token);
      } else {
        console.log("Login failed:", data.message);
        setAlert({
          show: true,
          message: "Login failed: " + data.message,
          color: "bg-red-200",
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        message: "Error: Unable to login",
        color: "bg-red-200",
      });
      console.log("Error:", error);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ show: false, message: "", color: "" });
  };
  // if (userData.length > 0) {
  //   console.log(jwtDecode(userData));
  // }
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
