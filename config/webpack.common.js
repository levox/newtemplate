// shared config (dev and prod)

const { resolve } = require("path");
const { CheckerPlugin } = require("awesome-typescript-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
console.log("Welcome to production");

if (process.env.NODE_ENV === "production") {
  console.log("Welcome to production");
}
if (process.env.DEBUG) {
  console.log("Debugging output");
}
module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".css"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json"
      })
    ]
  },
  context: resolve(__dirname, "../src"),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader", "source-map-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "awesome-typescript-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", { loader: "css-loader", options: { importLoaders: 1 } }]
      },
      {
        test: /\.(scss|sass)$/,
        loaders: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",

              hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
              modules: true, // if you use cssModules, this can help.
              reloadAll: true // when desperation kicks in - this is a brute force HMR flag
            }
          },
          {
            loader: "css-modules-typescript-loader?modules&namedExport&camelCase",
            options: {
              modules: true,
              namedExport: true,
              localIdentName: "[name]__[local]__[hash:base64:5]"
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            }
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          "file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]",
          "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false"
        ]
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
      //   filename: "[name]-[hash:4].css",
      //   chunkFilename: "[id]-[hash:4].css"
    }),
    new HtmlWebpackPlugin({ template: "index.html.ejs" })
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  performance: {
    hints: false
  }
};
