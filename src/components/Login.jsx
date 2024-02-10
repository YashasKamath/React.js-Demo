import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { updateUserEmail } from "../redux";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      props.updateUserEmail(email)
      localStorage.setItem("email", email)
      navigate("/");
      setError("");
    } catch (error) {
      console.log(error);
      setError("Incorrect email or password");
    }
  };

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <Form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                id="loginName"
                class="form-control"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="password"
                type="password"
                id="loginPassword"
                class="form-control"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                required
              />
            </Form.Group>
            <div class="text-center">
              <Button as="input" type="submit" value="Sign In" />
              <br />
              <br />
              <p>
                Not a member? <a href="/register">Register</a>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ...state,
    email : state.user.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserEmail : email => dispatch(updateUserEmail(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login);
