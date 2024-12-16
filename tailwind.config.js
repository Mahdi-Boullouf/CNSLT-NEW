/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  plugins: [
    require('daisyui'),
  ],
  prefix: "",
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },



    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {     
       fontFamily:{
        'body': ['"Source Serif 4"', 'serif'],
        'raleway': ['Raleway', 'sans-serif'],
    },
    backgroundImage: {
      'white-to-transparent': 'linear-gradient(to bottom, white, rgba(255, 255, 255, 0))',
    },
    boxShadow: {
      '3xl': ' 0 0 12px 2.5px #e3e3e3',
    },
      colors: {
        primary1:"#BF9445",
        primary2:"#2B3F58",
        secondary2:"#242744",
        border: "",
        input: "",
        ring: "",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      // screens: {
      //   'xs': '480px', // Custom small screen
      //   'sm': '640px', // Small screen
      //   'md': '768px', // Medium screen
      //   'lg': '1024px', // Large screen
      //   'xl': '1280px', // Extra large screen
      //   '2xl': '1536px', // 2XL screen
      //   '3xl': '1920px', // Custom extra large screen
      // },
    },
  },
  plugins: [
    require("tailwindcss-animate")],
}