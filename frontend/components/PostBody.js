export default function PostBody({ post }) {
  return (
    <div className="card-body">
      <h1 className="my-4 text-center">{post.title}</h1>
      <p>
        <strong>Created on: </strong>
        {new Date(post.created_at).toLocaleString()}
      </p>
      <p>
        <strong>Updated on: </strong>
        {new Date(post.updated_at).toLocaleString()}
      </p>
      <p>{post.body}</p>
    </div>
  );
}
