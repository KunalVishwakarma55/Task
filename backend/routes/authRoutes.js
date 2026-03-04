import express from "express"
import { adminLogin, googleLogin, login, logOut, registration } from "../controller/authController.js"

const authRouter = express.Router()

authRouter.post("/registration",registration)
authRouter.post("/login",login)
authRouter.get("/logout",logOut)
authRouter.post("/googlelogin",googleLogin)
authRouter.post("/adminlogin",adminLogin)




export default authRouter