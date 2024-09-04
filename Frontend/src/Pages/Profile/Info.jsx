import React from "react";
import Input from "../../Components/Input";

function Info() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="px-12 ">
      <h2 className="text-center  text-slate-800 font-bold text-2xl">
        Your Info
      </h2>
      <div className="  w-full">
        <form onSubmit={handleSubmit}>
          <fieldset className="border border-red-300 rounded px-6 py-3">
            <legend className="font-semibold text-lg">Personal Info</legend>

            <div className="grid grid-cols-2 gap-6 mt-6 ">
              <Input fname="fname" type="text" label="First Name" />
              <Input fname="lname" type="text" label="Last Name" />

              <Input fname="email" type="email" label="Email" />
              <Input fname="address" type="textarea" label="Address" />

              <Input fname="Mobileno" type="number" label="Mobile No." />
              <Input fname="pincode" type="number" label="Pin code" />
            </div>

            <button className="bg-orange-500 text-white px-4 py-2 mb-3 mt-2 rounded float-end font-semibold shadow-black/20 shadow-md hover:bg-blue-600 transition ease-out duration-800 ">
              Update
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Info;
