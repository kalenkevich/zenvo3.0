const path = require('path');
const webpackConfig = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const autoPrefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV;
const isProductionMode = nodeEnv === 'production';

module.exports = {
  entry: {
    application: './src/index.js',
  },
  target: 'web',
  context: path.resolve(__dirname, ''),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: isProductionMode ? 'production' : 'development',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: './src',
    hot: true,
    historyApiFallback: true,
    port: 8083,
    stats: {
      version: true,
      timings: true,
      errors: true,
      warnings: true,
    },
    proxy: {
      '/graphql': 'http://localhost:9000'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoPrefixer],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          }],
      }],
  },
  plugins: [
    new webpackConfig.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      template: './public/index.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpackConfig.DefinePlugin({
      ENVIRONMENT: JSON.stringify(nodeEnv || 'local'),
      BUILD_DATE: JSON.stringify(new Date().toLocaleString()),
      'process.env': JSON.stringify(process.env),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          safari10: true,
          compress: {
            inline: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
