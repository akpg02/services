const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: "./src/index.js",
  devServer: {
    port: 3009,
    historyApiFallback: true,
    client: {
      overlay: {
        warnings: false,
        errors: false,
      },
    },
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "root",
      filename: "remoteEntry.js",
      remotes: {
        portfolio: "portfolio@http://localhost:3005/remoteEntry.js",
        shop: "shop@http://localhost:3000/remoteEntry.js",
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
