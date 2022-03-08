import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import PostBody from "../../components/PostBody";
import EditPost from "../../components/EditPost";
import { EditContext } from "../../context/EditContext";

export default function Post({ post }) {
  const router = useRouter();
  const { title, setTitle, body, setBody, author, setAuthor } =
    useContext(EditContext);
  const [editable, setEditable] = useState(false);

  const handleEdit = () => {
    if (editable) {
      console.log(title, body, author);
      [setTitle, setBody, setAuthor].forEach((setState) => setState(""));
    }
    setEditable(!editable);
  };

  const handleDelete = async () => {
    const response = await fetch(`http://127.0.0.1:8000/post/${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) router.push("/");
  };

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
  const post = await response.json();
  return {
    props: { post },
  };
}
