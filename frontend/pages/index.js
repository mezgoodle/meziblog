import Head from "next/head";
import Post from "../components/Post";
import { sortByDate } from "../utils";

export default function Home({ posts }) {
  return (
    <div class="row justify-content-center">
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
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
