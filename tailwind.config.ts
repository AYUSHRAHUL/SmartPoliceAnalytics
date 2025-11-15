import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        indigoPolice: {
          light: "#40538B",
          DEFAULT: "#2D3E70",
          dark: "#1C274A"
        },
        gold: "#F5C542"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ]
};

export default config;


