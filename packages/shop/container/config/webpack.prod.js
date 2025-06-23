const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: `${domain}/shop/container/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shop",
      filename: "remoteEntry.js",
      exposes: { "./ShopApp": "./src/app" },
      remotes: {
        products: `products@${domain}/shop/products/latest/remoteEntry.js`,
        cart: `cart@${domain}/shop/cart/latest/remoteEntry.js`,
        dashboard: `dashboard@${domain}/shop/dashboard/latest/remoteEntry.js`,
        reviews: `reviews@${domain}/shop/reviews/latest/remoteEntry.js`,
        chat: `chat@${domain}/shop/chat/latest/remoteEntry.js`,
        checkout: `checkout@${domain}/shop/checkout/latest/remoteEntry.js`,
        orders: `orders@${domain}/shop/orders/latest/remoteEntry.js`,
        payments: `payments@${domain}/shop/payments/latest/remoteEntry.js`,
        product: `product@${domain}/shop/product/latest/remoteEntry.js`,
        recommendations: `recommendations@${domain}/shop/recommendations/latest/remoteEntry.js`,
        search: `search@${domain}/shop/search/latest/remoteEntry.js`,
        wishlist: `wishlist@${domain}/shop/wishlist/latest/remoteEntry.js`,
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
        "react-router-dom": { singleton: true, eager: true },
        "react-router": { singleton: true, eager: true },
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
