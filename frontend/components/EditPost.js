import { useContext, useEffect } from "react";
import { EditContext } from "../context/EditContext";

export default function EditPost({ post }) {
  const { title, setTitle, body, setBody, author, setAuthor } =
    useContext(EditContext);

  useEffect(() => {
    setTitle(title ? title : post.title);
    setBody(body ? body : post.body);
    setAuthor(author ? author : post.author_name);
  });

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
        <label className="form-label" htmlFor="form1Example1">
          Title
        </label>
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="form1Example2"
          className="form-control"
          defaultValue={post.body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label className="form-label" htmlFor="form1Example2">
          Body
        </label>
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="form1Example3"
          className="form-control"
          defaultValue={post.author_name}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label className="form-label" htmlFor="form1Example3">
          Author name
        </label>
      </div>
    </form>
  );
}
