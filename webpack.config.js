const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

require('dotenv').config();

const config = (isProd, isWatch) => ({
  context: path.resolve(__dirname, './src'),

  entry: {
    main: './scripts/main.jsx',
    style: './styles/main.scss',
  },

  output: {
    filename: isProd ? '[name]-[hash].js' : '[name].js',
    chunkFilename: isProd ? '[name]-[hash].js' : '[name].js',
    path: path.resolve(__dirname, 'packs'),
    publicPath: '/packs/',
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](@fortawesome[\//]fontawesome-svg-core)[\\/]/,
          name: 'fontawesome',
          chunks: 'all',
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|ttf|otf|eot|svg|woff(2)?)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: isProd ? '[name]-[hash].[ext]' : '[name].[ext]',
            publicPath: '/packs/',
          },
        }],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new CleanWebpackPlugin([isWatch ? '' : 'packs']),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProd ? '[id].[hash].css' : '[id].css',
    }),

    new OfflinePlugin({
      caches: {
        main: [":rest:"],
      },
      ServiceWorker: {
        output: "sw.js",
        publicPath: "/sw.js",
        cacheName: "todos",
        minify: true,
      },
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('./src/index.html'),
    }),

    new WebpackNotifierPlugin({
      title: 'Todos',
      alwaysNotify: true,
    }),
  ],

  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'packs'),
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: true,
    port: 8080,
    index: 'index.html',
    watchOptions: {
      ignored: /node_modules/,
    }
  }
});

module.exports = (_, { mode, $0 }) => config(mode === 'production', /webpack-dev-server$/.test($0));
