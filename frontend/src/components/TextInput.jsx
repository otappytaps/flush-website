import "./TextInput.css";
import { useState } from "react";

function TextInput({
  label,
  placeholder,
  maxLength,
  height,
  updateText,
  isErrorDisplayed,
  closeError,
}) {
  const [text, setText] = useState("");
  const count = text.length;

  const textAreaStyle = {
    height: height,
    outlineColor: count == maxLength ? "red" : "black",
    borderColor: isErrorDisplayed && count == 0 ? "red" : "#ccc",
    width: "400px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "10px",
    padding: "5px",
    fontSize: "16px",
    resize: "none",
    marginBottom: "-40px",
    overflowY: "scroll",
    scrollbarWidth: "none",
  };

  const counterStyle = {
    color: count == maxLength ? "red" : "rgb(170, 170, 170)",
    position: "relative",
    fontSize: "12px",
    top: "20px",
    textAlign: "right",
  };

  return (
    <div className="text-input-container">
      <label>{label}</label>
      <textarea
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => {
          setText(e.target.value);
          updateText(e.target.value);
        }}
        onClick={closeError}
        style={textAreaStyle}
      ></textarea>
      <p className="text-input-counter" style={counterStyle}>
        {count}/{maxLength}
      </p>
    </div>
  );
}

export default TextInput;
