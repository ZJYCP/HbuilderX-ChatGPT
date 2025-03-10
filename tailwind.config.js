const { heroui } = require('@heroui/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/webview/**/*.{js,jsx,ts,tsx}', // 扫描 src 目录下的 JS/JSX 文件
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}', // hero UI
  ],
  theme: {
    extend: {}, // 可自定义主题
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        dark: {},
        light: {
          colors: {
            background: '#F8F1D8',
            foreground: '#666',
            secondary: '#e3d19b',
            primary: {
              50: '#FFFDF5',
              100: '#FFFCF2',
              200: '#FFFBEF',
              300: '#FFFBEC',
              400: '#FFFAEA',
              500: '#FFFAE8',
              600: '#FCF6E1',
              700: '#F8F1D8',
              800: '#F3ECCF',
              900: '#EEE7C6',
              foreground: '#666',
              DEFAULT: '#FFFAE8',
            },
          },
        },
        monokai: {
          extend: 'dark',
          colors: {
            background: '#0D001A',

            foreground: '#ffffff',
            primary: {
              50: '#3B096C',
              100: '#520F83',
              200: '#7318A2',
              300: '#9823C2',
              400: '#c031e2',
              500: '#DD62ED',
              600: '#F182F6',
              700: '#FCADF9',
              800: '#FDD5F9',
              900: '#FEECFE',
              DEFAULT: '#DD62ED',
              foreground: '#ffffff',
            },
            focus: '#F182F6',
          },
        },
      },
    }),
  ],
};
