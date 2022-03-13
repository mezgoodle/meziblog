import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Error from "../../components/Error";

export default function Post() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [token, setToken] = useState(undefined);

  const handleCreate = async () => {
    const response = await fetch("http://127.0.0.1:8000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body }),
    });
    const createdPost = await response.json();
    router.push(`/post/${createdPost.id}`);
  };

  useEffect(() => {
    setToken(localStorage.token);
  });

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
              {!token ? <Error text={"You are not authorized"} /> : ""}
              <div className="card mb-4 wow fadeIn">
                <form className="card-body">
                  <div className="mb-4">
                    <input
                      type="text"
                      id="form1Example1"
                      className="form-control"
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form1Example1">
                      Title
                    </label>
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      id="form1Example2"
                      className="form-control"
                      placeholder="Body"
                      onChange={(e) => setBody(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form1Example2">
                      Body
                    </label>
                  </div>
                </form>
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
                    className={`btn btn-success btn-rounded ms-3 ${
                      token ? "" : "disabled"
                    }`}
                    onClick={handleCreate}
                  >
                    Create the post
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
