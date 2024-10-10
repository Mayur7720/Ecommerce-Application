import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";

function FormData({ label, data, children, submitedData }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitedData(formData);
  };
  return (
    <section
      className={`relative bg-gradient-to-r flex items-center justify-center h-screen text-slate-900 ${
        label === "Login"
          ? "from-blue-500 to-cyan-400"
          : "from-cyan-400 to-blue-500"
      }  `}
    >

      <button
        onClick={() => navigate(-1)}
        className="absolute left-3 top-5 md:left-6 md:top-6 bg-amber-500 transition duration-400 text-white px-1 py-1 md:px-4 md:py-3 tracking-wide rounded font-semibold shadow-md shadow-black/20 float-start flex items-center gap-2"
      >
        <FaArrowLeft />
        Back
      </button>
      <div className="shadow-black  flex drop-shadow-xl justify-center bg-slate-50 rounded-xl overflow-hidden md:h-2/5 md:w-2/6">
        <form
          method="post"
          onSubmit={handleSubmit}
          className=" w-full text-center rounded-xl"
        >
          <h2 className="text-left pl-4 bg-blue-600 text-slate-50 text-xl font-semibold py-3 mb-6">
            {label}
          </h2>
          <div className="flex justify-around items-center">
            <label
              className="text-md md:text-lg font-semibold text-slate-800"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="border outline-none h-3 md:h-6 w-2/3 p-4 rounded"
              onChange={handleChange}
              value={formData?.username || ""}
            />
          </div>
          <br />
          <div className="flex justify-around items-center">
            <label
              className="text-md md:text-lg font-semibold text-slate-800"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border outline-none h-3 md:h-6 w-2/3 p-4 rounded"
              onChange={handleChange}
              value={formData?.password || ""}
            />
          </div>
          {children}{" "}
          <div className="p-2">
            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-500 text-white rounded w-full mr-1 py-2"
            >
              {label}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default FormData;
