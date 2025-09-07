import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container } from "@mui/material";
import axios from "axios";
import { Helmet } from "react-helmet";
import ProjectForm from "./ProjectForm";
import { useNavigate, useParams } from "react-router-dom";

// This component works for both, create project and edit project.
function EditProject({
  projects,
  fetchProjects,
  projectData,
  getSelectedProject,
}) {
  const [status, updateStatus] = useState(null);
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (getSelectedProject) {
      getSelectedProject(projectId);
    }
  }, [projects]);

  const handleSubmit = async (
    name,
    siteUrl,
    isCustomTemplate,
    customTemplateData
  ) => {
    const token = JSON.parse(localStorage.getItem("userToken"));

    try {
      const { status } = await axios.post(
        "/projects",
        {
          name,
          siteUrl,
          isCustomTemplate,
          customTemplateData,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (status === 201) {
        updateStatus({ currentStatus: true, msg: "Created project" });
        await fetchProjects(token);
        setTimeout(() => navigate("/dashboard"), 700);
      } else {
        await updateStatus({ currentStatus: false, msg: "There's an error" });
        setTimeout(() => updateStatus(null), 3000);
      }
    } catch (err) {
      await updateStatus({
        currentStatus: false,
        msg: "Project name or site url is duplicate",
      });
      setTimeout(() => updateStatus(null), 3000);
    }
  };

  const handleEdit = async (
    name,
    siteUrl,
    isCustomTemplate,
    customTemplateData
  ) => {
    const token = JSON.parse(localStorage.getItem("userToken"));

    try {
      const { status } = await axios.patch(
        `/projects/${projectId}`,
        {
          name,
          siteUrl,
          isCustomTemplate,
          customTemplateData,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (status === 200) {
        updateStatus({ currentStatus: true, msg: "Updated project" });
        await fetchProjects(token);
        setTimeout(() => navigate("/dashboard"), 700);
      } else {
        await updateStatus({ currentStatus: false, msg: "There's an error" });
        setTimeout(() => updateStatus(null), 3000);
      }
    } catch (err) {
      await updateStatus({
        currentStatus: false,
        msg: "Project name or site url is duplicate",
      });
      setTimeout(() => updateStatus(null), 3000);
    }
  };

  return (
    <ProjectContainer className="create-project-main-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Create or Edit Project | ck newsletter</title>
        <link rel="canonical" href="https://cknewsletter.tech/project/" />
        <meta
          name="description"
          content="ck newsletter create or edit project. Create a new project or edit chosen project."
        />
      </Helmet>
      <Container maxWidth="sm">
        <Div className="main-container">
          <div className="msg-txt-container center-child">
            {/* Show message on condition */}
            {status && status.currentStatus && (
              <span className="success-msg">{status.msg}</span>
            )}
            {status && status.currentStatus === false && (
              <span className="failed-msg">{status.msg}</span>
            )}
          </div>
          <div className="form-main-container">
            <ProjectForm
              handleSubmit={projectId ? handleEdit : handleSubmit}
              projectData={projectData}
            />
          </div>
        </Div>
      </Container>
    </ProjectContainer>
  );
}

export default EditProject;

const ProjectContainer = styled.div`
  margin-top: 40px;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  background-color: #fcfcfc;
  width: 100%;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(230, 230, 230, 1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(230, 230, 230, 1);
  box-shadow: 0px 0px 2px 1px rgba(230, 230, 230, 1);
  .form-main-container {
    margin: 2.2rem 0.8rem;
  }

  // Message container
  .msg-txt-container {
    position: relative;
    top: 20px;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .success-msg {
    font-size: 1.2rem;
    color: #fff;
    padding: 1.2rem 0;
    width: 100%;
    background-color: #38c942;
  }

  .failed-msg {
    font-size: 1.2rem;
    color: #fff;
    padding: 1.2rem 0;
    width: 100%;
    background-color: #ff1f35;
  }
`;
