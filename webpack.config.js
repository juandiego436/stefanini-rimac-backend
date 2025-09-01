const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/handlers/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@handlers': path.resolve(__dirname, 'src/handlers/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@models': path.resolve(__dirname, 'src/models/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  optimization: {
    minimize: false,
  },
};