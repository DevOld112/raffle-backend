import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'
import authRoutes from './routes/authRoutes'
import raffleRoutes from './routes/raffleRoutes'
import publicRoutes from './routes/publicRoutes'

dotenv.config()
connectDB()

const app = express()


app.use(cors(corsConfig))

//logging

app.use(morgan('dev'))
app.use(express.json())


//routes

app.use('/api/public', publicRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/raffle', raffleRoutes)


export default app;
