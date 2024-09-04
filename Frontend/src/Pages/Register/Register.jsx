import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormData from "../../Components/FormData";
import ErrorMsg from "../../Components/ErrorMsg";

function Register() {
  const [alert, setAlert] = useState({ show: false, message: "", color: "" });
  const handleRegister = (submitData) => {

    fetch(`http://localhost:4000/api/v1/user/newUser`, {
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
          console.log("Register successfully:", data);
          // Handle successful login
        } else if (data.status === 409) {
          setAlert({
            show: true,
            message: data.message,
            color: "bg-amber-300",
          });
          console.log("Register successfully:", data);
        } else {
          console.log("Register failed:", data.message);
          setAlert({
            show: true,
            message: "Register failed: " + data.message,
            color: "bg-red-200",
          });
        }
      })
      .catch((error) => {
        setAlert({
          show: true,
          message: "Error: Unable to Register",
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
      <FormData label={"Create Account"} submitedData={handleRegister}>
        <p className="mt-2">
          have a{" "}
          <Link to={"/login"} className="text-blue-500">
            account ?
          </Link>
        </p>
      </FormData>
    </>
  );
}

export default Register;
