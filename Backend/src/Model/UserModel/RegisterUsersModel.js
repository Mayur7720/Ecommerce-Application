// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const RegisterUserSchema = new mongoose.Schema(
//   {
//     username: { type: String, require: true, unique: true },
//     password: { type: String, require: true },
//   },
//   { timestamps: true }
// );

// RegisterUserSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     // const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });
// RegisterUserSchema.methods.checkUser = async function (password) {
//   const check = await bcrypt.compare(password, this.password);
//   console.log(check);
//   if (check) {
//     return check;
//   }
// };

// const RegisterUser = mongoose.model("RegisterUser", RegisterUserSchema);
// module.exports = RegisterUser;
