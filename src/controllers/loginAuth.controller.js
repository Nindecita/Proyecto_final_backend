import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { byEmail } from "../models/user.model.js";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await byEmail(email);
    if (!user) {
      return res.status(400).json({ message: "el usuario no existe" });
    }

    const passwordValid = bcrypt.compareSync(password, user.password);
    if (!passwordValid) {
      return res.status(400).json({ message: "Password incorrecto" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: __dirname, ...newUser } = user;
    res.status(200).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { loginUser };
