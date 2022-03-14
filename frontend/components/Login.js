export default function Login({ handleLogin, setEmail, setPassword }) {
  return (
    <form onSubmit={handleLogin}>
      <div className="form-outline mb-4">
        <input
          type="email"
          id="loginName"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="form-label" htmlFor="loginName">
          Email or username
        </label>
      </div>

      <div className="form-outline mb-4">
        <input
          type="password"
          id="loginPassword"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="form-label" htmlFor="loginPassword">
          Password
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">
        Sign in
      </button>
    </form>
  );
}
