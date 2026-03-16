import "./Navbar.css";

function Navbar() {
  // links for anchors to be added later
  return (
    <nav className="navbar">
      <select className="filter">
        <option value="popular">Popular</option>
        <option value="latest">Latest</option>
      </select>
      <a href="#">Home</a>
      <a href="#">About Us</a>
      <div className="user-cluster">
        <a className="login" href="#">
          Login
        </a>
        <a className="signup" href="#">
          Sign Up
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
