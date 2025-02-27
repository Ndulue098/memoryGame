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
        darkerGray:"oklch(0.216 0.006 56.043)",
        darkGray:"oklch(0.21 0.006 285.885)", 
        // darkerGray:"#31485A",
        // whiteGray:"#FCFCFC",
        whiteGray:"oklch(0.145 0 0)",
        // whiteGray:"oklch(0.823 0.12 346.018)",
        orange:"#fe11c5", 
        // fairGray:"#FFA0E8",
        fairGray:"oklch(0.823 0.12 346.018)",
        playerGray:"#718E9F", 
        // verydarkerGray:"#172939",
        verydarkerGray:"oklch(0.216 0.006 56.043)",
      },
      height: { screen: "100dvh" },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to top, oklch(0.65 0.24 329) 0%, oklch(0.216 0.006 56.043) 45%, oklch(0 0 0) 100%)',
        'game-gradient': 'linear-gradient(to top, oklch(0.65 0.24 329) -25%, oklch(0.216 0.006 56.043) 7%, oklch(0 0 0) 100%)',
      },
    }, 
  }, 
  plugins: [], 
};
 