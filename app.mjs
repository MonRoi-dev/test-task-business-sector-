import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import methodOverride from 'method-override'
import mainRouter from './routes/mainRoute.mjs'
import userRouter from './routes/userRoute.mjs'
import profileRouter from './routes/profileRoute.mjs'
import isAuthorized from './middlewares/authMiddleware.mjs'

const app = express()
const PORT = process.env.PORT || 5000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(methodOverride('_method'))

app.use(isAuthorized)
app.use(mainRouter)
app.use('/user', userRouter)
app.use('/profile', profileRouter)


app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})