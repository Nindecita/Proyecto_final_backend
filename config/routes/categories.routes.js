import express from "express";
import { verifyToken } from "../../middlewares/verify.token.middleware.js";
import { getCategories } from "../../src/controllers/categories.controller.js";

const router = express.Router();

router.get("/get_categories", verifyToken, getCategories);

export default router;
