import express from "express";
import {
  findCommentById,
  newComment,
  deleteComment,
  updateComment,
  findCommentByPublicationId,
} from "../../src/controllers/comment.controller.js";
import { verifyToken } from "../../middlewares/verify.token.middleware.js";

const router = express.Router();

router.post("/create_comment", verifyToken, newComment);
router.get("/find_comment_by_id/:comment_id", verifyToken, findCommentById);
router.delete("/delete_comment/:comment_id", verifyToken, deleteComment);
router.put("/update_comment/:comment_id", verifyToken, updateComment);
router.get("/find_comment_by_publication_id/:publication_id", findCommentByPublicationId)

export default router;
