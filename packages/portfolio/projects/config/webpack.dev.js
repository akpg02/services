const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  entry: "./src/index.js",
  output: { publicPath: "auto" },
  devServer: {
    port: 3006,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "projects",
      filename: "remoteEntry.js",
      exposes: { "./ProjectsApp": "./src/app" },
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
