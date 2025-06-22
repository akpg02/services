const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require("./webpack.common");
const deps = require("../package.json").dependencies;

const devConfig = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    port: 3020,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    historyApiFallback: true,
  },
  output: { publicPath: "http://localhost:3020/" },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: { "./AuthApp": "./src/app" },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
        "react-router-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-router-dom"],
        },
        "react-router": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-router"],
        },
      },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
