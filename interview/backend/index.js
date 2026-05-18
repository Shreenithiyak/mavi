import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jwtprocessor from './route/jwtprocessor.js'
import connectDB from './config/db.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/auth",jwtprocessor)
connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

//http://localhost:5000/api/auth