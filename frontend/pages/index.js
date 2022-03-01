import Head from "next/head";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className="posts">
        {posts.map((post, index) => (
          <h3>{post.title}</h3>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://127.0.0.1:8000/posts");
  const posts = await response.json();
  return {
    props: { posts },
  };
}
