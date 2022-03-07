export default function EditPost({ post }) {
  return (
    <form className="card-body">
      <div className="mb-4">
        <input
          type="text"
          id="form1Example1"
          className="form-control"
          value={post.title}
        />
        <label className="form-label" for="form1Example1">
          Title
        </label>
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="form1Example1"
          className="form-control"
          value={post.body}
        />
        <label className="form-label" for="form1Example1">
          Body
        </label>
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="form1Example2"
          className="form-control"
          value={post.author_name}
        />
        <label className="form-label" for="form1Example1">
          Author name
        </label>
      </div>
    </form>
  );
}
