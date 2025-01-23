import { styled, Box } from "@mui/material";

export const FileUploadContainer = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.app.color.iron[800]}`,
  borderRadius: "8px",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.app.color.butterflyBlue[900],
  },
}));

export const FileInput = styled("input")({
  display: "none",
});
