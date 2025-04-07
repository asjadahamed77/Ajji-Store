import express from 'express'
import userAuth from '../middlewares/userAuth.js'
import { editUser } from '../controllers/userController.js'

const router = express.Router()

router.put("/edit/:id", userAuth, editUser)

export default router