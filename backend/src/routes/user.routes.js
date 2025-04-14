import { Router } from "express";
import { addToHistory, getUserHistory, userLogin, userRegister } from "../controller/user.controller.js";


const router = Router();


router.route('/login').post(userLogin);
router.route("/register").post(userRegister);
router.route("/add_to_activity").post(addToHistory)
router.route("/get_activity").get(getUserHistory)

export default router;



