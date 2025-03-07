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
  plugins: [heroui()],
};
