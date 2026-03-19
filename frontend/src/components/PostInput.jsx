import "./PostInput.css";
import TextInput from "./TextInput";
import TagSelector from "./TagSelector";
import { useState } from "react";
import defaultPfp from "../assets/default-pfp.png";
import Error from "./Error";

function PostInput({ header, closePopUp, refreshPosts }) {
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");

  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function updateTitle(e) {
    setTitleText(e.target.value);
  }

  function updateContent(e) {
    setContentText(e.target.value);
  }

  async function submitPost() {
    if (titleText === "" || contentText === "") {
      setErrorMessage("Fields cannot be empty.");
      setIsErrorDisplayed(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // add author object
          title: titleText,
          content: contentText,
          pfp: defaultPfp,
          likes: Number(100),
          dislikes: 0,
        }),
      });

      if (response.ok) {
        closePopUp();
        refreshPosts();
      } else {
        setIsErrorDisplayed(true);
        setErrorMessage("Failed to create post.");
      }
    } catch {
      setIsErrorDisplayed(true);
      setErrorMessage("Failed to create post.");
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
      <Error isErrorDisplayed={isErrorDisplayed} error={errorMessage} />
      <button className="submit-post-btn" onClick={submitPost}>
        Submit
      </button>
    </div>
  );
}

export default PostInput;
