"use client";

import { Close, Logout, Menu } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import {
  AppBar,
  Drawer,
  PadBox,
  UserProfileMenu,
} from "@repo/shared-components";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, type PropsWithChildren } from "react";
import { useDrawerMenuItems } from "./hooks/useDrawerMenuItems";

// eslint-disable-next-line sonarjs/function-return-type
export function AppLayout({ children }: Readonly<PropsWithChildren>) {
  const currentPathname = usePathname();

  const { data } = useSession();

  const showDrawer = !currentPathname.startsWith("/auth");

  const [open, setOpen] = useState(true);

  const { menuItems } = useDrawerMenuItems();

  if (showDrawer) {
    const menulist = [
      {
        key: "signOut",
        label: "Sign Out",
        icon: <Logout />,
        sx: {
          color: "red",
        },
        onClick: () => signOut(),
      },
    ];

    return (
      <Box display="flex" height="100%">
        <AppBar drawerOpen={open}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={() => setOpen((prev) => !prev)}
              edge="start"
            >
              {open ? <Close /> : <Menu />}
            </IconButton>

            <UserProfileMenu
              userDetails={{
                name: data?.user.name ?? "",
                email: data?.user.email ?? "",
                avatar: data?.user.avatar ?? "",
              }}
              menuItems={menulist}
            />
          </Stack>
        </AppBar>

        <Drawer
          menuItems={menuItems}
          open={open}
          currentPathname={currentPathname}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            background: (theme) => theme.palette.app.color.slate[800],
            marginTop: "64px",
          }}
        >
          <PadBox padding={{ padding: "30px" }}>{children}</PadBox>
        </Box>
      </Box>
    );
  }

  return children;
}