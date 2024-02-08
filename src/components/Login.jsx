import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from '../firebase'

function Login() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault()
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log(userCredential)
      const user = userCredential.user
      localStorage.setItem('token', user.accessToken)
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/')
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li class="nav-item" role="presentation">
              <a
                class="nav-link active"
                id="tab-login"
                data-mdb-pill-init
                href="/login"
                role="tab"
                aria-controls="pills-login"
                aria-selected="true"
              >
                Login
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="tab-register"
                data-mdb-pill-init
                href="/register"
                role="tab"
                aria-controls="pills-register"
                aria-selected="false"
              >
                Register
              </a>
            </li>
          </ul>

          <div class="tab-content">
            <div
              class="tab-pane fade show active"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="tab-login"
            >
              <form onSubmit={handleSubmit}>
                <div data-mdb-input-init class="form-outline mb-4">
                  <input 
                  type="email" 
                  id="loginName" 
                  class="form-control" 
                  onChange={event => setEmail(event.target.value)}
                  value={email}
                  required
                  />
                  <label class="form-label" for="loginName">
                    Email or username
                  </label>
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                  <input
                    type="password"
                    id="loginPassword"
                    class="form-control"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                    required
                  />
                  <label class="form-label" for="loginPassword">
                    Password
                  </label>
                </div>
                <button type="submit" class="btn btn-primary btn-block mb-4">
                  Sign in
                </button>

                <div class="text-center">
                  <p>
                    Not a member? <a href="/register">Register</a>
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

export default Login;
