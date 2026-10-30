import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf8ee",
          100: "#f9eccd",
          200: "#f3d898",
          300: "#ebbe5c",
          400: "#e4a72d",
          500: "#cb8816",
          600: "#af6910",
          700: "#8c4d11",
          800: "#733e14",
          900: "#45240c",
          dark: "#1c140e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
