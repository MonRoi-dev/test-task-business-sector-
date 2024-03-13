import express from 'express'
import bodyParser from 'body-parser'
import mainRouter from './routes/mainRoute.mjs'
import userRouter from './routes/userRoute.mjs'

const app = express()
const PORT = process.env.PORT || 5000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(mainRouter)
app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})