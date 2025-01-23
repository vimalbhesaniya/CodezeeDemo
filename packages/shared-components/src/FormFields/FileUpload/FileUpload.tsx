import { Box, Stack, Typography } from "@mui/material";
import { drop, join, last, remove, split } from "lodash";
import { useRef } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { PadBox } from "../../PadBox";
import { SvgsDrop } from "../../Svgs";
import { FileInput, FileUploadContainer } from "./FileUpload.styled";
import { UploadedFileName } from "./UploadedFileName";

export type FileUploadProps<P extends FieldValues> = UseControllerProps<P> & {
  multiple?: boolean;
  loading?: boolean;
  onChange: (file: File[]) => void;
  onDelete: (file: string[]) => void;
  uploadedFiles: string[];
};

export function FileUpload<P extends FieldValues>({
  loading,
  uploadedFiles,
  onChange,
  onDelete,
  multiple = false,
  ...restProps
}: FileUploadProps<P>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getFileName = (url: string) => {
    const imageName = join(drop(split(last(split(url, "/")), "_")), "_");

    return imageName;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      onChange(files);
    }
  };

  const handleFileRemove = (index: number) => {
    if (multiple && Array.isArray(uploadedFiles)) {
      const copyOfUploadedFiles = [...uploadedFiles];

      remove(copyOfUploadedFiles, (_, i) => i === index);

      onDelete(copyOfUploadedFiles.length > 0 ? copyOfUploadedFiles : []);
    } else {
      onDelete([]);
    }
  };

  const renderFileNames = () => {
    if (!uploadedFiles) {
      return null;
    }

    if (Array.isArray(uploadedFiles)) {
      return uploadedFiles.map((file: string, index: number) => {
        return (
          <UploadedFileName
            key={self.crypto.randomUUID()}
            fileName={getFileName(file)}
            onDelete={() => handleFileRemove(index)}
          />
        );
      });
    }
  };

  return (
    <Box>
      <FileUploadContainer
        onClick={() => inputRef.current?.click()}
        {...restProps}
      >
        <PadBox padding={{ padding: "20px" }}>
          <Stack gap="4px" alignItems="center" justifyContent="center">
            <FileInput
              disabled={loading}
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              multiple={multiple}
            />

            <SvgsDrop />

            <Typography>Drag & drop files or Browse</Typography>

            <Typography variant="caption">
              Only JPG, PNG, PDF files are accepted.
            </Typography>
          </Stack>
        </PadBox>
      </FileUploadContainer>
      {renderFileNames()}
    </Box>
  );
}
