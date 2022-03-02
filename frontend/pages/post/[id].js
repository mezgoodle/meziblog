export default function Post({ post }) {
  return <div>{post.title}</div>;
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
