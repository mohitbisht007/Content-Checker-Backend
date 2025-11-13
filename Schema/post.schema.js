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
        required: true
    },
    lastHash: {
        type: String,
        required: true
    },
    lastChecked: {
        type: Date,
        required: true
    },
    trend : {
        clicks: [{date, value}],
        impression: [{date, value}]
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