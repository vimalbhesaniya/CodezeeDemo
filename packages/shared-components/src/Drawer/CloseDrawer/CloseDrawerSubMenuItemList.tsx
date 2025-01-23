import { Box, List } from "@mui/material";
import { useState, type MouseEvent } from "react";
import type { MenuItem } from "../Drawer";
import { CloseDrawerMenuItem } from "./CloseDrawerMenuItem";
import { Popover } from "./Popover";

type CloseDrawerSubMenuItemListProps = {
  //TODO: jaydip, fix unknown type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentPathMenuOpen: any;
  currentMenuItem?: MenuItem;
  onCloseMenuPopover: () => void;
};

export const CloseDrawerSubMenuItemList = ({
  currentPathMenuOpen,
  currentMenuItem,
  onCloseMenuPopover,
}: CloseDrawerSubMenuItemListProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!currentMenuItem) {
    return <>Loading...</>;
  }

  const { menuItems = [], key: rootKey } = currentMenuItem;

  return (
    <List>
      {menuItems.map(({ title, key: key2, onClick, icon, menuItems = [] }) => {
        const handleClick = (event: MouseEvent<HTMLDivElement>) => {
          if (menuItems.length > 0) {
            setAnchorEl(event.currentTarget);
          } else if (onClick) {
            onClick(`/${rootKey}/${key2}`);
            onCloseMenuPopover();
          }
        };

        const isMenuSelected = !!currentPathMenuOpen?.[rootKey]?.[key2];

        return (
          <Box key={key2}>
            <CloseDrawerMenuItem
              onClick={handleClick}
              title={title}
              icon={icon}
              isShowEndAdornment={!!menuItems.length}
              selected={isMenuSelected}
            />

            {!!anchorEl && (
              <Popover open={true} anchorEl={anchorEl} onClose={handleClose}>
                <List>
                  {menuItems.map(({ key: key3, title, onClick }) => {
                    const isMenuSelected =
                      !!currentPathMenuOpen[rootKey]?.[key2]?.[key3];

                    return (
                      <CloseDrawerMenuItem
                        key={key3}
                        onClick={() => {
                          if (onClick) {
                            onClick(`/${rootKey}/${key2}/${key3}`);
                            handleClose();
                            onCloseMenuPopover();
                          }
                        }}
                        title={title}
                        selected={isMenuSelected}
                      />
                    );
                  })}
                </List>
              </Popover>
            )}
          </Box>
        );
      })}
    </List>
  );
};
