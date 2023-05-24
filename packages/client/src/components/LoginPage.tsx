import React, { useState } from "react";
import "./LoginPage.css";
import { login, register } from "../actions";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // State to track if registering or logging in
  const navigation = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleToggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isRegistering) {
      register(email, password).then((response) => {
        try {
          if (response.status === 201) {
            console.log("Registration successful");
            setIsRegistering(false); // Switch back to login mode
          }
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      login(email, password).then((response) => {
        try {
          if (response.status === 200) {
            console.log("Login successful");
            navigation("/dashboard");
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  return (
    <div className="container">
      <h2>{isRegistering ? "Register" : "Login"} Page</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>
      <p>
        {isRegistering ? "Already have an account?" : "Don't have an account?"}
        <button onClick={handleToggleRegister}>
          {isRegistering ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
