/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
