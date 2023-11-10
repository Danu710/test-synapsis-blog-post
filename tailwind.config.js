/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary/base": "#FBBE28",
        "primary/darker": "#C99820",
        "primary/darker-2": "#7E5F14",
        "primary/lighter": "#FCD269",
        "primary/lighter-2": "#FDE5A9",
        "secondary/base": "#2D7B63",
        "secondary/darker": "#24624F",
        "secondary/darker-2": "#173E32",
        "secondary/lighter": "#6CA392",
        "secondary/lighter-2": "#ABCAC1",
        "neutral/base": "#0A0A0A",
        "state/error": "#C52421",
        "state/success": "#0ABC5D",
        "state/info": "#FFAB05",
        "state/blue": "#3C5BFF",
        "state/purple": "#9747FF",
        "state/gray": "#C2C2C2",
      },
    },
  },
  plugins: [],
};
