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
          id="title"
          className="form-control"
          defaultValue={post.title}
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
          defaultValue={post.body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label className="form-label" htmlFor="body">
          Body
        </label>
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="name"
          className="form-control"
          defaultValue={post.author_name}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label className="form-label" htmlFor="name">
          Author name
        </label>
      </div>
    </form>
  );
}
