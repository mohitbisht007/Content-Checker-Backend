import User from "../Schema/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    const existingUSer = await User.findOne({ email });

    if (existingUSer) {
      return res.status(400).json("User ALready Exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    await newUser.save();

    return res.status(200).json({
      message: "Successfully Registered",
      data: { user: name, email: email },
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("No User with Email Exist");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json("Wrong Password");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "SecretWebToken",
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: "Login Successfull",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
