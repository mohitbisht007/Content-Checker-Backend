import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import router from "./Routes/user.routes.js"
import { authenticate } from "./Middlewares/authenticateUser.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("DB Connected")
})

app.use("/api", router)

app.get("/test", authenticate, (req, res) => {
    res.send(req.user)
})

app.listen(PORT, () => {
    console.log(`Server is Connected to Port ${PORT}`)
})