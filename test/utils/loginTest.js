import jwt from "jsonwebtoken";

const generateToken = () => {
  const email = "test@test.com";
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export { generateToken };