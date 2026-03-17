import "./PostInput.css";
import TextInput from "./TextInput";
import TagSelector from "./TagSelector";
import { useState } from "react";
import defaultPfp from "../assets/default-pfp.png";
import Error from "./Error";

function PostInput({ posts, header, closePopUp, onPostCreated }) {
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");

  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);

  function Post(author, title, content, date, pfp, likes, dislikes) {
    this.author = author;
    this.title = title;
    this.content = content;
    this.date = date;
    this.pfp = pfp;
    this.likes = likes;
    this.dislikes = dislikes;

    // add comments and tags later
  }

  function updateTitle(e) {
    setTitleText(e.target.value);
  }

  function updateContent(e) {
    setContentText(e.target.value);
  }

  async function submitPost() {
    if (titleText === "" || contentText === "") return;

      try {
        const response = await fetch("http://localhost:5001/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            title: titleText, 
            content: contentText,
            pfp: defaultPfp
          }),
        });

        if (response.ok) {
          const savedPost = await response.json();
          if (onPostCreated) {
            onPostCreated(savedPost); 
          }
          closePopUp(); 
        }
      } catch (err) {
        console.error("Failed to save post:", err);
      }
  }

  function closeError() {
    setIsErrorDisplayed(false);
  }
  return (
    <div className="post-input">
      <h2 className="post-input-header">{header}</h2>
      <TextInput
        label="Title"
        placeholder="Title"
        maxLength="50"
        height="50px"
        updateText={updateTitle}
        isErrorDisplayed={isErrorDisplayed}
        closeError={closeError}
      />
      <TextInput
        label="Content"
        placeholder="Content"
        maxLength="1000"
        height="200px"
        updateText={updateContent}
        isErrorDisplayed={isErrorDisplayed}
        closeError={closeError}
      />
      <TagSelector />
      <Error
        isErrorDisplayed={isErrorDisplayed}
        error="Fields cannot be empty."
      />
      <button className="submit-post-btn" onClick={submitPost}>
        Submit
      </button>
    </div>
  );
}

export default PostInput;
