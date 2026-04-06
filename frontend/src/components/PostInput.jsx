import "./PostInput.css";
import TextInput from "./TextInput";
import TagSelector from "./TagSelector";
import { useState } from "react";
import Error from "./Error";

function PostInput({ header, closePopUp, refreshPosts, user, existingPost }) {
  const [titleText, setTitleText] = useState(existingPost?.title || "");
  const [contentText, setContentText] = useState(existingPost?.content || "");

  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isEditing = !!existingPost;

  async function submitPost() {
    if (!user) {
      setErrorMessage("You must be logged in to post.");
      setIsErrorDisplayed(true);
      return;
    }

    if (titleText === "" || contentText === "") {
      setErrorMessage("Fields cannot be empty.");
      setIsErrorDisplayed(true);
      return;
    }

    try {
      const url = isEditing
        ? `https://flush-website-backend.onrender.com/api/posts/${existingPost._id}` //http://localhost:5001
        : "https://flush-website-backend.onrender.com/api/posts";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // add author object
          title: titleText,
          content: contentText,
          author: user.username,
        }),
      });

      if (response.ok) {
        closePopUp();
        refreshPosts();
      } else {
        setIsErrorDisplayed(true);
        setErrorMessage(
          isEditing ? "Failed to edit post." : "Failed to create post.",
        );
      }
    } catch {
      setIsErrorDisplayed(true);
      setErrorMessage(
        isEditing ? "Failed to edit post." : "Failed to create post.",
      );
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
        initialValue={existingPost?.title || ""}
        updateText={setTitleText}
        isErrorDisplayed={isErrorDisplayed}
        closeError={closeError}
      />
      <TextInput
        label="Content"
        placeholder="Content"
        maxLength="1000"
        height="200px"
        initialValue={existingPost?.content || ""}
        updateText={setContentText}
        isErrorDisplayed={isErrorDisplayed}
        closeError={closeError}
      />
      <TagSelector />
      <Error isErrorDisplayed={isErrorDisplayed} error={errorMessage} />
      <button className="submit-post-btn" onClick={submitPost}>
        {isEditing ? "Save Changes" : "Submit"}
      </button>
    </div>
  );
}

export default PostInput;
