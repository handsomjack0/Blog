/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // [修改] Apple 风格首选系统字体，Inter 作为 fallback
        sans: [
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"SF Pro Text"', 
          '"Segoe UI"', 
          'Roboto', 
          'Helvetica', 
          'Arial', 
          'sans-serif'
        ],
        // 移除 Serif，Apple 极少在 UI 核心层使用衬线体
        serif: ['-apple-system', 'BlinkMacSystemFont', 'serif'], 
        mono: ['"SF Mono"', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      colors: {
        // [修改] Apple 风格色板
        gray: {
          50: '#F5F5F7', // Apple Website Light Background
          100: '#E5E5EA',
          200: '#D1D1D6',
          300: '#C7C7CC',
          400: '#AEAEB2',
          500: '#8E8E93',
          600: '#636366',
          700: '#48484A',
          800: '#2C2C2E',
          900: '#1C1C1E', // iOS Dark Mode Background
          950: '#000000', // OLED Black
        },
        primary: {
          // System Blue
          50: '#EBF3FF',
          100: '#D6E6FF',
          200: '#B3D0FF',
          300: '#80AFFF',
          400: '#4D8EFF',
          500: '#007AFF', // Apple System Blue
          600: '#0062CC',
          700: '#004999',
          800: '#003166',
          900: '#001833',
        }
      },
      boxShadow: {
        'apple': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'apple-hover': '0 20px 40px rgba(0, 0, 0, 0.2)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}