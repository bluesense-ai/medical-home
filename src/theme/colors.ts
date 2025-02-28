// src/theme/colors.ts

// To maintain the hierarchy from Figma, we create fields like "default", "300", "contrastTextLight"
// under "primary", "secondary", "tertiary" etc.
// This naming convention is entirely preferential.

export const colors = {
  primary: {
    green: "#33C213",
    blue: "#016C9D",
    darkBlue: "#014F73",
    purple: "#9A8DFB",
    lightGray: "#D9D9D9",
  },
  base: {
    black: "#000000",
    white: "#FFFFFF",
    darkGray: "#272727",
    lightGray: "rgba(0, 0, 0, 0.3)",
  },
} as const;

export default colors;
  