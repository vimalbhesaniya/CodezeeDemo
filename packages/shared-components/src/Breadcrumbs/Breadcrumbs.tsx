import {
  Box,
  IconButton,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
  useTheme,
} from "@mui/material";
import type { ReactNode } from "react";

type BreadcrumbItem = {
  icon?: ReactNode;
  text?: string;
  onClick?: () => void;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: BreadcrumbProps) => {
  const theme = useTheme();

  return (
    <MuiBreadcrumbs>
      {items.map((item) => {
        const { icon, text, onClick } = item;

        if (onClick) {
          return (
            <Link
              key={self.crypto.randomUUID()}
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              onClick={onClick}
              href="#"
            >
              {icon && (
                <IconButton
                  sx={{
                    color: theme.palette.app.color.butterflyBlue[900],
                  }}
                >
                  {icon}
                </IconButton>
              )}
              {text && <Typography>{text}</Typography>}
            </Link>
          );
        }

        return (
          <Box key={self.crypto.randomUUID()}>
            {icon && (
              <IconButton
                sx={{
                  color: theme.palette.app.color.butterflyBlue[900],
                }}
              >
                {icon}
              </IconButton>
            )}
            {text && <Typography>{text}</Typography>}
          </Box>
        );
      })}
    </MuiBreadcrumbs>
  );
};
