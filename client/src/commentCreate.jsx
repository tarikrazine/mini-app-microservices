import axios from "axios";

function CreateComments({ id }) {
  async function submitHandler(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const body = Object.fromEntries(formData);

    const response = await axios.post(
      `http://localhost:4001/posts/${id}/comments`,
      body
    );

    if (response.status !== 201) {
      throw new Error("Error creating comment");
    }

    console.log(response.data)

    event.target.reset();
  }

  return (
    <div>
      <h5>Add comments</h5>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <textarea
            className="form-control"
            id="content"
            name="content"
            placeholder="Enter comment"
            cols="30"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateComments;
