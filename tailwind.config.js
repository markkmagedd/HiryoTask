/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tell Tailwind to scan all files in your app and components folders
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
