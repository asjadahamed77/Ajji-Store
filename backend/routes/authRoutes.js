import express from "express"
import { loginUser, logoutUser, registerUser, resetPassword, sendResetOtp, verifyEmail } from "../controllers/authController.js"
import userAuth from "../middlewares/userAuth.js"

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)
router.post('/verify-email',userAuth,verifyEmail)
router.post('/send-reset-otp', sendResetOtp)
router.post('/reset-password', resetPassword)

export default router;