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
        <DocWrapper>
          <div>
            <h1>Getting started guide</h1>
            <p>
              This service helps small and mid-sized bloggers automate
              delivering newsletters to subscribers. Simply connect two requests
              to your blog and focus on writing amazing content. Subscribers
              will automatically get the newsletter when you publish a new
              article.
            </p>

            <h2>Table of Contents</h2>
            <nav className="table-of-contents">
              <ul>
                <li>
                  <a href="http://localhost:3000/docs#one">
                    How to create an account?
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/docs#two">
                    How to create a project?
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/docs#three">
                    How to activate newsletter service?
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/docs#four">
                    Set-up the subscribe
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/docs#five">
                    Set-up the push newsletters
                  </a>
                </li>
              </ul>
            </nav>

            <h2 id="one">How to Create an Account</h2>
            <ol>
              <li>
                Open{" "}
                <a
                  href="https://cknewsletter.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  cknewsletter.netlify.app
                </a>
              </li>
              <li>Sign up using your email account.</li>
            </ol>

            <h2 id="two">How to Create a Project</h2>
            <ol>
              <li>Sign in with your account credentials.</li>
              <li>
                Click <b>'New'</b> to create a new project.
                <span>
                  <img
                    src="https://res.cloudinary.com/citybazz/image/upload/v1598018555/cknewsletter/uoydolsfrfquaqzanvgf.jpg"
                  />
                </span>
              </li>
              <li>
                Fill in the details about your project.
                <br />
                <br />
                Optionally, add a custom (<code>HTML</code>) newsletter
                template.
              </li>
              <li>Submit your project.</li>
            </ol>

            <h2 id="three">How to Activate Newsletter Service</h2>
            <p>
              Your email credentials are used to send newsletters to your
              subscribers.
            </p>
            <ol>
              <li>
                Go to the <b>Profile</b> page.
              </li>
              <li>
                Enter your email and password credentials in the relevant
                fields.
              </li>
              <li>Select your email service provider.</li>
              <img src="http://imgur.com/2wXn83ul.png" />
              <li>
                Click <b>Save</b>.
              </li>
            </ol>
            <div className="note">
              <b>Note:</b> Your email & password are confidential.
              <br />
              Direct email service integration is planned.
              <br />
              Grant permission for the service to use your email account.
              <br />
              Consult guides or contact support.
            </div>

            <div className="pro-tip">
              <b>PRO TIP:</b> Use the{" "}
              <a
                href="https://www.npmjs.com/package/cknewsletter_hook"
                target="_blank"
                rel="noopener noreferrer"
              >
                cknewsletter_hook
              </a>{" "}
              Node package &ndash; low-code/no-code solution for integration!
            </div>

            <h2 id="four">Set-Up the Subscribe</h2>
            <ol>
              <li>
                Create a <code>fetch</code> request with the <b>PATCH</b>{" "}
                method.
              </li>
              <li>
                Add these properties to the request payload (<code>body</code>):
                <br />
                <code>
                  <br />
                  "subscriber": "example@email.com",
                  <br />
                  <br />
                  "apiKey": "15870449476249g9uo825252"
                </code>
                <ul>
                  <li>
                    <code>subscriber</code> is dynamic: use your subscriber's
                    email.
                  </li>
                  <li>
                    <code>apiKey</code>: Your project's API Key.
                  </li>
                </ul>
              </li>
              <li>
                <span>Send a PATCH request to:</span>
                <br />
                <br />
                <code>
                  https://ck-newsletter.onrender.com/api/v1/projects/subscribe
                </code>
              </li>
              <li>Subscribers are stored in your project on the platform.</li>
              <li>
                Include this code in your blog so it’s triggered whenever
                someone submits the subscribe form.
              </li>
            </ol>
            <div className="note">
              Need help? Email:{" "}
              <a href="mailto:cknewsletterservice@gmail.com">
                cknewsletterservice@gmail.com
              </a>
            </div>

            <h2 id="five">Set-Up the Push Newsletters</h2>
            <ol>
              <li>
                Create a <code>fetch</code> request with the <b>PATCH</b>{" "}
                method.
              </li>
              <li>
                Add these properties to the request payload (<code>body</code>):
                <br />
                <br />
                <code>
                  "slug": "vue",
                  <br />
                  <br />
                  "apiKey": "15870449476249g9uo****"
                </code>
                <ul>
                  <li>
                    <code>apiKey</code>: Your project's API Key.
                  </li>
                  <li>
                    <code>slug</code>: Dynamic value (your article slug or ID).
                  </li>
                </ul>
              </li>
              <li>
                The slug generates your article link, e.g.{" "}
                <code>https://myblog.com/blog/vue</code>
              </li>
              <li>
                <span>
                  Send a PATCH request to: <br />
                </span>
                <br />
                <code>
                  https://ck-newsletter.onrender.com/api/v1/projects/slug
                </code>
              </li>
              <li>
                Include this code in your blog so it's triggered whenever you
                publish a new article.
              </li>
              <li>
                Subscribers receive newsletters for that project and article.
              </li>
            </ol>

            <div className="note">
              <b>You're all set!</b> Write great articles and keep your
              subscribers updated!
            </div>

            <h2>Support</h2>
            <p>
              Questions or feedback? Email{" "}
              <a href="mailto:cknewsletterservice@gmail.com">
                cknewsletterservice@gmail.com
              </a>
            </p>
          </div>
        </DocWrapper>
      </div>
    </div>
  );
}

