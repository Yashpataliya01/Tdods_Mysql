import express from "express";
import { signin, signup, forgotpass } from "../controllers/Auth.controller.js";

const router = express.Router();

router.post("/signin", signin)
router.post("/signup", signup)
router.post("/forgotpass", forgotpass)


export default router;