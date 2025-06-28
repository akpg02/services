// root/container/config/webpack.prod.js
const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require("./webpack.common");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: `/root/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "root",
      filename: "remoteEntry.js",
      remotes: {
        portfolio: `portfolio@${domain}/portfolio/container/latest/remoteEntry.js`,
        shop: `shop@${domain}/shop/container/latest/remoteEntry.js`,
        blog: `blog@${domain}/blog/container/latest/remoteEntry.js`,
        calendar: `calendar@${domain}/calendar/container/latest/remoteEntry.js`,
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
        "react-router": { singleton: true, eager: true },
        "react-router-dom": { singleton: true, eager: true },
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
