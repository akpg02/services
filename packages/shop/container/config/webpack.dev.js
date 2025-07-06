const { merge } = require('webpack-merge');
const {
  container: { ModuleFederationPlugin },
} = require('webpack');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 3000,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
  },
  output: { publicPath: 'auto' },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shop',
      filename: 'remoteEntry.js',
      remotes: {
        products: 'products@http://localhost:3001/remoteEntry.js',
        cart: 'cart@http://localhost:3002/remoteEntry.js',
        dashboard: 'dashboard@http://localhost:3003/remoteEntry.js',
        reviews: 'reviews@http://localhost:3004/remoteEntry.js',
        chat: 'chat@http://localhost:3022/remoteEntry.js',
        checkout: 'checkout@http://localhost:3023/remoteEntry.js',
        orders: 'orders@http://localhost:3024/remoteEntry.js',
        payments: 'payments@http://localhost:3025/remoteEntry.js',
        product: 'product@http://localhost:3026/remoteEntry.js',
        recommendations: 'recommendations@http://localhost:3027/remoteEntry.js',
        search: 'search@http://localhost:3028/remoteEntry.js',
        wishlist: 'wishlist@http://localhost:3029/remoteEntry.js',
      },
      exposes: { './ShopApp': './src/app', './nav': './src/nav' },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
        'react-router-dom': { singleton: true, eager: true },
        'react-router': { singleton: true, eager: true },
      },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
