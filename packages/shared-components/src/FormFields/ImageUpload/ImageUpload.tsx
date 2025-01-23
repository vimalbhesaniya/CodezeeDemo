import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import { Button } from "../../Button";
import { PadBox } from "../../PadBox";
import { DarkBackgroundContainer } from "./ImageUpload.styled";
import { PhotoCaptureDialog } from "./PhotoCaptureDialog";

export type ImageUploadProps = Readonly<{
  onDelete: () => void;
  onChange: (file: File[]) => void;
  variant?: "square" | "circle";
  isUploading?: boolean;
  label?: string;
  subTitle?: string;
  defaultValue?: string;
  isCapture?: boolean;
}>;

export function ImageUpload({
  variant = "square",
  isUploading = false,
  defaultValue = "",
  onDelete,
  onChange,
  label,
  isCapture = false,
  subTitle = "PNG, JPEG under 5 MB",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [hover, setHover] = useState(false);

  const [isOpenCaptureModal, setIsOpenCaptureModal] = useState(false);

  const theme = useTheme();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      onChange(files);
    }
  };

  const handleFileRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <>
      <Stack gap="20px" direction="row" alignItems="center">
        <Box
          onClick={() => !defaultValue && inputRef.current?.click()}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            height: "120px",
            width: "120px",
            position: "relative",
            overflow: "hidden",
            border: defaultValue
              ? `2px solid ${theme.palette.app.color.butterflyBlue[900]}`
              : `2px dashed ${theme.palette.grey[400]}`,
            cursor: "pointer",
            borderRadius: "10px",
            "& img": {
              borderRadius: "10px",
            },
            ":hover": {
              border: `2px dashed ${theme.palette.app.color.butterflyBlue[900]}`,
            },
            ...(variant === "circle"
              ? {
                  borderRadius: "50%",
                  "& img": {
                    borderRadius: "50%",
                  },
                }
              : {}),
          }}
        >
          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/png, image/jpeg"
          />

          {hover && !!defaultValue && (
            <DarkBackgroundContainer>
              <IconButton onClick={() => inputRef.current?.click()}>
                <EditIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton onClick={handleFileRemove}>
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>
            </DarkBackgroundContainer>
          )}

          {isUploading && (
            <DarkBackgroundContainer>
              <Typography color={theme.palette.app.color.iron[600]}>
                Processing...
              </Typography>
            </DarkBackgroundContainer>
          )}

          {defaultValue ? (
            <PadBox padding={{ padding: "2px" }}>
              <img
                alt=""
                src={defaultValue}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </PadBox>
          ) : (
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ height: "100%" }}
            >
              <PersonAddAltIcon />
            </Stack>
          )}
        </Box>

        <Stack>
          <Typography variant="subtitle1" fontWeight={500}>
            {label}
          </Typography>

          <Typography
            variant="caption"
            color={theme.palette.app.color.iron[800]}
          >
            {subTitle}
          </Typography>
        </Stack>

        {isCapture && (
          <Button
            onClick={() => setIsOpenCaptureModal(true)}
            variant="outlined"
          >
            <Stack gap="10px" direction="row">
              <CameraAltOutlinedIcon />

              <Typography variant="body1">Capture photo</Typography>
            </Stack>
          </Button>
        )}
      </Stack>

      {isOpenCaptureModal && (
        <PhotoCaptureDialog
          onChange={onChange}
          isUploading={isUploading}
          open={isOpenCaptureModal}
          onClose={() => setIsOpenCaptureModal(false)}
        />
      )}
    </>
  );
}
