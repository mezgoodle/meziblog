export default function CreatePostForm({ setTitle, setBody }) {
  return (
    <form className="card-body">
      <div className="mb-4">
        <input
          type="text"
          id="title"
          className="form-control"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="form-label" htmlFor="title">
          Title
        </label>
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="body"
          className="form-control"
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
        />
        <label className="form-label" htmlFor="body">
          Body
        </label>
      </div>
    </form>
  );
}
