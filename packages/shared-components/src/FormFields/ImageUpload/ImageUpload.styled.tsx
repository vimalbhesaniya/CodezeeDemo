import { Box, styled } from "@mui/material";

export const DarkBackgroundContainer = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.app.color.mirage[600],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "opacity 0.5s ease",
  };
});
