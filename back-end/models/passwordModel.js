import mongoose from "mongoose";

const { Schema } = mongoose;

const PasswordSchema = new Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
  },
  generatedPassword: {
    type: Array,
  },
});

const PasswordModel = mongoose.model("password", PasswordSchema);

export default PasswordModel;
