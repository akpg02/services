const { merge } = require("webpack-merge");
const {
  container: { ModuleFederationPlugin },
} = require("webpack");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  entry: "./src/index.js",
  output: { publicPath: "http://localhost:3030/" },
  devServer: {
    port: 3030,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    historyApiFallback: true,
  },
  output: { publicPath: "auto" },
  plugins: [
    new ModuleFederationPlugin({
      name: "calendar",
      filename: "remoteEntry.js",
      exposes: { "./CalendarApp": "./src/app" },
      remotes: {
        admin: "admin@http://localhost:3031/remoteEntry.js",
        analytics: "analytics@http://localhost:3032/remoteEntry.js",
        availability: "availability@http://localhost:3033/remoteEntry.js",
        collaboration: "collaboration@http://localhost:3034/remoteEntry.js",
        event_creation: "event_creation@http://localhost:3036/remoteEntry.js",
        event_details: "event_details@http://localhost:3037/remoteEntry.js",
        event_list: "event_list@http://localhost:3038/remoteEntry.js",
        integrations: "integrations@http://localhost:3039/remoteEntry.js",
        invitations: "invitations@http://localhost:3040/remoteEntry.js",
        notifications: "notifications@http://localhost:3041/remoteEntry.js",
        recurrence_rules:
          "recurrence_rules@http://localhost:3042/remoteEntry.js",
        search: "search@http://localhost:3043/remoteEntry.js",
        settings: "settings@http://localhost:3044/remoteEntry.js",
        views: "views@http://localhost:3035/remoteEntry.js",
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
