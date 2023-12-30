function CommentList({ comments }) {
  const renderedComments = comments.map((comment) => {
    let content;

    console.log(comment);

    if (comment.status === "pending") {
      content = "This comment is waiting moderation";
    }

    if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }

    if (comment.status === "approved") {
      content = comment.content;
    }

    return (
      <li className="list-group-item list-group-item-action">{content}</li>
    );
  });

  return (
    <ul className="list-group list-group-numbered mb-2">{renderedComments}</ul>
  );
}

export default CommentList;
