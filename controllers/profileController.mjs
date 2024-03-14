import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class Profile {

    async getProfiles(req, res){
        try{
            if(req.isAuth){
            const pageNumber = +req.query.page || 1
            const chunks = []
            const users = await prisma.user.findMany({orderBy: {createdAt: 'desc'}})

            for (let i = 0; i < users.length; i += 10) {
                chunks.push(users.slice(i, i + 10));
              }
              if(!chunks[pageNumber - 1]){
                res.status(404)
                return res.render('error404')
              }
            return res.render('profiles', {users: chunks[pageNumber - 1], pages: chunks.length, pageNumber})
        }
        return res.redirect('/')
        }catch(error){
            console.log(error)
            res.status(500)
            return res.render('serverError')
        }
    }

    async getProfile(req, res){
        try{
            if(req.isAuth){

            const id = req.params.id
            const user = await prisma.user.findUnique({where: {id}})
            if(!user){
                return res.send("User doesnt't exist")
            }
            return res.render('userProfile', {user})
        }
        return res.redirect('/')
        }catch(error){
            console.log(error)
            res.status(500)
            return res.render('serverError')
        }
    }

    async updateProfile(req, res){
        try{
            if(req.isAuth){
            const id = req.params.id
            const data = req.body
            for (const key in data) {
                if(!data[key]){
                    delete data[key]
                }
            }
            const image = req.file || 'default_image.jpg'
            const user = await prisma.user.update({where: {id}, data: {...data, image: image.filename } })
            if(!user){
                return res.send("User doesnt't exist")
            }
            return res.redirect(`/profile/${user.id}`)
        }
        return res.redirect('/')
        }catch(error){
            console.log(error)
            res.status(500)
            return res.render('serverError')
        }
    }
}

export default new Profile()