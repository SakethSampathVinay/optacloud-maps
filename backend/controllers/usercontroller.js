import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// API for Register User
const registerUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    if ((!name, !email, !password)) {
      return response.json({
        success: false,
        message: "Please fill the details",
      });
    }

    if (!validator.isEmail(email)) {
      return response.json({
        success: false,
        message: "Please Enter a Valid Email",
      });
    }

    if (password.length < 8) {
      return response.json({
        success: false,
        message: "Please Enter a Valid Password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    response.json({
      success: true,
      message: "User Registered Successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return response.json({ success: false, message: error.message });
  }
};

const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return response.json({ success: false, message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return response.json({ success: true, token });
    } else {
      return response.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    return response.json({ success: false, message: error.message });
  }
};


export { registerUser, loginUser };