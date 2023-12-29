function CommentList({ comments }) {
  const renderedComments = comments.map((comment) => {
    return (
      <li className="list-group-item list-group-item-action">
        {comment.content}
      </li>
    );
  });

  return (
    <ul className="list-group list-group-numbered mb-2">{renderedComments}</ul>
  );
}

export default CommentList;
