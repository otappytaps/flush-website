import Banner from "./components/Banner.jsx";
import Navbar from "./components/Navbar.jsx";
import Page from "./components/Page.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // const posts = [
  //   {
  //     author: "user1",
  //     title: "Post 1",
  //     content: "This is the content of post 1",
  //     date: "2022-01-01",
  //     pfp: defaultPfp,
  //     likes: 10,
  //     dislikes: 5,
  //   },
  //   {
  //     author: "user1",
  //     title: "Post 1",
  //     content: "This is the content of post 1",
  //     date: "2022-01-01",
  //     pfp: defaultPfp,
  //     likes: 10,
  //     dislikes: 5,
  //   },
  // ];

  const [posts, setPosts] = useState([]);

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
    // <>
    //   <Navbar />
    //   <Banner />
    //   <Page posts={posts} />
    // </>

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Banner />
              <Page posts={posts} refreshPosts={refreshPosts} />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
