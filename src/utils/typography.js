import Typography from "typography"
const typography = new Typography({
  googleFonts: [
    {
      name: 'Abril Fatface',
      styles: [
        '400',
      ],
    },
    {
      name: 'Raleway',
      styles: [
        '300', '600',
      ],
    },
  ],
  baseFontSize: "16px",
  baseLineHeight: 1.45,
  scaleRatio: 4,
  headerGray: 20,
  bodyGray: 20,
  headerWeight: 400,
  bodyWeight: 300,
  boldWeight: 600,
  headerFontFamily: [
    "Abril Fatface",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
  bodyFontFamily: ["Raleway", "Helvetica Neue", "Segoe UI"],
})
export default typography