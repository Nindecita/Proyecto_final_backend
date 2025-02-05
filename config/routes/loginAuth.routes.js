import express from "express";
import { loginUser } from "../../src/controllers/loginAuth.controller.js";

const router = express.Router();

router.post("/login", loginUser);


export default router;
