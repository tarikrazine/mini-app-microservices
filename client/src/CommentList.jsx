import { useState, useEffect } from "react";
import axios from "axios";

function CommentList({ id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const response = await axios.get(
        `http://localhost:4001/posts/${id}/comments`
      );

      if (response.status !== 200) {
        throw new Error("fetching comments failed");
      }

      setComments(response.data);
    }

    fetchComments();
    return () => {};
  }, [id]);

  const renderedComments = comments.map((comment) => {
    return (
      <li className="list-group-item list-group-item-action">
        {comment.content}
      </li>
    );
  });

  return <ul className="list-group list-group-numbered mb-2">{renderedComments}</ul>;
}

export default CommentList;
