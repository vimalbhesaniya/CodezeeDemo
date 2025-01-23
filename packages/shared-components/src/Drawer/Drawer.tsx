"use client";

import { Box } from "@mui/material";
import List from "@mui/material/List";
import type { ReactNode } from "react";
import { PadBox } from "../PadBox";
import { AppLogoMedium } from "../Svgs/AppLogo/AppLogoMedium";
import { AppLogoSmall } from "../Svgs/AppLogo/AppLogoSmall";
import { CloseDrawerMenuItemList } from "./CloseDrawer/CloseDrawerMenuItemList";
import { StyledDrawer } from "./Drawer.styled";
import { OpenDrawerMenuItemList } from "./OpenDrawer/OpenDrawerMenuItemList";

export type MenuItem = {
  key: string; // this key should be unique in list
  icon?: ReactNode;
  title: string;
  onClick?: (href: string) => void;
  menuItems?: MenuItem[];
};

export type DrawerProps = {
  menuItems?: MenuItem[];
  open: boolean;
  currentPathname: string;
};

export const Drawer = ({
  menuItems = [],
  open,
  currentPathname,
}: DrawerProps) => {
  return (
    <StyledDrawer variant="permanent" open={open}>
      <Box textAlign="center">
        <PadBox padding={{ paddingTop: "1.5rem" }}>
          {open ? <AppLogoMedium /> : <AppLogoSmall />}
        </PadBox>
      </Box>

      <List component="nav">
        {open ? (
          <OpenDrawerMenuItemList
            menuItems={menuItems}
            currentPathname={currentPathname}
          />
        ) : (
          <CloseDrawerMenuItemList
            menuItems={menuItems}
            currentPathname={currentPathname}
          />
        )}
      </List>
    </StyledDrawer>
  );
};
