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
        // [修改] 引入衬线体 Playfair Display
        sans: ['Inter', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        // [修改] Primary 色调从亮蓝改为低饱和度的 Slate (岩石灰)，营造极简/硬核感
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b', // Slate 500
          600: '#475569', // Slate 600
          700: '#334155', // Slate 700
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            fontFamily: theme('fontFamily.serif'), // 让文章正文更有阅读感 (可选，这里暂时只改标题)
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            a: {
              color: theme('colors.primary.700'),
              '&:hover': {
                color: theme('colors.black'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.400'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.white'),
              },
            },
          },
        },
      }),
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}