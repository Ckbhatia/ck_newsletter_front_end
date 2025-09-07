import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5", // Set a default background color
    },
    action: {
      hover: "#f0f0f0", // Define a hover color for the action palette
    },
  },
});

export default theme;
