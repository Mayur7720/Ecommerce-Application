const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "wishlist" }],
    refershToken: { type: String },
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

UserSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

UserSchema.methods.generateRefreshToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.REFERSH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
