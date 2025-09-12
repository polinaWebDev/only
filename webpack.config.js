const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  const isDev = !isProd;

  return {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "js/[name].[contenthash:8].js" : "js/[name].js",
      assetModuleFilename: "assets/[hash][ext][query]",
      publicPath: "/",
      clean: true,
    },
    mode: isProd ? "production" : "development",
    devtool: isDev ? "eval-source-map" : "source-map",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              plugins: [isDev && require.resolve("react-refresh/babel")].filter(Boolean),
            },
          },
        },
        {
          test: /\.css$/i,
          exclude: /\.module\.css$/,
          use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.module\.css$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                esModule: false,
                modules: {
                  localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:6]",
                },
                sourceMap: isDev,
              },
            },
          ],
        },
        {
          test: /\.module\.s[ac]ss$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                esModule: false,
                modules: {
                  localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:6]",
                },
                sourceMap: isDev,
              },
            },
            {
              loader: "sass-loader",
              options: { sourceMap: isDev },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /\.module\.s[ac]ss$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: { sourceMap: isDev },
            },
          ],
        },

        {
          test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
          type: "asset",
          parser: {
            dataUrlCondition: { maxSize: 8 * 1024 },
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
        minify: isProd,
      }),
      new ForkTsCheckerWebpackPlugin({
        async: isDev,
        typescript: {
          configFile: path.resolve(__dirname, "tsconfig.json"),
        },
      }),
      isDev && new ReactRefreshWebpackPlugin(),
      new CleanWebpackPlugin(),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: "css/[name].[contenthash:8].css",
          chunkFilename: "css/[id].[contenthash:8].css",
        }),
    ].filter(Boolean),
    devServer: {
      static: { directory: path.join(__dirname, "dist") },
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      splitChunks: { chunks: "all" },
      runtimeChunk: "single",
    },
  };
};
