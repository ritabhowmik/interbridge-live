import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#B98B5E",       // deep warm brown, page background
        card: "#DEC49A",       // latte beige, flat card background
        ink: "#3E2B22",        // dark brown, all text
        cream: "#F5EDE3",      // light text on dark/coffee fills
        accentFrom: "#C9A66B", // light brown
        accentTo: "#6B4226",   // deep coffee brown, primary CTA fill
        cherry: "#8C2F39",     // reserved for the "blocker" severity signal only
        blocker: "#8C2F39",
        conditional: "#7A5230",
        informational: "#A67C52",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Fraunces'", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
