import Link from "next/link";
import marked from "marked";

export default function Post({ post }) {
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
                  <div>
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
                      className="btn btn-warning btn-rounded ms-1"
                    >
                      Back to posts
                    </button>
                  </div>
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
