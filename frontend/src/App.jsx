import Banner from "./components/Banner.jsx";
import Navbar from "./components/Navbar.jsx";
import Page from "./components/Page.jsx";
<<<<<<< HEAD
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import { useState } from "react";
=======
import Login from "./components/Login.jsx";  
import SignUp from "./components/SignUp.jsx";
import defaultPfp from "./assets/default-pfp.png";
import { useState, useEffect } from "react";
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
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

<<<<<<< HEAD
  const refreshPosts = async () => {
=======
  const getPosts = async () => {
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
    try {
      const res = await fetch("http://localhost:5001/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("DB Connection Error:", err);
    }
  };

<<<<<<< HEAD
=======
  useEffect(() => {
    getPosts();
  }, []);

>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
  return (
    // <>
    //   <Navbar />
    //   <Banner />
    //   <Page posts={posts} />
    // </>

    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
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
=======
        <Route path="/" element={
          <>
            <Navbar />
            <Banner />
            <Page posts={posts} refreshPosts={getPosts} />
          </>
        } />
>>>>>>> 795ee3fe69e4d0974b2facf39e336ba76dc89814
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
