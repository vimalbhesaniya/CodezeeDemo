"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { Theme, appTheme } from "@repo/shared-components";
import type { PropsWithChildren } from "react";

export function LightThemeProvider({ children }: PropsWithChildren) {
  const createdAppTheme = createTheme(appTheme(Theme.light));

  return <ThemeProvider theme={createdAppTheme}>{children}</ThemeProvider>;
}
