import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nameUser: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "staff", "customer"],
      default: "customer",
    },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
