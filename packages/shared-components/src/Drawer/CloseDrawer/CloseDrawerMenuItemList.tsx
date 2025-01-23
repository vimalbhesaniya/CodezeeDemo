import { isEmpty as _isEmpty } from "lodash";
import { useEffect, useState, type MouseEvent } from "react";
import { urlToNestedObject } from "../../utils/urlToNestedObject";
import type { MenuItem } from "../Drawer";
import { CloseDrawerMenuItem } from "./CloseDrawerMenuItem";
import { CloseDrawerSubMenuItemList } from "./CloseDrawerSubMenuItemList";
import { Popover } from "./Popover";

type CloseDrawerMenuItemListProps = {
  menuItems: MenuItem[];
  currentPathname: string;
};

export const CloseDrawerMenuItemList = ({
  menuItems,
  currentPathname,
}: CloseDrawerMenuItemListProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItem>();

  const [currentPathMenuOpen, setCurrentPathMenuOpen] = useState<
    Record<string, unknown>
  >({});

  useEffect(() => {
    const obj = urlToNestedObject(currentPathname);

    if (_isEmpty(obj)) {
      setCurrentPathMenuOpen({ home: true });
    }

    setCurrentPathMenuOpen(obj);
  }, [currentPathname]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {menuItems.map((menuItem) => {
        const { onClick, key: key1, icon, menuItems = [] } = menuItem;

        const handleClick = (event: MouseEvent<HTMLDivElement>) => {
          if (menuItems.length > 0) {
            setAnchorEl(event.currentTarget);
            setCurrentMenuItem(menuItem);
          } else if (onClick) {
            if (key1 === "home") {
              onClick("/");

              return;
            }

            onClick(`/${key1}`);
          }
        };

        const isMenuSelected = !!currentPathMenuOpen?.[key1];

        return (
          <CloseDrawerMenuItem
            key={self.crypto.randomUUID()}
            onClick={handleClick}
            icon={icon}
            selected={isMenuSelected}
          />
        );
      })}

      {!!anchorEl && (
        <Popover open={true} anchorEl={anchorEl} onClose={handleClose}>
          <CloseDrawerSubMenuItemList
            currentMenuItem={currentMenuItem}
            currentPathMenuOpen={currentPathMenuOpen}
            onCloseMenuPopover={handleClose}
          />
        </Popover>
      )}
    </>
  );
};
