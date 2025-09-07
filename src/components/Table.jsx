import React from "react";
import {
  Table as TableEl,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import Loader from "./Loader";
import { styled } from "@mui/material/styles";
import Markdown from "react-markdown";
import { MarkdownWrapper } from "./ProjectForm";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${TableCell.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function createObject(key, value) {
  return { key, value };
}

const simplifyDate = (date) => {
  let newDate = new Date(date);
  newDate = `${newDate.toISOString().substring(0, 10)} ${newDate
    .toISOString()
    .substring(11, 19)}`;
  return newDate;
};

const addCommas = (arr) => {
  return arr.join(", ");
};

export default function Table({ projectData }) {
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
      createdAt,
    } = projectData;

    const hasCustomTemplate = isCustomTemplate === "true";

    rows = [
      createObject("Project Name", name),
      createObject("Site URL", siteUrl),
      createObject("Last update", simplifyDate(updatedAt)),
      createObject("API Key", <code>${apiKey}</code>),
      createObject("Subscribers", addCommas(subscribers)),
      createObject("Slugs", addCommas(slugs)),
      createObject(
        "Used a custom email template?",
        hasCustomTemplate ? "Yes" : "No"
      ),
      createObject("Created on", simplifyDate(createdAt)),
    ];

    if (hasCustomTemplate) {
      rows.splice(
        7,
        0,
        createObject(
          "Custom template",
          <MarkdownWrapper>
            <Markdown>{customTemplateData}</Markdown>
          </MarkdownWrapper>
        )
      );
    }
  }

  return (
    <Div className="table-main-container">
      {projectData ? (
        <TableContainer component={Paper}>
          <TableEl aria-label="customized table" sx={{ minWidth: 200 }}>
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

const Div = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  .MuiTableCell-alignRight {
    text-align: left;
  }
`;
