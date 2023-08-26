import { models, model, Schema } from "mongoose";

const UserSchema = new Schema({
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

const User = models.User || model("User", UserSchema);

export default User;
