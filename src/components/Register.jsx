import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { updateUserEmail } from "../redux";
import { connect } from "react-redux";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 6) {
      setError("Password should contain a minimum of 6 characters!");
    } else if (password !== repeatPassword) {
      setError("Password and repeat password not matching!");
      return;
    } else setError("");

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
      props.updateUserEmail(email)
      localStorage.setItem("email", email)
      navigate("/login");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <Form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="name"
                type="text"
                className="form-control"
                onChange={(event) => setName(event.target.value)}
                value={name}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="username"
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                className="form-control"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="password"
                className="form-control"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                placeholder="repeat password"
                className="form-control"
                type="password"
                value={repeatPassword}
                onChange={(event) => setRepeatPassword(event.target.value)}
                required
              />
            </Form.Group>
            <div class="text-center">
              <Button as="input" type="submit" value="Sign Up" />
              <br />
              <br />
              <p>
                Already a member? <a href="/login">Login</a>
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
    email : state.user.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserEmail : email => dispatch(updateUserEmail(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
