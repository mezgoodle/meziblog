import Head from "next/head";
import Post from "../components/Post";
import { sortByDate } from "../utils";

export default function Home({ posts }) {
  return (
    <div className="col-4">
      <Head>
        <title>Create Next App</title>
      </Head>
      <div>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://127.0.0.1:8000/posts");
  const posts = await response.json();
  return {
    props: { posts: posts.sort(sortByDate) },
  };
}
