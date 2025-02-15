import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: {
          primary: "var(--text-primary)",
        },
        card: {
          bg: "var(--card-bg)",
        },
        border: "var(--border-color)",
      }
    },
  },
};

export default config;
