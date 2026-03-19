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

<<<<<<< HEAD
const postSchema = new mongoose.Schema(
  {
    // to be replaced with an author object for accessing username and pfp
    author: String,
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    pfp: {
      type: String,
      default: "",
    },
    likes: Number,
    dislikes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
=======
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
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
