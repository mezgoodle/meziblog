import Link from "next/link";

export default function Error({ text }) {
  return (
    <div
      className="alert alert-danger d-flex align-items-center mb-3"
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-x-lg"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
        />
        <path
          fill-rule="evenodd"
          d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
        />
      </svg>
      <div className="ms-1">
        {text}.
        <Link href={"/user"}>
          <a className="alert-link"> Login</a>
        </Link>{" "}
        page
      </div>
    </div>
  );
}
