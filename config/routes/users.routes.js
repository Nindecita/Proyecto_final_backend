import express from "express";
import {
  findUserById,
  newUser,
  deleteUser,
  updateUser,
  myPurchases,
  mySales,
} from "../../src/controllers/user.controller.js";
import { verifyToken } from "../../middlewares/verify.token.middleware.js";

const router = express.Router();

router.post("/create_user", newUser);
router.get("/find_user_by_id/:user_id", verifyToken, findUserById);
router.delete("/delete_user/:user_id",  verifyToken, deleteUser);
router.put("/update_user/:user_id", verifyToken, updateUser);
router.get("/my_purchases/:user_id", myPurchases)
router.get("/my_sales/:user_id", mySales)

export default router;
