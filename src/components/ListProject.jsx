import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FcComments, FcLink, FcLike } from "react-icons/fc";

export default function ListProject({ project }) {
  const { _id, name, siteUrl, slugs, subscribers, updatedAt } = project;

  const history = useHistory();

  // Simplify date format
  let date = new Date(updatedAt);
  date = `${date.toISOString().substring(0, 10)} ${date
    .toISOString()
    .substring(11, 19)}`;

    const handleClick = () => {
      history.push(`/project/${_id}`);
    }

  return (
    <ProjectContainer className="project-main-container" onClick={handleClick}>
        <div className="project-header">
          <h4 className="project-heading">{name}</h4>
        </div>
        <div className="project-details">
          <div className="project-site-info">
            <FcLink />{" "}
            <a className="site-url-text" target="_blank" rel="noopener noreferrer" href={`//${siteUrl}`} onClick={(e) => e.stopPropagation()}>
              {siteUrl}
            </a>
          </div>
          <div className="project-detail-count">
            <span className="project-last-slug">
              <FcComments /> content: {slugs && slugs.length}
            </span>
            <span className="project-last-subscriber">
              <FcLike /> subscribers: {subscribers && subscribers.length}
            </span>
          </div>
          <div className="project-footer">
            <span className="last-update-time">Updated at: {date}</span>
            <span className="last-subscriber">
              Recent subscriber: {subscribers[subscribers.length - 1]}
            </span>
            <span className="last-slug">
              Recent content: {slugs[slugs.length - 1]}
            </span>
          </div>
        </div>
    </ProjectContainer>
  );
}

const ProjectContainer = styled.div`
  padding: 1rem;
  box-shadow: -1px 0px 5px 2px rgb(229, 229, 229);
  background-color: #fff;
  border-radius: 5px;

  &:hover {
    -webkit-box-shadow: -1px 0px 2px 1px rgb(229, 229, 229);
    -moz-box-shadow: -1px 0px 2px 1px rgb(229, 229, 229);
    box-shadow: -1px 0px 2px 1px rgb(229, 229, 229);
  }

  .project-card-link-wrapper {
    text-decoration: none;
    color: #484848;
  }
  .project-heading {
    font-size: 1.6rem;
    color: #191919;
  }

  .project-site-info {
    font-size: 1.2rem;
    margin: 25px 0 20px 0;
    display: inline-block;
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
  .project-detail-count {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    .project-last-slug {
      display: flex;
      align-items: center;
      column-gap: 10px;
      font-size: 1.2rem;
      color: #484848;
    }
  }
  .project-last-subscriber {
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-size: 1.2rem;
    color: #484848;
  }
  .project-footer {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    display: flex;

  }
  .last-update-time {
    width: 35%; 
  }
  .last-subscriber {
    width: 35%;
  }
  .last-slug {
    width: 30%;
  }
`;
