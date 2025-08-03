// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', ['@babel/preset-env']],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },

      // 1) ONLY gacommon's CSS
      {
        test: /\.css$/i,
        include: /node_modules\/gacommon/,
        use: ['style-loader', 'css-loader'],
      },

      // 2) EVERYTHING ELSE (your Tailwind/PostCSS CSS in src)
      {
        test: /\.css$/i,
        exclude: /node_modules/, // ← add this line
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

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: { filename: 'images/[name].[hash][ext]' },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name].[hash][ext]' },
      },
      {
        test: /\.(pdf|docx?|xlsx?)$/i,
        type: 'asset/resource',
        generator: { filename: 'files/[name].[hash][ext]' },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
