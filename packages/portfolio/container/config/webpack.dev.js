const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  entry: "./src/index.js",
  output: { publicPath: "http://localhost:3005/" },
  devServer: {
    port: 3005,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "portfolio",
      filename: "remoteEntry.js",
      exposes: { "./PortfolioApp": "./src/app" },
      remotes: {
        projects: "projects@http://localhost:3006/remoteEntry.js",
        about: "about@http://localhost:3007/remoteEntry.js",
        contact: "contact@http://localhost:3008/remoteEntry.js",
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

module.exports = merge(commonConfig, devConfig);
