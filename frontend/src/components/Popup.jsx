import "./Popup.css";

function Popup({ open, children, onClose }) {
  if (!open) return null;
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          x
        </button>
        {children}
      </div>
    </>
  );
}

export default Popup;
