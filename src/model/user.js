// import mongoose from "mongoose";
// import validator from "validator";

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: [true, "username is required"],
//       unique: [true, "username must be unique"],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "email is required"],
//       unique: [true, "email must be unique"],
//       lowercase: true,
//       validate: {
//         validator: validator.isEmail,
//         message: "{VALUE} is not a valid email",
//       },
//     },
//     password: {
//       type: String,
//       required: [true, "password is required"],
//     },
//     verifyCode: String,
//     verifyCodeExpiry: Date,
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     isAcceptingMessages: {
//       type: Boolean,
//       default: true,
//     },
//     messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.models.User || mongoose.model("User", userSchema);

// export default User;
