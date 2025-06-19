const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    port: 3010,
    historyApiFallback: true,
  },
  output: { publicPath: "auto" },
  plugins: [
    new ModuleFederationPlugin({
      name: "blog",
      filename: "remoteEntry.js",
      exposes: { "./BlogApp": "./src/app" },
      remotes: {
        author: "author@http://localhost:3011/remoteEntry.js",
        categories: "categories@http://localhost:3012/remoteEntry.js",
        comments: "comments@http://localhost:3013/remoteEntry.js",
        newsletters: "newsletters@http://localhost:3014/remoteEntry.js",
        post: "post@http://localhost:3015/remoteEntry.js",
        posts: "posts@http://localhost:3016/remoteEntry.js",
        related: "related@http://localhost:3018/remoteEntry.js",
        search: "search@http://localhost:3017/remoteEntry.js",
        social: "social@http://localhost:3019/remoteEntry.js",
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
