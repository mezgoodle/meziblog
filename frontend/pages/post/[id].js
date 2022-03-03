import Link from "next/link";
import marked from "marked";

export default function Post({ post }) {
  return (
    <>
      <Link href="/">
        <a className="btn btn-back">Go back</a>
      </Link>
      <div className="card card-page">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-date">
          Posted on {new Date(post.created_at).toLocaleString()}
        </div>
        <div className="post-date">
          Updated on {new Date(post.updated_at).toLocaleString()}
        </div>
        <div className="post-body">
          <div>{post.body}</div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const response = await fetch("http://127.0.0.1:8000/posts");
  const posts = await response.json();

  const paths = posts.map((post) => ({
    params: {
      id: post.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const response = await fetch(`http://127.0.0.1:8000/post/${id}`);
  const post = await response.json();
  return {
    props: { post },
  };
}
