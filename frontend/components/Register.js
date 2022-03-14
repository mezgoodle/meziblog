export default function Register({
  handleRegister,
  setNewName,
  setNewEmail,
  setNewPassword,
  setNewSecondPassword,
  equalPassword,
}) {
  return (
    <form onSubmit={handleRegister}>
      <div className="form-outline mb-4">
        <input
          type="text"
          id="registerName"
          className="form-control"
          onChange={(e) => setNewName(e.target.value)}
        />
        <label className="form-label" htmlFor="registerName">
          Name
        </label>
      </div>

      <div className="form-outline mb-4">
        <input
          type="email"
          id="registerEmail"
          className="form-control"
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <label className="form-label" htmlFor="registerEmail">
          Email
        </label>
      </div>

      <div className="form-outline mb-4">
        <input
          type="password"
          id="registerPassword"
          className="form-control"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label className="form-label" htmlFor="registerPassword">
          Password
        </label>
      </div>

      <div className="form-outline mb-4">
        <input
          type="password"
          id="registerRepeatPassword"
          className="form-control"
          onChange={(e) => setNewSecondPassword(e.target.value)}
        />
        <label className="form-label" htmlFor="registerRepeatPassword">
          Repeat password
        </label>
        {equalPassword ? (
          ""
        ) : (
          <div className="form-text text-danger">Password are not equal</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-3">
        Register
      </button>
    </form>
  );
}
