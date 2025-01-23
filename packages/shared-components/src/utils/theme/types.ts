import type { ColorPalette } from "./colorPalette";

export type AppPalette = {
  color: ColorPalette;
  paperBoxShadow: string;
};

declare module "@mui/material/styles" {
  // eslint-disable-next-line no-unused-vars
  interface Palette {
    app: AppPalette;
  }

  // eslint-disable-next-line no-unused-vars
  interface PaletteOptions {
    app: AppPalette;
  }
}
