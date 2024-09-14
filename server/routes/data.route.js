import express from "express";
import { insertdata, getdata, deletedata } from "../controllers/instertdata.controller.js";
import { verifyToken } from "../utils/Verifyuser.js";

const router = express.Router();

router.post("/postdata",verifyToken, insertdata)
router.get("/userdata",verifyToken, getdata)
router.delete("/deletedata", deletedata)

export default router;