/* eslint-env node */
/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: '[name][contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', 'css'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './assets/index.html' }), 
    new ForkTsCheckerWebpackPlugin(),
  ],
}
