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
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
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
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/webview/index.html', // 指定 HTML 模板
      filename: 'index.html',
    }),
  ],

  // devtool: 'source-map',

  externals: {
    hbuilderx: 'commonjs hbuilderx',
  },
};

module.exports = [webViewConfig];
