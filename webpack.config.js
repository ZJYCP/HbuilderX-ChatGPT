const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webViewConfig = {
  mode: 'production',

  entry: {
    app: './src/webview/index.tsx',
  },

  output: {
    path: path.resolve(__dirname, 'dist/webview'),
    filename: 'bundle.js',
    clean: true,
  },

  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.scss'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader', // 把 CSS 插入到 DOM 中
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: false,
                localIdentName: '[local]__[hash:base64:5]',
              },
              importLoaders: 2,
            },
          },
          'sass-loader', // 编译 SCSS 文件
        ],
      },
      {
        test: /\.css$/, // 适用于所有 .css 文件
        use: [
          'style-loader', // 将 CSS 加载到页面中
          'css-loader', // 解析 CSS 文件
          'postcss-loader', // 使用 postcss 处理 Tailwind CSS
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/webview/index.html', // 指定 HTML 模板
      filename: 'index.html',
    }),
  ],

  // 配置devserve
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist/webview'),
    },
    compress: true, // 启用 gzip 压缩
    port: 3000, // 端口号
    open: false, // 自动打开浏览器
    hot: true, // 启用热更新
    historyApiFallback: true, // 支持 React Router 的 HTML5 History API
  },

  // devtool: 'source-map',

  externals: {
    hbuilderx: 'commonjs hbuilderx',
  },
};

module.exports = [webViewConfig];
