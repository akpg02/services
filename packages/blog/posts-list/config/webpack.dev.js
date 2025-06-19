const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    port: 3016,
    historyApiFallback: true,
  },
  output: { publicPath: "auto" },
  plugins: [
    new ModuleFederationPlugin({
      name: "posts",
      filename: "remoteEntry.js",
      exposes: { "./PostsApp": "./src/app" },
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
