const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: `${domain}/blog/container/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "blog",
      filename: "remoteEntry.js",
      exposes: {
        "./BlogApp": "./src/app",
      },
      remotes: {
        author: `author@${domain}/blog/author/latest/remoteEntry.js`,
        categories: `categories@${domain}/blog/categories/latest/remoteEntry.js`,
        comments: `comments@${domain}/blog/comments/latest/remoteEntry.js`,
        newsletters: `newsletters@${domain}/blog/newsletters/latest/remoteEntry.js`,
        post: `post@${domain}/blog/post/latest/remoteEntry.js`,
        posts: `posts@${domain}/blog/posts/latest/remoteEntry.js`,
        related: `related@${domain}/blog/related/latest/remoteEntry.js`,
        search: `search@${domain}/blog/search/latest/remoteEntry.js`,
        social: `social@${domain}/blog/social/latest/remoteEntry.js`,
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
