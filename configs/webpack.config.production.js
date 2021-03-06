const config = require("../webpack.config.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

process.env.NODE_ENV = "production";

config.mode = "production";

config.optimization = {
  splitChunks: {
    chunks: "all",
  },
};

config.plugins = config.plugins.concat([
  new UglifyJsPlugin({
    sourceMap: true,
    extractComments: true,
  }),
]);

module.exports = config;
