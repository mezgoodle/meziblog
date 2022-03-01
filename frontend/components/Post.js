import Link from "next/link";
import Image from "next/image";

export default function Post({ post }) {
  return (
    <div className="card">
      <Image
        src="/uther.jpg"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <div className="post-date">
        Posted on {new Date(post.created_at).toLocaleString()}
      </div>
      <h3>{post.title}</h3>
      <Link href={`/post/${post.id}`}>
        <a className="btn">Read more</a>
      </Link>
    </div>
  );
}
