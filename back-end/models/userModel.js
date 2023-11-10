import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  generatedPassword:{
    type:Array,
  }
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
