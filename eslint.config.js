// // eslint.config.js
// import tseslint from '@typescript-eslint/eslint-plugin';
// import tsParser from '@typescript-eslint/parser';

// export default [
//   {
//     files: ['**/*.{ts,tsx,js,jsx}'],
//     ignores: ['dist/**', 'node_modules/**'],
//     languageOptions: {
//       parser: tsParser, // TypeScript 解析器
//       parserOptions: {
//         ecmaVersion: 'latest',
//         sourceType: 'module',
//         ecmaFeatures: { jsx: true }, // 支持 JSX
//       },
//       globals: {
//         window: 'readonly',
//         document: 'readonly',
//         hbuilderx: 'readonly', // HBuilderX 全局对象
//       },
//     },
//     plugins: {
//       '@typescript-eslint': tseslint,
//     },
//     rules: {
//       // 核心规则
//       'no-unused-vars': 'off', // 关闭默认规则
//       '@typescript-eslint/no-unused-vars': 'error', // 使用 TS 版本
//       'no-console': 'warn', // 允许 console，但警告
//       semi: ['error', 'always'], // 强制分号
//       quotes: ['error', 'single'], // 强制单引号
//     },
//   },
// ];
module.exports = [
  {
    rules: {
      semi: 'error',
      'prefer-const': 'error',
    },
  },
];
