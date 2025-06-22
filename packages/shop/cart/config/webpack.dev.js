const { merge } = require("webpack-merge");
const {
  container: { ModuleFederationPlugin },
} = require("webpack");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    port: 3002,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    historyApiFallback: {
      rewrites: [{ from: /^\/shop/, to: "/index.html" }],
    },
  },
  output: { publicPath: "auto" },
  plugins: [
    new ModuleFederationPlugin({
      name: "cart",
      filename: "remoteEntry.js",
      exposes: { "./CartApp": "./src/app" },
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
