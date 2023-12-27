import axios from "axios";

function PostCreate() {
  async function formHandler(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data)

    const response = await axios.post("http://localhost:4000/posts", data);

    if (response.status !== 201) {
      throw new Error("Something went wrong!");
    }

    const responseData = response.data;

    event.target.reset();

    console.log(responseData);
  }

  return (
    <>
      <form className="border p-4" onSubmit={formHandler}>
        <div className="form-group mb-2">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Post title"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <input
            type="text"
            id="content"
            name="content"
            placeholder="Post content"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </>
  );
}

export default PostCreate;
