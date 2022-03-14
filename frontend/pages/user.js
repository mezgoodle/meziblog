import { useState } from "react";
import { useRouter } from "next/router";
import Login from "../components/Login";
import Register from "../components/Register";

export default function user() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newSecondPassword, setNewSecondPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [equalPassword, setEqual] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };
    const response = await fetch("http://127.0.0.1:8000/login", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.error(data.detail);
    } else {
      localStorage.setItem("token", data.access_token);
      router.push("/");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (newPassword === newSecondPassword) {
      console.log(newEmail, newName, newPassword);
    } else setEqual(false);
  };

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
          <Login {...{ handleLogin, setEmail, setPassword }} />
        </div>
        <div
          className="tab-pane fade"
          id="pills-register"
          role="tabpanel"
          aria-labelledby="tab-register"
        >
          <Register
            {...{
              handleRegister,
              setNewName,
              setNewEmail,
              setNewPassword,
              setNewSecondPassword,
              equalPassword,
            }}
          />
        </div>
      </div>
    </>
  );
}
