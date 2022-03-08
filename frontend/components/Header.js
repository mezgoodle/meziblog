import Link from "next/link";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">Mezi Blog</a>
        </Link>
        <Link href="/post/new">
          <a className="navbar-brand">Create a new post</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex flex-row me-1">
            <li className="nav-item me-3 me-lg-0">
              <a
                className="nav-link"
                href="https://github.com/mezgoodle/meziblog"
                title="GitHub repository"
              >
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li className="nav-item me-3 me-lg-0">
              <a
                className="nav-link"
                href="mailto:mezgoodle@gmail.com"
                title="Mail to me"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </li>
            <li className="nav-item me-3 me-lg-0">
              <a
                className="nav-link"
                href="https://t.me/sylvenis"
                title="Text to me"
              >
                <i className="fab fa-telegram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
