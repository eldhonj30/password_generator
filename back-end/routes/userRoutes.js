import express from "express";
import {userSignUp,userLogin,savePassword,getPasswords} from "../controllers/userController.js"


const router = express.Router();

router.post("/signup",userSignUp); 
router.post("/auth",userLogin); 
router.post("/password",savePassword)
router.get("/password",getPasswords);

export default router;