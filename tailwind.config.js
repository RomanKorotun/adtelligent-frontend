/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    boxShadow: {
      card: "0 0 10px rgba(0, 0, 0, 0.15)",
      cardHover: "0 0 20px rgba(0, 0, 0, 0.25)",
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "320px",
        xl: "1280px",
      },
    },
    extend: {
      colors: {
        primary: "#191A15",
        secondary: "#8A8A88",
        error: "#EF4444",
        light: "#ffffff",
        focus: "#4E80EE",
      },
    },
  },
  plugins: [],
};
