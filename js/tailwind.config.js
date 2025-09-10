/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["../*.html"],
  theme: {
    extend: {
      screens: {
        1600: "1600px", // tên là "1600", giá trị là "1600px"
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        primary: "#00B26B",
        "gray-text": "#252525",
        "gray-light": "#3A3335",
        "gray-lighter": "rgba(0, 0, 0, 0.6)",
        orange: "#F26722",
        "orange-light": "#FF9800",
        "yellow-gradient-1": "#FFB850",
        "yellow-gradient-2": "#FFDB57",
        "green-gradient-1": "#87E242",
        "green-gradient-2": "#BADFA5",
        "blue-gradient-1": "#2899F6",
        "blue-gradient-2": "#A2CBF8",
        "purple-gradient-1": "#8851EC",
        "purple-gradient-2": "#D8BBFD",
        "red-gradient-1": "#F05D40",
        "red-gradient-2": "#FFC8C0",
        "bg-overlay": "rgba(0, 0, 0, 0.05)",
        "yellow-bg": "#FFD768",
      },
    },
  },
  plugins: [],
};
