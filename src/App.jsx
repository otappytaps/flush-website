import Banner from "./components/Banner.jsx";
import Navbar from "./components/Navbar.jsx";
import Page from "./components/Page.jsx";
import defaultPfp from "./assets/default-pfp.png";

function App() {
  const posts = [
    {
      author: "user1",
      title: "Post 1",
      content: "This is the content of post 1",
      date: "2022-01-01",
      pfp: defaultPfp,
      likes: 10,
      dislikes: 5,
    },
    {
      author: "user1",
      title: "Post 1",
      content: "This is the content of post 1",
      date: "2022-01-01",
      pfp: defaultPfp,
      likes: 10,
      dislikes: 5,
    },
  ];

  return (
    <>
      <Navbar />
      <Banner />
      <Page posts={posts} />
    </>
  );
}

export default App;
