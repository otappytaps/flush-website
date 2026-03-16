import "./PostInput.css";
import TextInput from "./TextInput";
import TagSelector from "./TagSelector";
import { useState } from "react";
import defaultPfp from "../assets/default-pfp.png";
import Error from "./Error";

function PostInput({ posts, header, closePopUp }) {
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

  function submitPost() {
    if (titleText == "" || contentText == "") {
      setIsErrorDisplayed(true);
      return;
    }
    posts.push(
      new Post("guest", titleText, contentText, "2022-01-01", defaultPfp, 0, 0),
    );
    closePopUp();
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
