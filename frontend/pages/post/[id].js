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
                </div>
              </div>

              <div className="card mb-3 wow fadeIn">
                <div className="card-header font-weight-bold">
                  Leave a reply
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label for="replyFormComment">Your comment</label>
                      <textarea
                        className="form-control"
                        id="replyFormComment"
                        rows="5"
                      ></textarea>
                    </div>

                    <label for="replyFormName">Your name</label>
                    <input
                      type="email"
                      id="replyFormName"
                      className="form-control"
                    />

                    <br />

                    <label for="replyFormEmail">Your e-mail</label>
                    <input
                      type="email"
                      id="replyFormEmail"
                      className="form-control"
                    />

                    <div className="text-center mt-4">
                      <button className="btn btn-info btn-md" type="submit">
                        Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    // {/* <>
    //   <Link href="/">
    //     <a className="btn btn-back">Go back</a>
    //   </Link>
    //   <div className="card card-page">
    //     <h1 className="post-title">{post.title}</h1>
    //     <div className="post-date">
    //       Posted on {new Date(post.created_at).toLocaleString()}
    //     </div>
    //     <div className="post-date">
    //       Updated on {new Date(post.updated_at).toLocaleString()}
    //     </div>
    //     <div className="post-body">
    //       <div>{post.body}</div>
    //     </div>
    //   </div>
    // </> */}
  );
}

// export async function getStaticPaths() {
//   const response = await fetch("http://127.0.0.1:8000/posts");
//   const posts = await response.json();

//   const paths = posts.map((post) => ({
//     params: {
//       id: post.id.toString(),
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params: { id } }) {
  const response = await fetch(`http://127.0.0.1:8000/post/${id}`);
  const post = await response.json();
  return {
    props: { post },
  };
}
