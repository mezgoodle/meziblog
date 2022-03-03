import Link from "next/link";
import Image from "next/image";

export default function Post({ post }) {
  return (
    <div class="card border border-primary shadow-0 p-3 m-3">
      <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        <Image
          src="/uther.jpg"
          alt="Picture of the author"
          className="img-fluid"
          width={500}
          height={500}
        />
      </div>

      <div class="card-body">
        <h5 class="card-title">{post.title}</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <Link href={`post/${post.id}`}>
          <a>
            <button type="button" class="btn btn-primary">
              Read more
            </button>
          </a>
        </Link>
      </div>
      <div class="card-footer">
        {new Date(post.created_at).toLocaleString()}
      </div>
    </div>
  );
}
