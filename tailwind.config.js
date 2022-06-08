module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      kami: "#F4F0F0",
      gure: "#9ba4ba",
      katsu: "#0f1024",
      moku: "#292723",
      aka: "#F43F5E",
      ki: "#EAB308",
      midori: "#59C274",
      aoi: "#0b9bd0",
    },
    fontFamily: {
      garamond: "EB Garamond, serif",
      inter: "Inter, sans-serif",
      fira: "Fira Code, monospace",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
