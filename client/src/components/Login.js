import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  });
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", creds)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload)
        props.history.push("/bubbles")
      })
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          type="text"
          name="username"
          value={creds.username}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          type="text"
          name="password"
          value={creds.password}
          onChange={handleChange}
        />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
