import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table as TableEl,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from "@material-ui/core";
import styled from "styled-components";
import Loader from "./Loader";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

function createObject(
  key,
  value,
) {
  return { key, value };
}

const useStyles = makeStyles({
  table: {
    minWidth: 200
  }
});

const simplifyDate = (date) => {
  let newDate = new Date(date);
  newDate = `${newDate
    .toISOString()
    .substring(0, 10)} ${newDate.toISOString().substring(11, 19)}`;
  return newDate;
};

const addCommas = (arr) => {
  return arr.join(", ");
};

export default function Table({ projectData }) {
  const classes = useStyles();
  let rows;

  if (projectData) {
    const {
      name,
      siteUrl,
      apiKey,
      subscribers,
      slugs,
      isCustomTemplate,
      customTemplateData,
      updatedAt,
      createdAt
    } = projectData;

    const hasCustomTemplate = isCustomTemplate  === "true";

    rows = [
      createObject("Project Name", name),
      createObject("Site URL", siteUrl),
      createObject("Last update", simplifyDate(updatedAt)),
      createObject("API Key", <code>${apiKey}</code>),
      createObject("Subscribers", addCommas(subscribers)),
      createObject("Slugs", addCommas(slugs)),
      createObject("Has Custom email template",  hasCustomTemplate ? "Yes" : "No"), 
      createObject("Created", simplifyDate(createdAt))
    ];

    if (hasCustomTemplate) {
      rows.splice(7, 0, createObject("Custom template", customTemplateData));
    }
  }
  return (
    <Div className="table-main-container">
      {projectData ? (
        <TableContainer component={Paper}>
          <TableEl className={classes.table} aria-label="customized table">
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.key}>
                  <StyledTableCell component="th" scope="row">
                    {row.key}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.value}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </TableEl>
        </TableContainer>
      ) : (
        <Loader />
      )}
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .MuiTableCell-alignRight {
    text-align: left;
  }
`;
