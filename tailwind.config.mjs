/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkerGray:"#31485A",
        whiteGray:"#FCFCFC",
        orange:"#FDA215",
        fairGray:"#BBD0DA",
        playerGray:"#718E9F",
        verydarkerGray:"#172939",
      },
    },
  },
  plugins: [], 
};
 