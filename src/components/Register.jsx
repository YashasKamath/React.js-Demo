import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {auth} from '../firebase'

function Register() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault()
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log(userCredential)
      const user = userCredential.user
      localStorage.setItem('token', user.accessToken)
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/')
    }catch(error){
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <h3>Username: </h3>
        <input
          type="email"
          placeholder="username"
          onChange={event => setEmail(event.target.value)}
          required
          value={email}
        />
        <h3>Password: </h3>
        <input
          type="password"
          placeholder="password"
          onChange={event => setPassword(event.target.value)}
          required
          value={password}
        />
        <br />
        <br />
        <button type="submit">Register</button>
      </form>

      <p>Already have an account?</p>
      <Link to={`/login`}>Login</Link>
    </div>
  );
}

export default Register;
