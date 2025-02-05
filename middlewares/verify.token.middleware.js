import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(400).json({message: 'el token debe existir'})
    }
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded
    next()
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export { verifyToken };