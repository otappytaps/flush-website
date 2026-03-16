import "./ToggleableTag.css";

function ToggleableTag({ name, color, textColor, toggle, isToggled }) {
  const toggleableTagStyle = {
    backgroundColor: isToggled ? color : "rgb(231, 231, 231)",
    color: isToggled ? textColor : "black",
  };

  return (
    <div className="toggleable-tag" style={toggleableTagStyle} onClick={toggle}>
      {name}
    </div>
  );
}

export default ToggleableTag;
