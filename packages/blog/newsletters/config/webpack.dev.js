const { merge } = require("webpack-merge");
const {
  container: { ModuleFederationPlugin },
} = require("webpack");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    port: 3014,
    headers: { "Access-Control-Allow-Origin": "*" },
    historyApiFallback: true,
  },
  output: { publicPath: "auto" },
  plugins: [
    new ModuleFederationPlugin({
      name: "newsletters",
      filename: "remoteEntry.js",
      exposes: { "./NewlettersApp": "./src/app" },
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
