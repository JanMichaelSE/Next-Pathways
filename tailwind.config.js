/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        login: "url('/assets/login-background.svg')",
        signup: "url('/assets/signup-background.svg')",
        "btn-gradient":
          "linear-gradient(180.71deg, #fac20b 0.61%, #ee7222 99.39%)",
      },
    },
  },
  plugins: [],
};
