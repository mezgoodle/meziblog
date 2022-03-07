import { useContext } from "react";
import { EditContext } from "../context/EditContext";

export default function EditPost({ post }) {
  const [title, setTitle] = useContext(EditContext);

  return (
    <form className="card-body">
      <div className="mb-4">
        <input
          type="text"
          id="form1Example1"
          className="form-control"
          defaultValue={post.title}
          onChange={(e) => setTitle(e.target.value)}
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
