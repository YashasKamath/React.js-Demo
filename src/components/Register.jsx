import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Input, Tab, Ripple, initMDB } from "mdb-ui-kit";
initMDB({ Input, Tab, Ripple });

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password.length < 6){
      setError('Password should contain a minimum of 6 characters!')
    }
    else if (password !== repeatPassword) {
      setError("Password and repeat password not matching!");
      return;
    } 
    else setError(""); 

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="tab-login"
                data-mdb-pill-init
                href="/login"
                role="tab"
                aria-controls="pills-login"
                aria-selected="false"
              >
                Login
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link active"
                id="tab-register"
                data-mdb-pill-init
                href="/register"
                role="tab"
                aria-controls="pills-register"
                aria-selected="true"
              >
                Register
              </a>
            </li>
          </ul>

          <div class="tab-content">
            <div
              class="tab-pane fade show active"
              id="pills-register"
              role="tabpanel"
              aria-labelledby="tab-register"
            >
              {error && (
                <div class="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div data-mdb-input-init class="form-outline mb-4">
                  <input
                    type="text"
                    id="registerName"
                    class="form-control"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    required
                  />
                  <label
                    class="form-label"
                    for="registerName"
                    id="registerNameLabel"
                  >
                    Name
                  </label>
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                  <input
                    type="text"
                    id="registerUsername"
                    class="form-control"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />
                  <label class="form-label" for="registerUsername">
                    Username
                  </label>
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                  <input
                    type="email"
                    id="registerEmail"
                    class="form-control"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    required
                  />
                  <label class="form-label" for="registerEmail">
                    Email
                  </label>
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                  <input
                    type="password"
                    id="registerPassword"
                    class="form-control"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <label class="form-label" for="registerPassword">
                    Password
                  </label>
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                  <input
                    type="password"
                    id="registerRepeatPassword"
                    class="form-control"
                    value={repeatPassword}
                    onChange={(event) => setRepeatPassword(event.target.value)}
                    required
                  />
                  <label class="form-label" for="registerRepeatPassword">
                    Repeat password
                  </label>
                </div>

                <button
                  data-mdb-ripple-init
                  type="submit"
                  class="btn btn-primary btn-block mb-3"
                >
                  Sign up
                </button>
                <div class="text-center">
                  <p>
                    Already a member? <a href="/login">Login</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
