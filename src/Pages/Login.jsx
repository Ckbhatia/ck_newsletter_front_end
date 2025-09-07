import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { FaGithub, FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';
import axios from "axios";
import config from "../config";
import { Helmet } from "react-helmet";
import { production_text } from "../constants";
import { StyledAuthenticationWrapper } from "../components/Common";

// Axios configuration
const rootUrl = process.env.NODE_ENV === production_text
  ? config.productionURL
  : config.developmentURL;

axios.defaults.baseURL = rootUrl;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, updateError] = useState(false);
  const [message, setMessages] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages("");

    try {
      const { status, data } = await axios.post("/users/login", {
        email,
        password
      });
      if (status === 200) {
        // Redirect the user to dashboard page
        navigate("/dashboard")

        // Set the user
        await props.updateUser(data.data);
        // Fetch projects
        await props.fetchProjects(data.token);
        if (data.token) {
          localStorage.setItem("userToken", JSON.stringify(data.token));
        }
      } else {
        setMessages("Something went wrong. Please try again.");
        // Change the state to true for error
        updateError(true);
      }
    } catch (err) {
      setMessages("Something went wrong. Please try again.");
      updateError(true);
    }
  };

  const handleGuestLogin = () => {
    setEmail(config.guestEmail);
    setPassword(config.guestPassword);
  }

  // Note: not required for now
  // const handleSocialLogin = (app) => {
  //   window.open(
  //     `${rootUrl}/users/auth/${app}`,
  //     "_self"
  //   );
  // };

  return (
    <StyledAuthenticationWrapper className="login-main-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login | ck newsletter</title>
        <link rel="canonical" href="https://cknewsletter.tech/login" />
        <meta
          name="description"
          content="ck newsletter login. Login here with ck newsletter account credentials."
        />
      </Helmet>
      <div className="form-main-container">
        <div className={`message-container center-child ${isError ? 'alert' : 'success'}`}>
          {message ? (
            <span className="message-text">{message}</span>
          ) : null}
        </div>
        <div className="form-heading-container text-center">
          <h2 className="form-heading">Log In</h2>
          <Link className="login-link" to="/register">
            Don't have an account?
          </Link>
        </div>
        <div className="form-container flex-center">
          <form className="form" onSubmit={handleSubmit}>
            <input
              required
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              minLength="12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input className="submit-btn" type="submit" value="Log in" />
            <button className="submit-btn guest" onClick={handleGuestLogin}>Guest log in</button>
          </form>
        </div>
        {/* <div className="social-login-container">
          <h2 className="social-login-heading">
            Log In with Another Account:
          </h2>
          <div className="social-login-btn-container">
            <button className="social-btn" onClick={() => { handleSocialLogin("google") }}><FaGoogle /></button>
            <button className="social-btn" onClick={() => { handleSocialLogin("github") }}><FaGithub /></button>
            <button className="social-btn" onClick={() => { handleSocialLogin("facebook") }}><FaFacebookF /></button>
            <button className="social-btn" onClick={() => { handleSocialLogin("twitter") }}><FaTwitter /></button>
          </div>
        </div> */}
      </div>
    </StyledAuthenticationWrapper>
  );
};

export default Login;