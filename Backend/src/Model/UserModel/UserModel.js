const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      name: { type: String, default: "" },
      picture: { type: String, default: "" },
    },
    status: { type: Boolean, default: false },
    role: { type: String, enum: ["ADMIN", "CUSTOMER"], default: "CUSTOMER" },
    address: {
      type: String,
      // require: [true, "address is required"],
    },
    pincode: {
      type: Number,
      // require: [true, "pincode is required"],
    },
    mobileNo: {
      type: Number,
      // require: [true, "mobile number is required"],
    },
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartHistory",
      },
    ],
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
UserSchema.methods.checkUser = async function (password) {
  const check = await bcrypt.compare(password, this.password);
  if (check) {
    return check;
  }
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
