import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const  generateToken = ({id, email}) => {
    try{
        const payload = {
        id,
        email
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '24h'})
    }catch(error){
        console.log(error)
    }
}

class User {

    async login(req, res){
        try{
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
            res.cookie('token', token)
            return res.redirect('/')
        }catch(error){
            console.log(error)
        }
    }

    async register(req, res){
        try{
            const data = req.body
            const ifExist = await prisma.user.findUnique({where: {email: data.email}})
            if(ifExist){
                return res.send('User already exist')
            }
            const hashedPassword = await bcrypt.hash(data.password, 4)
            const user = await prisma.user.create({ data: {...data, password: hashedPassword} })
            const token = generateToken(user)
            res.cookie('token', token)
            return res.redirect('/')
        }catch(error){
            console.log(error)
        }
    }
}

export default new User()