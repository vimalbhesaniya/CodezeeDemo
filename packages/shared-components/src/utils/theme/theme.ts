import {
  outlinedInputClasses,
  type PaletteMode,
  type ThemeOptions,
} from "@mui/material";
import { darkPalette } from "./paletteDark";
import { lightPalette } from "./paletteLight";
import "./types";
import { typographyThemeOptions, typographyVariantMapping } from "./typography";

export const Theme = {
  light: "light",
  dark: "dark",
} as const;

export type ThemeVariant = keyof typeof Theme;

export const getPaletteByTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === Theme.light ? lightPalette : darkPalette),
  },
});

export function appTheme(theme: PaletteMode): ThemeOptions {
  const { palette } = getPaletteByTheme(theme);

  return {
    palette,
    typography: typographyThemeOptions,
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            padding: "8.5px 14px !important", //TODO: need to fix this important
            color: palette.app.color.slate[900],
            "::placeholder": {
              color: palette.app.color.iron[800],
              opacity: 1,
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          ":root": {
            fontSize: "62.5%",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "4px",
            fontSize: "15px",
          },
        },
        defaultProps: {
          variant: "contained",
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: "unset",
          },
        },
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiBreadcrumbs: {
        styleOverrides: {
          root: {
            color: "unset",
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: "unset",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            marginLeft: "unset",
            color: palette.app.color.iron[400],
            fontWeight: 500,
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: "16px",
            "&.Mui-disabled": {
              "& .MuiFormLabel-asterisk": {
                color: palette.app.color.iron[800],
              },
            },
          },
          asterisk: {
            color: palette.app.color.red[900],
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: "4px",
          },
        },
        defaultProps: {
          size: "small",
          color: "inherit",
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          paper: {
            fontSize: "1.4rem",
          },
          root: {
            "& .MuiInputBase-root": {
              padding: "unset",
            },
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            ...typographyVariantMapping,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            ":hover": {
              color: palette.app.color.butterflyBlue[900],
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            padding: "unset",
            ":hover": {
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: palette.app.color.butterflyBlue[900],
              },
            },
            "&.Mui-focused": {
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: palette.app.color.butterflyBlue[900],
              },
            },
            "&.Mui-disabled": {
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: palette.app.color.butterflyBlue[300],
              },
            },
          },
          notchedOutline: {
            borderColor: palette.app.color.iron[800],
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            marginRight: "unset",
            paddingLeft: "14px",
          },
          positionEnd: {
            paddingRight: "10px",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            padding: "0px 5px 0px 5px",
            border: 0,
            borderRadius: "6px",
          },
        },
        defaultProps: {
          color: "success",
        },
        variants: [
          {
            props: { color: "success" },
            style: {
              background: palette.app.color.darkMint[700],
              color: palette.app.color.darkMint[900],
            },
          },
          {
            props: { color: "error" },
            style: {
              background: palette.app.color.lipstickRed[600],
              color: palette.app.color.red[800],
            },
          },
        ],
      },
    },
    spacing: 10,
  };
}
