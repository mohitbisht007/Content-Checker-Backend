import Post from "../Schema/post.schema.js";
import { fetchTitle } from "../Helpers/fetchTitle.js";

export const createPost = async (req, res) => {
    try {
        const {url} = req.body
        if(!url) {
            return res.status(400).json('URL required')
        }

        const title = await fetchTitle(url)
        const newPost = new Post({
            title: title,
            user: req.user.id,
            url: url,
        })

        await newPost.save()

        res.status(200).json({message: "Post Fetched Succesfully", data: newPost})
    } catch (error) {
        res.status(500).json("Failed to Fetch The Post")
    }
}

export const getPost = async (req, res) => {
    try {
        const userId = req.user.id
        const allPost = await Post.find({user: userId})
        return res.status(200).json(allPost)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

export const deletePost = async( req, res) => {
  try {
    const {postId} = req.body
    await Post.findByIdAndDelete(postId)
    res.status(200).json("Post Succesfully Deleted")
  } catch (error) {
    return res.status(400).json(error.message)
  }
}