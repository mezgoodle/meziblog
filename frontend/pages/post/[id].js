import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import PostBody from "../../components/PostBody";
import EditPost from "../../components/EditPost";
import { EditContext } from "../../context/EditContext";

export default function Post({ data }) {
  const router = useRouter();
  const { title, setTitle, body, setBody, author, setAuthor } =
    useContext(EditContext);
  const [editable, setEditable] = useState(false);
  const [post, setPost] = useState({});
  const [token, setToken] = useState(undefined);

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleEdit = async () => {
    if (editable) {
      const response = await fetch(`http://127.0.0.1:8000/post/${post.id}/`, {
        ...requestOptions,
        method: "PATCH",
        body: JSON.stringify({ title, body, author_name: author }),
      });
      const updatedPost = await response.json();
      setPost(updatedPost);
      [setTitle, setBody, setAuthor].forEach((setState) => setState(""));
    }
    setEditable(!editable);
  };

  const handleDelete = async () => {
    const response = await fetch(`http://127.0.0.1:8000/post/${post.id}`, {
      ...requestOptions,
      method: "DELETE",
    });
    if (response.ok) router.push("/");
  };

  useEffect(() => {
    setPost(data);
    setToken(localStorage.token);
  }, [data]);

  return (
    <main className="mt-3 pt-3">
      <div className="container">
        <section className="mt-4">
          <div className="row">
            <div className="col-md mb-4">
              <div className="card mb-4 wow fadeIn">
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(144).jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="card mb-4 wow fadeIn">
                {!editable ? (
                  <PostBody post={post} />
                ) : (
                  <EditPost post={post} />
                )}
                <div className="mb-3 ms-3">
                  <Link href="/">
                    <a>
                      <button
                        type="button"
                        className="btn btn-dark btn-rounded"
                      >
                        Back to posts
                      </button>
                    </a>
                  </Link>
                  {token ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-warning btn-rounded ms-3"
                        onClick={handleEdit}
                      >
                        {!editable ? "Update the post" : "Submit the updating"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-rounded ms-3"
                        onClick={handleDelete}
                      >
                        Delete the post
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const response = await fetch(`http://127.0.0.1:8000/post/${id}`);
  const data = await response.json();
  return {
    props: { data },
  };
}
