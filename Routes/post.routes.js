import express from "express"
import { authenticate } from "../Middlewares/authenticateUser.js"
import { createPost, getPost } from "../Controllers/post.controller.js"

const postRouter = express.Router()

postRouter.post("/fetchPost", authenticate, createPost)
postRouter.get("/getPost", authenticate, getPost)

export default postRouter