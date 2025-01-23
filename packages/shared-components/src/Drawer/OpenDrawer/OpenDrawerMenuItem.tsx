import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Bullet } from "../Drawer.styled";
import { MenuItem, type MenuItemProps } from "../MenuItem";

type OpenDrawerMenuItemProps = {
  icon?: MenuItemProps["icon"];
  title: MenuItemProps["title"];
  isShowEndAdornment?: boolean;
  selected?: MenuItemProps["selected"];
  onClick: MenuItemProps["onClick"];
};

export const OpenDrawerMenuItem = ({
  icon = <Bullet />,
  title,
  isShowEndAdornment = false,
  selected = false,
  onClick,
}: OpenDrawerMenuItemProps) => {
  return (
    <MenuItem
      title={title}
      icon={icon}
      onClick={onClick}
      selected={selected}
      endAdornment={
        isShowEndAdornment && (selected ? <ExpandLess /> : <ExpandMore />)
      }
    />
  );
};
