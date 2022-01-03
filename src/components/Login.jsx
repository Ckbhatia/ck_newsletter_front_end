import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
// import { FaGithub, FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';
import axios from "axios";
import config from "../config";
import { Helmet } from "react-helmet";
import { StyledAuthenticationWrapper } from "./Common";

// Axios configuration
const rootUrl = process.env.NODE_ENV === "production"
  ? config.productionRootURL
  : "http://localhost:3000";

axios.defaults.baseURL = rootUrl;

const Login = (props) => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [isError, updateError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status, data } = await axios.post("/users/login", {
        email,
        password
      });
      if (status === 200) {
        // Set the user
        await props.updateUser(data.data);
        // Fetch projects
        await props.fetchProjects(data.token);
        if (data.token) {
          localStorage.setItem("userToken", JSON.stringify(data.token));
        }
        // Redirect the user to dashboard page
        props.history.push("/dashboard");
      } else {
        // Change the state to true for error
        updateError(true);
      }
    } catch (err) {
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
        <title>Login | ck newsletter</title>
        <link rel="canonical" href="https://cknewsletter.tech/login" />
        <meta
          name="description"
          content="ck newsletter login. Login here with ck newsletter account credentials."
        />
      </Helmet>
      <div className="form-main-container">
        <div className="form-heading-container text-center">
          <h2 className="form-heading">Log In</h2>
          <Link className="login-link" to="/register">
            Don't have an account?
          </Link>
        </div>
        <div className="error-container center-child">
          <span className={`error-text error-${isError}`}>
            Email or password is invalid
          </span>
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
              onChange={(e) => updateEmail(e.target.value)}
            />
            <input
              required
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              minLength="6"
              value={password}
              onChange={(e) => updatePassword(e.target.value)}
            />
            <input className="submit-btn" type="submit" value="Log in" />
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

export default withRouter(Login);