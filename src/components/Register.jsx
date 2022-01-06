import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
// import { FaGithub, FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';
import axios from "axios";
import config from "../config";
import { Helmet } from "react-helmet";
import { production_text } from "../constants";
import { StyledAuthenticationWrapper } from "./Common";

// Axios configuration
const rootUrl = process.env.NODE_ENV === production_text
  ? config.productionURL
  : config.developmentURL;

axios.defaults.baseURL = rootUrl;

const Register = (props) => {
  const [formData, setFormData] = useState({});
  const [isError, updateError] = useState(false);
  const [message, setMessages] = useState("");

  const handleEdit = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages("");

    try {
      const { status } = await axios.post("/users/register", {
        ...formData,
      });
      if (status === 201) {
        setMessages("Successfully registered. Please login.");
        // Redirect the user to login page
        setTimeout(() => {
          props.history.push("/login");
        }, 1000);
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
        <title>Register | ck newsletter</title>
        <link rel="canonical" href="https://cknewsletter.tech/register" />
        <meta
          name="description"
          content="ck newsletter Register. Create a ck newsletter account here."
        />
      </Helmet>
      <div className="form-main-container">
        <div
          className={`message-container center-child ${
            isError ? "alert" : "success"
          }`}
        >
          {message ? <span className="message-text">{message}</span> : null}
        </div>
        <div className="form-heading-container text-center">
          <h2 className="form-heading">Register</h2>
          <Link className="login-link" to="/login">
            Have an account?
          </Link>
        </div>
        <div className="form-container flex-center">
          <form className="form" onSubmit={handleSubmit}>
            <input
              required
              type="text"
              name="name"
              className="input"
              placeholder="Name"
              minLength="4"
              value={formData.name || ""}
              onChange={handleEdit}
            />
            <input
              required
              type="text"
              name="username"
              className="input"
              placeholder="Username"
              minLength="4"
              value={formData.username || ""}
              onChange={handleEdit}
            />
            <input
              required
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              minLength="12"
              value={formData.email || ""}
              onChange={handleEdit}
            />
            <input
              required
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              minLength="6"
              value={formData.password || ""}
              onChange={handleEdit}
            />
            <input className="submit-btn" type="submit" value="Register" />
          </form>
        </div>
        {/* <div className="social-login-container">
          <h2 className="social-login-heading">
            Or, use another account:
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

export default withRouter(Register);
