import express from "express";
import { register, login, getUserProfile , message} from "../controllers/userController.js";
//import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/register", register);
router.post("/login", login);


router.get("/profile",  getUserProfile);
router.get("/message", message);


export default router;
