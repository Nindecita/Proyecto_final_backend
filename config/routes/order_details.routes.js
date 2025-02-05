import express from "express";
import { 
    findOrderDetailById,
    newOrderDetail,
    deleteOrderDetail,
    updateOrderDetail,
 } from "../../src/controllers/order_detail.controller.js";


const router = express.Router();

router.post("/create_order_detail", newOrderDetail)
router.get("/find_order_detail_by_id/:order_detail_id", findOrderDetailById)
router.delete("/delete_order_detail/:order_detail_id", deleteOrderDetail)
router.put("/update_order_detail/:order_detail_id", updateOrderDetail)


export default router;