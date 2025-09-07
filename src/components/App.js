import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "./Context";
import Layout from "./Layout";
import config from "../config";

import Landing from "../Pages/Landing";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Profile from "../Pages/Profile";
import Dashboard from "../Pages/Dashboard";
import Project from "./Project";
import EditProject from "./EditProject";
import PageNotFound from "../Pages/PageNotFound";
import Docs from "../Pages/Docs";
import { production_text } from "../constants";

// Axios configuration
axios.defaults.baseURL =
  process.env.NODE_ENV === production_text
    ? config.productionURL
    : config.developmentURL;

const App = () => {
  const [user, updateUser] = useState(null);
  const [projects, updateProjects] = useState(null);
  const [projectData, updateProjectData] = useState(null);
  const [error, updateError] = useState(null);
  const [isFetchingUser, updateFetchingUser] = useState(false);
  const [isAuthenticated, updateAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    if (token) {
      fetchUser(token);
      fetchProjects(token);
    }
  }, []);

  const fetchUser = async (token, redirect) => {
    // Update fetchingUser
    updateFetchingUser(true);
    try {
      const { data, status } = await axios.get("/users", {
        headers: {
          Authorization: token,
        },
      });
      if (status === 200) {
        // Update fetchingUser
        updateFetchingUser(false);
        updateAuthenticated(true);
        // Set the user
        await updateUser(data.user);
        if (redirect) redirect("/dashboard");
      } else {
        // Clear the invalid tokens and redirect to the login
        localStorage.clear();
        navigate("/login");
      }
    } catch (err) {
      // Clear the invalid tokens and redirect to the login
      localStorage.clear();
      navigate("/login");
    }
  };

  const fetchProjects = async (token) => {
    try {
      const { data, status } = await axios.get("/projects", {
        headers: {
          Authorization: token,
        },
      });
      if (status === 200) {
        // Set the user
        await updateProjects(data.data);
        // Redirect to the dashboard page
      } else {
        // Clear the invalid tokens and redirect to the login
        localStorage.clear();
        navigate("/login");
      }
    } catch (err) {
      // Clear the invalid tokens and redirect to the login
      localStorage.clear();
      navigate("/login");
    }
  };

  const handleLogout = () => {
    updateAuthenticated(false);
    // Clear the token cookie
    document.cookie =
      "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    updateUser(null);
    updateProjects(null);
    localStorage.clear();
  };

  const getSelectedProject = async (id) => {
    if (projects) {
      const project = await projects.filter((project) => project._id === id);
      updateProjectData(project[0]);
    }
  };

  const deleteProject = async (id) => {
    // Take a snapshot of projects state before updating
    const projectsSnapshotBeforeUpdate = projects;

    const newProjects = await projects.filter((project) => project._id !== id);
    // Pre update projects
    updateProjects(newProjects);
    // Push to the dashboard
    navigate("/dashboard");

    const token = JSON.parse(localStorage.getItem("userToken"));

    try {
      const { status } = await axios.delete(`/projects/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (status === 200) {
        // Retain the pre update
      } else {
        // Revert back the changes
        updateProjects(projectsSnapshotBeforeUpdate);
        updateError({
          action: "deleteProject",
          msg: "Failed to delete the project",
        });
        // Re-update the error
        setTimeout(() => updateError(null), 3000);
      }
    } catch (err) {
      // Revert back the changes
      updateProjects(projectsSnapshotBeforeUpdate);
      // Update the error
      updateError({
        action: "deleteProject",
        msg: "Failed to delete the project",
      });
      // Re-update the error
      setTimeout(() => updateError(null), 3000);
    }
  };

  const privateRoutes = () => {
    return (
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard projects={projects} error={error} />}
        />
        <Route path="/docs" element={<Docs />} />
        <Route
          exact
          path="/project/:id"
          element={
            <Project
              projects={projects}
              projectData={projectData}
              deleteProject={deleteProject}
              getSelectedProject={getSelectedProject}
            />
          }
        />
        <Route path="/account/profile" element={<Profile user={user} />} />
        <Route
          path="/projects/create"
          element={<EditProject fetchProjects={fetchProjects} />}
        />
        <Route
          path="/project/:id/edit"
          element={
            <EditProject
              projects={projects}
              fetchProjects={fetchProjects}
              projectData={projectData}
              getSelectedProject={getSelectedProject}
            />
          }
        />
        <Route path="*" element={<PageNotFound homeLink={"/dashboard"} />} />
      </Routes>
    );
  };

  const publicRoutes = () => {
    return (
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/docs" element={<Docs />} />
        <Route
          path="/login"
          element={
            <Login updateUser={updateUser} fetchProjects={fetchProjects} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound homeLink={"/"} />} />
      </Routes>
    );
  };

  return (
    <Context.Provider
      value={{ isAuthenticated, user, fetchUser, projects, handleLogout }}
    >
      <Layout>
        {isFetchingUser || user ? privateRoutes() : publicRoutes()}
      </Layout>
    </Context.Provider>
  );
};

export default App;
