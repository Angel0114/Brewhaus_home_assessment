const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const Dotenv = require("dotenv-webpack");

const config = {
  entry: "./src/app.jsx",
  output: {
    filename: "myBundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new Dotenv(),
  ],
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    port: 8080,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: 3, targets: "defaults" },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },
};

if (currentTask == "build") {
  config.mode = "production";
  config.module.rules[0].use[0] = MiniCssExtractPlugin.loader;
  config.plugins.push(
    new MiniCssExtractPlugin({ filename: "main.[hash].css" }),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin()
  );
}

module.exports = config;
