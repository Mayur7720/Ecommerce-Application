const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegisterUser",
    },
    profile: {
      name: { type: String, default: "" },
      picture: { type: String, default: "" },
    },
    status: { type: Boolean, default: false },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    address: {
      type: String,
      require: [true, "address is required"],
    },
    pincode: {
      type: Number,

      require: [true, "pincode is required"],
    },
    mobileNo: {
      type: Number,
      require: [true, "mobile number is required"],
    },
    history: [
      {
        date: Date,
        paid: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
