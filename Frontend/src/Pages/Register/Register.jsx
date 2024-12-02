import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormData from "../../Components/FormData";
import ErrorMsg from "../../Components/ErrorMsg";
import axiosApi from "../../Api/axiosApi";
import { useNavigate } from "react-router-dom";
function Register() {
  const [alert, setAlert] = useState({ show: false, message: "", color: "" });
  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const handleRegister = async (submitData) => {
    try {
      const response = await axiosApi.post(
        "/user/newUser",
        JSON.stringify(submitData),
        config
      );
      console.log("this is data", response.data);
      const data = await response.data;
      setAlert({
        show: true,
        message: data.message,
        color: "bg-green-200",
      });
      navigate("/login");
    } catch (error) {
      if (error.status === 409) {
        setAlert({
          show: true,
          message: "user already exits",
          color: "bg-amber-300",
        });
        console.log("user already exists:", data);
      } else {
        setAlert({
          show: true,
          message: "Error: Unable to Register",
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
