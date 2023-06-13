import axios from "axios";
import { useState } from "react";

export function SignUp() {
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");

  let passwordLength;
  if (password.length > 12) {
    passwordLength = <small id="bad">Your password exceeded the 12 character limit</small>;
  } else {
    passwordLength = (
      <p>
        <small>{12 - password.length} characters remaining</small>
      </p>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/login"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div className="signup-form-wrapper">
      <div className="form-box">
        <form className="form">
          <span className="title">Sign Up</span>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <span className="subtitle">Create a free account with your email.</span>

          <div className="form-container">
            <input name="full_name" type="text" className="input" placeholder="Full Name" />
            <input name="email" type="email" className="input" placeholder="Email" />
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {passwordLength}
            <input name="password_confirmation" type="password" className="input" placeholder="Password Confirmation" />
            <input name="user_image_url" type="text" className="input" placeholder="User Image URL" />
          </div>
          <button>Sign Up</button>
        </form>
        <div className="form-section">
          <h6>
            Have an account? <a href="/login">Log In</a>{" "}
          </h6>
        </div>
      </div>
    </div>
  );
}
