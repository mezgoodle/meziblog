export default function CreatePostForm({ setTitle, setBody }) {
  return (
    <form className="card-body">
      <div className="mb-4">
        <input
          type="text"
          id="form1Example1"
          className="form-control"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="form-label" htmlFor="form1Example1">
          Title
        </label>
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="form1Example2"
          className="form-control"
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
        />
        <label className="form-label" htmlFor="form1Example2">
          Body
        </label>
      </div>
    </form>
  );
}
