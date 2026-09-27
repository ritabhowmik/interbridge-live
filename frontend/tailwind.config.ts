import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
     colors: {
     base: "#F5F5F4",        // was #0B0A10
     surface: "rgba(0,0,0,0.03)",     // was rgba(255,255,255,0.05)
     border: "rgba(0,0,0,0.08)",      // was rgba(255,255,255,0.08)
     accentFrom: "#E8A6D9",
     accentTo: "#8C6FE0",
     blocker: "#C24A4A",
     conditional: "#B08A2E",
     informational: "#3A7CA5",
    },
      fontFamily: {
        display: ["'EB Garamond'", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};
export default config;
