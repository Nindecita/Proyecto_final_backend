import express from "express";
import {
  newPublication,
  findPublicationById,
  deletePublication,
  updatePublication,
  findUserById,
  findAll,
} from "../../src/controllers/publication.controller.js";
import { verifyToken } from "../../middlewares/verify.token.middleware.js";

const router = express.Router();

router.post("/create_publication", verifyToken, newPublication);
router.get("/find_publication_by_id/:publication_id", findPublicationById);
router.delete(
  "/delete_publication/:publication_id",
  verifyToken,
  deletePublication
);
router.put(
  "/update_publication/:publication_id",
  verifyToken,
  updatePublication
);
router.get("/publication_user_by_id/:user_id", verifyToken, findUserById);
router.get("/publication_all", findAll);
export default router;
