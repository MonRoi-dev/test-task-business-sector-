import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const  generateToken = ({id, email, name}) => {
    try{
        const payload = {
        id,
        email,
        name
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '24h'})
    }catch(error){
        console.log(error)
    }
}

class User {

    async login(req, res){
        try{

            const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const msg = errors.errors[0].msg;
				return res.status(400).json({ message: msg });
			}

            const {email, password} = req.body
            const user = await prisma.user.findUnique({where: {email}})

            if(!user){
                return res.send(`User with email: ${email} not found`)
            }

            const isValidPass = await bcrypt.compare(password, user.password)

            if(!isValidPass){
                res.send('Invalid password')
            }

            const token = generateToken(user)
            res.cookie('token', token, {httpOnly: true, maxAge: 86400000})
            return res.redirect('/')
        }catch(error){
            console.log(error)
            res.status(500)
            return res.render('serverError')
        }
    }

    async register(req, res){
        try{
            const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const msg = errors.errors[0].msg;
				return res.status(400).json({ message: msg });
			}

            const data = req.body
            const ifExist = await prisma.user.findUnique({where: {email: data.email}})

            if(ifExist){
                return res.send('User already exist')
            }

            const hashedPassword = await bcrypt.hash(data.password, 4)
            const user = await prisma.user.create({ data: {...data, password: hashedPassword} })
            const token = generateToken(user)

            res.cookie('token', token, {httpOnly: true, maxAge: 86400000})
            return res.redirect('/')
        }catch(error){
            console.log(error)
            res.status(500)
            return res.render('serverError')
        }
    }

    async getLogin(req, res) {
        try{
            if(!req.isAuth){
                return res.render('login')
            }else{
                return res.redirect('/')
            }
        }catch(error){
            console.log(error)
            res.status(500)
            return res.render('serverError')
        }
    }

    async getRegister(req, res) {
        try{
            if(!req.isAuth){
                return res.render('register')
            }else{
                return res.redirect('/')
            }
        }catch(error){
            console.log(error)
            res.status(500)
            return res.render('serverError')
        }
    }

    async logout(req, res) {
        try{
            if(isAuth){
            res.clearCookie("token");
            return res.redirect('/')
            }
            return res.redirect('/')
        }catch(error){
            console.log(error)
            res.status(500)
            return res.render('serverError')
        }
    }

}

export default new User()