import Banner from "./components/Banner.jsx";
import Navbar from "./components/Navbar.jsx";
import Page from "./components/Page.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import EditProfile from "./components/EditProfile.jsx";
import ViewProfile from "./components/ViewProfile.jsx";
import AboutUs from "./components/AboutUs.jsx";
import AudioManager from "./components/AudioManager.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

axios.defaults.withCredentials = true;

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFlushing, setIsFlushing] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "https://flush-website-backend.onrender.com/api/auth/me",
        ); //http://localhost:5001
        setUser(res.data);
      } catch (err) {
        console.log("No active session found", err);
        setUser(null);
      } finally {
        setTimeout(() => {
          setIsFading(true);

          setTimeout(() => {
            setLoading(false);
          }, 800);
        }, 2000);
      }
    };

    checkAuth();
    refreshPosts();
  }, []);

  const refreshPosts = async () => {
    try {
      const res = await fetch(
        "https://flush-website-backend.onrender.com/api/posts",
      );
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

  if (loading) {
    return (
      <div className={`loading-screen ${isFading ? "hidden" : ""}`}>
        <div className="loading-bubble">
          <div className="water"></div>
        </div>
        <p className="loading-text">FLUSHING...</p>
      </div>
    );
  }

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
              <Navbar
                user={user}
                setUser={setUser}
                onFlush={handleGlobalFlush}
                isFlushing={isFlushing}
              />
              <ViewProfile />
            </>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <>
              <Navbar
                user={user}
                setUser={setUser}
                onFlush={handleGlobalFlush}
                isFlushing={isFlushing}
              />
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
