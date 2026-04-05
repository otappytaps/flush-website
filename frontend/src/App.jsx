import Banner from "./components/Banner.jsx";
import Navbar from "./components/Navbar.jsx";
import Page from "./components/Page.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import EditProfile from "./components/EditProfile.jsx";
import ViewProfile from "./components/ViewProfile.jsx";
import AboutUs from "./components/AboutUs.jsx";
import AudioManager from "./components/AudioManager.jsx";
import { useState, useEffect } from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("flush_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isFlushing, setIsFlushing] = useState(false);

  useEffect(() => {
    refreshPosts();
  }, []);

  const refreshPosts = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("DB Connection Error:", err);
    }
  };

  const handleGlobalFlush = () => {
    setIsFlushing(true);
    AudioManager.playFlush();
  
    setTimeout(() => {
      refreshPosts(); 
    }, 600); 

    setTimeout(() => {
      setIsFlushing(false);
    }, 1200); 
  };

  return (
    <BrowserRouter>
      {isFlushing && <div className="flush-wave"></div>}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar 
                user={user} 
                setUser={setUser} 
                onFlush={handleGlobalFlush} 
                isFlushing={isFlushing} 
              />
              <div className={isFlushing ? "flushing-contents" : ""}>
                <Banner user={user} refreshAllPosts={refreshPosts} />
                <Page posts={posts} refreshPosts={refreshPosts} user={user} />
              </div>
            </>
          }
        />
        <Route 
          path="/profile/:username" 
          element={
            <>
              <Navbar user={user} setUser={setUser} onFlush={handleGlobalFlush} isFlushing={isFlushing} />
              <ViewProfile />
            </>
          } 
        />
        <Route 
          path="/edit-profile" 
          element={
            <>
              <Navbar user={user} setUser={setUser} onFlush={handleGlobalFlush} isFlushing={isFlushing} />
              <EditProfile user={user} setUser={setUser} />
            </>
          } 
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;