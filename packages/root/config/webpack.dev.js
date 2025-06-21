const { merge } = require("webpack-merge");
const {
  container: { ModuleFederationPlugin },
} = require("webpack");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: "./src/index.js",
  devServer: {
    port: 3009,
    headers: { "Access-Control-Allow-Origin": "*" },
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
        blog: "blog@http://localhost:3010/remoteEntry.js",
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
