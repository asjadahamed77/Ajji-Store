import express from 'express';
import { adminLogin } from '../controllers/adminController.js';
import { deleteUser, fetchUsersAdmin } from '../controllers/adminUsers.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin)
adminRouter.get('/users', fetchUsersAdmin)
adminRouter.delete('/:id', deleteUser)

export default adminRouter