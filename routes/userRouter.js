import express from "express"
import { login, register, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.put("/", updateUser);

export default router;