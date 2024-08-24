import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "rgb(65, 109, 69)",
        secondary: "rgb(46, 125, 50)",
        accent: "rgb(255, 183, 77)",
      },
      fontSize: {
        logo: "2rem",
        header: "1.5rem",
        sidebar: "1rem",
        body: "0.875rem",
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        bold: "700",
      },
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
        // You can also add more font families for specific purposes if needed
      },
    },
  },
  plugins: [],
};
export default config;
