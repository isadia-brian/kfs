import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  studentID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: [true, "Email already exist"],
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
