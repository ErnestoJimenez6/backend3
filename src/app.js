import express from 'express'
import mocksRouter from './routes/mocks.router.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import usersRouter from './routes/users.router.js'
import petsRouter from './routes/pets.router.js'
import adoptionsRouter from './routes/adoption.router.js'
import sessionsRouter from './routes/sessions.router.js'
import dotenv from 'dotenv'

dotenv.config()

const app=express()
const PORT=process.env.PORT||8080

mongoose.set('strictQuery',true)
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('✅MongoDB connected')
        app.listen(PORT, () => console.log(`🚀Listening on ${PORT}`))
    })
    .catch((error)=>{
        console.error('❌MongoDB connection error:', error)
    })

app.use(express.json())
app.use(cookieParser())

app.use('/api/mocks', mocksRouter)
app.use('/api/users',usersRouter)
app.use('/api/pets',petsRouter)
app.use('/api/adoptions',adoptionsRouter)
app.use('/api/sessions',sessionsRouter)