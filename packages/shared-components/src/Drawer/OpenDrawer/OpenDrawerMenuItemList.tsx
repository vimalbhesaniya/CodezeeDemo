"use client";

import { Box, List } from "@mui/material";
import { isEmpty as _isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { PadBox } from "../../PadBox";
import { urlToNestedObject } from "../../utils/urlToNestedObject";
import type { MenuItem } from "../Drawer";
import { OpenDrawerCollapse } from "./OpenDrawerCollapse";
import { OpenDrawerMenuItem } from "./OpenDrawerMenuItem";

type OpenDrawerMenuItemListProps = {
  menuItems: MenuItem[];
  currentPathname: string;
};

export const OpenDrawerMenuItemList = ({
  menuItems,
  currentPathname,
}: OpenDrawerMenuItemListProps) => {
  //TODO: jaydip, fix this type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [subMenusOpen, setSubMenusOpen] = useState<Record<string, any>>({});

  const [currentPathMenuOpen, setCurrentPathMenuOpen] = useState<
    //TODO: jaydip, fix this type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >({});

  useEffect(() => {
    const obj = urlToNestedObject(currentPathname);

    if (_isEmpty(obj)) {
      setSubMenusOpen({ home: true });
      setCurrentPathMenuOpen({ home: true });

      return;
    }

    setSubMenusOpen(obj);
    setCurrentPathMenuOpen(obj);
  }, [currentPathname]);

  return menuItems.map((menuItem) => {
    const { menuItems = [], key: key1, icon, title, onClick } = menuItem;

    const isMenuSelected =
      !!subMenusOpen?.[key1] || !!currentPathMenuOpen?.[key1];

    if (menuItems.length > 0) {
      return (
        <Box key={key1}>
          <OpenDrawerMenuItem
            onClick={() => {
              setSubMenusOpen((prev) => ({
                ...prev,
                [key1]: !isMenuSelected,
              }));
            }}
            icon={icon}
            title={title}
            isShowEndAdornment
            selected={isMenuSelected}
            key={key1}
          />

          <OpenDrawerCollapse in={isMenuSelected}>
            <List component="div" disablePadding key={key1}>
              {menuItems.map(
                ({ key: key2, onClick, title, menuItems = [] }) => {
                  const isSubMenuSelected =
                    !!subMenusOpen?.[key1]?.[key2] ||
                    !!currentPathMenuOpen?.[key1]?.[key2];

                  return (
                    <PadBox padding={{ pl: 3 }} key={key2}>
                      {menuItems.length > 0 ? (
                        <>
                          <OpenDrawerMenuItem
                            onClick={() => {
                              // eslint-disable-next-line sonarjs/no-nested-functions
                              setSubMenusOpen((prev) => ({
                                ...prev,
                                [key1]: {
                                  ...(prev?.[key1] || {}),
                                  [key2]: !isSubMenuSelected,
                                },
                              }));
                            }}
                            key={key2}
                            title={title}
                            isShowEndAdornment
                            selected={isSubMenuSelected}
                          />

                          <OpenDrawerCollapse in={isSubMenuSelected}>
                            <List component="div" disablePadding key={key2}>
                              {menuItems.map(
                                ({ key: key3, title, onClick }) => {
                                  const menuSelectedItem =
                                    !!subMenusOpen[key1]?.[key2]?.[key3] ||
                                    !!currentPathMenuOpen[key1]?.[key2]?.[key3];

                                  return (
                                    <PadBox padding={{ pl: 2 }} key={key3}>
                                      <OpenDrawerMenuItem
                                        // eslint-disable-next-line sonarjs/no-nested-functions
                                        onClick={() => {
                                          if (onClick && !menuSelectedItem) {
                                            onClick(`/${key1}/${key2}/${key3}`);
                                          }
                                        }}
                                        key={key3}
                                        title={title}
                                        selected={menuSelectedItem}
                                      />
                                    </PadBox>
                                  );
                                }
                              )}
                            </List>
                          </OpenDrawerCollapse>
                        </>
                      ) : (
                        <OpenDrawerMenuItem
                          onClick={() => {
                            if (onClick && !isSubMenuSelected) {
                              onClick(`/${key1}/${key2}`);
                            }
                          }}
                          key={key2}
                          title={title}
                          selected={isSubMenuSelected}
                        />
                      )}
                    </PadBox>
                  );
                }
              )}
            </List>
          </OpenDrawerCollapse>
        </Box>
      );
    }

    return (
      <OpenDrawerMenuItem
        onClick={() => {
          if (onClick && !isMenuSelected) {
            if (key1 === "home") {
              onClick("/");

              return;
            }

            onClick(`/${key1}`);
          }
        }}
        key={key1}
        icon={icon}
        selected={isMenuSelected}
        title={title}
      />
    );
  });
};
