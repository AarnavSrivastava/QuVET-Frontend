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
        'background': '#6DA5C0',
        'accent': '#b15e6c',
        'accent-op50': '#b15e6c4f',
        'primary-dark': '#05161A',
        'primary-dark-op50': '#05161A66',
        'primary': '#0C7078',
        'primary-light': '#0F988C',
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(0.8)" }
        }
      },
      animation: {
        bounce: "bounce 100ms ease-in-out"
      },
      fontFamily: {
        playfair: ['var(--font-playfair)']
      }
    },
  },
  plugins: [],
};
export default config;
