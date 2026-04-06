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

const postSchema = new mongoose.Schema(
  {
    // to be replaced with an author object for accessing username and pfp
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    pfp: {
      type: String,
      default: "",
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: [
      {
        text: { type: String, required: true },
        author: { type: String },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        date: { type: String, required: true },
      },
    ],
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
