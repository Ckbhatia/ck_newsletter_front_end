import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Markdown from "react-markdown";
import Switch from "@mui/material/Switch";

export default function ProjectForm({ handleSubmit, projectData }) {
  const [name, updateName] = useState("");
  const [siteUrl, updateSiteUrl] = useState("");
  const [isCustomTemplate, updateCustomTemplate] = useState(false);
  const [customTemplateData, updatecustomTemplateData] = useState("");

  useEffect(() => {
    if (projectData) {
      const { name, siteUrl, isCustomTemplate, customTemplateData } =
        projectData;
      updateName(name);
      updateSiteUrl(siteUrl);
      const value = isCustomTemplate === "true" ? true : false;
      updateCustomTemplate(value);
      updatecustomTemplateData(customTemplateData);
    }
  }, [projectData]);

  return (
    <FormContainer className="form-container flex-center">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(name, siteUrl, isCustomTemplate, customTemplateData);
        }}
      >
        <label>
          Project Name
          <input
            required
            type="text"
            name="name"
            className="input"
            placeholder="Project name"
            minLength="5"
            value={name}
            onChange={(e) => updateName(e.target.value)}
          />
        </label>
        <Label>
          Site url
          <input
            required
            type="text"
            name="siteUrl"
            className="input"
            placeholder="Site URL"
            minLength="7"
            value={siteUrl}
            onChange={(e) => updateSiteUrl(e.target.value)}
          />
        </Label>
        <div className="input-container">
          <span className="custom-text">Add custom template</span>
          <Switch
            checked={isCustomTemplate}
            onChange={() => updateCustomTemplate(!isCustomTemplate)}
            name="customTemplate"
            color="primary"
            inputProps={{ "aria-label": "checkbox" }}
          />
        </div>
        {isCustomTemplate && (
          <>
            <textarea
              type="textarea"
              name="custom template"
              className="input"
              placeholder="Write or paste your copied custom template here ( Markdown format )"
              value={customTemplateData}
              required
              onChange={(e) => updatecustomTemplateData(e.target.value)}
            ></textarea>
            <span className="title-text">Preview</span>
            <MarkdownWrapper>
              <Markdown>{customTemplateData}</Markdown>
            </MarkdownWrapper>
          </>
        )}
        <input className="submit-btn" type="submit" value="Submit" />
      </form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  .form {
    width: 100%;
  }
  .form-container {
    margin-left: 1.2rem;
    margin-right: 1.2rem;
    height: 100%;
  }
  .input {
    font-size: 1.2rem;
    color: #5a5a5a;
    width: 100%;
    height: 100%;
    padding: 0.6rem 0.8rem;
    margin: 0.4rem 0;
    border: 1px solid rgb(211, 209, 209);
    border-radius: 5px;
    &::placeholder {
      color: rgb(156, 154, 154);
      font-size: 1.18rem;
    }
  }

  textarea {
    resize: vertical;
  }

  .submit-btn {
    background-color: #40b9ff;
    color: #ffffff;
    border: none;
    padding: 0.8rem 1.8rem;
    border-radius: 5px;
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
    cursor: pointer;
    &:hover {
      background-color: #4fbfff;
    }
  }

  .MuiSwitch-colorPrimary.Mui-checked {
    color: #40b9ff;
  }

  .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track {
    background-color: #40b9ff;
  }

  .note-text {
    display: inline-block;
    color: crimson;
    font-size: 1rem;
    word-spacing: 0.1rem;
    line-height: 1.5;
    margin: 1rem 0;
  }

  label,
  .custom-text {
    font-size: 1.3rem;
    color: #1f1f1f;
  }

  .title-text {
    display: inline-block;
    padding-top: 15px;
  }
`;

export const MarkdownWrapper = styled.div`
  margin: 20px 0;
  padding: 20px 10px;
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  overflow-x: scroll;
  max-height: 350px;

  img {
    max-width: 35%;
  }
`;

const Label = styled.label`
  display: inline-block;
  padding-top: 15px;
`;
