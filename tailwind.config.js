/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#02C38E",
        "primary-dark": "#00B386",
        secondary: "#E8F7F3",
        "text-dark": "#1A3B34",
        "text-gray": "#6B7280",
        "text-light": "#9CA3AF",
      },
    },
  },
  plugins: [],
};
