import { useEffect, useState } from "react";

import axios from "axios";

import CreateComments from "./commentCreate";
import CommentList from "./CommentList";

function PostList() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get("http://localhost:4000/posts");

      if (response.status !== 200) {
        throw new Error("fetching posts failed");
      }

      setPosts(response.data);
    }

    fetchPosts();
    return () => {};
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-header">

        <h2 className="card-title">{post.title}</h2>
        </div>
        <div className="card-body">
          <p className="card-text">{post.content}</p>
        </div>
        <div className="card-footer">
            <CommentList id={post.id} />
            <CreateComments id={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="flex-center">
      <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div></div>
    )
}

export default PostList;
