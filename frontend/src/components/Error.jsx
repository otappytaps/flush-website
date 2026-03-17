import "./Error.css";

function Error({ isErrorDisplayed, error }) {
  if (!isErrorDisplayed) return null;
  return (
    <div className="error">
      <p className="error-text">{error}</p>
    </div>
  );
}

export default Error;
