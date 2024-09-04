const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const ExisitingUserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);


const ExisitingUser = mongoose.model("ExisitingUser", ExisitingUserSchema);
module.exports = ExisitingUser;
