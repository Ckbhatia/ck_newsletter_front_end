import styled from "styled-components";

 const StyledAuthenticationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;

  .form-main-container {
    width: 100%;
    max-width: 30%;
    margin: 2.2rem 0;
    padding: 1rem 0;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(230, 230, 230, 1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(230, 230, 230, 1);
    box-shadow: 0px 0px 2px 1px rgba(230, 230, 230, 1);

    @media (max-width: 1024px) {
      max-width: 50%;
    }

    @media (max-width: 525px) {
      max-width: 60%;
    }

    @media (max-width: 425px) {
      max-width: 70%;
    }

    @media (max-width: 375px) {
      max-width: 80%;
    }
  }

  .form-heading {
    font-size: 1.5rem;
    font-weight: 500;

  }

  .login-link {
    display: block;
    color: #76838f;
    font-size: 0.9rem;
    letter-spacing: 0.02rem;
    margin: 0.5rem 0;
    &:hover {
      color: #131217;
    }
  }

  .social-login-container {
    margin: 2rem 1.2rem;
    .social-login-heading {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
  }

  .social-login-btn-container {
    display: flex;
    justify-content: center;
    align-items: space-between;
    .social-btn {
      font-size: 1.6rem;
      background-color: transparent;
      border: none;
      cursor: pointer;
      margin: 10px 20px;
      &:hover {
        background-color: rgba(234, 234, 234, 0.9);
border-radius: 5px;
      }
    }
  }

  .form {
    // width: 54%;
  }
  .form-container {
    margin-left: 1.2rem;
    margin-right: 1.2rem;
    height: 100%;
    .input {
      width: 100%;
      height: 100%;
      padding: 0.9rem 1.5rem;
      margin: 0.4rem 0;
      border: 1px solid rgb(211, 209, 209);
      border-radius: 5px;
      &::placeholder {
        color: rgb(156, 154, 154);
        font-size: 1.18rem;
      }
    }
    .submit-btn {
      background-color: #40b9ff;
      color: #ffffff;
      border: none;
      padding: 0.8rem 1.8rem;
      border-radius: 5px;
      margin-top: 0.6rem;
      cursor: pointer;
      &:hover {
        background-color: #4fbfff;
      }
    }
  }
  .error-container {
    // position: relative;
    // top: 20px;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .error-text {
    font-size: 1.2rem;
    font-weight: bold;
    background-color: #ff1f35;
    color: #fff;
    padding: 0.8rem 0;
    width: 100%;
  }
  .error-false {
    visibility: hidden;
  }

  .error-true {
    visibility: visible;
  }
`;

export default StyledAuthenticationWrapper;