import Head from "next/head";
import Post from "../components/Post";
import { useContext, useEffect, useState } from "react";
import { sortByDate } from "../utils";
import { UserContext } from "../context/UserContext";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([{}]);
  const { token } = useContext(UserContext);

  useEffect(async () => {
    if (token) {
      const getPosts = async () => {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const response = await fetch(
          "http://127.0.0.1:8000/posts",
          requestOptions
        );
        const posts = await response.json();
        return posts;
      };
      const posts = await getPosts();
      setPosts(posts.sort(sortByDate));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      {token ? (
        <div className="row justify-content-center">
          {posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="display-1">
            Go to{" "}
            <Link href={"/user"}>
              <a>login page</a>
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
