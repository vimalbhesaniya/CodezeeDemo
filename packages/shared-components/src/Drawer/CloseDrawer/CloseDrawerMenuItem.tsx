import { ChevronRight } from "@mui/icons-material";
import { Bullet } from "../Drawer.styled";
import { MenuItem, type MenuItemProps } from "../MenuItem";

type CloseDrawerMenuItemProps = {
  icon?: MenuItemProps["icon"];
  title?: MenuItemProps["title"];
  isShowEndAdornment?: boolean;
  onClick: MenuItemProps["onClick"];
  selected?: MenuItemProps["selected"];
};

export const CloseDrawerMenuItem = ({
  icon = <Bullet />,
  title,
  isShowEndAdornment = false,
  onClick,
  selected = false,
}: CloseDrawerMenuItemProps) => {
  return (
    <MenuItem
      selected={selected}
      title={title}
      icon={icon}
      onClick={onClick}
      endAdornment={isShowEndAdornment && <ChevronRight />}
    />
  );
};
