import "./Banner.css";
import flushLogo from "../assets/flush-logo.png";
import searchIcon from "../assets/search-icon.png";

function Banner() {
  return (
    <div className="banner">
      <img className="banner-logo" src={flushLogo} alt="Flush" />
      <div className="searchbar">
        <input
          className="searchbar-input"
          type="text"
          placeholder="Talk about toilets!"
        />
        <button className="searchbar-button">
          <img className="searchbar-icon" src={searchIcon} alt="Search" />
        </button>
      </div>
    </div>
  );
}

export default Banner;
