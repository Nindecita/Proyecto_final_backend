import express from "express";
import { 
    newOrder ,
    findOrderById,
    deleteOrder,
    updateOrder,
 } from "../../src/controllers/order.controller.js";
import { verifyToken } from "../../middlewares/verify.token.middleware.js";



const router = express.Router();

router.post("/create_order", verifyToken, newOrder )
router.get("/find_order_by_id/:order_id", verifyToken, findOrderById)
router.delete("/delete_order/:order_id", verifyToken, deleteOrder)
router.put("/update_order/:order_id", verifyToken, updateOrder)

export default router;