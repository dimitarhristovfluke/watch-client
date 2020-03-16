const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const fs = require("fs");
const ROOT_DIR = process.cwd();
const BUILD_DIR = path.resolve(ROOT_DIR, "dist");
const proxy = require("proxy-middleware");

const webpack = require("webpack");
const dotenv = require("dotenv");

const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const backend = process.env.SERVER_URL;

const minimizePlugin = new UglifyJsPlugin({
  parallel: true,
  sourceMap: true,
  cache: true,
  test: /\.js(x?)$/,
  uglifyOptions: {
    output: {
      // ecma: 5,
      comments: false
    }
  }
});

module.exports = {
  mode: "development",
  // the app entry point is /src/index.js
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    // the output of the webpack build will be in /dist directory
    path: path.resolve(__dirname, "dist"),
    // the filename of the JS bundle will be bundle.js
    filename: "bundle.js",
    publicPath: process.env.CLIENT_ROOT_PATH
  },
  watch: false,
  devServer: {
    contentBase: BUILD_DIR,
    port: 8888,
    watchContentBase: true,
    historyApiFallback: true,
    progress: false,
    inline: true,
    before: app => {
      app.use("/api", proxy(backend + "/api"));

      app.get("/*", (req, res, next) => {
        const wwwFile = path.join(ROOT_DIR, "dist", req.path);
        const wwwIndexFile = path.join(wwwFile, "index.html");

        if (fs.existsSync(wwwIndexFile)) return res.sendFile(wwwIndexFile);
        if (fs.existsSync(wwwFile)) return res.sendFile(wwwFile);

        next();
      });
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "./src")],
        loader: "babel-loader"
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "./src")],
        use: "awesome-typescript-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
  },
  /*optimization: {
    minimize: true,
    minimizer: [minimizePlugin]
  },*/

  performance: {
    // NEVER increase these configs. code split instead!
    // once you are done, set the new lower limit here
    hints: "error",
    maxEntrypointSize: 2936012,
    maxAssetSize: 6240000
  },
  // add a custom index.html as the template
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new webpack.DefinePlugin(envKeys)
  ],
  node: {
    fs: "empty"
  }
};
