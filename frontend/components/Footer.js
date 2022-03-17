export default function Footer() {
  return (
    <footer className="bg-light text-center mt-auto">
      <div className="container p-4">
        <section className="mb-4">
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#3b5998" }}
            href="https://www.facebook.com/profile.php?id=100005721694357"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#ac2bac" }}
            href="https://www.instagram.com/sylvenis/"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#333333" }}
            href="https://github.com/mezgoodle"
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </section>

        <section className="mb-4">
          <p>
            It is a test blog application on Next.js + FastAPI. You can find
            code on my GitHub page.
          </p>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2022 Copyright:
        <a className="text-dark" href="https://github.com/mezgoodle">
          mezgoodle
        </a>
      </div>
    </footer>
  );
}