/* Wrapper styles */
const DocWrapper = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 3.5rem;
  max-width: 800px;
  padding: 1.2rem 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(40, 40, 40, 0.07);

  /* Headings */
  h1,
  h2,
  h3 {
    margin-top: 3rem;
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.2;
  }
  h1 {
    font-size: 2.4rem;
    color: #1a2040;
    margin-top: 0;
  }
  h2 {
    font-size: 1.8rem;
    color: #2274a5;
    border-bottom: 1.5px solid #eaeaea;
    padding-bottom: 0.4rem;
  }
  h3 {
    font-size: 1.45rem;
    color: #385170;
  }

  /* Paragraphs & Lists */
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #222e3a;
    margin: 1rem 0;
  }
  ul,
  ol {
    margin: 1rem 0 1.5rem 2rem;
  }
  li {
    font-size: 1.1rem;
    margin-top: 0.7rem;
    color: #373d48;
  }

  /* Links */
  a,
  .rel-link {
    color: #6348ad;
    text-decoration: underline;
    font-weight: 500;
  }
  a:hover,
  .rel-link:hover {
    color: #2274a5;
    text-decoration: underline;
  }

  /* Bold + Inline Code */
  b {
    font-size: 1.08rem;
    font-weight: 600;
    color: #222e3a;
  }
  code {
    margin: 0 0.12em;
    font-family: "SFMono-Regular", Menlo, Monaco, Consolas, monospace;
    font-size: 1.04rem;
    background: #f6f7f9;
    padding: 0.19em 0.39em;
    border-radius: 5px;
    color: #39556d;
    border: 1px solid #e2e4ea;
  }

  /* Table of Contents Navigation */
  .table-of-contents {
    background: #f7f8fb;
    border-radius: 7px;
    padding: 1rem 1.4rem;
    margin-bottom: 2.5rem;
  }
  .table-of-contents ul {
    list-style-type: disc;
    padding-left: 1.8rem;
  }
  .table-of-contents li {
    font-size: 1.08rem;
    margin-bottom: 0.5rem;
  }

  /* Notes and Tips */
  .note-text,
  .note,
  .pro-tip {
    background: #fffbe9;
    border-left: 4px solid #ffd700;
    margin: 2.2rem 0 1.8rem 0;
    padding: 1.1rem 1.4rem;
    border-radius: 7px;
    color: #73510b;
    font-size: 1.05rem;
  }
  .pro-tip {
    background: #eef6fa;
    border-left: 4px solid #2274a5;
    color: #216073;
  }

  /* Section border (optional) */
  section {
    margin-bottom: 2.5rem;
    border-bottom: 1px solid #ececec;
    padding-bottom: 1.5rem;
  }

  @media (max-width: 600px) {
    max-width: 98vw;
    padding: 1rem 0.6rem;
    h1 {
      font-size: 1.8rem;
    }
    h2 {
      font-size: 1.3rem;
    }
    h3 {
      font-size: 1.1rem;
    }
  }
`;
