import {
  Typography,
  type ListItemButtonProps as MuiListItemButtonProps,
} from "@mui/material";
import { StyledListItemButton } from "./ListItemButton.styled";

export type ListItemButtonProps = MuiListItemButtonProps & {
  label: string;
};

export function ListItemButton({
  label,
  selected,
  ...restListItemButtonProps
}: ListItemButtonProps) {
  return (
    <StyledListItemButton
      selected={selected}
      alignItems="flex-start"
      {...restListItemButtonProps}
    >
      <Typography variant="body2" fontWeight={500}>
        {label}
      </Typography>
    </StyledListItemButton>
  );
}
