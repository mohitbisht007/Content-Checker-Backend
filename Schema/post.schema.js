import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    url: {
        type: String,
        required: true
    },
    lastModified: {
        type: Date,
    },
    lastHash: {
        type: String,
    },
    lastChecked: {
        type: Date,
    },
    trend : {
        clicks: [{date: Date, value: Number}],
        impression: [{date: Date, value: Number}]
    },
    freshnessScore: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['Pending', 'Healthy', 'Watch', 'Needs Update'],
        default: "Pending"
    },
}, {timestamps: true})

const Post = mongoose.model("Post", postSchema)
export default Post