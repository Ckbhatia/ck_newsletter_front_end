import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
// import ReactMarkdown from "react-markdown";
// import README from "../../README.md";

export default function Docs() {
  return (
    <div className="docs-main-container wrapper">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Document | ck newsletter</title>
        <link rel="canonical" href="https://cknewsletter.tech/docs" />
        <meta
          name="description"
          content="ck newsletter docs. Learn here, how to get started and setup the ck newsletter service for your site."
        />
      </Helmet>
      <div className="docs-container">
        <FrontContainer className="front-matter-container">
          <div className="text-container">
            <h1 className="front-main-text">Ck newsletter Docs</h1>
            <h2 className="front-main-sub-text">
              Guide to setup the ck newsletter
            </h2>
          </div>
        </FrontContainer>
        <DocWrapper>
          <h1>Ck newsletter - A newsletter service</h1>
          <p>
            This service aims to aid small and mid-sized bloggers to automate
            the process of delivering newsletters to subscribers. Blogger needs
            to hook two requests to their blog code and focus on writing amazing
            blogs. Subscribers are going to receive the newsletter when you
            publish a new article.
          </p>
          <h2>Table of contents:</h2>
          <ul>
            <li>
              <a href="#one" className="rel-link">
                How to create an account?
              </a>
            </li>
            <li>
              <a href="#two" className="rel-link">
                How to create a project?
              </a>
            </li>
            <li>
              <a href="#three" className="rel-link">
                How to activate newsletter service?
              </a>
            </li>
            <li>
              <a href="#four" className="rel-link">
                Set-up the subscribe.
              </a>
            </li>
            <li>
              <a href="#five" className="rel-link">
                Set-up the push newsletters.
              </a>
            </li>
          </ul>

          <h3 id="one">How to create an account?</h3>
          <ol>
            <li>
              <p>1. Open the</p> <a href="https://cknewsletter.netlify.com">cknewsletter.netlify.com</a>
            </li>
            <li>
              <p>2. Sign up with your email account.</p>
            </li>
          </ol>

          <h3 id="two"> How to create a project?</h3>
          <ol>
            <li>
              <p>1. Sign In with your account credentials.</p>
            </li>
            <li>
              <p>2. Click on new to create a new project.</p>
              <img src="https://res.cloudinary.com/citybazz/image/upload/v1598018555/cknewsletter/uoydolsfrfquaqzanvgf.jpg" width="40%" />
            </li>
            <li>
              <p>3. Fill details about your project.</p>
              <p>
                {" "}
                Optionally, you can create and put your custom ( HTML ) newsletter
                template.
              </p>
            </li>
            <li>
              <p>4. Submit it</p>
            </li>
          </ol>

          <h3 id="three">How to activate newsletter service?</h3>
          <small>
            These email credentials will be used to send newsletters to your
            subscribers.
          </small>

          <ol>
            <li>
              <p>1. You need to go to the profile page.</p>
            </li>
            <li>
              <p>
                2. Put your email and password credential to the relative input
                fields.
              </p>
            </li>
            <li>
              <p>3. Select your email service.</p>
              <img src="http://imgur.com/2wXn83ul.png" width="40%" />
            </li>
            <li>
              <p>4. Save it</p>
            </li>
          </ol>
            <p>Your email & password is confidential and kept secret to everyone.</p>
            <p>Altough, we are planing to integrate own email service and also taking direct permission from your email service provider instead of credentials.</p>
            <p>Note: Please grant permission to your email account to be used behalf of you.</p>
            <p>You can find helpful resources on the internet as per your service or contact us for help.</p>

          <p className="note-text"><b  style={{color: "red"}}>PRO TIP:</b>: you can also use <a href="https://www.npmjs.com/package/cknewsletter_hook" target="_blank">cknewsletter_hook</a> node package<br />. It requires low-code/no code.</p>

          <h3 id="four">Set-up the subscribe!</h3>

          <ol>
            <li>
              <p>
                1. Create a fetch request with <code>PATCH</code> method.
              </p>
            </li>
            <li>
              <p> 2. Need to put two properties into the payload ( body ).</p>

              <code>
                "subscriber": "ch*****@gmail.com", 
                "apiKey": "15870449476249g9uo*****"
              </code>

              <p>
                {" "}
                The <code>subscriber</code> should be dynamic. This should be your
                subscriber's email.
              </p>
              <p>
                {" "}
                The <code>apiKey</code> should be your project's API Key.
              </p>
            </li>
            <li>
              <p>
                3. Now you can make a patch request with these data on this
                endpoint:
                `https://cknewsletter.herokuapp.com/api/v1/projects/subscribe`
              </p>
            </li>
            <li>
              <p>4. Your subscribers will be stored in your project on this platform.</p>
            </li>
            <li>
              <p>
                5. Place this code in your blog's code where it will be invoked
                whenever your user submit the subscribe form.
              </p>
            </li>
          </ol>
          <p>Note: shoot an email if you need more help with this</p>

          <h3 id="five">Set-up the push newsletters!</h3>
          <ol>
            <li>
              <p>
                1. Create a fetch request with <code>PATCH</code> method.
              </p>
            </li>
            <li>
              <p>
                2. Need to put two properties into the payload ( body ).
              </p>
                <code>
                  "slug": "vue", "apiKey": "15870449476249g9uo\*\*\*\*"
                </code>
              <p>
                Replace the <code>apiKey</code> with your project's API key.
              </p>
              <p>
                <code>Slug</code>should be dynamic. Your article slug or id
                should be the value of slug key.
              </p>
            </li>
            <li>
              <p>
                {" "}
                3. Notice that your slug will be used to create the link to your
                article. For Ex: "https://myblog.com/blog/vue"
              </p>
            </li>
            <li>
              <p>
                {" "}
                4. Now you can make a patch request with these data on this
                endpoint:
                https://cknewsletter.herokuapp.com/api/v1/projects/slug
              </p>
            </li>
            <li>
              <p>
                {" "}
                5. Place this patch request code to your blog code where it
                makes this request every time whenever you publish a new
                article.
              </p>
            </li>
            <li>
              <p>
                {" "}
                6. It will push the newsletter to your subscribers of particular
                project.
              </p>
            </li>
          </ol>

          <b>
            Voila, You are done now. Now write the best and keep your
            subscribers in sync with your latest articles.
          </b>

          <h2>Support</h2>
          <p> Feel free to reach out to me on</p>
          <a href="mailto:cknewsletterservice@gmail.com" target="_blank">
            cknewsletterservice@gmail.com
          </a>
          <p>with any and all questions and/or feedback.</p>
        </DocWrapper>
      </div>
    </div>
  );
}
const FrontContainer = styled.div`
  height: 40vh;
  display: flex;
  align-items: center;
  .front-main-text {
    color: #1c1c1c;
    font-size: 3.8rem;
    font-weight: 700;
  }
  .front-main-sub-text {
    color: #1c1c1c;
    font-size: 2.2rem;
    margin: 2rem 0;
  }
`;

const DocWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 4rem;
  h1,
  h2,
  h3 {
    margin-top: 4.5rem;
    margin-bottom: 0.8rem;
    font-weight: 700;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.8rem;
  }
  h3 {
    font-size: 1.6rem;
  }
  p {
    font-size: 1.2rem;
    line-height: 1.7;
    color: #24292e;
  }
  ul {
    // text-decoration: none;
  }
  li {
    font-size: 1.2rem;
    margin-top: 1rem;
    color: #24292e;
  }
  b {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 4rem 0;
  }
  code {
    padding: 0.2rem 0.5rem;
    background-color: #f3f3f3;
    line-height: 1.2;
    border-radius: 3px;
  }
  .rel-link {
    color: #663399;
  }

  .note-text {
    margin: 4rem 0;
    padding: 1rem 0;
  }
`;
