import { Router } from "express";
import userController from "../controllers/userController.mjs";
import isAuthorized from "../middlewares/authMiddleware.mjs";
import {check} from 'express-validator'

const router = Router()

router.get('/login', userController.getLogin)

router.post('/login', [
    check('email', 'Invalid email type').isEmail(),
    check('password', 'Password should be at least 4 letters').isLength({
    min: 4,
})], userController.login)

router.get('/register', userController.getRegister)

router.post('/register', [
    check('first_name', 'First name should not be empty').notEmpty(),
    check('last_name', 'Last name should not be empty').notEmpty(),
    check('email', 'Invalid email type').isEmail(),
    check('password', 'Password should be at least 4 letters').isLength({
        min: 4
    })
], userController.register)

export default router