import mongoose from "mongoose";

/*
    this.author = author;
    this.title = title;
    this.content = content;
    this.date = date;
    this.pfp = pfp;
    this.likes = likes;
    this.dislikes = dislikes;

*/

const postSchema = new mongoose.Schema({
    author: String,
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    pfp: { 
        type: String, 
        default: "" 
    }, 
    likes: Number,
    dislikes: Number,
}, 
 { timestamps: true }
)

const Post = mongoose.model("Post", postSchema)

export default Post