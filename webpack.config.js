const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const ROOT_DIR = process.cwd();
const BUILD_DIR = path.resolve(ROOT_DIR, "dist");
const SRC_DIR = path.resolve(ROOT_DIR, "src");
const proxy = require("proxy-middleware");

const webpack = require("webpack");
const dotenv = require("dotenv");

const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const backend = process.env.SERVER_URL; // "http://localhost:9999";

module.exports = {
  // the output bundle won't be optimized for production but suitable for development
  mode: "development",
  devtool: "cheap-eval-source-map",

  // the app entry point is /src/index.js
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    // the output of the webpack build will be in /dist directory
    path: BUILD_DIR,
    // the filename of the JS bundle will be bundle.js
    filename: "bundle.js",
    publicPath: "/"
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
        use: [
          {

              loader: "babel-loader",
              options: {
                  presets: [
                      "@babel/preset-env",
                      "@babel/preset-react"
                  ],
                  plugins: [
                      "@babel/plugin-proposal-class-properties"
                  ]
              }
      }]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "./src")],
        use: "awesome-typescript-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf|png)([\?]?.*)$/,
        loader: "file-loader"
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: [SRC_DIR, "./node_modules"],
    symlinks: false
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
