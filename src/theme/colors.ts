// src/theme/colors.ts

// To maintain the hierarchy from Figma, we create fields like "default", "300", "contrastTextLight"
// under "primary", "secondary", "tertiary" etc.
// This naming convention is entirely preferential.

export const colors = {
  main: {
    primary: "#004F62",
    secondary: "#33C213",
    tertiary: "#FFFFFF",
    info: "#2727E3",
    success: "#9CF200",
    warning: "#F5B618",
    error: "#ED4337",
  },

  alternativeLight: {
    primary: "#3499D6",
    secondary: "#5BE548",
    tertiary: "#F8F8F8",
    info: "#2BA4E0",
    success: "#ACFA3B",
    warning: "#FBD44E",
    error: "#F77865",
  },

  alternativeDark: {
    primary: "#004F62",
    secondary: "#247401",
    tertiary: "#FFFFFF",
    info: "#031285",
    success: "#87BF00",
    warning: "#8E5602",
    error: "#BB1715",
  },

  // Legacy colors - keeping for backward compatibility
  legacy: {
    green: "#33C213",
    blue: "#016C9D",
    darkBlue: "#014F73",
    purple: "#9A8DFB",
    lightGray: "#D9D9D9",
    black: '#0F0F0F',
    gray: "#6a6a6a",
    darkRed: "#440000",
    lightRed: "#823A3A",
    coral: "#CB5353",
    red: "#FF0000",
    pink: "#FFCACA",
  },

  base: {
    black: "#000000",
    white: "#FFFFFF",
    darkGray: "#272727",
    lightGray: "rgba(0, 0, 0, 0.3)",
  },
} as const;

export default colors;
  