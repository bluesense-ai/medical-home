// src/theme/colors.ts

// Figma'daki hiyerarşiyi korumak için "primary", "secondary", "tertiary" vb.
// altına "default", "300", "contrastTextLight" gibi alanlar açıyoruz.
// Bu isimlendirme tamamen tercih meselesi.

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
  