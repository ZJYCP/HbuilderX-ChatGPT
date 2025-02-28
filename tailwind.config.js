/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/webview/**/*.{js,jsx,ts,tsx}', // 扫描 src 目录下的 JS/JSX 文件
  ],
  theme: {
    extend: {}, // 可自定义主题
  },
  plugins: [],
};
