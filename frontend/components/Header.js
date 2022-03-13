import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  useEffect(async () => {
    setToken(localStorage.token);
    if (token) {
      const requestOptions = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(
        "http://127.0.0.1:8000/user/me",
        requestOptions
      );
      const data = await response.json();
      setUser(data.name);
    }
  });

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
            <li className="nav-item me-3 me-lg-0">
              <Link href={"/user"}>
                <a className="nav-link" title="Login or register">
                  <i className="fas fa-user-alt"></i>
                </a>
              </Link>
            </li>
            <li className="nav-item me-3 me-lg-0">
              <a
                className="nav-link"
                title="Login or register"
                onClick={logout}
              >
                <i className="fas fa-sign-out-alt" title="Logout"></i>
              </a>
            </li>
          </ul>
          {token ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item navbar-brand">Hello, {user}</li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
}
