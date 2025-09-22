// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/index.tsx", // or .ts
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // cleans dist before build
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.pdf$/,
        type: "asset/resource", // emits PDFs to /dist and gives you a URL
      },
    ],
  },
  devtool: "source-map",
  mode: "development", // change to "production" for prod builds
};
