import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { token, setToken, backendUrl } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        console.log(backendUrl);
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form onSubmit={handleOnSubmit} className="form-container">
      <div className="form-box">
        <h1 className="form-title">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h1>
        <p className="form-description">
          Please {state === "Sign Up" ? "Create Account" : "Login"} to book an
          appointment
        </p>
        {state === "Sign Up" && (
          <div className="form-field">
            <label>Full Name</label>
            <input
              placeholder="Please Enter your Full name"
              onChange={(event) => setName(event.target.value)}
              type="text"
              value={name}
              required
              className="form-input"
            />
          </div>
        )}
        <div className="form-field">
          <label>Email</label>
          <input
            placeholder="Please Enter your Email"
            type="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            placeholder="Please Enter your Password"
            type="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p className="form-footer">
            Already have an account?{" "}
            <span onClick={() => setState("Login")} className="form-link">
              Login here
            </span>
          </p>
        ) : (
          <p className="form-footer">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")} className="form-link">
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
