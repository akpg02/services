// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/',
  },

  module: {
    rules: [
      // ─── JavaScript / React ────────────────────────────────
      {
        test: /\.m?[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  helpers: true,
                  regenerator: true,
                  // corejs: 3,            // only if you want polyfills from core-js
                },
              ],
            ],
          },
        },
      },

      // ─── CSS (split node_modules vs your own CSS for PostCSS) ───
      {
        test: /\.css$/i,
        oneOf: [
          {
            include: /node_modules/,
            use: ['style-loader', 'css-loader'],
          },
          {
            exclude: /node_modules/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    config: path.resolve(__dirname, 'postcss.config.js'),
                  },
                },
              },
            ],
          },
        ],
      },

      // ─── Static assets ──────────────────────────────────────
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]',
        },
      },
      {
        test: /\.(pdf|docx?|xlsx?)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'files/[name].[hash][ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.mjs'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
};
