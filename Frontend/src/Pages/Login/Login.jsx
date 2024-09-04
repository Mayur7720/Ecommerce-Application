import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormData from "../../Components/FormData";
import ErrorMsg from "../../Components/ErrorMsg";

function Login() {
  const [alert, setAlert] = useState({ show: false, message: "", color: "" });

  const handleLogin = (submitData) => {
    console.log(submitData);
    fetch(`http://localhost:4000/api/v1/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setAlert({
            show: true,
            message: data.message,
            color: "bg-green-200",
          });
          console.log("Registration successful:", data);
          // Handle successful login
        } else {
          console.log("Registration failed:", data.message);
          setAlert({
            show: true,
            message: "Registration failed: " + data.message,
            color: "bg-red-200",
          });
        }
      })
      .catch((error) => {
        setAlert({
          show: true,
          message: "Error: Unable to login",
          color: "bg-red-200",
        });
        console.log("Error:", error);
      });
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
