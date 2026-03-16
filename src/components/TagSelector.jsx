import "./TagSelector.css";
import ToggleableTag from "./ToggleableTag";
import { useState } from "react";

function TagSelector(tags) {
  // tags is the property of the temp post for the post to be created to be stored
  const [isMaleTagSelected, setIsMaleTagSelected] = useState(false);
  const [isFemaleTagSelected, setIsFemaleTagSelected] = useState(false);
  const [isAllGenderTagSelected, setIsAllGenderTagSelected] = useState(false);
  const [isPWDTagSelected, setIsPWDTagSelected] = useState(false);

  function toggleMaleTag() {
    setIsMaleTagSelected(!isMaleTagSelected);
    console.log(isMaleTagSelected);
  }

  function toggleFemaleTag() {
    setIsFemaleTagSelected(!isFemaleTagSelected);
  }

  function toggleAllGenderTag() {
    setIsAllGenderTagSelected(!isAllGenderTagSelected);
  }

  function togglePWDTag() {
    setIsPWDTagSelected(!isPWDTagSelected);
  }

  return (
    <div className="tag-selector-container">
      <label htmlFor="tag-selector">Tags</label>
      <div className="tag-selector">
        <ToggleableTag
          name="Male"
          color="#01A6EA"
          textColor="white"
          toggle={toggleMaleTag}
          isToggled={isMaleTagSelected}
        />
        <ToggleableTag
          name="Female"
          color="#FF0081"
          textColor="white"
          toggle={toggleFemaleTag}
          isToggled={isFemaleTagSelected}
        />
        <ToggleableTag
          name="All-Gender"
          color="#A649A4"
          textColor="white"
          toggle={toggleAllGenderTag}
          isToggled={isAllGenderTagSelected}
        />
        <ToggleableTag
          name="PWD"
          color="#F06105"
          textColor="white"
          toggle={togglePWDTag}
          isToggled={isPWDTagSelected}
        />
      </div>
    </div>
  );
}

export default TagSelector;
