import PostCreate from "./PostCreate";
import PostList from "./PostList";

function App() {
  return (
    <div className="container">
      <h1 className="text-center">Create Post</h1>
      <PostCreate />
      <hr />
      <h1 className="text-center">Posts</h1>
      <PostList />
    </div>
  );
}

export default App;
