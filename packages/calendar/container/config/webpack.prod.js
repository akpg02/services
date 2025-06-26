const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: `${domain}/calendar/container/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "calendar",
      filename: "remoteEntry.js",
      exposes: {
        "./CalendarApp": "./src/app",
      },
      remotes: {
        admin: `admin@${domain}/calendar/admin/latest/remoteEntry.js`,
        analytics: `analytics@${domain}/calendar/analytics/latest/remoteEntry.js`,
        availability: `availability@${domain}/calendar/availability/latest/remoteEntry.js`,
        collaboration: `collaboration@${domain}/calendar/collaboration/latest/remoteEntry.js`,
        event_creation: `event_creation@${domain}/calendar/event_creation/latest/remoteEntry.js`,
        event_details: `event_details@${domain}/calendar/event_details/latest/remoteEntry.js`,
        event_list: `event_list@${domain}/calendar/event_list/latest/remoteEntry.js`,
        integrations: `integrations@${domain}/calendar/integrations/latest/remoteEntry.js`,
        invitations: `invitations@${domain}/calendar/invitations/latest/remoteEntry.js`,
        notifications: `notifications@${domain}/calendar/notifications/latest/remoteEntry.js`,
        recurrence_rules: `recurrence_rules@${domain}/calendar/recurrence_rules/latest/remoteEntry.js`,
        search: `search@${domain}/calendar/search/latest/remoteEntry.js`,
        settings: `settings@${domain}/calendar/settings/latest/remoteEntry.js`,
        views: `views@${domain}/calendar/views/latest/remoteEntry.js`,
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
