/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#02C38E",
        "primary-dark": "#00B386",
        secondary: "#E8F7F3",
        "text-dark": "#1A3B34",
        "text-gray": "#6B7280",
        "text-light": "#9CA3AF",
        // Dark mode colors
        "dark-bg": "#0F1419",
        "dark-surface": "#1A1F2E",
        "dark-primary": "#00D9A3",
        "dark-text": "#E8F7F3",
        "dark-text-secondary": "#A8C5BC",
      },
    },
  },
  plugins: [],
};
