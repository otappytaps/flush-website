import Banner from "./components/Banner.jsx";
import Navbar from "./components/Navbar.jsx";
import Page from "./components/Page.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("flush_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const refreshPosts = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("DB Connection Error:", err);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar user={user} setUser={setUser} />
              <Banner />
              <Page posts={posts} refreshPosts={refreshPosts} user={user} />
            </>
          }
        />
        {/*Pass setUser to Login so it can "log them in" */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
