import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'light-blue': '#b8d8d8ff',
        'china-rose': '#b15e6cff',
        'china-rose-op50': '#b15e6c4f',
        'gunmetal': '#2b3d41ff',
        'paynes-grey': '#4c5f6bff',
        'paynes-grey-op50': '#4c5f6b4f',
        'cadet-grey': '#83a0a0ff',
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(0.8)" }
        }
      },
      animation: {
        bounce: "bounce 100ms ease-in-out"
      }
    },
  },
  plugins: [],
};
export default config;
