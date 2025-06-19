const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: `${domain}/projects/container/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "portfolio",
      filename: "remoteEntry.js",
      exposes: { "./PortfolioApp": "./src/app" },
      remotes: {
        projects: `projects@${domain}/projects/latest/remoteEntry.js`,
        about: `about@${domain}/about/latest/remoteEntry.js`,
        contact: `contact@${domain}/contact/latest/remoteEntry.js`,
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
