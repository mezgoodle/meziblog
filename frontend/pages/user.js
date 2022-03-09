export default function user() {
  return (
    <>
      <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            id="tab-login"
            data-mdb-toggle="pill"
            href="#pills-login"
            role="tab"
            aria-controls="pills-login"
            aria-selected="true"
          >
            Login
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            id="tab-register"
            data-mdb-toggle="pill"
            href="#pills-register"
            role="tab"
            aria-controls="pills-register"
            aria-selected="false"
          >
            Register
          </a>
        </li>
      </ul>

      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="pills-login"
          role="tabpanel"
          aria-labelledby="tab-login"
        >
          <form>
            <div className="form-outline mb-4">
              <input type="email" id="loginName" className="form-control" />
              <label className="form-label" for="loginName">
                Email or username
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="loginPassword"
                className="form-control"
              />
              <label className="form-label" for="loginPassword">
                Password
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign in
            </button>
          </form>
        </div>
        <div
          className="tab-pane fade"
          id="pills-register"
          role="tabpanel"
          aria-labelledby="tab-register"
        >
          <form>
            <div className="form-outline mb-4">
              <input type="text" id="registerName" className="form-control" />
              <label className="form-label" for="registerName">
                Name
              </label>
            </div>

            <div className="form-outline mb-4">
              <input type="email" id="registerEmail" className="form-control" />
              <label className="form-label" for="registerEmail">
                Email
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="registerPassword"
                className="form-control"
              />
              <label className="form-label" for="registerPassword">
                Password
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="registerRepeatPassword"
                className="form-control"
              />
              <label className="form-label" for="registerRepeatPassword">
                Repeat password
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-3">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
