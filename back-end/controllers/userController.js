import UserModel from "../models/userModel.js";
import PasswordModel from "../models/passwordModel.js";
import bcrypt from "bcryptjs";

const bcryptSalt = await bcrypt.genSalt(10);

const userSignUp = async (req, res) => {
  const { email, pswrd, name } = req.body;
  const password = bcrypt.hashSync(pswrd, bcryptSalt);

  try {
    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      throw new Error("email already exist");
    } else {
      const user = await UserModel.create({
        name,
        email,
        password,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        throw new Error("Invalid user data");
      }
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, pswrd } = req.body;
  try {
    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      const authUser = bcrypt.compareSync(pswrd, isUserExist.password);
      if (authUser) {
        return res.status(201).json({
          userId: isUserExist._id,
        });
      } else {
        throw new Error("Invalid email or password");
      }
    } else {
      throw new Error("Invalid user");
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const savePassword = async (req, res) => {
  const { password, id } = req.body;
  try {
      const userData = await PasswordModel.findOne({"userId":id});
      if (userData) {
        const found = userData.generatedPassword.find(
          (element) => element === password
        );
        if (found) {
          throw new Error("Password already saved")
        } else {
          userData?.generatedPassword.push(password);
          await userData.save();
          return res.status(201).json({ message: "success" });
        }
      } else {
        let generatedPassword = []
        generatedPassword.push(password);
        await PasswordModel.create({
          userId:id,
          generatedPassword,
        });
        return res.status(201).json({ message: "success" });
      }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }

};

const getPasswords = async (req,res) => {
  const {id} = req.query
  try {
    const data  = await PasswordModel.findOne({ userId: id });
    if (data) return res.status(201).json({password:data.generatedPassword });
    return res.status(200)
  } catch (error) {
    console.log(error)
  }
}

export { userSignUp, userLogin, savePassword,getPasswords };
