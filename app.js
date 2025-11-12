import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import router from "./Routes/user.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("DB Connected")
})

app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Server is Connected to Port ${PORT}`)
})